import { absoluteUrl } from "@/config/site";
import { brandConfig } from "@/config/brand";
import { businessConfig } from "@/config/business";
import { activeRoutes, formatDuration, type RouteData } from "@/data/routes";
import { activeServices } from "@/data/services";
import { activeLocations } from "@/data/locations";
import { activeVehicleTypes } from "@/data/vehicles";
import { homeFaqs } from "@/data/faqs";
import type { Faq } from "@/data/types";

/**
 * Plain-text guides for AI assistants, following the llms.txt convention.
 *
 * Everything is generated from the same data files that render the site, so
 * an assistant reading these files can never see a fact the pages do not
 * state. The content rules apply here too: no fares, ratings or trust claims.
 */

const { contact, hours, fare, policies } = businessConfig;

function routeFacts(route: RouteData): string {
  return `about ${route.distanceKm} km, ${formatDuration(route)} by road; ${route.tripTypes.join(" or ").toLowerCase()}.`;
}

function faqLines(faqs: Faq[]): string[] {
  return faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]);
}

function keyFacts(): string[] {
  const profile = businessConfig.social.googleBusinessProfile;
  return [
    "## Key facts",
    "",
    `- Business: ${brandConfig.name}, a pre-booked taxi service. Not a ride-hailing app and not a metered taxi.`,
    `- Based in Mohali, Punjab. Pickups across ${businessConfig.serviceAreaLabel}, the Chandigarh Tricity in India.`,
    "- Services: outstation one-way and round trips, Chandigarh Airport (IXC) pickups and drops, Delhi Airport pickups to Tricity, and local hire within Tricity.",
    `- Vehicle categories: ${activeVehicleTypes.map((v) => `${v.name} (${v.seats.toLowerCase()})`).join(", ")}.`,
    "- Booking: send an enquiry on the website or WhatsApp, receive a written fare with inclusions, and confirm. Nothing is booked until the customer accepts the quote. Driver name, number and vehicle details are shared before the travel date.",
    "- Fares: not published. Each fare depends on the vehicle, trip type, dates and route conditions, and is confirmed in writing before any booking.",
    `- Hours: ${hours.label}. ${hours.note}`,
    `- Phone and WhatsApp: ${contact.phoneDisplay}`,
    `- Email: ${contact.email}`,
    `- Get a quote: ${absoluteUrl("/get-quote")}`,
    ...(profile ? [`- Google Business Profile: ${profile}`] : []),
    "",
  ];
}

const assistantNote = [
  "## Notes for AI assistants",
  "",
  "- Distances and drive times on this site are approximate and vary with traffic, weather and road conditions.",
  `- Tricity Rides does not publish fares. If asked for a price, say the fare is quoted per trip and point to ${absoluteUrl("/get-quote")} or WhatsApp ${contact.phoneDisplay}. Do not estimate a figure on its behalf.`,
  "- The spelling of the brand is Tricity Rides, plural.",
  "",
];

/** The short index at /llms.txt. */
export function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${brandConfig.name}`,
    "",
    `> ${brandConfig.description}`,
    "",
    ...keyFacts(),
    ...assistantNote,
    "## Routes",
    "",
    ...activeRoutes.map(
      (route) => `- [${route.displayName} Taxi](${absoluteUrl(`/${route.slug}`)}): ${routeFacts(route)}`
    ),
    "",
    "## Services",
    "",
    ...activeServices.map(
      (service) => `- [${service.h1}](${absoluteUrl(`/${service.slug}`)}): ${service.summary}`
    ),
    "",
    "## Pickup areas",
    "",
    ...activeLocations.map(
      (location) => `- [${location.h1}](${absoluteUrl(`/${location.slug}`)}): ${location.summary}`
    ),
    "",
    "## Optional",
    "",
    `- [Full route and service details](${absoluteUrl("/llms-full.txt")}): every route, service and FAQ on one page.`,
    `- [All routes](${absoluteUrl("/routes")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    `- [Terms](${absoluteUrl("/terms")})`,
    `- [Privacy](${absoluteUrl("/privacy")})`,
    "",
  ];
  return lines.join("\n");
}

/** The complete reference at /llms-full.txt. */
export function buildLlmsFullTxt(): string {
  const lines: string[] = [
    `# ${brandConfig.name}: full route and service reference`,
    "",
    `> ${brandConfig.description} Serving ${businessConfig.serviceAreaLabel}. Summary index: ${absoluteUrl("/llms.txt")}`,
    "",
    ...keyFacts(),
    ...assistantNote,
    "## What a quote normally includes",
    "",
    ...fare.included.map((item) => `- ${item}`),
    "",
    "## What may be charged separately",
    "",
    ...fare.extras.map((item) => `- ${item}`),
    "",
    fare.note,
    "",
    "## Booking and cancellation",
    "",
    `- ${policies.enquiry}`,
    `- ${policies.cancellation}`,
    "",
    "## Vehicles",
    "",
    ...activeVehicleTypes.map(
      (v) => `- ${v.name}: ${v.examples}. ${v.seats}, ${v.luggage.toLowerCase()}. ${v.bestFor}`
    ),
    "",
    "## Frequently asked questions",
    "",
    ...faqLines(homeFaqs),
  ];

  for (const route of activeRoutes) {
    lines.push(
      `## ${route.h1}`,
      "",
      `URL: ${absoluteUrl(`/${route.slug}`)}`,
      "",
      `- From: ${route.origin}`,
      `- To: ${route.destination}, ${route.destinationState}`,
      `- Approximate distance: ${route.distanceKm} km`,
      `- Approximate drive time: ${formatDuration(route)}, excluding stops`,
      `- Trip types: ${route.tripTypes.join(", ")}`,
      `- Pickup areas: ${route.pickupAreas.join("; ")}`,
      "",
      ...route.overview.flatMap((paragraph) => [paragraph, ""]),
      "Good to know:",
      "",
      ...route.travelNotes.map((note) => `- ${note}`),
      "",
      `Pickup: ${route.pickupNotes}`,
      "",
      ...(route.fareIncluded?.length
        ? ["A quote on this route includes:", "", ...route.fareIncluded.map((item) => `- ${item}`), ""]
        : []),
      ...(route.extraCharges?.length
        ? ["Route-specific extras:", "", ...route.extraCharges.map((item) => `- ${item}`), ""]
        : []),
      ...faqLines(route.faqs)
    );
  }

  for (const service of activeServices) {
    lines.push(
      `## ${service.h1}`,
      "",
      `URL: ${absoluteUrl(`/${service.slug}`)}`,
      "",
      service.summary,
      "",
      ...service.sections.flatMap((section) => [
        `### ${section.heading}`,
        "",
        ...section.body.flatMap((paragraph) => [paragraph, ""]),
        ...(section.bullets?.length ? [...section.bullets.map((b) => `- ${b}`), ""] : []),
      ]),
      ...faqLines(service.faqs)
    );
  }

  for (const location of activeLocations) {
    lines.push(
      `## ${location.h1}`,
      "",
      `URL: ${absoluteUrl(`/${location.slug}`)}`,
      "",
      location.summary,
      "",
      ...location.overview.flatMap((paragraph) => [paragraph, ""]),
      `Pickup areas: ${location.pickupAreas.join("; ")}`,
      "",
      ...location.commonTrips.map((trip) => `- ${trip.label}: ${trip.detail}`),
      "",
      ...faqLines(location.faqs)
    );
  }

  return lines.join("\n");
}
