import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidReference } from "@/lib/reference";

/**
 * Records that the customer opened WhatsApp after submitting an enquiry, which
 * is what separates FORM SUBMITTED from WHATSAPP CLICKED in reporting.
 *
 * This endpoint is deliberately non-critical: the client fires it without
 * waiting, and a failure here never stops WhatsApp from opening.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  const { reference } = await params;

  if (!isValidReference(reference)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    // Only the first click is recorded. On MongoDB a field that was never
    // written is absent from the document rather than null, and a `null` filter
    // does not match an absent field, so `isSet: false` is required alongside
    // it — without that this update silently matches nothing.
    await prisma.lead.updateMany({
      where: {
        reference,
        OR: [{ whatsappClickedAt: null }, { whatsappClickedAt: { isSet: false } }],
      },
      data: { whatsappClickedAt: new Date() },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.warn(`[leads] Could not record WhatsApp click for ${reference}:`, error);
    // Reported as accepted: the click already happened and this is only telemetry.
    return NextResponse.json({ success: false }, { status: 202 });
  }
}

export const dynamic = "force-dynamic";
