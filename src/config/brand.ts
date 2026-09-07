/**
 * Brand identity for Tricity Ride.
 * Colours are mirrored as CSS variables in src/app/globals.css — keep both in sync.
 * Contact details live in src/config/business.ts (single source of NAP data).
 */
export const brandConfig = {
  name: "Tricity Ride",
  tagline: "Reliable outstation cabs from Chandigarh Tricity",
  description:
    "Pre-booked outstation taxis and airport transfers from Chandigarh, Mohali and Zirakpur. One-way and round-trip cabs with a confirmed quote and WhatsApp support.",
  geography: {
    label: "Chandigarh • Mohali • Zirakpur",
    region: "Chandigarh Tricity",
  },
  colors: {
    primary: "#123B5D",
    secondary: "#0F8B8D",
    accent: "#F4B942",
    background: "#F8FAFC",
    text: "#17202A",
    whatsapp: "#128C7E",
  },
  typography: {
    family: "Poppins",
    weights: [400, 500, 600, 700] as const,
  },
  /** Words the brand deliberately never uses in copy. Checked in verification. */
  bannedClaims: [
    "verified driver",
    "background-checked",
    "guaranteed vehicle",
    "guaranteed availability",
    "24/7",
    "government approved",
    "certified",
    "licensed aggregator",
    "cheapest",
    "lowest price",
    "best price",
    "#1",
  ],
} as const;

export type BrandConfig = typeof brandConfig;
