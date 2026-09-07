/**
 * Vehicle categories offered for enquiries.
 * These are categories, not a live fleet inventory. Availability is confirmed
 * per enquiry, so nothing here promises a specific car or registration.
 */
import type { StaticImageData } from "next/image";

import hatchbackPhoto from "@/assets/vehicle_images/hatchback.webp";
// sedan.webp ships on a light-grey studio background while the other four are
// on white; sedan_on_white.webp is that same shot with the grey flood-filled
// to white so one card does not show a grey box. The original is untouched.
import sedanPhoto from "@/assets/vehicle_images/sedan_on_white.webp";
import suvPhoto from "@/assets/vehicle_images/brezza_suv.webp";
import premiumSuvPhoto from "@/assets/vehicle_images/suv_premium.webp";
import tempoTravellerPhoto from "@/assets/vehicle_images/Tempo_traveller.webp";

export type VehicleSlug =
  | "hatchback"
  | "sedan"
  | "suv"
  | "premium-suv"
  | "tempo-traveller";

export interface VehicleType {
  slug: VehicleSlug;
  /** Value stored on the lead and shown in the WhatsApp message. */
  value: string;
  name: string;
  examples: string;
  seats: string;
  luggage: string;
  /** Numeric capacities for the icon row on vehicle cards. */
  seatCount: number;
  luggageCount: number;
  /** Representative photo of the category. The category is what is booked,
   *  not this exact car — `examples` carries the "or similar" wording. */
  image: { src: StaticImageData; alt: string };
  bestFor: string;
  active: boolean;
}

export const vehicleTypes: VehicleType[] = [
  {
    slug: "hatchback",
    value: "Hatchback",
    name: "Hatchback",
    examples: "WagonR, Celerio or similar",
    seats: "Up to 4 passengers",
    luggage: "1-2 small suitcases",
    seatCount: 4,
    luggageCount: 2,
    image: { src: hatchbackPhoto, alt: "A white WagonR hatchback, front three-quarter view" },
    bestFor:
      "Solo travellers and couples on airport runs and city trips. The most economical option when luggage is light and the distance is short.",
    active: true,
  },
  {
    slug: "sedan",
    value: "Sedan",
    name: "Sedan",
    examples: "Swift Dzire, Etios or similar",
    seats: "Up to 4 passengers",
    luggage: "2 medium suitcases",
    seatCount: 4,
    luggageCount: 2,
    image: { src: sedanPhoto, alt: "A white Dzire Tour S sedan with a yellow commercial number plate, front three-quarter view" },
    bestFor:
      "Couples, small families and airport runs where luggage is light. The most economical option on long highway routes.",
    active: true,
  },
  {
    slug: "suv",
    value: "SUV",
    name: "SUV",
    examples: "Ertiga, Innova or similar",
    seats: "Up to 6 passengers",
    luggage: "3-4 suitcases",
    seatCount: 6,
    luggageCount: 4,
    image: { src: suvPhoto, alt: "A white Brezza compact SUV with roof rails, front three-quarter view" },
    bestFor:
      "Families and groups heading to the hills. More cabin space and better comfort on climbs such as Kalka–Solan or Mandi–Kullu.",
    active: true,
  },
  {
    slug: "premium-suv",
    value: "Premium SUV",
    name: "Premium SUV",
    examples: "Innova Crysta or similar",
    seats: "Up to 6 passengers",
    luggage: "4 suitcases",
    seatCount: 6,
    luggageCount: 4,
    image: { src: premiumSuvPhoto, alt: "A silver Innova HyCross, front three-quarter view" },
    bestFor:
      "Longer journeys, corporate travel and guests who want the most comfortable ride on multi-day trips.",
    active: true,
  },
  {
    slug: "tempo-traveller",
    value: "Tempo Traveller",
    name: "Tempo Traveller",
    examples: "12 to 17 seater",
    seats: "9-16 passengers",
    luggage: "Roof carrier available on request",
    seatCount: 16,
    luggageCount: 10,
    image: { src: tempoTravellerPhoto, alt: "A white Force Traveller minibus, front three-quarter view" },
    bestFor:
      "Large family groups, wedding parties and office outings travelling together in one vehicle.",
    active: true,
  },
];

export const activeVehicleTypes = vehicleTypes.filter((v) => v.active);

export function getVehicleBySlug(slug: string): VehicleType | undefined {
  return vehicleTypes.find((v) => v.slug === slug);
}

/** Values accepted by the lead form and API. */
export const vehicleValues = vehicleTypes.map((v) => v.value) as [string, ...string[]];
