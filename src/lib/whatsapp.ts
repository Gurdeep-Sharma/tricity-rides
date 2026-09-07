import { businessConfig } from "@/config/business";
import { formatDisplayDate, formatDisplayTime, formatTripType } from "@/lib/format";

export interface WhatsAppLeadSummary {
  reference: string;
  customerName: string;
  pickupLocation: string;
  dropLocation: string;
  journeyDate: string;
  pickupTime: string;
  passengers: number;
  vehicleType: string;
  tripType: string;
  returnDate?: string | null;
  returnTime?: string | null;
}

/** Builds a wa.me URL with the message correctly percent-encoded. */
export function buildWhatsAppUrl(message: string, numberDigits?: string): string {
  const digits = (numberDigits ?? businessConfig.contact.whatsappDigits).replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * Message sent after a lead is stored.
 * It states that an enquiry was submitted. It must never imply that a taxi,
 * driver or vehicle has been confirmed, because at this point none has been.
 */
export function buildLeadWhatsAppMessage(lead: WhatsAppLeadSummary): string {
  const lines: string[] = [
    "Hi Tricity Rides, I just submitted a taxi enquiry.",
    "",
    `Reference: ${lead.reference}`,
    `Trip type: ${formatTripType(lead.tripType)}`,
    `Pickup: ${lead.pickupLocation}`,
    `Destination: ${lead.dropLocation}`,
    `Date: ${formatDisplayDate(lead.journeyDate)}`,
    `Pickup time: ${formatDisplayTime(lead.pickupTime)}`,
  ];

  if (lead.returnDate) {
    const returnLine = lead.returnTime
      ? `Return: ${formatDisplayDate(lead.returnDate)} at ${formatDisplayTime(lead.returnTime)}`
      : `Return: ${formatDisplayDate(lead.returnDate)}`;
    lines.push(returnLine);
  }

  lines.push(
    `Passengers: ${lead.passengers}`,
    `Vehicle: ${lead.vehicleType}`,
    "",
    "Please share the available fare and vehicle options.",
    `Name: ${lead.customerName}`
  );

  return lines.join("\n");
}

export function buildLeadWhatsAppUrl(lead: WhatsAppLeadSummary, numberDigits?: string): string {
  return buildWhatsAppUrl(buildLeadWhatsAppMessage(lead), numberDigits);
}

/**
 * Message for direct "WhatsApp us" buttons, before any form is filled in.
 * `context` names the page so the conversation starts with useful information.
 */
export function buildEnquiryWhatsAppUrl(context?: string): string {
  const message = context
    ? `Hi Tricity Rides, I'd like a taxi quote for ${context}. Could you share the fare and vehicle options?`
    : "Hi Tricity Rides, I'd like a taxi quote. Could you share the fare and vehicle options?";
  return buildWhatsAppUrl(message);
}
