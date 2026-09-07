import type { StaticImageData } from "next/image";

import chandigarhAirportPhoto from "@/assets/images/chandigarh_airport.webp";
import chandigarhPhoto from "@/assets/images/chandigarh.webp";
import familySuvPhoto from "@/assets/images/indian_family_suv.webp";
import onwardJourneyPhoto from "@/assets/images/narkanda.webp";
import sedanPhoto from "@/assets/images/sedan_hero.webp";

/**
 * Hero photography for service pages. Every active service has one; a page
 * without an entry falls back to the drawn scene, so adding a photo here is the
 * only step needed to use one.
 */
interface ServiceHeroImage {
  src: StaticImageData;
  alt: string;
  /** CSS object-position, for photos whose subject is off-centre. */
  position?: string;
}

const SERVICE_HERO_IMAGES: Record<string, ServiceHeroImage> = {
  "chandigarh-airport-taxi": {
    src: chandigarhAirportPhoto,
    alt: "A driver waiting beside a white taxi outside an airport terminal as two travellers arrive with suitcases",
  },
  "outstation-taxi-chandigarh": {
    src: sedanPhoto,
    alt: "A white sedan taxi on a hill road, with forested ridges falling away into the valley behind it",
  },
  "round-trip-taxi-chandigarh": {
    src: familySuvPhoto,
    alt: "A family loading suitcases into an SUV at a mountain viewpoint, with snow-capped peaks behind",
  },
  "local-taxi-chandigarh": {
    src: chandigarhPhoto,
    alt: "The Open Hand Monument at the Capitol Complex in Chandigarh, with the gardens and the Shivalik hills behind it",
    // The monument sits right of centre in the frame; without this the crop
    // lands on the tree canopy and the hero reads as a flat dark panel.
    position: "78% 38%",
  },
  "one-way-taxi-chandigarh": {
    // A car heading away from the camera reads as a single-direction drop.
    src: onwardJourneyPhoto,
    alt: "A white taxi driving away along a curving hill road lined with deodars, with snow-capped peaks on the horizon",
    // Lifts the crop onto the ridgeline; the default lands in dark forest.
    position: "58% 30%",
  },
};

export function serviceHeroImage(slug: string) {
  return SERVICE_HERO_IMAGES[slug];
}
