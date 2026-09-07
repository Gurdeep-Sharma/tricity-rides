import { NextResponse, after } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { leadRequestSchema, normalisePhone } from "@/lib/validation/lead";
import { generateReference } from "@/lib/reference";
import { buildLeadWhatsAppUrl } from "@/lib/whatsapp";
import { consumeRateLimit } from "@/lib/server/rate-limit";
import { getClientIp, hashIp } from "@/lib/server/request";
import { sendLeadNotification } from "@/lib/server/notify-email";

/** 5 accepted submissions per IP per hour. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/** Repeat of the same trip from the same phone inside this window is a duplicate. */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

/** Retries for the (extremely unlikely) reference collision. */
const REFERENCE_ATTEMPTS = 5;

function optional(value: string | undefined | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Please check your details and try again." },
      { status: 400 }
    );
  }

  // 1. Validate ------------------------------------------------------------
  const parsed = leadRequestSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".") || "form";
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }

    return NextResponse.json(
      {
        success: false,
        error: "Please check the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // 2. Honeypot ------------------------------------------------------------
  // A populated honeypot means a bot. Return a harmless success-shaped response
  // and write nothing to the database and send no notification.
  if (data._hp && data._hp.trim().length > 0) {
    return NextResponse.json(
      {
        success: true,
        data: { reference: "TR-000000", whatsappUrl: null },
      },
      { status: 201 }
    );
  }

  const ip = getClientIp(request.headers);
  const phone = normalisePhone(data.phoneNumber);
  const whatsapp = normalisePhone(data.whatsappNumber);

  // 3. Duplicate check -----------------------------------------------------
  // Runs before the rate limit is consumed so a customer re-submitting the same
  // trip does not burn their hourly allowance.
  try {
    const existing = await prisma.lead.findFirst({
      where: {
        phoneNumber: phone,
        pickupLocation: data.pickupLocation,
        dropLocation: data.dropLocation,
        journeyDate: data.journeyDate,
        createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
      },
      orderBy: { createdAt: "desc" },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: true,
          duplicate: true,
          message: "We already have this enquiry. Our team will contact you shortly.",
          data: {
            reference: existing.reference,
            whatsappUrl: buildLeadWhatsAppUrl({
              reference: existing.reference,
              customerName: existing.customerName,
              pickupLocation: existing.pickupLocation,
              dropLocation: existing.dropLocation,
              journeyDate: existing.journeyDate,
              pickupTime: existing.pickupTime,
              passengers: existing.passengers,
              vehicleType: existing.vehicleType,
              tripType: existing.tripType,
              returnDate: existing.returnDate
                ? existing.returnDate.toISOString().slice(0, 10)
                : null,
              returnTime: existing.returnTime,
            }),
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    // A failed duplicate lookup must not block a genuine enquiry.
    console.warn("[leads] Duplicate check failed, continuing:", error);
  }

  // 4. Rate limit ----------------------------------------------------------
  const rate = consumeRateLimit(`leads:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);

  if (rate.limited) {
    return NextResponse.json(
      {
        success: false,
        error:
          "We have received several enquiries from you already. Please call or WhatsApp us instead.",
      },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  // 5. Persist the lead ----------------------------------------------------
  const attribution = data.attribution ?? {};
  const isRoundTrip = data.tripType === "ROUND_TRIP";

  const leadData = {
    tripType: data.tripType,
    pickupLocation: data.pickupLocation,
    dropLocation: data.dropLocation,
    journeyDate: data.journeyDate,
    pickupTime: data.pickupTime,
    returnDate:
      isRoundTrip && data.returnDate ? new Date(`${data.returnDate}T00:00:00Z`) : null,
    returnTime: isRoundTrip ? optional(data.returnTime) ?? null : null,
    passengers: data.passengers,
    vehicleType: data.vehicleType,
    luggage: optional(data.luggage) ?? null,
    routeSlug: optional(data.routeSlug) ?? null,
    customerName: data.customerName,
    phoneNumber: phone,
    whatsappNumber: whatsapp,
    email: optional(data.email) ?? null,
    additionalNotes: optional(data.additionalNotes) ?? null,
    source: optional(attribution.source) ?? null,
    medium: optional(attribution.medium) ?? null,
    campaign: optional(attribution.campaign) ?? null,
    utmSource: optional(attribution.utmSource) ?? null,
    utmMedium: optional(attribution.utmMedium) ?? null,
    utmCampaign: optional(attribution.utmCampaign) ?? null,
    utmTerm: optional(attribution.utmTerm) ?? null,
    utmContent: optional(attribution.utmContent) ?? null,
    landingPage: optional(attribution.landingPage) ?? null,
    referrer: optional(attribution.referrer) ?? null,
    ipHash: ip === "unknown" ? null : hashIp(ip),
  };

  let lead: Awaited<ReturnType<typeof prisma.lead.create>> | null = null;

  for (let attempt = 0; attempt < REFERENCE_ATTEMPTS; attempt += 1) {
    try {
      lead = await prisma.lead.create({
        data: { ...leadData, reference: generateReference() },
      });
      break;
    } catch (error) {
      // On MongoDB, meta.target is the *index* name (Lead_reference_key) rather
      // than the column list Postgres reported, so this matches on substring.
      // Both shapes contain "reference"; verified against the live database.
      const isReferenceCollision =
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002" &&
        String(error.meta?.target ?? "").includes("reference");

      if (isReferenceCollision && attempt < REFERENCE_ATTEMPTS - 1) {
        continue;
      }

      console.error("[leads] Failed to create lead:", error);
      return NextResponse.json(
        {
          success: false,
          error:
            "We could not save your enquiry just now. Please try again, or WhatsApp us directly.",
        },
        { status: 500 }
      );
    }
  }

  if (!lead) {
    return NextResponse.json(
      {
        success: false,
        error:
          "We could not save your enquiry just now. Please try again, or WhatsApp us directly.",
      },
      { status: 500 }
    );
  }

  const storedLead = lead;

  // 6. Notify by email after the response — never blocks or affects persistence.
  after(async () => {
    await sendLeadNotification({
      reference: storedLead.reference,
      customerName: storedLead.customerName,
      phoneNumber: storedLead.phoneNumber,
      whatsappNumber: storedLead.whatsappNumber,
      email: storedLead.email,
      tripType: storedLead.tripType,
      pickupLocation: storedLead.pickupLocation,
      dropLocation: storedLead.dropLocation,
      journeyDate: storedLead.journeyDate,
      pickupTime: storedLead.pickupTime,
      returnDate: storedLead.returnDate
        ? storedLead.returnDate.toISOString().slice(0, 10)
        : null,
      returnTime: storedLead.returnTime,
      passengers: storedLead.passengers,
      vehicleType: storedLead.vehicleType,
      luggage: storedLead.luggage,
      additionalNotes: storedLead.additionalNotes,
      source: storedLead.source,
      medium: storedLead.medium,
      campaign: storedLead.campaign,
      landingPage: storedLead.landingPage,
      routeSlug: storedLead.routeSlug,
    });
  });

  return NextResponse.json(
    {
      success: true,
      data: {
        reference: storedLead.reference,
        whatsappUrl: buildLeadWhatsAppUrl({
          reference: storedLead.reference,
          customerName: storedLead.customerName,
          pickupLocation: storedLead.pickupLocation,
          dropLocation: storedLead.dropLocation,
          journeyDate: storedLead.journeyDate,
          pickupTime: storedLead.pickupTime,
          passengers: storedLead.passengers,
          vehicleType: storedLead.vehicleType,
          tripType: storedLead.tripType,
          returnDate: storedLead.returnDate
            ? storedLead.returnDate.toISOString().slice(0, 10)
            : null,
          returnTime: storedLead.returnTime,
        }),
      },
    },
    { status: 201 }
  );
}

/** Any other method on this endpoint. */
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed." },
    { status: 405 }
  );
}

export const dynamic = "force-dynamic";
