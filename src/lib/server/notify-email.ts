import nodemailer, { type Transporter } from "nodemailer";

import { businessConfig } from "@/config/business";
import { formatDisplayDate, formatDisplayTime, formatTripType } from "@/lib/format";

export interface LeadEmailPayload {
  reference: string;
  customerName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email?: string | null;
  tripType: string;
  pickupLocation: string;
  dropLocation: string;
  journeyDate: string;
  pickupTime: string;
  returnDate?: string | null;
  returnTime?: string | null;
  passengers: number;
  vehicleType: string;
  luggage?: string | null;
  additionalNotes?: string | null;
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  landingPage?: string | null;
  routeSlug?: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string | number | null): string {
  if (value === undefined || value === null || value === "") return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#475569;">${escapeHtml(
    label
  )}</td><td style="padding:4px 0;color:#17202A;"><strong>${escapeHtml(
    String(value)
  )}</strong></td></tr>`;
}

function buildHtml(lead: LeadEmailPayload): string {
  const returnValue = lead.returnDate
    ? `${formatDisplayDate(lead.returnDate)}${
        lead.returnTime ? ` at ${formatDisplayTime(lead.returnTime)}` : ""
      }`
    : "";

  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;">
    <h2 style="color:#123B5D;margin:0 0 4px;">New enquiry ${escapeHtml(lead.reference)}</h2>
    <p style="color:#475569;margin:0 0 16px;">${escapeHtml(
      formatTripType(lead.tripType)
    )} — ${escapeHtml(lead.pickupLocation)} to ${escapeHtml(lead.dropLocation)}</p>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row("Name", lead.customerName)}
      ${row("Phone", lead.phoneNumber)}
      ${row("WhatsApp", lead.whatsappNumber)}
      ${row("Email", lead.email)}
      <tr><td colspan="2" style="padding:8px 0;"><hr style="border:none;border-top:1px solid #DBE3EC;"/></td></tr>
      ${row("Trip type", formatTripType(lead.tripType))}
      ${row("Pickup", lead.pickupLocation)}
      ${row("Destination", lead.dropLocation)}
      ${row("Date", formatDisplayDate(lead.journeyDate))}
      ${row("Pickup time", formatDisplayTime(lead.pickupTime))}
      ${row("Return", returnValue)}
      ${row("Passengers", lead.passengers)}
      ${row("Vehicle", lead.vehicleType)}
      ${row("Luggage", lead.luggage)}
      ${row("Notes", lead.additionalNotes)}
      <tr><td colspan="2" style="padding:8px 0;"><hr style="border:none;border-top:1px solid #DBE3EC;"/></td></tr>
      ${row("Source", lead.source)}
      ${row("Medium", lead.medium)}
      ${row("Campaign", lead.campaign)}
      ${row("Landing page", lead.landingPage)}
      ${row("Page", lead.routeSlug)}
    </table>
  </div>`;
}

/** Plain-text alternative. Some clients prefer it, and spam filters expect it. */
function buildText(lead: LeadEmailPayload): string {
  const lines: [string, string | number | null | undefined][] = [
    ["Reference", lead.reference],
    ["Name", lead.customerName],
    ["Phone", lead.phoneNumber],
    ["WhatsApp", lead.whatsappNumber],
    ["Email", lead.email],
    ["Trip type", formatTripType(lead.tripType)],
    ["Pickup", lead.pickupLocation],
    ["Destination", lead.dropLocation],
    ["Date", formatDisplayDate(lead.journeyDate)],
    ["Pickup time", formatDisplayTime(lead.pickupTime)],
    [
      "Return",
      lead.returnDate
        ? `${formatDisplayDate(lead.returnDate)}${
            lead.returnTime ? ` at ${formatDisplayTime(lead.returnTime)}` : ""
          }`
        : null,
    ],
    ["Passengers", lead.passengers],
    ["Vehicle", lead.vehicleType],
    ["Luggage", lead.luggage],
    ["Notes", lead.additionalNotes],
    ["Source", lead.source],
    ["Medium", lead.medium],
    ["Campaign", lead.campaign],
    ["Landing page", lead.landingPage],
    ["Page", lead.routeSlug],
  ];

  return lines
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

/** Gmail's SMTP endpoint. Any other provider works by overriding host and port. */
const DEFAULT_SMTP_HOST = "smtp.gmail.com";
const DEFAULT_SMTP_PORT = 465;

/**
 * `undefined` means "not built yet"; `null` means "no credentials, stay off".
 * Built once and reused so a burst of enquiries does not open a connection each.
 */
let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;

  const user = process.env.SMTP_USER?.trim();
  // Google displays app passwords in groups of four and people paste the
  // spaces along with them, which SMTP auth would reject.
  const pass = process.env.SMTP_PASSWORD?.replace(/\s+/g, "");

  if (!user || !pass) {
    transporter = null;
    return transporter;
  }

  const port = Number(process.env.SMTP_PORT) || DEFAULT_SMTP_PORT;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || DEFAULT_SMTP_HOST,
    port,
    // 465 is implicit TLS. 587 starts plain and upgrades via STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

/**
 * Sends the internal notification over SMTP, which for this business is the
 * Gmail account itself. Requires an app password: Google refuses account
 * passwords for SMTP unless 2-Step Verification is on and an app password is
 * issued.
 *
 * Never throws: the lead is already stored by the time this runs, and an email
 * problem must not affect the customer's response or cause a retry that would
 * create a duplicate lead.
 */
export async function sendLeadNotification(lead: LeadEmailPayload): Promise<void> {
  const transport = getTransporter();
  const user = process.env.SMTP_USER?.trim();
  // Defaults to the sending account, which is the common case: notify myself.
  const to = process.env.LEAD_NOTIFICATION_EMAIL?.trim() || user;

  if (!transport || !user || !to) {
    console.warn(
      `[lead-email] Skipped for ${lead.reference}: SMTP_USER and SMTP_PASSWORD are not configured.`
    );
    return;
  }

  try {
    await transport.sendMail({
      // Gmail rewrites any From that is not the authenticated mailbox, so the
      // account address is the only sender that survives. The name is ours.
      from: `"${businessConfig.legalName}" <${user}>`,
      to,
      // Hitting reply on the notification answers the customer directly.
      replyTo: lead.email || undefined,
      subject: `New enquiry ${lead.reference} — ${lead.pickupLocation} to ${lead.dropLocation}`,
      text: buildText(lead),
      html: buildHtml(lead),
    });

    console.info(`[lead-email] Notification sent for ${lead.reference}`);
  } catch (error) {
    console.error(`[lead-email] Failed to notify for ${lead.reference}:`, error);
  }
}
