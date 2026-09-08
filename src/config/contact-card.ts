import { businessConfig } from "@/config/business";

/**
 * Everything the digital visiting card at /save-contact shows.
 *
 * Phone, WhatsApp and email deliberately come from businessConfig, which reads
 * NEXT_PUBLIC_PHONE_NUMBER / NEXT_PUBLIC_WHATSAPP_NUMBER /
 * NEXT_PUBLIC_BUSINESS_EMAIL. Change the number in one place and it moves on
 * this card, in the vCard, across the site and in the JSON-LD together.
 *
 * The values below are the ones specific to the printed card.
 */
export const contactCard = {
  /** The person on the physical card. */
  person: {
    name: "Gurdeep Sharma",
    /** Structured for the vCard N property: family;given. */
    familyName: "Sharma",
    givenName: "Gurdeep",
    title: "Founder",
  },

  /**
   * The visiting-card tagline. Distinct from brandConfig.tagline, which is the
   * longer descriptive line used for search results and the web manifest.
   */
  tagline: "Your Journey, Our Priority",

  servicesLine: "Outstation • Airport • Local • Corporate Travel",

  /** Public site root. Update if the domain changes. */
  websiteUrl: "https://tricityrides.in",
  websiteLabel: "tricityrides.in",

  /**
   * Where "Book Your Ride" goes. Point this at the booking or quote page when
   * one is live; it is the only line to change.
   */
  bookingUrl: "https://tricityrides.in/",

  /** Canonical URL of this page. The printed QR code encodes exactly this. */
  canonicalPath: "/save-contact",

  /** Opening line for the WhatsApp thread. */
  whatsappMessage: "Hi Tricity Rides, I would like to enquire about a taxi booking.",

  services: [
    { name: "Outstation", detail: "Shimla, Manali, Delhi and beyond" },
    { name: "Airport Transfer", detail: "Chandigarh Airport pickups and drops" },
    { name: "Local Rides", detail: "Half-day and full-day city hire" },
    { name: "Corporate Travel", detail: "Staff, guest and event travel" },
  ],

  /** Postal fields for the vCard. A service-area business, so no street. */
  address: {
    city: "Chandigarh",
    region: "Punjab",
    country: "India",
  },
} as const;

/** wa.me link with the enquiry message pre-filled. */
export const whatsappHref = `https://wa.me/${
  businessConfig.contact.whatsappDigits
}?text=${encodeURIComponent(contactCard.whatsappMessage)}`;
