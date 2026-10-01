import type { StaticImageData } from "next/image";

import type { BasePage, PrefillHint } from "@/data/types";
import type { VehicleSlug } from "@/data/vehicles";
import type { RouteMotif } from "@/components/art/RouteArt";

import shimlaPhoto from "@/assets/images/shimla.webp";
import manaliPhoto from "@/assets/images/manali.webp";
import delhiPhoto from "@/assets/images/india_gate_delhi.webp";
import amritsarPhoto from "@/assets/images/amritsar.webp";
import dharamshalaPhoto from "@/assets/images/dharamshala.webp";
import dehradunPhoto from "@/assets/images/dehradun.webp";
import haridwarPhoto from "@/assets/images/haridwar.webp";
import rishikeshPhoto from "@/assets/images/rishikesh.webp";
import jaipurPhoto from "@/assets/images/jaipur.webp";
import kasauliPhoto from "@/assets/images/kasauli.webp";
import kufriPhoto from "@/assets/images/kufri.webp";
import dalhousiePhoto from "@/assets/images/dalhausie.webp";
import palampurPhoto from "@/assets/images/palampur.webp";
import chambaPhoto from "@/assets/images/chamba.webp";
import mussooriePhoto from "@/assets/images/mussoorie.webp";

export interface RouteData extends BasePage {
  origin: string;
  destination: string;
  destinationState: string;
  displayName: string;
  /** Approximate road distance in km. Always presented as approximate. */
  distanceKm: number;
  /** Approximate driving time range in hours, excluding breaks. */
  durationHours: { min: number; max: number };
  tripTypes: Array<"One-way" | "Round-trip">;
  vehicleSlugs: VehicleSlug[];
  /** Areas we pick up from for this route. */
  pickupAreas: string[];
  /** Route-specific body copy. Each paragraph must be unique to this route. */
  overview: string[];
  /** Short factual bullets shown as chips/cards. */
  highlights: string[];
  /** Practical travel considerations specific to this road and destination. */
  travelNotes: string[];
  /** Route-specific pickup guidance. */
  pickupNotes: string;
  /** Optional route-specific additions to the standard inclusions/extras. */
  extraCharges?: string[];
  /**
   * Replaces the standard inclusions where they do not describe the trip, e.g.
   * a route that starts outside Tricity, so the fare block never misstates it.
   */
  fareIncluded?: string[];
  relatedSlugs: string[];
  /** Fallback scene, drawn in the brand palette, for routes without a photo. */
  motif: RouteMotif;
  /**
   * Destination photograph. Where present it replaces the drawn scene on cards
   * and in the page hero. Alt text must describe what the photo actually shows.
   */
  image?: { src: StaticImageData; alt: string };
  /**
   * Commercially approved starting fare. Left undefined on purpose — no rupee
   * amount is rendered anywhere while businessConfig.pricing.showStartingFares is false.
   */
  indicativeFare?: { sedan?: number; suv?: number };
  prefill: PrefillHint;
}

export const routes: RouteData[] = [
  // ---------------------------------------------------------------- Shimla
  {
    slug: "chandigarh-to-shimla-taxi",
    image: { src: shimlaPhoto, alt: "The Shimla ridge, with Christ Church rising above cedar-covered hillsides and the valley beyond" },
    motif: "hill-town",
    origin: "Chandigarh",
    destination: "Shimla",
    destinationState: "Himachal Pradesh",
    displayName: "Chandigarh to Shimla",
    h1: "Chandigarh to Shimla Taxi",
    heroSubtitle: "One-way and round-trip private cabs, with pickup from Chandigarh, Mohali or Zirakpur.",
    distanceKm: 115,
    durationHours: { min: 3.5, max: 4.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
      "Chandigarh Railway Station",
      "ISBT Sector 43 and ISBT 17",
    ],
    overview: [
      "The Chandigarh to Shimla drive runs about 115 km along NH-5 through Zirakpur, Panchkula, Pinjore, Kalka, Parwanoo, Solan and Kandaghat. Most journeys take roughly three and a half to four and a half hours, and the climb effectively begins at Parwanoo where the road enters Himachal Pradesh.",
      "The Kalka to Solan section is the part that decides your travel time. It is a hill road with ongoing four-laning work in stretches, so a weekday morning run is usually smoother than a Friday evening or a long-weekend departure. Drivers who know this road plan the tea break at Dharampur or Barog rather than stopping in the middle of the climb.",
      "For a one-way drop we quote the journey in a single direction. For a round trip the same vehicle and driver stay with you, which is the practical choice if you also want to visit Kufri, Naldehra or Chail while you are there.",
    ],
    highlights: [
      "About 115 km on NH-5 via Kalka, Parwanoo and Solan",
      "Typical drive time 3.5–4.5 hours excluding breaks",
      "Early-morning departures avoid the Kalka–Solan build-up",
      "Sedan, SUV, premium SUV and tempo traveller options",
    ],
    travelNotes: [
      "Shimla restricts vehicle movement around the Mall Road and Ridge area. Taxis usually drop at Old Bus Stand, Victory Tunnel or the lift area, and your hotel may be a short walk or porter ride from there.",
      "Parking in Shimla is limited and paid. If you keep the cab for local sightseeing, we account for parking in the quote.",
      "Himachal Pradesh entry formalities are handled at the Parwanoo barrier. Whether the state entry tax is inside your fare or paid on actuals is stated in your quote.",
      "In winter, snow near Kufri and Fagu can close or slow the higher roads. We confirm road conditions with drivers on the route before a winter departure.",
    ],
    pickupNotes:
      "Pickup is from your address in Chandigarh, Mohali, Zirakpur or Panchkula. If you are landing at Chandigarh Airport, share the flight number when you enquire so the pickup time matches your arrival. A Mohali to Shimla, Zirakpur to Shimla or Panchkula to Shimla trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Shimla from Chandigarh?",
        answer:
          "About 115 km, usually three and a half to four and a half hours excluding meal stops. Traffic on the Kalka–Solan climb and the weekend rush are the main reasons a trip runs longer.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Shimla?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "How much does a Chandigarh to Shimla taxi cost?",
        answer:
          "The fare depends on the vehicle, the date and whether you need one-way or round-trip. Send us your trip details and we confirm the fare and vehicle in writing before you book, so there is no guesswork on the day.",
      },
      {
        question: "Can I book a one-way taxi from Chandigarh to Shimla?",
        answer:
          "Yes. One-way drops are the most common request on this route and are quoted as a single-direction journey.",
      },
      {
        question: "Can I be picked up from Mohali or Zirakpur instead of Chandigarh?",
        answer:
          "Yes. Mohali, Kharar, Zirakpur and Panchkula pickups are all on the way to the highway, and there is no separate booking to make.",
      },
      {
        question: "Are tolls and Himachal entry tax included in the fare?",
        answer:
          "We tell you before you confirm. Some quotes include tolls and state entry tax, others show them as actuals paid on the route. Whichever applies to your trip is written into your quote.",
      },
      {
        question: "Can the taxi pick me up from Chandigarh Airport for Shimla?",
        answer:
          "Yes. Share your flight number with the enquiry and the driver plans the pickup around your actual arrival time.",
      },
      {
        question: "Can I keep the cab for local sightseeing in Shimla?",
        answer:
          "Yes, on a round trip. Tell us the places you want to cover, such as Kufri, Chail or Naldehra, and the itinerary is priced into the quote.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-kasauli-taxi",
      "chandigarh-to-manali-taxi",
      "chandigarh-to-dharamshala-taxi",
    ],
    seo: {
      title: "Chandigarh to Shimla Taxi | One-Way Cabs",
      description:
        "Book a Chandigarh to Shimla taxi, one-way or round-trip. About 115 km, pickup across Tricity, fare confirmed in writing before you book.",
    },
    active: true,
    priority: 1,
    prefill: { pickup: "Chandigarh", destination: "Shimla" },
  },

  // ---------------------------------------------------------------- Manali
  {
    slug: "chandigarh-to-manali-taxi",
    image: { src: manaliPhoto, alt: "The Beas river running below the road into Manali, with snow-capped peaks at the head of the valley" },
    motif: "snow-peaks",
    origin: "Chandigarh",
    destination: "Manali",
    destinationState: "Himachal Pradesh",
    displayName: "Chandigarh to Manali",
    h1: "Chandigarh to Manali Taxi",
    heroSubtitle: "Private cabs for the full Kullu valley run, including overnight departures.",
    distanceKm: 310,
    durationHours: { min: 8, max: 9.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
      "Chandigarh Railway Station",
    ],
    overview: [
      "Manali is about 310 km from Chandigarh and the drive normally takes eight to nine and a half hours with breaks. The road runs through Kharar, Kiratpur Sahib, Bilaspur, Sundernagar and Mandi, then follows the Beas through the Aut tunnel into the Kullu valley.",
      "The Kiratpur to Nerchowk four-lane with its tunnels has taken a large bite out of the old travel time, so the slower section is now Mandi to Kullu, which is a river-side road that narrows in places. This is a long day behind the wheel, which is why a rested driver and a comfortable vehicle matter more on this route than on any other from Tricity.",
      "Many travellers pick a late-night departure from Chandigarh, around 10 or 11 PM, and reach Manali by morning. Others prefer an early-morning start to drive the valley in daylight. We will tell you which suits your plans when you share your dates.",
    ],
    highlights: [
      "About 310 km via Bilaspur, Mandi and the Aut tunnel",
      "Typical drive time 8–9.5 hours with breaks",
      "Overnight and early-morning departures both available",
      "SUV or tempo traveller recommended for groups and luggage",
    ],
    travelNotes: [
      "During the monsoon the Mandi–Kullu stretch is the one to watch, as landslides and slow-moving traffic can add hours. We check conditions with drivers on the route before departure.",
      "Atal Tunnel to Sissu does not need a Rohtang permit, but the Rohtang Pass road itself does, and permits are limited. If you want either, tell us in advance so the driver can plan it.",
      "Solang Valley and Sissu are common day trips from Manali and are quoted as additional running, not as part of the arrival journey.",
      "In winter the road beyond Manali may be closed or restricted to certain vehicles. Snow chains and road status are checked before any Gulaba or Solang plan.",
    ],
    pickupNotes:
      "Because of the length of this drive, we fix the pickup time carefully. Overnight departures are picked up from your address in Chandigarh, Mohali, Zirakpur or Panchkula. A Mohali to Manali, Zirakpur to Manali or Panchkula to Manali trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Manali from Chandigarh?",
        answer:
          "About 310 km, usually eight to nine and a half hours including short breaks. Monsoon conditions between Mandi and Kullu are the most common reason for a longer run.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Manali?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Is an overnight Chandigarh to Manali taxi possible?",
        answer:
          "Yes. A departure around 10 to 11 PM typically reaches Manali by morning, which is why it is a popular choice for travellers who want a full first day in the valley.",
      },
      {
        question: "What does a Chandigarh to Manali cab cost?",
        answer:
          "It depends on vehicle, season and whether you need a drop or a round trip with the vehicle staying with you. We send a confirmed fare with the inclusions written out before you book.",
      },
      {
        question: "Which vehicle is best for Chandigarh to Manali?",
        answer:
          "For four or more passengers with luggage, an SUV or premium SUV is the comfortable choice on a drive this long. Larger groups usually take a tempo traveller.",
      },
      {
        question: "Can the taxi take us to Solang Valley or the Atal Tunnel?",
        answer:
          "Yes, on a round trip. These are quoted as additional local running in Manali. Rohtang Pass needs a permit, so tell us early if it is on your list.",
      },
      {
        question: "Can I book this taxi from Mohali or Zirakpur?",
        answer:
          "Yes. Both are on the way out of Tricity towards Kharar and Kiratpur, so pickup there does not change the route.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-dharamshala-taxi",
      "chandigarh-to-delhi-taxi",
    ],
    seo: {
      title: "Chandigarh to Manali Taxi | Round-Trip",
      description:
        "Book a Chandigarh to Manali taxi, one-way or round-trip, including overnight departures. Pickup across Tricity with a confirmed fare.",
    },
    active: true,
    priority: 2,
    prefill: { pickup: "Chandigarh", destination: "Manali" },
  },

  // ----------------------------------------------------------------- Delhi
  {
    slug: "chandigarh-to-delhi-taxi",
    image: { src: delhiPhoto, alt: "India Gate in New Delhi at sunset, seen across the surrounding lawns" },
    motif: "monument",
    origin: "Chandigarh",
    destination: "Delhi",
    destinationState: "Delhi NCR",
    displayName: "Chandigarh to Delhi",
    h1: "Chandigarh to Delhi Taxi",
    heroSubtitle: "Highway drops to Delhi, Gurugram, Noida and IGI Airport terminals.",
    distanceKm: 250,
    durationHours: { min: 4.5, max: 6 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
      "Chandigarh Railway Station",
    ],
    overview: [
      "Chandigarh to Delhi is about 250 km on NH-44 through Ambala, Karnal, Panipat and Sonipat. On a clear run it takes four and a half to five hours, and five to six is realistic if you are heading into central Delhi, Gurugram or Noida during peak hours.",
      "This is the route where departure time matters most. Reaching the Delhi border before the morning build-up, or after the evening one, can save an hour. If you are catching a flight, we work backwards from your check-in time rather than from the distance.",
      "Airport drops are a large share of this route. Tell us the terminal, T1, T2 or T3, along with your flight time, and the driver plans the run and the terminal entry accordingly.",
    ],
    highlights: [
      "About 250 km on NH-44 via Ambala, Karnal and Panipat",
      "Typical drive time 4.5–6 hours depending on the Delhi entry point",
      "IGI Airport drops planned around your flight time",
      "Corporate and family travel, one-way or return the same day",
    ],
    travelNotes: [
      "Traffic between Panipat and the Delhi border is the usual variable. For an early flight we build in a buffer rather than assuming a clear highway.",
      "Murthal is the standard meal stop on this route and adds roughly thirty to forty minutes if you want it.",
      "For Gurugram and Noida drops the effective travel time is longer than for north Delhi, so we quote by your actual drop address, not by the city name.",
      "Same-day returns are possible, and are quoted as a round trip so the same vehicle waits for you.",
    ],
    pickupNotes:
      "Pickup from anywhere in Chandigarh, Mohali, Zirakpur or Panchkula. For flights out of Delhi we suggest a pickup time that keeps a buffer for highway traffic. A Mohali to Delhi, Zirakpur to Delhi or Panchkula to Delhi trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Delhi from Chandigarh?",
        answer:
          "About 250 km, usually four and a half to five hours for the highway run, and up to six for central Delhi, Gurugram or Noida in peak traffic.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Delhi?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can the taxi drop me at Delhi IGI Airport?",
        answer:
          "Yes. Share your terminal and flight time when you enquire so the pickup is planned backwards from check-in rather than from the distance alone.",
      },
      {
        question: "What is the fare for a Chandigarh to Delhi cab?",
        answer:
          "It depends on vehicle and whether it is a one-way drop or a return. We send a confirmed fare with the inclusions before you book.",
      },
      {
        question: "Is a one-way drop to Delhi cheaper than a round trip?",
        answer:
          "They are priced differently because a round trip keeps the vehicle and driver with you. We quote both if you are not sure which suits your plans.",
      },
      {
        question: "Can I book a Delhi taxi from Mohali or Zirakpur?",
        answer:
          "Yes. Zirakpur in particular is already on the Ambala highway, so pickup there is straightforward.",
      },
      {
        question: "Can we stop at Murthal on the way?",
        answer:
          "Yes. It is the usual meal stop on this route. Allow roughly thirty to forty minutes for it.",
      },
    ],
    relatedSlugs: [
      "delhi-airport-to-chandigarh-taxi",
      "chandigarh-to-jaipur-taxi",
      "chandigarh-to-amritsar-taxi",
    ],
    seo: {
      title: "Chandigarh to Delhi Taxi | One-Way Drops",
      description:
        "Book a Chandigarh to Delhi taxi for a one-way drop or return, including IGI terminal drops. Pickup across Tricity, fare confirmed first.",
    },
    active: true,
    priority: 3,
    prefill: { pickup: "Chandigarh", destination: "Delhi" },
  },

  // -------------------------------------------------------------- Amritsar
  {
    slug: "chandigarh-to-amritsar-taxi",
    image: { src: amritsarPhoto, alt: "The Golden Temple in Amritsar at sunrise, reflected in the sarovar" },
    motif: "golden-temple",
    origin: "Chandigarh",
    destination: "Amritsar",
    destinationState: "Punjab",
    displayName: "Chandigarh to Amritsar",
    h1: "Chandigarh to Amritsar Taxi",
    heroSubtitle: "Golden Temple and Wagah trips, as a drop or a full round trip.",
    distanceKm: 230,
    durationHours: { min: 4.5, max: 5.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Amritsar is roughly 230 km from Chandigarh, normally four and a half to five and a half hours by road. The usual route runs through Kharar and Ludhiana on NH-44, then turns towards Jalandhar and on to Amritsar.",
      "Most enquiries on this route are pilgrimage or family visits built around the Golden Temple, and a large share also want the Wagah border retreat ceremony. Those two have very different timings, which is what shapes the day: the temple is open through the day, while the ceremony is in the late afternoon and needs you to leave Amritsar with time to spare.",
      "A one-day round trip from Chandigarh is possible but long. Many families prefer an overnight stay in Amritsar and a return the next day, which we quote as a two-day round trip with the vehicle staying with you.",
    ],
    highlights: [
      "About 230 km via Ludhiana and Jalandhar",
      "Typical drive time 4.5–5.5 hours",
      "Golden Temple, Jallianwala Bagh and Wagah in one itinerary",
      "One-day round trip or overnight stay, both quoted clearly",
    ],
    travelNotes: [
      "The Wagah retreat ceremony happens in the late afternoon and timings shift with the season. Leaving Amritsar well before the ceremony is the practical part of planning this trip.",
      "Parking near the Golden Temple is busy, particularly on weekends and around festivals. Drivers usually drop close to the entrance and wait at a designated parking area.",
      "Winter fog on the Ludhiana–Jalandhar stretch can slow early-morning departures considerably. In December and January we suggest a later start rather than a pre-dawn one.",
      "If you want to add Anandpur Sahib or Tarn Taran to the itinerary, tell us at the enquiry stage so the extra running is in the quote.",
    ],
    pickupNotes:
      "Pickup from Chandigarh, Mohali, Kharar, Zirakpur or Panchkula. Kharar pickups join the Ludhiana highway almost immediately. A Mohali to Amritsar, Zirakpur to Amritsar or Panchkula to Amritsar trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Amritsar from Chandigarh?",
        answer:
          "About 230 km, usually four and a half to five and a half hours, longer in winter fog on the Ludhiana–Jalandhar section.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Amritsar?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can we do Golden Temple and Wagah in one day from Chandigarh?",
        answer:
          "It is possible but it makes for a long day, since the Wagah ceremony is in the late afternoon and you still have the drive back. Many families prefer an overnight stay and a return the next day.",
      },
      {
        question: "What does a Chandigarh to Amritsar cab cost?",
        answer:
          "The fare depends on the vehicle and whether it is a one-way drop, a same-day return or an overnight round trip. We confirm the fare and inclusions in writing before booking.",
      },
      {
        question: "Can I book a one-way taxi to Amritsar?",
        answer:
          "Yes. One-way drops to Amritsar city or Sri Guru Ram Dass Jee International Airport are both available.",
      },
      {
        question: "Can the cab wait during the Golden Temple visit?",
        answer:
          "Yes, on a round trip. Waiting time is part of the itinerary we quote, so there is no meter running against you while you are inside.",
      },
      {
        question: "Is pickup available from Mohali or Zirakpur?",
        answer:
          "Yes, and the route is the same. Mohali and Kharar pickups reach the Ludhiana highway quickly.",
      },
    ],
    relatedSlugs: [
      "chandigarh-airport-to-amritsar-taxi",
      "chandigarh-to-jalandhar-taxi",
      "chandigarh-to-ludhiana-taxi",
    ],
    seo: {
      title: "Chandigarh to Amritsar & Golden Temple Taxi, ~230 km",
      description:
        "Amritsar and the Golden Temple are about 230 km from Chandigarh, usually 4.5–5.5 hours. Taxi for a drop, same-day return or overnight trip with Wagah, fare confirmed first.",
    },
    active: true,
    priority: 4,
    prefill: { pickup: "Chandigarh", destination: "Amritsar" },
  },

  // ----------------------------------------------------------- Dharamshala
  {
    slug: "chandigarh-to-dharamshala-taxi",
    image: { src: dharamshalaPhoto, alt: "A monastery above Dharamshala with the snow-covered Dhauladhar range behind it" },
    motif: "valley",
    origin: "Chandigarh",
    destination: "Dharamshala",
    destinationState: "Himachal Pradesh",
    displayName: "Chandigarh to Dharamshala",
    h1: "Chandigarh to Dharamshala Taxi",
    heroSubtitle: "Cabs to Dharamshala and McLeod Ganj, with pickup across Tricity.",
    distanceKm: 250,
    durationHours: { min: 5.5, max: 7 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Dharamshala is about 250 km from Chandigarh, typically five and a half to seven hours by road. The common route runs via Kharar and Ropar towards Una and Amb, then climbs through the Kangra valley.",
      "The destination is really two places. Dharamshala town sits lower down, while McLeod Ganj is roughly nine kilometres above it on a steep, narrow road with tight parking. Knowing which one your hotel is in changes the last half hour of the journey, so it is worth telling us at the enquiry stage.",
      "Travellers often combine this trip with Bir Billing, Palampur or the Kangra temples. Those additions are easy on a round trip where the vehicle stays with you, and awkward on a one-way drop.",
    ],
    highlights: [
      "About 250 km via Una and the Kangra valley",
      "Typical drive time 5.5–7 hours",
      "Drops to both Dharamshala town and McLeod Ganj",
      "Bir Billing and Palampur easy to add on a round trip",
    ],
    travelNotes: [
      "The McLeod Ganj road is narrow and steep with limited parking, and it gets congested in peak season. Larger vehicles take longer on this final stretch.",
      "The HPCA stadium area, Bhagsu and Dal Lake are all short local runs from McLeod Ganj and are quoted as local running, not as part of the arrival trip.",
      "Winter brings cold and occasional snow at McLeod Ganj level. Road conditions are checked with drivers before a winter departure.",
      "If your hotel is in upper McLeod Ganj or Dharamkot, the vehicle may not be able to reach the door. We will tell you in advance rather than at drop-off.",
    ],
    pickupNotes:
      "Pickup from Chandigarh, Mohali, Kharar, Zirakpur or Panchkula. Mention whether you are staying in Dharamshala town or McLeod Ganj so the arrival is planned properly. A Mohali to Dharamshala, Zirakpur to Dharamshala or Panchkula to Dharamshala trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Dharamshala from Chandigarh?",
        answer:
          "About 250 km and typically five and a half to seven hours, depending on traffic through Una and the climb into the Kangra valley.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Dharamshala?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can the taxi drop me directly at McLeod Ganj?",
        answer:
          "Yes. McLeod Ganj is roughly nine kilometres above Dharamshala town on a narrow road. If your hotel is in upper McLeod Ganj or Dharamkot, we will tell you in advance how close the vehicle can get.",
      },
      {
        question: "What does a Chandigarh to Dharamshala cab cost?",
        answer:
          "The fare depends on vehicle, dates and trip type. We send a confirmed fare with inclusions written out before you book.",
      },
      {
        question: "Can we add Bir Billing or Palampur to the trip?",
        answer:
          "Yes, most easily on a round trip where the vehicle stays with you. Tell us at the enquiry stage so the extra running is in the quote.",
      },
      {
        question: "Is a one-way drop to Dharamshala available?",
        answer:
          "Yes. One-way drops to Dharamshala, McLeod Ganj or Kangra are all quoted as single-direction journeys.",
      },
      {
        question: "Can I be picked up from Zirakpur or Mohali?",
        answer:
          "Yes. Both are on the way towards Kharar and Ropar, so the route is unchanged.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-manali-taxi",
      "chandigarh-to-amritsar-taxi",
      "chandigarh-to-shimla-taxi",
    ],
    seo: {
      title: "Chandigarh to Dharamshala Taxi",
      description:
        "Book a Chandigarh to Dharamshala or McLeod Ganj taxi, one-way or round-trip. Pickup across Tricity with the fare confirmed before you book.",
    },
    active: true,
    priority: 5,
    prefill: { pickup: "Chandigarh", destination: "Dharamshala" },
  },

  // ------------------------------------------------------------- Dehradun
  {
    slug: "chandigarh-to-dehradun-taxi",
    image: { src: dehradunPhoto, alt: "A Dehradun cityscape with the Himalayas in the background" },
    motif: "valley",
    origin: "Chandigarh",
    destination: "Dehradun",
    destinationState: "Uttarakhand",
    displayName: "Chandigarh to Dehradun",
    h1: "Chandigarh to Dehradun Taxi",
    heroSubtitle: "Direct cabs to Dehradun and Mussoorie from Chandigarh Tricity.",
    distanceKm: 175,
    durationHours: { min: 4, max: 5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Dehradun is around 175 km from Chandigarh and the drive usually takes four to five hours. The common route goes through Ambala, Saharanpur and Chhutmalpur; some drivers prefer the Yamunanagar and Paonta Sahib line depending on the day and the traffic.",
      "It is a mostly flat run compared with the Himachal routes, which makes it one of the easier hill-gateway journeys from Tricity. The climb only really begins if you continue past Dehradun to Mussoorie, which adds roughly another hour and a half over about 35 km.",
      "Because Dehradun is also a school and institution town, we see a steady stream of parent visits and admission trips on this route, often as same-day returns.",
    ],
    highlights: [
      "About 175 km via Ambala and Saharanpur",
      "Typical drive time 4-5 hours",
      "Mussoorie adds roughly 1.5 hours from Dehradun",
      "Same-day returns are practical on this route",
    ],
    travelNotes: [
      "Traffic through Saharanpur town is the usual slow section. A morning departure normally clears it more easily than a midday one.",
      "For Mussoorie, the last stretch is a hill climb with paid parking at the top and restrictions on the Mall Road in peak season.",
      "Jolly Grant Airport is roughly 25 km beyond Dehradun city towards Rishikesh, so an airport drop is quoted separately from a city drop.",
      "Same-day returns to Chandigarh are common on this route and are quoted as a round trip with the vehicle waiting.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Zirakpur and Panchkula pickups join the Ambala road quickly, which helps on early departures. A Mohali to Dehradun, Zirakpur to Dehradun or Panchkula to Dehradun trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Dehradun from Chandigarh?",
        answer:
          "About 175 km, usually four to five hours. Saharanpur town traffic is the most common reason for the longer end of that range.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Dehradun?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can the taxi continue to Mussoorie?",
        answer:
          "Yes. Mussoorie is roughly 35 km above Dehradun and adds about an hour and a half. Tell us at the enquiry stage so it is priced in.",
      },
      {
        question: "What is the fare for a Chandigarh to Dehradun taxi?",
        answer:
          "It depends on the vehicle and whether you need a drop, a same-day return or a multi-day trip. We confirm the fare before you book.",
      },
      {
        question: "Can I get a drop at Jolly Grant Airport?",
        answer:
          "Yes. The airport is about 25 km beyond Dehradun city, so it is quoted as its own drop point rather than as a city drop.",
      },
      {
        question: "Is a same-day return to Chandigarh realistic?",
        answer:
          "Yes, this is one of the routes where a same-day return works comfortably. It is quoted as a round trip so the same vehicle waits for you.",
      },
      {
        question: "Do you pick up from Mohali or Zirakpur for this route?",
        answer:
          "Yes, and Zirakpur is already on the Ambala side of Tricity, which suits early-morning starts.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-haridwar-taxi",
      "chandigarh-to-rishikesh-taxi",
      "chandigarh-to-delhi-taxi",
    ],
    seo: {
      title: "Chandigarh to Dehradun Taxi | Mussoorie",
      description:
        "Book a Chandigarh to Dehradun taxi, with Mussoorie and Jolly Grant Airport drops. Pickup across Tricity and a fare confirmed in writing.",
    },
    active: true,
    priority: 6,
    prefill: { pickup: "Chandigarh", destination: "Dehradun" },
  },

  // -------------------------------------------------------------- Haridwar
  {
    slug: "chandigarh-to-haridwar-taxi",
    image: { src: haridwarPhoto, alt: "A Haridwar cityscape with the Ganga river in the background" },
    motif: "river-ghats",
    origin: "Chandigarh",
    destination: "Haridwar",
    destinationState: "Uttarakhand",
    displayName: "Chandigarh to Haridwar",
    h1: "Chandigarh to Haridwar Taxi",
    heroSubtitle: "Pilgrimage trips to Har Ki Pauri, one-way or with the cab staying with you.",
    distanceKm: 200,
    durationHours: { min: 4.5, max: 5.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Haridwar is about 200 km from Chandigarh, normally four and a half to five and a half hours through Ambala, Yamunanagar, Saharanpur and Roorkee.",
      "Almost every enquiry on this route is planned around the evening Ganga Aarti at Har Ki Pauri, which means the arrival time matters more than the departure time. Leaving Tricity in the morning gives you room for the drive, a rest and the walk to the ghat without rushing.",
      "Haridwar also works as the first leg of a longer trip. Rishikesh is roughly 25 km further, and many families combine the two, sometimes continuing towards Dehradun or Mussoorie on a multi-day round trip.",
    ],
    highlights: [
      "About 200 km via Yamunanagar, Saharanpur and Roorkee",
      "Typical drive time 4.5–5.5 hours",
      "Planned around the evening Ganga Aarti timing",
      "Easy to combine with Rishikesh on the same trip",
    ],
    travelNotes: [
      "Vehicle access near Har Ki Pauri is restricted, especially in the evening. Drivers drop at the nearest permitted point and the last stretch is on foot or by local transport.",
      "During Kanwar season and major festivals, traffic and route restrictions around Haridwar change significantly and journeys take much longer. We flag this when your dates fall in that period.",
      "Mansa Devi and Chandi Devi involve ropeways with their own queues, so allow time if they are on your list.",
      "If you plan to continue to Rishikesh, keeping the same vehicle on a round trip is simpler than arranging local transport there.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Morning departures work best if you want to reach in time for the evening aarti without a rushed drive. A Mohali to Haridwar, Zirakpur to Haridwar or Panchkula to Haridwar trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Haridwar from Chandigarh?",
        answer:
          "About 200 km and typically four and a half to five and a half hours, longer during Kanwar season and major festival periods.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Haridwar?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can the taxi drop me near Har Ki Pauri?",
        answer:
          "The vehicle drops at the nearest permitted point, since access close to the ghat is restricted, particularly around aarti time. The last stretch is a short walk or local ride.",
      },
      {
        question: "What does a Chandigarh to Haridwar cab cost?",
        answer:
          "The fare depends on the vehicle, the dates and whether you want a drop or a round trip. We confirm it in writing before booking.",
      },
      {
        question: "Can we visit Rishikesh on the same trip?",
        answer:
          "Yes. Rishikesh is roughly 25 km further and is commonly combined with Haridwar on a round trip where the vehicle stays with you.",
      },
      {
        question: "Should we leave in the morning for the evening aarti?",
        answer:
          "A morning departure is the comfortable choice. It leaves time for the drive, a rest and the walk to the ghat without rushing the last hour.",
      },
      {
        question: "Is pickup available from Panchkula or Zirakpur?",
        answer:
          "Yes. Both are on the Ambala side of Tricity, which suits this route well.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-rishikesh-taxi",
      "chandigarh-to-dehradun-taxi",
      "outstation-taxi-chandigarh",
    ],
    seo: {
      title: "Chandigarh to Haridwar Taxi | Ganga Aarti",
      description:
        "Book a Chandigarh to Haridwar taxi planned around the evening Ganga Aarti. One-way or round-trip, pickup across Tricity, confirmed quote from Tricity Rides.",
    },
    active: true,
    priority: 7,
    prefill: { pickup: "Chandigarh", destination: "Haridwar" },
  },

  // ------------------------------------------------------------- Rishikesh
  {
    slug: "chandigarh-to-rishikesh-taxi",
    image: { src: rishikeshPhoto, alt: "A Rishikesh cityscape with the Ganga river in the background" },
    motif: "river-ghats",
    origin: "Chandigarh",
    destination: "Rishikesh",
    destinationState: "Uttarakhand",
    displayName: "Chandigarh to Rishikesh",
    h1: "Chandigarh to Rishikesh Taxi",
    heroSubtitle: "Cabs to Tapovan, Laxman Jhula and the Char Dham starting point.",
    distanceKm: 225,
    durationHours: { min: 5, max: 6 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Rishikesh is roughly 225 km from Chandigarh and takes about five to six hours, following the Haridwar route and continuing along the Ganga for the last stretch.",
      "Where you are staying changes the drop. Tapovan and the Laxman Jhula side sit across the river from the main town, and several riverside camps and ashrams are on narrow lanes where large vehicles cannot reach the gate. Sharing the exact hotel or camp name at the enquiry stage avoids a confused arrival.",
      "This is also the assembly point for Char Dham travel and for rafting groups, which typically run from around September to June. Both usually need an early start from Tricity, so we plan the pickup time around the activity rather than the distance.",
    ],
    highlights: [
      "About 225 km, roughly 25 km beyond Haridwar",
      "Typical drive time 5–6 hours",
      "Drops at Tapovan, Laxman Jhula and riverside camps",
      "Common starting point for Char Dham and rafting trips",
    ],
    travelNotes: [
      "Vehicle access around Ram Jhula and Laxman Jhula is limited, and some ashrams and camps are only reachable on foot from the nearest parking.",
      "Rafting season generally runs from around September to June and is suspended in the monsoon months. Plan an early arrival if you have a morning slot booked.",
      "For Char Dham journeys, the vehicle and driver need to be arranged for the whole circuit rather than as a single drop. Tell us the full itinerary when you enquire.",
      "Traffic through Haridwar affects this route too, particularly during festival periods.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. For a morning rafting slot or a Char Dham start, an early departure is usually necessary. A Mohali to Rishikesh, Zirakpur to Rishikesh or Panchkula to Rishikesh trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Rishikesh from Chandigarh?",
        answer:
          "About 225 km, usually five to six hours, following the Haridwar route and continuing along the river.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Rishikesh?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can the cab drop me at a riverside camp or ashram?",
        answer:
          "It drops as close as the lanes allow. Several places near Tapovan and Laxman Jhula are only reachable on foot from the nearest parking, so share the exact name when you enquire.",
      },
      {
        question: "What is the fare for a Chandigarh to Rishikesh cab?",
        answer:
          "It depends on vehicle, dates and trip type. We confirm the fare and inclusions before you book.",
      },
      {
        question: "Can you arrange a cab for the Char Dham journey?",
        answer:
          "Yes, but that is a full-circuit arrangement rather than a single drop. Share the complete itinerary and dates so the vehicle and driver are planned for the whole trip.",
      },
      {
        question: "Can we cover Haridwar and Rishikesh together?",
        answer:
          "Yes, they are about 25 km apart and are commonly done on the same round trip with the vehicle staying with you.",
      },
      {
        question: "Do you pick up from Mohali or Zirakpur for Rishikesh?",
        answer:
          "Yes. Both are on the way towards Ambala and add no detour to the route.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-haridwar-taxi",
      "chandigarh-to-dehradun-taxi",
      "outstation-taxi-chandigarh",
    ],
    seo: {
      title: "Chandigarh to Rishikesh Taxi | Cab Booking",
      description:
        "Book a Chandigarh to Rishikesh taxi for camps, ashrams, rafting or a Char Dham start. Pickup across Tricity and a confirmed quote from Tricity Rides.",
    },
    active: true,
    priority: 8,
    prefill: { pickup: "Chandigarh", destination: "Rishikesh" },
  },

  // ---------------------------------------------------------------- Jaipur
  {
    slug: "chandigarh-to-jaipur-taxi",
    image: { src: jaipurPhoto, alt: "A Jaipur cityscape with the Hawa Mahal in the background" },
    motif: "palace",
    origin: "Chandigarh",
    destination: "Jaipur",
    destinationState: "Rajasthan",
    displayName: "Chandigarh to Jaipur",
    h1: "Chandigarh to Jaipur Taxi",
    heroSubtitle: "Long-distance private cabs to Jaipur, planned as a full-day journey.",
    distanceKm: 520,
    durationHours: { min: 9, max: 11 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Jaipur is around 520 km from Chandigarh, which makes it a full day on the road, usually nine to eleven hours including breaks. The direct line goes down NH-44 to the Delhi area and then onto NH-48 through Gurugram, Behror and Shahpura.",
      "How you handle Delhi is the decision that shapes this trip. Passing near the capital during peak hours can add well over an hour, so departures are typically very early. Some drivers prefer the Rohtak and Rewari side to avoid the worst of it, depending on the day.",
      "Because of the distance, this route is usually booked as a one-way drop or as a multi-day round trip rather than a same-day return. Wedding travel and family visits make up most of the enquiries.",
    ],
    highlights: [
      "About 520 km via the Delhi region and NH-48",
      "Full-day journey, typically 9–11 hours with breaks",
      "Very early departures avoid the worst Delhi-area traffic",
      "Usually booked as a drop or a multi-day round trip",
    ],
    travelNotes: [
      "A same-day return is not practical on this route. Round trips are quoted across multiple days with driver rest built in.",
      "On a drive this long, an SUV or premium SUV is a noticeably more comfortable choice than a sedan.",
      "Multi-day trips include a driver allowance for each day, and this is stated in the quote rather than added later.",
      "If you want to break the journey overnight, tell us and we will plan a sensible stop rather than pushing the whole distance in one day.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity, usually before dawn so the Delhi stretch is crossed before peak traffic. A Mohali to Jaipur, Zirakpur to Jaipur or Panchkula to Jaipur trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Jaipur from Chandigarh?",
        answer:
          "About 520 km, usually nine to eleven hours including breaks. Traffic around the Delhi region is the main variable.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Jaipur?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Is a same-day return to Chandigarh possible?",
        answer:
          "Not practically. The distance makes it a full day each way, so round trips are quoted across multiple days with driver rest included.",
      },
      {
        question: "What does a Chandigarh to Jaipur cab cost?",
        answer:
          "It depends on the vehicle, the number of days and whether it is a drop or a round trip. Multi-day trips include the driver allowance, which is written into the quote.",
      },
      {
        question: "Which vehicle suits this route?",
        answer:
          "For a drive this long, an SUV or premium SUV is considerably more comfortable than a sedan, particularly with luggage and a full car.",
      },
      {
        question: "Can we break the journey overnight?",
        answer:
          "Yes. Tell us when you enquire and we will plan a sensible stop instead of covering the whole distance in a single day.",
      },
      {
        question: "Do you cover other Rajasthan destinations?",
        answer:
          "Send us the itinerary and we will confirm whether we can arrange it and what it involves. We only commit to trips we can actually service.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-delhi-taxi",
      "outstation-taxi-chandigarh",
      "chandigarh-to-amritsar-taxi",
    ],
    seo: {
      title: "Chandigarh to Jaipur Taxi | Multi-Day Cabs",
      description:
        "Book a Chandigarh to Jaipur taxi as a one-way drop or multi-day round trip. Driver allowance stated upfront, fare confirmed before you book.",
    },
    active: true,
    priority: 9,
    prefill: { pickup: "Chandigarh", destination: "Jaipur" },
  },

  // --------------------------------------------------------------- Kasauli
  {
    slug: "chandigarh-to-kasauli-taxi",
    image: { src: kasauliPhoto, alt: "A Kasauli cityscape with the Himalayas in the background" },
    motif: "hill-town",
    origin: "Chandigarh",
    destination: "Kasauli",
    destinationState: "Himachal Pradesh",
    displayName: "Chandigarh to Kasauli",
    h1: "Chandigarh to Kasauli Taxi",
    heroSubtitle: "The short hill run from Tricity, ideal as a day trip or weekend drop.",
    distanceKm: 65,
    durationHours: { min: 1.5, max: 2.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Kasauli is the closest hill destination to Tricity, about 65 km away and usually an hour and a half to two and a half hours by road. The route runs through Zirakpur, Pinjore and Kalka to Parwanoo, then climbs roughly 12 km to the town.",
      "It is small, quiet and a cantonment, which is exactly why people go, and also why the practical details matter. The lanes are narrow, parking is limited and much of the town is best seen on foot along the Upper and Lower Mall.",
      "Its proximity makes it the easiest day trip from Chandigarh in this list. Many families leave after breakfast, spend the day around the Mall, Christ Church and Sunset Point, and return the same evening on a round trip.",
    ],
    highlights: [
      "About 65 km, the shortest hill route from Tricity",
      "Typical drive time 1.5–2.5 hours",
      "Comfortable as a day trip with the cab waiting",
      "Also used as a stop on the way to Shimla",
    ],
    travelNotes: [
      "Kasauli is a cantonment town with narrow roads and limited parking. On weekends the last climb from Parwanoo can be slow.",
      "Most of the town is walkable, so the cab typically parks while you cover the Mall, Christ Church and Sunset Point on foot.",
      "The Gilbert Trail and Monkey Point are popular, though access to some areas is controlled by the cantonment authorities and can change.",
      "Kasauli also works as a short break on the way to Shimla. Tell us if you want it added and it goes into the itinerary.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Zirakpur and Panchkula are closest to the Kalka road, so those pickups reach Kasauli quickest. A Mohali to Kasauli, Zirakpur to Kasauli or Panchkula to Kasauli trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Kasauli from Chandigarh?",
        answer:
          "About 65 km, usually an hour and a half to two and a half hours depending on the weekend traffic on the Parwanoo climb.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Kasauli?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Is a Chandigarh to Kasauli day trip practical?",
        answer:
          "Yes, it is the easiest day trip from Tricity. Leave after breakfast, spend the day in town and return the same evening on a round trip with the cab waiting.",
      },
      {
        question: "What does a Chandigarh to Kasauli cab cost?",
        answer:
          "The fare depends on the vehicle and whether you want a drop or a full day with waiting. We confirm the fare before you book.",
      },
      {
        question: "Can the taxi drive around inside Kasauli?",
        answer:
          "Only partly. It is a cantonment town with narrow lanes and limited parking, and most of the Mall area is best covered on foot while the vehicle waits at a parking area.",
      },
      {
        question: "Can we stop at Kasauli on the way to Shimla?",
        answer:
          "Yes, that is a common combination since Kasauli sits just off the Shimla road above Parwanoo. Mention it when you enquire so it is in the itinerary.",
      },
      {
        question: "Do you pick up from Zirakpur or Panchkula?",
        answer:
          "Yes, and both are closest to the Kalka road, so those pickups reach Kasauli quickest.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-shimla-taxi",
      "outstation-taxi-chandigarh",
      "chandigarh-to-manali-taxi",
    ],
    seo: {
      title: "Chandigarh to Kasauli Taxi | Day Trip Cabs",
      description:
        "Book a Chandigarh to Kasauli taxi as a day trip with waiting or a one-way drop. Pickup from Chandigarh, Mohali, Zirakpur and Panchkula.",
    },
    active: true,
    priority: 10,
    prefill: { pickup: "Chandigarh", destination: "Kasauli" },
  },

  // ----------------------------------------------------------------- Kufri
  {
    slug: "chandigarh-to-kufri-taxi",
    image: {
      src: kufriPhoto,
      alt: "A hill road above Kufri winding past deodar forest, with the snow line on the ridges beyond",
    },
    motif: "snow-peaks",
    origin: "Chandigarh",
    destination: "Kufri",
    destinationState: "Himachal Pradesh",
    displayName: "Chandigarh to Kufri",
    h1: "Chandigarh to Kufri Taxi",
    heroSubtitle:
      "The snow point above Shimla, usually booked as a day out or added to a Shimla trip.",
    distanceKm: 130,
    durationHours: { min: 4, max: 5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Kufri sits about 15 km beyond Shimla on NH-5, roughly 130 km from Tricity in total. The drive follows the Shimla road through Kalka, Solan and Kandaghat, then continues past Shimla town towards Theog.",
      "Almost nobody books Kufri on its own. It is normally the second half of a Shimla trip, or a day where you leave Tricity early, spend the middle of the day at Kufri and Mahasu Peak, and come back down through Shimla in the evening.",
      "It is best known as the closest place to Tricity where you are likely to find snow in winter, which is exactly why it fills up between December and February and on every long weekend.",
    ],
    highlights: [
      "About 130 km, roughly 15 km past Shimla",
      "Typical drive time 4–5 hours each way",
      "Usually combined with Shimla in one trip",
      "The nearest reliable snow point to Tricity in winter",
    ],
    travelNotes: [
      "Vehicles are not allowed all the way up to Mahasu Peak. Cabs park below and the last stretch is covered on foot, on horseback or by the local vehicles that operate there.",
      "In heavy snow the road beyond Shimla can be restricted or closed at short notice, and chains may be required. We will tell you what the road is doing rather than set out and turn back.",
      "Weekends and the winter holidays are genuinely crowded, and the Shimla bypass can add an hour in each direction. An early start makes a real difference.",
      "Most people pair Kufri with Shimla, and often with the Green Valley viewpoint on the way. Tell us the stops you want and they go into the itinerary.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Zirakpur and Panchkula sit closest to the Kalka road, so those pickups reach the hills first. A Mohali to Kufri, Zirakpur to Kufri or Panchkula to Kufri trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Kufri from Chandigarh?",
        answer:
          "About 130 km, usually four to five hours each way. Kufri is roughly 15 km beyond Shimla, so it is the Shimla drive plus a short climb.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Kufri?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can I do Chandigarh to Kufri in a day?",
        answer:
          "Yes, and most people do. Leave Tricity early, spend the middle of the day at Kufri, and return through Shimla the same evening on a round trip with the cab waiting.",
      },
      {
        question: "Will I see snow at Kufri?",
        answer:
          "Snow is most likely between December and February, but it depends on the season and we cannot promise it. We can tell you what the road and weather are doing when you book.",
      },
      {
        question: "Can the taxi go up to Mahasu Peak?",
        answer:
          "No. Private vehicles stop below and the last stretch is done on foot, on horseback or in the local vehicles licensed for it. The cab waits at the parking area.",
      },
      {
        question: "Can we visit Shimla and Kufri on the same trip?",
        answer:
          "Yes, that is the usual booking. Mention it when you enquire and both are written into the itinerary along with any stops you want on the way.",
      },
      {
        question: "What does a Chandigarh to Kufri cab cost?",
        answer:
          "It depends on the vehicle, the season and whether you want a drop or a full day with waiting. We confirm the fare in writing before you book.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-kasauli-taxi",
      "outstation-taxi-chandigarh",
    ],
    seo: {
      title: "Chandigarh to Kufri Distance (~130 km) & Taxi",
      description:
        "Kufri is about 130 km from Chandigarh by road, usually 4–5 hours via Shimla. Day-trip or Shimla taxi, pickup across Tricity, fare confirmed before you book.",
    },
    active: true,
    priority: 11,
    prefill: { pickup: "Chandigarh", destination: "Kufri" },
  },

  // ------------------------------------------------------------- Dalhousie
  {
    slug: "chandigarh-to-dalhousie-taxi",
    image: {
      src: dalhousiePhoto,
      alt: "A colonial-era building among deodars on the road into Dalhousie, with forested ridges falling away behind",
    },
    motif: "hill-town",
    origin: "Chandigarh",
    destination: "Dalhousie",
    destinationState: "Himachal Pradesh",
    displayName: "Chandigarh to Dalhousie",
    h1: "Chandigarh to Dalhousie Taxi",
    heroSubtitle:
      "A long single-day drive to the Chamba-district hill station, usually booked as a multi-day round trip.",
    distanceKm: 320,
    durationHours: { min: 7, max: 8.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Dalhousie is about 320 km from Tricity and usually takes seven to eight and a half hours. The route runs through Ropar, Hoshiarpur and Pathankot on reasonable highway, then climbs the last stretch through Banikhet.",
      "Because most of the distance is plains highway and only the final hour is hill road, the drive is less tiring than the mileage suggests. It is still a full day, so an early departure matters more here than on the shorter hill routes.",
      "The town spreads across five hills and was built as a colonial hill station, which is why it feels more like a set of quiet wooded neighbourhoods than a single high street. Khajjiar, about 22 km further on, is the usual second day.",
    ],
    highlights: [
      "About 320 km, typically 7–8.5 hours",
      "Mostly highway with the climb only in the last hour",
      "Khajjiar is about 22 km further on",
      "Better as a two or three day round trip than a same-day return",
    ],
    travelNotes: [
      "A same-day return is not practical. Seven to eight and a half hours each way makes a fourteen hour minimum on the road, so almost everyone books at least one night.",
      "Multi-day round trips include a driver allowance for the nights away. It is stated in the quote before you confirm rather than added afterwards.",
      "Khajjiar and the Chamba valley are the usual additions. Both are short drives from Dalhousie and are easier to fit in on a second day.",
      "The town is spread across several hills, so a vehicle for local running is genuinely useful once you arrive, unlike a compact town such as Kasauli.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Mohali and Kharar sit closest to the Ropar road and reach the highway soonest, which helps on a long day. A Mohali to Dalhousie, Zirakpur to Dalhousie or Panchkula to Dalhousie trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Dalhousie from Chandigarh?",
        answer:
          "About 320 km, usually seven to eight and a half hours by road via Ropar, Hoshiarpur, Pathankot and Banikhet, excluding stops.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Dalhousie?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can I do Chandigarh to Dalhousie and back in one day?",
        answer:
          "We do not recommend it. It is seven to eight and a half hours each way, so a same-day return means fourteen hours or more on the road. Most people stay at least one night.",
      },
      {
        question: "Can we add Khajjiar to the trip?",
        answer:
          "Yes, it is about 22 km from Dalhousie and is the most common addition, usually on the second day. Mention it when you enquire so it is in the itinerary.",
      },
      {
        question: "Which vehicle suits the Dalhousie route?",
        answer:
          "Most of the distance is highway, so a sedan is comfortable for two or three people. Families and groups usually prefer an SUV for the luggage and the hill section.",
      },
      {
        question: "Is a driver allowance charged for a Dalhousie round trip?",
        answer:
          "Yes, for multi-day round trips. The amount is written into your quote before you confirm, along with everything else that is included.",
      },
      {
        question: "Do you pick up from Chandigarh Airport for Dalhousie?",
        answer:
          "Yes. Airport pickups are standard on this route, and the Mohali side of the Tricity is closest to the road out towards Ropar.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-chamba-taxi",
      "chandigarh-to-dharamshala-taxi",
      "outstation-taxi-chandigarh",
    ],
    seo: {
      title: "Chandigarh to Dalhousie Taxi | Round-Trip",
      description:
        "Book a Chandigarh to Dalhousie taxi, about 320 km via Pathankot. Add Khajjiar, pickup across Tricity, fare confirmed before you book.",
    },
    active: true,
    priority: 12,
    prefill: { pickup: "Chandigarh", destination: "Dalhousie" },
  },

  // -------------------------------------------------------------- Palampur
  {
    slug: "chandigarh-to-palampur-taxi",
    image: {
      src: palampurPhoto,
      alt: "Tea gardens on the slopes below Palampur with the Dhauladhar range rising behind them",
    },
    motif: "valley",
    origin: "Chandigarh",
    destination: "Palampur",
    destinationState: "Himachal Pradesh",
    displayName: "Chandigarh to Palampur",
    h1: "Chandigarh to Palampur Taxi",
    heroSubtitle:
      "The tea-garden town below the Dhauladhar, on the same road as Dharamshala.",
    distanceKm: 255,
    durationHours: { min: 6, max: 7 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Palampur is about 255 km from Tricity, usually six to seven hours by road. The common route runs through Ropar, Una and Hamirpur into the Kangra valley, with the last stretch through Baijnath.",
      "It sits among working tea gardens with the Dhauladhar range directly behind it, which is what most people come for. The town itself is small and the interesting parts are spread through the surrounding valley rather than concentrated on one street.",
      "Because it is about 35 km from Dharamshala, Palampur is often booked as part of a Kangra valley trip rather than on its own, with Bir Billing, Baijnath and Andretta added depending on how many days you have.",
    ],
    highlights: [
      "About 255 km, typically 6–7 hours",
      "Tea gardens with the Dhauladhar range behind",
      "Around 35 km from Dharamshala and McLeod Ganj",
      "Bir Billing is roughly 30 km away",
    ],
    travelNotes: [
      "A same-day return is possible but long, at twelve hours or more of driving. Most people book at least one night, or combine it with Dharamshala over two or three days.",
      "Bir Billing, about 30 km away, is the usual addition for paragliding. Flying depends entirely on the weather and the operators there, which is outside our control.",
      "Baijnath temple is roughly 16 km before Palampur on the same road, so it costs almost nothing to add as a stop.",
      "The valley roads are narrow in places once you leave the main highway. An SUV is more comfortable for a group, though a sedan handles the route without difficulty.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Mohali and Kharar reach the Ropar road quickest, which matters on a six to seven hour drive. A Mohali to Palampur, Zirakpur to Palampur or Panchkula to Palampur trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Palampur from Chandigarh?",
        answer:
          "About 255 km, usually six to seven hours by road through Ropar, Una and Hamirpur into the Kangra valley, excluding stops.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Palampur?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can I visit Palampur and Dharamshala on the same trip?",
        answer:
          "Yes, and it is the usual booking. They are about 35 km apart, so both fit comfortably into a two or three day round trip.",
      },
      {
        question: "Is a Chandigarh to Palampur day trip practical?",
        answer:
          "It is possible but long, with twelve hours or more of driving in a single day. An overnight stay makes the trip far more comfortable.",
      },
      {
        question: "Can we add Bir Billing for paragliding?",
        answer:
          "Yes, it is about 30 km from Palampur. Whether flying happens on the day depends on the weather and the operators there, which is not something we can promise.",
      },
      {
        question: "What does a Chandigarh to Palampur cab cost?",
        answer:
          "It depends on the vehicle, the number of days and whether you want a drop or a round trip. We confirm the fare in writing before you book.",
      },
      {
        question: "Do you pick up from Zirakpur or Mohali for Palampur?",
        answer:
          "Yes. Chandigarh, Mohali, Zirakpur, Kharar and Panchkula pickups are all standard, with no separate arrangement needed.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-dharamshala-taxi",
      "chandigarh-to-dalhousie-taxi",
      "outstation-taxi-chandigarh",
    ],
    seo: {
      title: "Chandigarh to Palampur Taxi | Kangra Valley",
      description:
        "Book a Chandigarh to Palampur taxi, about 255 km via Una and Hamirpur. Combine with Dharamshala, fare confirmed before you book.",
    },
    active: true,
    priority: 13,
    prefill: { pickup: "Chandigarh", destination: "Palampur" },
  },

  // ---------------------------------------------------------------- Chamba
  {
    slug: "chandigarh-to-chamba-taxi",
    image: {
      src: chambaPhoto,
      alt: "The Chamba valley with the Ravi river below and stone temple towers among the town's rooftops",
    },
    motif: "valley",
    origin: "Chandigarh",
    destination: "Chamba",
    destinationState: "Himachal Pradesh",
    displayName: "Chandigarh to Chamba",
    h1: "Chandigarh to Chamba Taxi",
    heroSubtitle:
      "The long run into the Ravi valley, beyond Dalhousie, planned as a multi-day trip.",
    distanceKm: 355,
    durationHours: { min: 8, max: 9.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Chamba is about 355 km from Tricity and takes eight to nine and a half hours, going through Ropar, Hoshiarpur and Pathankot before the climb through Banikhet and on past Dalhousie into the Ravi valley.",
      "It is one of the longer routes we run, and the last two hours are proper hill road. This is a trip to plan rather than decide on the morning of, and it is almost always booked with at least one night at the destination.",
      "The town is old and known for its temple complex and the Chaugan, the open ground the town is built around. It is also the road head for Bharmour and the Manimahesh area further up the valley.",
    ],
    highlights: [
      "About 355 km, typically 8–9.5 hours",
      "Runs past Dalhousie and Khajjiar on the way",
      "Road head for Bharmour and the upper Ravi valley",
      "Planned as a multi-day trip, not a day return",
    ],
    travelNotes: [
      "A same-day return is not realistic on this route. Sixteen hours or more of driving in a day is neither safe nor comfortable, so we plan Chamba as a multi-day trip.",
      "Dalhousie and Khajjiar sit on the way, and most people build the trip around all three rather than driving straight through.",
      "Multi-day round trips carry a driver allowance for the nights away, written into the quote before you confirm.",
      "For the upper valley towards Bharmour and Manimahesh, road conditions vary a great deal by season. Tell us how far up you plan to go so we can advise on the vehicle honestly.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity, and an early start is worth arranging on this route. Mohali and Kharar reach the Ropar road quickest. A Mohali to Chamba, Zirakpur to Chamba or Panchkula to Chamba trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Chamba from Chandigarh?",
        answer:
          "About 355 km, usually eight to nine and a half hours via Pathankot and Banikhet, excluding stops. The last two hours are hill road.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Chamba?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can Chandigarh to Chamba be done in one day?",
        answer:
          "Not as a return trip. One direction in a day is fine with an early start, but a same-day return would mean sixteen hours or more of driving, which we will not plan.",
      },
      {
        question: "Can we stop at Dalhousie and Khajjiar on the way?",
        answer:
          "Yes, both are on the route and most Chamba trips include them. Mention it when you enquire so the itinerary and the days allow for it.",
      },
      {
        question: "Which vehicle is best for the Chamba route?",
        answer:
          "An SUV is the usual choice for the distance and the hill section, particularly with luggage or a family. A sedan is fine for two or three travellers.",
      },
      {
        question: "Can the taxi continue to Bharmour or Manimahesh?",
        answer:
          "It depends on the season and the road, which changes year to year. Tell us how far up the valley you want to go and we will give you an honest answer on what is sensible.",
      },
      {
        question: "How far in advance should I book a Chamba trip?",
        answer:
          "Earlier is better on this route. It is a multi-day booking with a driver committed for the whole trip, so availability is tighter than on the short hill runs.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-dalhousie-taxi",
      "chandigarh-to-dharamshala-taxi",
      "outstation-taxi-chandigarh",
    ],
    seo: {
      title: "Chandigarh to Chamba Distance (~355 km) & Taxi",
      description:
        "Chandigarh to Chamba is about 355 km by road, usually 8–9.5 hours via Pathankot and Dalhousie. Multi-day taxi trips, fare confirmed before you book.",
    },
    active: true,
    priority: 14,
    prefill: { pickup: "Chandigarh", destination: "Chamba" },
  },

  // ------------------------------------------------------------- Mussoorie
  {
    slug: "chandigarh-to-mussoorie-taxi",
    image: {
      src: mussooriePhoto,
      alt: "A waterfall dropping in several strands into a green pool near Mussoorie, with viewing platforms and forested hillside alongside",
    },
    motif: "hill-town",
    origin: "Chandigarh",
    destination: "Mussoorie",
    destinationState: "Uttarakhand",
    displayName: "Chandigarh to Mussoorie",
    h1: "Chandigarh to Mussoorie Taxi",
    heroSubtitle:
      "The hill station above Dehradun, usually booked as a weekend trip from Tricity.",
    distanceKm: 210,
    durationHours: { min: 5.5, max: 6.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Mussoorie is about 210 km from Tricity, usually five and a half to six and a half hours. The route runs through Ambala and Saharanpur to Dehradun, then climbs the last 35 km up the Rajpur road to the ridge.",
      "Most of the drive is plains highway and only the final hour is hill road, which makes it an easier trip than the distance suggests. It is one of the most commonly booked weekend runs from Chandigarh.",
      "The town is laid out along a single ridge between the Library end and Picture Palace, with Landour sitting a few kilometres higher and considerably quieter. Which end you stay at changes how much walking your trip involves.",
    ],
    highlights: [
      "About 210 km, typically 5.5–6.5 hours",
      "Mostly highway, with the climb in the final hour",
      "Around 35 km above Dehradun",
      "Easily combined with Dehradun, Haridwar or Rishikesh",
    ],
    travelNotes: [
      "The Mall Road is closed to vehicles for part of the day. Cabs park at the Library or Picture Palace ends and the town is covered on foot between them.",
      "Kempty Falls is the busiest stop on the route and the approach can be slow in season. Landour, a few kilometres above the town, is the quieter alternative.",
      "May and June are peak season and the last climb can back up badly. An early start out of Tricity makes a real difference on those weekends.",
      "Mussoorie pairs naturally with Dehradun, and with Haridwar or Rishikesh over a longer trip. Tell us the stops and they go into the itinerary.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Zirakpur and Panchkula are closest to the Ambala road, so those pickups reach the highway soonest. A Mohali to Mussoorie, Zirakpur to Mussoorie or Panchkula to Mussoorie trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Mussoorie from Chandigarh?",
        answer:
          "About 210 km, usually five and a half to six and a half hours via Ambala, Saharanpur and Dehradun, excluding stops.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Mussoorie?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Is a Chandigarh to Mussoorie day trip practical?",
        answer:
          "It is possible but long, with eleven hours or more of driving in a day. Most people book at least one night, which is what makes the trip worthwhile.",
      },
      {
        question: "Can we stop at Dehradun on the way?",
        answer:
          "Yes, Mussoorie sits about 35 km above Dehradun, so it is directly on the route. Many trips include both, and some add Haridwar or Rishikesh.",
      },
      {
        question: "Can the taxi drive on Mall Road in Mussoorie?",
        answer:
          "Not for part of the day. The Mall is closed to vehicles during set hours, so the cab parks at the Library or Picture Palace end while you walk the town.",
      },
      {
        question: "Which vehicle suits the Mussoorie route?",
        answer:
          "A sedan is comfortable for two or three travellers since most of the distance is highway. Families and groups usually prefer an SUV for the luggage and the final climb.",
      },
      {
        question: "What does a Chandigarh to Mussoorie cab cost?",
        answer:
          "It depends on the vehicle, the season and whether you want a drop or a round trip with the cab staying. We confirm the fare in writing before you book.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-dehradun-taxi",
      "chandigarh-to-haridwar-taxi",
      "chandigarh-to-rishikesh-taxi",
    ],
    seo: {
      title: "Chandigarh to Mussoorie Distance (~210 km) & Taxi",
      description:
        "Mussoorie is about 210 km from Chandigarh, usually 5.5–6.5 hours via Dehradun, with Landour just above the town. One-way or round-trip taxi, fare confirmed first.",
    },
    active: true,
    priority: 15,
    prefill: { pickup: "Chandigarh", destination: "Mussoorie" },
  },

  // ------------------------------------------- Chandigarh Airport → Amritsar
  {
    slug: "chandigarh-airport-to-amritsar-taxi",
    image: {
      src: amritsarPhoto,
      alt: "The Golden Temple in Amritsar at sunrise, reflected in the sarovar",
    },
    motif: "golden-temple",
    origin: "Chandigarh Airport",
    destination: "Amritsar",
    destinationState: "Punjab",
    displayName: "Chandigarh Airport to Amritsar",
    h1: "Chandigarh Airport to Amritsar Taxi",
    heroSubtitle:
      "Terminal pickup at Chandigarh Airport and a straight run to Amritsar and the Golden Temple.",
    distanceKm: 235,
    durationHours: { min: 4.5, max: 5.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh Airport arrivals (IXC)",
      "Mohali and Kharar",
      "Chandigarh sectors",
      "Zirakpur and Panchkula",
    ],
    overview: [
      "Amritsar is about 235 km from Chandigarh Airport, usually four and a half to five and a half hours. The route leaves the airport through Mohali and Kharar onto NH-44, then runs through Ludhiana and Jalandhar, which is good highway for almost the whole distance.",
      "This is a transfer rather than a city trip, and it is planned differently because of that. You are arriving with luggage, often on a flight that lands late, and the driver needs to be at the right terminal door at the right time rather than somewhere in the city.",
      "Most people booking this are going to the Golden Temple, and a good number add Jallianwala Bagh next door and the Wagah border ceremony the following afternoon. Told in advance, all of that goes into the itinerary rather than being negotiated on the road.",
    ],
    highlights: [
      "About 235 km, typically 4.5–5.5 hours",
      "Pickup at the arrivals door, not a city meeting point",
      "NH-44 highway for most of the drive",
      "Golden Temple, Jallianwala Bagh and Wagah all fit the same trip",
    ],
    travelNotes: [
      "Share your flight number when you enquire so the pickup is planned around the scheduled arrival, and tell us if the flight changes. We send the driver's name and number before the day, so you can reach them directly once you land.",
      "Vehicles do not go right up to the Golden Temple. The cab drops at the nearest parking and the last stretch is on foot, which is short and well signposted.",
      "The Wagah border ceremony runs in the late afternoon and the timing shifts with the season. It is about 28 km beyond Amritsar, so it works best as a second-day plan rather than squeezed onto arrival day.",
      "Late-night landings mean a night drive on NH-44. It is a straightforward road, but tell us the flight so the driver is rested and the timing is set properly rather than assumed.",
    ],
    pickupNotes:
      "Pickup is from the arrivals area at Chandigarh Airport. If your plans start in the city instead, we also pick up from Chandigarh, Mohali, Kharar, Zirakpur and Panchkula, and the fare is quoted from wherever the trip actually starts.",
    faqs: [
      {
        question: "How far is Amritsar from Chandigarh Airport?",
        answer:
          "About 235 km, usually four and a half to five and a half hours by road via Ludhiana and Jalandhar on NH-44, excluding stops.",
      },
      {
        question: "Can you pick up directly from the airport terminal?",
        answer:
          "Yes. Pickup is from the arrivals area at Chandigarh Airport. Share your flight number when you enquire so the timing is planned around your arrival, and we send the driver's name and number before the day.",
      },
      {
        question: "Can the taxi take us to the Golden Temple?",
        answer:
          "It takes you as close as vehicles are allowed. The cab drops at the nearest parking area and the last stretch to the temple is a short walk, which is normal for everyone visiting.",
      },
      {
        question: "Can we add the Wagah border ceremony?",
        answer:
          "Yes. It is about 28 km beyond Amritsar and the ceremony runs in the late afternoon, with timings that change by season. It fits best as a second-day plan, so mention it when you enquire.",
      },
      {
        question: "What happens if my flight is delayed?",
        answer:
          "Tell us as soon as you know and we adjust the pickup. You will have the driver's number before the day, so you can also reach them directly once you land.",
      },
      {
        question: "Can I book a one-way drop to Amritsar?",
        answer:
          "Yes, and it is common for this route since many travellers fly onward from Amritsar or continue their trip from there. A round trip with the vehicle staying is also available.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-amritsar-taxi",
      "chandigarh-airport-taxi",
      "outstation-taxi-chandigarh",
    ],
    seo: {
      title: "Chandigarh Airport to Golden Temple Taxi (~235 km)",
      description:
        "Taxi from Chandigarh Airport to the Golden Temple in Amritsar, about 235 km (4.5–5.5 hours). Pickup at arrivals, fare confirmed before you book.",
    },
    active: true,
    priority: 16,
    prefill: { pickup: "Chandigarh Airport", destination: "Amritsar" },
  },

  // -------------------------------------------------------------- Ludhiana
  {
    slug: "chandigarh-to-ludhiana-taxi",
    motif: "monument",
    origin: "Chandigarh",
    destination: "Ludhiana",
    destinationState: "Punjab",
    displayName: "Chandigarh to Ludhiana",
    h1: "Chandigarh to Ludhiana Taxi",
    heroSubtitle:
      "A two-hour highway run to Punjab's largest city, as a drop or a same-day return.",
    distanceKm: 100,
    durationHours: { min: 2, max: 2.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Ludhiana is about 100 km from Chandigarh and usually takes two to two and a half hours. The road leaves Tricity through Kharar and runs west on the Chandigarh–Ludhiana highway, entering the city at Samrala Chowk.",
      "Because the drive is short, this is one of the few Punjab routes where a same-day return is genuinely comfortable. A morning meeting, a family function or a hospital visit in Ludhiana, with the car waiting and you back in Tricity by evening, makes an ordinary day rather than a long one.",
      "Where you are going inside Ludhiana matters as much as the highway. The city is large and its traffic is heavy, so a drop on the far side, towards Ferozepur Road or the railway station, can take noticeably longer than one near Samrala Chowk. That is why the fare is quoted to your actual drop address.",
    ],
    highlights: [
      "About 100 km, typically 2–2.5 hours",
      "Kharar to Samrala Chowk on the Chandigarh–Ludhiana highway",
      "Same-day return with the car waiting is practical",
      "Fare quoted to your actual drop point in the city",
    ],
    travelNotes: [
      "City traffic inside Ludhiana is the main variable, not the highway. Allow extra time for drops across the city, particularly at office hours.",
      "Winter fog in December and January can slow an early-morning run considerably. For a morning appointment in fog season, an earlier start or a buffer is worth it.",
      "For a same-day return, tell us roughly how long you need in Ludhiana. It goes into the quote as waiting time, so there is nothing to settle at the end of the day.",
      "Onward trips to Jalandhar or Amritsar continue on NH-44 from Ludhiana and can be quoted as one journey.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Mohali and Kharar are closest to the Ludhiana highway, while Zirakpur and Panchkula add some city driving at the start. A Mohali to Ludhiana, Zirakpur to Ludhiana or Panchkula to Ludhiana trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Ludhiana from Chandigarh?",
        answer:
          "About 100 km, usually two to two and a half hours by road through Kharar on the Chandigarh–Ludhiana highway, excluding stops. Drops across the city can take longer in traffic.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Ludhiana?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can I go to Ludhiana and come back the same day?",
        answer:
          "Yes. At about two hours each way it is a comfortable same-day return. The car waits for you, and the waiting time is written into the quote before you confirm.",
      },
      {
        question: "Do you pick up from Chandigarh Airport for Ludhiana?",
        answer:
          "Yes. Share your flight number when you enquire and the pickup is planned around your arrival. The airport is on the Mohali side of Tricity, so the run out to the Ludhiana highway is short.",
      },
      {
        question: "What does a Chandigarh to Ludhiana taxi cost?",
        answer:
          "It depends on the vehicle, your drop point in the city and whether it is a one-way drop or a same-day return. We send the fare and what it includes in writing before you book.",
      },
      {
        question: "Which vehicle suits the Ludhiana route?",
        answer:
          "A hatchback or sedan is comfortable for two to four people on this short highway run. An SUV makes sense with more luggage or a family, and a tempo traveller for a wedding party or group.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-jalandhar-taxi",
      "chandigarh-to-amritsar-taxi",
      "chandigarh-to-patiala-taxi",
    ],
    seo: {
      title: "Chandigarh to Ludhiana Taxi & Distance (~100 km)",
      description:
        "Book a Chandigarh to Ludhiana taxi, about 100 km (2–2.5 hours) via Kharar. One-way drops or same-day returns, pickup across Tricity, fare confirmed first.",
    },
    active: true,
    priority: 17,
    prefill: { pickup: "Chandigarh", destination: "Ludhiana" },
  },

  // ------------------------------------------------------------- Jalandhar
  {
    slug: "chandigarh-to-jalandhar-taxi",
    motif: "monument",
    origin: "Chandigarh",
    destination: "Jalandhar",
    destinationState: "Punjab",
    displayName: "Chandigarh to Jalandhar",
    h1: "Chandigarh to Jalandhar Taxi",
    heroSubtitle:
      "The quicker road into the Doaba, through Ropar and Nawanshahr rather than Ludhiana.",
    distanceKm: 145,
    durationHours: { min: 2.5, max: 3.5 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Jalandhar is about 145 km from Chandigarh and usually takes two and a half to three and a half hours. The quicker road does not go through Ludhiana. It runs through Kurali and Ropar, then west through Nawanshahr on NH-344A, and joins NH-44 at Phagwara for the last stretch into Jalandhar.",
      "Going via Ludhiana is also possible, and it is the natural choice if you want to stop there on the way. It is a little longer, though, and runs through Ludhiana's city traffic, which the Nawanshahr road avoids.",
      "The Doaba region around Jalandhar has strong family links abroad, which is why airport runs, weddings and visiting relatives are such common reasons for this trip. Phagwara, including Lovely Professional University, sits on the same road just before Jalandhar and is the same booking.",
    ],
    highlights: [
      "About 145 km, typically 2.5–3.5 hours",
      "Via Ropar and Nawanshahr, avoiding Ludhiana city traffic",
      "Phagwara and LPU are on the way",
      "One-way drops or round trips with the car waiting",
    ],
    travelNotes: [
      "If you would rather go via Ludhiana, for a stop or a pickup there, say so when you enquire and the quote follows that route.",
      "Drops at Jalandhar Cantonment, the railway station or any address across the city are all fine. Share the actual address, since the quote is built on it.",
      "Winter fog across the Doaba plains can be heavy in December and January. Early-morning departures in fog season are slower, and we would rather build in time than rush.",
      "Amritsar is about 80 km further on NH-44 and can be added as one trip.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Kharar and northern Mohali are closest to the Kurali road, which is how this route leaves Tricity. A Mohali to Jalandhar, Zirakpur to Jalandhar or Panchkula to Jalandhar trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Jalandhar from Chandigarh?",
        answer:
          "About 145 km, usually two and a half to three and a half hours via Ropar, Nawanshahr and Phagwara, excluding stops.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Jalandhar?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Is it quicker to go to Jalandhar via Ludhiana?",
        answer:
          "Usually not. The road through Ropar and Nawanshahr is shorter and avoids Ludhiana's city traffic. We go via Ludhiana if you want a stop or a pickup there.",
      },
      {
        question: "Can you drop at Phagwara or LPU?",
        answer:
          "Yes. Phagwara, including Lovely Professional University, is on the same road just before Jalandhar, so it is the same trip with a different drop point.",
      },
      {
        question: "Do you pick up from Chandigarh Airport for Jalandhar?",
        answer:
          "Yes. Share your flight number when you enquire and the pickup is planned around your arrival rather than a guessed time.",
      },
      {
        question: "What does a Chandigarh to Jalandhar taxi cost?",
        answer:
          "It depends on the vehicle and whether it is a one-way drop or a return. The fare and what it includes are confirmed in writing before you book.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-ludhiana-taxi",
      "chandigarh-to-amritsar-taxi",
      "chandigarh-to-anandpur-sahib-taxi",
    ],
    seo: {
      title: "Chandigarh to Jalandhar Taxi & Distance (~145 km)",
      description:
        "Book a Chandigarh to Jalandhar taxi, about 145 km (2.5–3.5 hours) via Ropar and Nawanshahr. Phagwara and LPU drops too, fare confirmed before you book.",
    },
    active: true,
    priority: 18,
    prefill: { pickup: "Chandigarh", destination: "Jalandhar" },
  },

  // -------------------------------------------------------- Anandpur Sahib
  {
    slug: "chandigarh-to-anandpur-sahib-taxi",
    motif: "golden-temple",
    origin: "Chandigarh",
    destination: "Anandpur Sahib",
    destinationState: "Punjab",
    displayName: "Chandigarh to Anandpur Sahib",
    h1: "Chandigarh to Anandpur Sahib Taxi",
    heroSubtitle:
      "Gurdwara visits to Takht Sri Kesgarh Sahib, with Kiratpur Sahib on the way.",
    distanceKm: 80,
    durationHours: { min: 1.5, max: 2 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Anandpur Sahib is about 80 km from Chandigarh, usually an hour and a half to two hours. The road runs out through Kurali and Ropar on NH-205, past Kiratpur Sahib, with the town a short way beyond.",
      "Most visits centre on Takht Sri Kesgarh Sahib, one of the five Takhts of Sikhism and the place where Guru Gobind Singh founded the Khalsa in 1699. Virasat-e-Khalsa, the museum of Sikh history in the town, can easily take a couple of hours on its own, so it is worth deciding in advance whether you want both.",
      "Because the drive is short, a same-day return is the usual plan. Kiratpur Sahib is on the road in, and Naina Devi in Himachal is close enough to add, which turns it into a fuller day.",
    ],
    highlights: [
      "About 80 km, typically 1.5–2 hours",
      "Via Kurali and Ropar on NH-205",
      "Kiratpur Sahib on the way, Naina Devi can be added",
      "Comfortable as a same-day return",
    ],
    travelNotes: [
      "Hola Mohalla, held around Holi each March, brings very large crowds to the town. Traffic is diverted and parking is further out, so allow extra time or plan around it.",
      "The road up to the Naina Devi temple climbs into the hills, so it adds more time than the distance suggests. Tell us if you want it included so the day is planned properly.",
      "Parking near the Takht is limited on busy days. The driver drops you as close as vehicles are allowed and waits at the designated parking.",
      "Virasat-e-Khalsa keeps its own opening days and hours. Check them before you travel if the museum is part of the plan.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Kharar is already on the road towards Kurali, which is how this route leaves Tricity. A Mohali to Anandpur Sahib, Zirakpur to Anandpur Sahib or Panchkula to Anandpur Sahib trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Anandpur Sahib from Chandigarh?",
        answer:
          "About 80 km, usually an hour and a half to two hours via Kurali, Ropar and Kiratpur Sahib, excluding stops.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Anandpur Sahib?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Can we visit Anandpur Sahib and return the same day?",
        answer:
          "Yes, that is the usual plan. The car waits while you visit, and the waiting time is part of the quote rather than something added at the end.",
      },
      {
        question: "Can we add Kiratpur Sahib and Naina Devi?",
        answer:
          "Kiratpur Sahib is on the way, so stopping there adds little time. Naina Devi is a climb into the hills from nearby and makes it a longer day, so mention it when you enquire and it goes into the itinerary.",
      },
      {
        question: "Is Anandpur Sahib busy during Hola Mohalla?",
        answer:
          "Very. The festival draws large crowds each March, with traffic diversions and parking further from the gurdwaras. If your dates fall around it, tell us and we will plan an earlier start.",
      },
      {
        question: "Do you pick up from Chandigarh Airport for Anandpur Sahib?",
        answer:
          "Yes. Share your flight number when you enquire and the pickup is planned around your arrival.",
      },
      {
        question: "What does a Chandigarh to Anandpur Sahib taxi cost?",
        answer:
          "It depends on the vehicle, whether it is a drop or a same-day return, and any stops you add. The fare and what it includes are confirmed in writing before you book.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-amritsar-taxi",
      "chandigarh-to-jalandhar-taxi",
      "chandigarh-to-ludhiana-taxi",
    ],
    seo: {
      title: "Chandigarh to Anandpur Sahib Taxi (~80 km)",
      description:
        "Book a Chandigarh to Anandpur Sahib taxi, about 80 km (1.5–2 hours) via Ropar and Kiratpur Sahib. Same-day returns, pickup across Tricity, fare confirmed first.",
    },
    active: true,
    priority: 19,
    prefill: { pickup: "Chandigarh", destination: "Anandpur Sahib" },
  },

  // --------------------------------------------------------------- Patiala
  {
    slug: "chandigarh-to-patiala-taxi",
    motif: "palace",
    origin: "Chandigarh",
    destination: "Patiala",
    destinationState: "Punjab",
    displayName: "Chandigarh to Patiala",
    h1: "Chandigarh to Patiala Taxi",
    heroSubtitle:
      "Patiala and Rajpura drops through Zirakpur and Banur, one-way or with the car waiting.",
    distanceKm: 75,
    durationHours: { min: 1.5, max: 2 },
    tripTypes: ["One-way", "Round-trip"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: [
      "Chandigarh sectors",
      "Mohali and Kharar",
      "Zirakpur and Panchkula",
      "Chandigarh Airport",
    ],
    overview: [
      "Patiala is about 75 km from Chandigarh and usually takes an hour and a half to two hours. The road leaves Tricity through Zirakpur and runs south-west on NH-7 through Banur, so Zirakpur and Panchkula pickups get going particularly quickly.",
      "Rajpura is on the same side of Tricity and closer, about 46 km through Zirakpur and Banur, usually just over an hour. It is booked the same way, and Rajpura and Patiala can be combined in one trip if you have stops in both.",
      "Patiala was the capital of the old princely state, and trips here range from family visits and Punjabi University business to a day around Qila Mubarak and the Moti Bagh palace. The drive is short enough that a same-day return with the car waiting is the usual plan.",
    ],
    highlights: [
      "About 75 km to Patiala, typically 1.5–2 hours",
      "Rajpura is about 46 km on the same side of Tricity",
      "Via Zirakpur and Banur on NH-7",
      "Same-day returns with the car waiting",
    ],
    travelNotes: [
      "The Zirakpur stretch at the start is the slowest part of the trip at peak hours. An early or mid-morning start avoids most of it.",
      "If you have stops in both Rajpura and Patiala, tell us both when you enquire so the running is in the quote.",
      "Winter fog on the plains can slow early departures in December and January. For a morning appointment in Patiala, allow a buffer.",
      "For a same-day return, let us know how long you need in Patiala so the waiting time is written into the quote.",
    ],
    pickupNotes:
      "Pickup from anywhere in Tricity. Zirakpur and Panchkula are closest to the Patiala road. A Mohali to Patiala, Zirakpur to Patiala or Panchkula to Patiala trip is the same journey and the same booking — the fare is quoted from where you actually start, rather than from a fixed city-centre point.",
    faqs: [
      {
        question: "How far is Patiala from Chandigarh?",
        answer:
          "About 75 km, usually an hour and a half to two hours via Zirakpur and Banur on NH-7, excluding stops.",
      },
      {
        question: "How far is Rajpura from Chandigarh?",
        answer:
          "About 46 km, usually just over an hour through Zirakpur and Banur. It is the same kind of booking as Patiala, only shorter.",
      },
      {
        question: "Can I go to Patiala and return the same day?",
        answer:
          "Yes. It is a short drive, so a same-day return with the car waiting is the usual plan, with the waiting time written into the quote.",
      },
      {
        question: "Do you pick up from Mohali, Zirakpur or Panchkula for Patiala or Rajpura?",
        answer:
          "Yes — it is the same trip, and only your pickup point changes. We pick up from Chandigarh, Mohali, Zirakpur, Panchkula and Kharar. The fare is quoted from your actual address rather than assuming a Chandigarh start, so it reflects the distance you are really travelling.",
      },
      {
        question: "Do you pick up from Chandigarh Airport for Patiala?",
        answer:
          "Yes. Share your flight number when you enquire and the pickup is planned around your arrival.",
      },
      {
        question: "What does a Chandigarh to Patiala taxi cost?",
        answer:
          "It depends on the vehicle, whether it is a drop or a same-day return, and whether Rajpura is on the way. The fare and what it includes are confirmed in writing before you book.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-ludhiana-taxi",
      "chandigarh-to-delhi-taxi",
      "chandigarh-to-anandpur-sahib-taxi",
    ],
    seo: {
      title: "Chandigarh to Patiala Taxi (~75 km) & Rajpura",
      description:
        "Book a Chandigarh to Patiala or Rajpura taxi via Zirakpur and Banur. Patiala is about 75 km, Rajpura about 46 km. Same-day returns, fare confirmed before you book.",
    },
    active: true,
    priority: 20,
    prefill: { pickup: "Chandigarh", destination: "Patiala" },
  },

  // --------------------------------------------- Delhi Airport → Chandigarh
  {
    slug: "delhi-airport-to-chandigarh-taxi",
    motif: "monument",
    origin: "Delhi Airport",
    destination: "Chandigarh",
    destinationState: "Tricity",
    displayName: "Delhi Airport to Chandigarh",
    h1: "Delhi Airport to Chandigarh Taxi",
    heroSubtitle:
      "Pickup at Delhi Airport arrivals, day or night, and straight home to Chandigarh, Mohali, Zirakpur or Panchkula.",
    distanceKm: 265,
    durationHours: { min: 4.5, max: 5.5 },
    tripTypes: ["One-way"],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    pickupAreas: ["Delhi (IGI) Airport arrivals, all terminals"],
    overview: [
      "Delhi Airport to Chandigarh is about 255 to 280 km depending on where in Tricity you are going, and usually takes four and a half to five and a half hours. Zirakpur is the nearest drop, with Chandigarh, Mohali and Panchkula a little further. The route is NH-44 almost the whole way, through Panipat, Karnal and Ambala.",
      "This trip starts with a flight rather than an address, and that changes how it is planned. We ask for your flight number, set the pickup around the time you are likely to clear immigration and baggage rather than the landing time, and send you the driver's name and number before the day of travel.",
      "International arrivals into Delhi often land late at night or in the early hours, and a night pickup is a normal booking on this route rather than a special request. A night drive on NH-44 is often the quicker version of this trip, since the traffic around Delhi and Panipat has eased.",
    ],
    highlights: [
      "About 255–280 km, typically 4.5–5.5 hours",
      "Pickup at Delhi Airport arrivals, including late-night flights",
      "Planned around your flight number, not a guessed time",
      "Drops across Chandigarh, Mohali, Zirakpur and Panchkula",
    ],
    travelNotes: [
      "Clearing immigration, baggage and customs after an international flight can take an hour or more. Tell us whether you are on an international or domestic arrival so the pickup time is realistic.",
      "If your flight is delayed or diverted, tell us as soon as you know and we adjust the pickup. You will already have the driver's number, so you can update them directly after landing.",
      "Murthal is the usual meal stop on NH-44, and after a long flight many people want one. Allow thirty to forty minutes if you do.",
      "Luggage after international travel is usually more than people expect. With several large suitcases, an SUV or larger is the safer choice.",
      "Going further, to Kharar, Ludhiana or Jalandhar? Share the final address and the whole run is quoted as one trip.",
    ],
    pickupNotes:
      "The driver meets you at arrivals at whichever Delhi Airport terminal you land at. Drops are anywhere in Chandigarh, Mohali, Zirakpur, Panchkula or Kharar, and the fare is quoted to your actual drop address.",
    extraCharges: ["Delhi Airport parking while the driver waits for you at arrivals"],
    fareIncluded: [
      "Vehicle and driver for the agreed journey",
      "Fuel for the quoted route",
      "Pickup at Delhi Airport arrivals, planned around your flight",
      "Drop at your address anywhere in Tricity — Chandigarh, Mohali, Zirakpur, Panchkula or Kharar",
    ],
    faqs: [
      {
        question: "How far is Chandigarh from Delhi Airport?",
        answer:
          "About 255 to 280 km depending on your drop in Tricity, usually four and a half to five and a half hours on NH-44, excluding stops. Zirakpur is the nearest, with Chandigarh, Mohali and Panchkula a little further.",
      },
      {
        question: "Can you pick up from Delhi Airport late at night?",
        answer:
          "Yes. Late-night and early-morning arrivals are common on this route. Share your flight number when you enquire and the pickup is planned around it.",
      },
      {
        question: "How will I find the driver at Delhi Airport?",
        answer:
          "You get the driver's name and number before the day of travel. Call or message them once you have your bags, and they meet you at arrivals.",
      },
      {
        question: "What if my flight is delayed?",
        answer:
          "Tell us as soon as you know and we adjust the pickup. Because you already have the driver's number, you can also update them directly after landing.",
      },
      {
        question: "Do you drop in Mohali, Zirakpur and Panchkula too?",
        answer:
          "Yes. Drops anywhere in Chandigarh, Mohali, Zirakpur, Panchkula or Kharar are the same booking, quoted to your actual address. Onward to Ludhiana or Jalandhar can be quoted as well.",
      },
      {
        question: "What does a Delhi Airport to Chandigarh taxi cost?",
        answer:
          "It depends on the vehicle and your drop address in Tricity. The fare, and what it does and does not cover, such as tolls and airport parking, is confirmed in writing before you book.",
      },
      {
        question: "Which vehicle suits an airport pickup with luggage?",
        answer:
          "For two people with normal luggage a sedan is fine. Families coming back from abroad with several large suitcases are better off in an SUV, and larger groups in a tempo traveller.",
      },
    ],
    relatedSlugs: [
      "chandigarh-to-delhi-taxi",
      "chandigarh-to-ludhiana-taxi",
      "chandigarh-to-jalandhar-taxi",
    ],
    seo: {
      title: "Delhi Airport to Chandigarh Taxi, Mohali & Zirakpur",
      description:
        "Taxi from Delhi Airport (IGI) to Chandigarh, Mohali, Zirakpur or Panchkula, about 255–280 km. Late-night arrivals planned around your flight, fare confirmed first.",
    },
    active: true,
    priority: 21,
    prefill: { pickup: "Delhi Airport", destination: "Chandigarh" },
  },
];

export const activeRoutes = routes
  .filter((r) => r.active)
  .sort((a, b) => a.priority - b.priority);

export function getRouteBySlug(slug: string): RouteData | undefined {
  return routes.find((r) => r.slug === slug && r.active);
}

export function getRelatedRoutes(route: RouteData): RouteData[] {
  return route.relatedSlugs
    .map((slug) => getRouteBySlug(slug))
    .filter((r): r is RouteData => Boolean(r));
}

/** Formats the approximate duration for display, e.g. "3.5–4.5 hours". */
export function formatDuration(route: RouteData): string {
  const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : `${n}`);
  return `${fmt(route.durationHours.min)}–${fmt(route.durationHours.max)} hours`;
}
