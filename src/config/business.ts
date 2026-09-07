/**
 * Canonical business information (NAP: Name, Address/service area, Phone).
 * Every page, JSON-LD block and CTA must read from here so the details stay consistent.
 *
 * Phone/WhatsApp/email come from environment variables, each falling back to the
 * value below.
 */

/**
 * The live business line. Calls and WhatsApp both go here.
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER only if the two ever need to differ.
 */
const BUSINESS_NUMBER = "+919878649610";

function orFallback(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

// These must be written as full `process.env.NEXT_PUBLIC_*` expressions. Next
// substitutes them at build time by matching the literal text, so a dynamic
// lookup such as process.env[name] is left untouched in the browser bundle:
// the server would render the configured number while the client shipped the
// fallback, which is a hydration mismatch and a wrong number on every CTA the
// client renders.
const phone = orFallback(process.env.NEXT_PUBLIC_PHONE_NUMBER, BUSINESS_NUMBER);
// Falls back to the call number, so changing one env var moves both together.
const whatsapp = orFallback(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, phone);
const email = orFallback(
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL,
  "tricityrides.info@gmail.com"
);

/** Digits only, for wa.me links (e.g. 919876543210). */
const whatsappDigits = whatsapp.replace(/\D/g, "");

/** Human-friendly display: +91 98765 43210 */
function formatIndianPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return e164;
}

export const businessConfig = {
  legalName: "Tricity Rides",
  /** Service-area business: no walk-in office address is published. */
  serviceAreas: [
    { name: "Chandigarh", slug: "chandigarh-taxi" },
    { name: "Mohali", slug: "mohali-taxi" },
    { name: "Zirakpur", slug: "zirakpur-taxi" },
  ],
  serviceAreaLabel: "Chandigarh, Mohali and Zirakpur",
  airport: {
    name: "Shaheed Bhagat Singh International Airport, Chandigarh",
    shortName: "Chandigarh Airport",
    iata: "IXC",
    locality: "Mohali (Jhiurheri)",
  },
  contact: {
    phone,
    phoneDisplay: formatIndianPhone(phone),
    phoneHref: `tel:${phone}`,
    whatsapp,
    whatsappDigits,
    whatsappDisplay: formatIndianPhone(whatsapp),
    email,
  },
  /** Enquiry handling hours as communicated on the site. Keep factual. */
  hours: {
    label: "Enquiries answered daily, 7:00 AM – 10:00 PM IST",
    note: "Early-morning and late-night pickups are arranged in advance.",
  },
  social: {
    instagram: "",
    facebook: "",
  },
  pricing: {
    /**
     * Rupee amounts are hidden site-wide until commercial pricing is approved.
     * Flip to true only after route fares in src/data/routes.ts are verified.
     */
    showStartingFares: false,
    quoteCta: "Get a Confirmed Quote",
    explanation:
      "Fares depend on vehicle, trip type, dates and route conditions. We confirm the fare and vehicle availability with you before any booking is made.",
  },
  /** What a confirmed quote normally covers vs. what may be charged separately. */
  fare: {
    included: [
      "Vehicle and driver for the agreed itinerary",
      "Fuel for the quoted route",
      "Driver allowance for the quoted days (round trips)",
      "Pickup from your address in Chandigarh, Mohali or Zirakpur",
    ],
    extras: [
      "Tolls and state entry taxes (quoted as included or actuals, always stated in writing)",
      "Parking charges at destinations",
      "Additional kilometres beyond the quoted itinerary",
      "Extra stops or sightseeing not in the itinerary",
      "Waiting time beyond the agreed limit",
      "Night driving surcharge where applicable, stated in advance",
    ],
    note: "Every inclusion and possible extra is written into your quote before you confirm.",
  },
  policies: {
    enquiry:
      "Submitting an enquiry does not confirm a booking. We confirm availability and fare with you first.",
    cancellation:
      "Cancellation terms are shared with your quote and confirmed before booking. Please contact us as early as possible if plans change.",
  },
} as const;

export type BusinessConfig = typeof businessConfig;
