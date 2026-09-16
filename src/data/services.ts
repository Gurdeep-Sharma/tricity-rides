import type { BasePage, PrefillHint } from "@/data/types";
import type { VehicleSlug } from "@/data/vehicles";

export interface ServiceSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface ServicePage extends BasePage {
  /** Short label used in navigation and cards. */
  navLabel: string;
  summary: string;
  sections: ServiceSection[];
  /** Route slugs surfaced on this service page. */
  routeSlugs: string[];
  vehicleSlugs: VehicleSlug[];
  relatedSlugs: string[];
  prefill: PrefillHint;
}

export const services: ServicePage[] = [
  // ------------------------------------------------------------ Outstation
  {
    slug: "outstation-taxi-chandigarh",
    navLabel: "Outstation",
    h1: "Outstation Taxi from Chandigarh",
    heroSubtitle:
      "Pre-booked private cabs from Chandigarh, Mohali and Zirakpur to Himachal, Punjab, Uttarakhand and Delhi NCR.",
    summary:
      "One-way and round-trip outstation cabs with the vehicle and driver arranged in advance, and the fare confirmed in writing before you travel.",
    sections: [
      {
        heading: "What an outstation taxi from Tricity includes",
        body: [
          "An outstation trip is a private vehicle booked for your journey alone. You are not sharing the cab, the driver stays with you for the itinerary you agreed, and the vehicle is arranged before the day of travel rather than found at the last minute.",
          "We quote each trip individually because the honest answer depends on your route, dates, vehicle and whether you need a drop or a return. Once you confirm, the fare, the inclusions and anything that could be charged separately are all in writing.",
        ],
        bullets: [
          "Private vehicle for your group only",
          "Same driver for the whole itinerary",
          "Vehicle and driver details shared before pickup",
          "Written inclusions, so extras are never a surprise",
        ],
      },
      {
        heading: "One-way and round-trip, explained",
        body: [
          "A one-way trip is a single-direction drop. It suits travellers who are flying back, staying on, or continuing their journey from the destination.",
          "A round trip keeps the same vehicle and driver with you for the whole trip, including waiting time and local running at the destination. It is the practical choice if you want sightseeing, multiple stops or a return on a fixed date. Multi-day round trips include a driver allowance, which is stated in your quote rather than added afterwards.",
        ],
      },
      {
        heading: "Where we go",
        body: [
          "Our regular routes run into Himachal Pradesh, Punjab, Uttarakhand and Delhi NCR. Shimla, Manali, Dharamshala, Kasauli, Amritsar, Delhi, Dehradun, Haridwar, Rishikesh and Jaipur are the routes we cover most often, each with its own page and details.",
          "If your destination is not listed, send us the trip anyway. We will tell you whether we can service it properly rather than accepting a booking we cannot honour.",
        ],
      },
    ],
    routeSlugs: [
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-manali-taxi",
      "chandigarh-to-delhi-taxi",
      "chandigarh-to-amritsar-taxi",
      "chandigarh-to-dharamshala-taxi",
      "chandigarh-to-kasauli-taxi",
    ],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    faqs: [
      {
        question: "What is an outstation taxi?",
        answer:
          "A private cab booked for a journey outside the city, with the vehicle and driver reserved for your trip alone rather than shared with other passengers.",
      },
      {
        question: "How is the outstation fare calculated?",
        answer:
          "It depends on the route, the vehicle, the dates and whether the trip is one-way or round-trip. Multi-day trips also carry a driver allowance. We put all of it in the quote before you confirm.",
      },
      {
        question: "Are tolls and state taxes included?",
        answer:
          "Sometimes included and sometimes charged on actuals, depending on the route. Whichever applies to your trip is written into your quote, so you know before you travel.",
      },
      {
        question: "Can I be picked up from Mohali or Zirakpur?",
        answer:
          "Yes. Chandigarh, Mohali, Zirakpur, Kharar and Panchkula pickups are all standard, and there is no separate arrangement to make.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "Earlier is better for hill routes, weekends and holiday periods, when vehicles are in demand. For ordinary weekday travel a day or two is usually enough.",
      },
      {
        question: "How do I confirm an outstation booking?",
        answer:
          "Send your trip details through the enquiry form. We reply on WhatsApp with the fare and vehicle options, and the trip is confirmed only once you accept.",
      },
    ],
    relatedSlugs: ["chandigarh-airport-taxi", "local-taxi-chandigarh"],
    seo: {
      title: "Outstation Taxi from Chandigarh Tricity",
      description:
        "Book an outstation taxi from Chandigarh, Mohali or Zirakpur to Shimla, Manali, Delhi, Amritsar and more. One-way or round-trip, fare confirmed first.",
    },
    active: true,
    priority: 1,
    prefill: { pickup: "Chandigarh" },
  },

  // --------------------------------------------------------------- Airport
  {
    slug: "chandigarh-airport-taxi",
    navLabel: "Airport",
    h1: "Chandigarh Airport Taxi",
    heroSubtitle:
      "Pickups and drops at Chandigarh Airport, plus onward transfers to Shimla, Manali and the hills.",
    summary:
      "Pre-booked airport transfers where the driver plans around your actual flight, so you are not negotiating a ride after landing.",
    sections: [
      {
        heading: "Airport pickup",
        body: [
          "Share your flight number with the enquiry and the pickup is planned around your arrival rather than a guessed time. The driver's name and vehicle details reach you before the day of travel, so you know who you are looking for when you walk out.",
          "Chandigarh Airport, formally Shaheed Bhagat Singh International Airport, sits on the Mohali side of Tricity. Depending on where you are going, Mohali and Zirakpur are often closer than central Chandigarh, which is worth knowing when you plan your arrival.",
        ],
        bullets: [
          "Pickup planned around your flight arrival",
          "Driver and vehicle details shared before pickup",
          "Onward hill transfers to Shimla, Manali and Kasauli",
          "Sedan, SUV and larger vehicles for groups with luggage",
        ],
      },
      {
        heading: "Airport drop",
        body: [
          "For departures we work backwards from your check-in time, taking the Tricity traffic and your pickup address into account. Early-morning flights are common from Chandigarh, so pre-booking the night before is the sensible approach.",
        ],
      },
      {
        heading: "Airport to the hills",
        body: [
          "A large share of airport enquiries are not city drops at all. Travellers land at Chandigarh and continue straight to Shimla, Kasauli, Manali or Dharamshala. Booking that as a single journey means the vehicle is already waiting when you land, with room for your luggage.",
          "Tell us the flight and the final destination and we will quote the whole journey rather than the airport leg alone.",
        ],
      },
    ],
    routeSlugs: [
      "chandigarh-airport-to-amritsar-taxi",
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-kasauli-taxi",
      "chandigarh-to-manali-taxi",
    ],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    faqs: [
      {
        question: "Can I book a taxi from Chandigarh Airport to Shimla?",
        answer:
          "Yes, and it is one of our most common requests. Share your flight number and the vehicle is arranged to be waiting when you land, with the onward journey quoted as one trip.",
      },
      {
        question: "How do you handle flight delays?",
        answer:
          "We ask for your flight number so the driver can check the actual arrival time before setting out. Tell us as early as you can if your flight changes.",
      },
      {
        question: "What does a Chandigarh Airport taxi cost?",
        answer:
          "It depends on the drop location and the vehicle. City transfers and onward hill journeys are priced differently, and we confirm the fare before you book.",
      },
      {
        question: "Is the airport closer to Mohali or Chandigarh?",
        answer:
          "The airport is on the Mohali side of Tricity, so Mohali and Zirakpur addresses are often a shorter run than central or northern Chandigarh sectors.",
      },
      {
        question: "Can you take a large group with luggage from the airport?",
        answer:
          "Yes. For bigger groups an SUV or tempo traveller is the sensible choice, and we plan for luggage rather than squeezing it in.",
      },
      {
        question: "How early should the taxi arrive for a departure?",
        answer:
          "We work backwards from your check-in time and the Tricity traffic on the day, rather than using a fixed rule. Pre-booking the night before is best for early-morning flights.",
      },
    ],
    relatedSlugs: ["outstation-taxi-chandigarh", "local-taxi-chandigarh"],
    seo: {
      title: "Chandigarh Airport Taxi | Pickup & Drop",
      description:
        "Pre-book a Chandigarh Airport taxi for pickup, drop or an onward transfer to Shimla, Manali or Kasauli. Driver details shared in advance by Tricity Rides.",
    },
    active: true,
    priority: 2,
    prefill: { destination: "Chandigarh Airport", tripType: "AIRPORT" },
  },

  // ----------------------------------------------------------------- Local
  {
    slug: "local-taxi-chandigarh",
    navLabel: "Local",
    h1: "Local Taxi in Chandigarh Tricity",
    heroSubtitle:
      "Half-day and full-day cabs within Chandigarh, Mohali, Zirakpur and Panchkula.",
    summary:
      "A car and driver for the day, for city work, family events, hospital visits and guests who need someone reliable at the wheel.",
    sections: [
      {
        heading: "How local hire works",
        body: [
          "Local hire is booked by time rather than by trip. You keep the vehicle and driver for a half day or a full day, and use them for as many stops as the hours allow within Tricity.",
          "This suits a different need than a point-to-point app ride. It is for days with several stops, waiting between them, or guests who want the same driver looking after them from morning to evening.",
        ],
        bullets: [
          "Half-day and full-day hire",
          "Multiple stops with waiting included",
          "Chandigarh, Mohali, Zirakpur and Panchkula",
          "Same driver for the whole booking",
        ],
      },
      {
        heading: "What people use it for",
        body: [
          "Common requests include family functions and weddings, hospital and clinic visits where waiting is unavoidable, property visits across the three cities, and hosting out-of-town guests who want a city tour of the Rock Garden, Sukhna Lake, Rose Garden and Elante.",
          "Corporate visitors also use local hire for a day of meetings across Chandigarh's sectors and the Mohali IT belt, where waiting between appointments makes per-trip booking impractical.",
        ],
      },
    ],
    routeSlugs: [],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    faqs: [
      {
        question: "What is included in local taxi hire?",
        answer:
          "The vehicle and driver for the agreed hours within Tricity, including waiting between your stops. Your quote states the hours, the kilometre limit and what applies if you go beyond either.",
      },
      {
        question: "Can I book a local taxi for a half day?",
        answer:
          "Yes. Half-day and full-day hire are both available, and we will suggest which fits once we know your plan for the day.",
      },
      {
        question: "Does local hire cover Mohali, Zirakpur and Panchkula?",
        answer:
          "Yes. All four Tricity areas are covered under local hire, so crossing between them during the day is normal, not an extra trip.",
      },
      {
        question: "What happens if I need the cab longer than booked?",
        answer:
          "Extra hours are charged at the rate stated in your quote. We tell you that rate upfront so an extended day is never a surprise.",
      },
      {
        question: "Is local hire the same as an app cab?",
        answer:
          "No. An app cab is a single point-to-point ride. Local hire keeps the same car and driver with you for the day, including the waiting time between stops.",
      },
    ],
    relatedSlugs: ["outstation-taxi-chandigarh", "chandigarh-airport-taxi"],
    seo: {
      title: "Local Taxi in Chandigarh Tricity",
      description:
        "Book a local taxi in Chandigarh, Mohali, Zirakpur or Panchkula for half-day or full-day hire with waiting included. Confirmed quote from Tricity Rides.",
    },
    active: true,
    priority: 3,
    prefill: { pickup: "Chandigarh", destination: "Chandigarh (local hire)" },
  },

  // --------------------------------------------------------------- One-way
  {
    slug: "one-way-taxi-chandigarh",
    navLabel: "One-way",
    h1: "One-Way Taxi from Chandigarh",
    heroSubtitle:
      "Single-direction drops from Chandigarh, Mohali and Zirakpur, without paying for a return you do not need.",
    summary:
      "A one-way drop is priced as a single-direction journey, which is what you want when you are flying back, staying on, or travelling onward.",
    sections: [
      {
        heading: "When a one-way taxi makes sense",
        body: [
          "One-way suits travellers who are not coming back with the vehicle: you are flying out from the destination, staying for an open-ended period, continuing your journey, or being met by someone at the other end.",
          "The trade-off is straightforward. On a one-way drop the vehicle leaves once you are dropped, so there is no cab waiting for you at the destination and no local running included. If you want either of those, a round trip is the better arrangement.",
        ],
        bullets: [
          "Priced as a single-direction journey",
          "No waiting or local running at the destination",
          "Common for airport departures and open-ended stays",
          "Available on all our regular outstation routes",
        ],
      },
      {
        heading: "One-way or round-trip: which to choose",
        body: [
          "Choose one-way if your return is uncertain, if you are flying back, or if someone else is handling your travel at the destination. Choose round-trip if you want sightseeing, several stops, a fixed return date, or the reassurance of the same driver throughout.",
          "If you are unsure, ask for both when you enquire. We will quote each so you can compare rather than guess.",
        ],
      },
    ],
    routeSlugs: [
      "chandigarh-to-delhi-taxi",
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-manali-taxi",
      "chandigarh-to-amritsar-taxi",
    ],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    faqs: [
      {
        question: "Is a one-way taxi cheaper than a round trip?",
        answer:
          "They are priced differently rather than one always being cheaper. A one-way covers a single direction, while a round trip keeps the vehicle and driver with you. Ask for both and compare.",
      },
      {
        question: "Which routes offer one-way drops?",
        answer:
          "All our regular outstation routes, including Shimla, Manali, Delhi, Amritsar, Dharamshala, Dehradun, Haridwar, Rishikesh, Jaipur and Kasauli.",
      },
      {
        question: "Does a one-way fare include tolls and taxes?",
        answer:
          "It depends on the route. Whether tolls and state taxes are included or charged on actuals is written into your quote before you confirm.",
      },
      {
        question: "Can I add a stop on a one-way trip?",
        answer:
          "Usually yes, if you tell us at the enquiry stage so it can be planned and quoted. Stops added on the day may be charged separately.",
      },
      {
        question: "Can I book a one-way taxi back to Chandigarh?",
        answer:
          "Send us the details and we will confirm whether we can arrange the return leg for your date and route.",
      },
    ],
    relatedSlugs: ["round-trip-taxi-chandigarh", "outstation-taxi-chandigarh"],
    seo: {
      title: "One-Way Taxi from Chandigarh | Drops",
      description:
        "Book a one-way taxi from Chandigarh, Mohali or Zirakpur to Shimla, Manali, Delhi and more. Single-direction pricing with a confirmed quote from Tricity Rides.",
    },
    active: true,
    priority: 4,
    prefill: { pickup: "Chandigarh", tripType: "ONE_WAY" },
  },

  // ------------------------------------------------------------ Round-trip
  {
    slug: "round-trip-taxi-chandigarh",
    navLabel: "Round-trip",
    h1: "Round-Trip Taxi from Chandigarh",
    heroSubtitle:
      "The same vehicle and driver with you for the whole trip, including waiting and sightseeing.",
    summary:
      "Round-trip hire keeps one car and one driver for your entire itinerary, which is what makes multi-stop and multi-day travel workable.",
    sections: [
      {
        heading: "What a round trip covers",
        body: [
          "On a round trip the vehicle and driver stay with you from pickup to final drop. That includes the journey out, the local running at your destination, the waiting while you visit places, and the return leg.",
          "For trips spanning more than one day, a driver allowance covers the driver's stay. It is part of the quote you see before you confirm, not an amount added at the end of the trip.",
        ],
        bullets: [
          "Same vehicle and driver throughout",
          "Local running and waiting at the destination included as quoted",
          "Driver allowance stated upfront on multi-day trips",
          "Suits families, groups and sightseeing itineraries",
        ],
      },
      {
        heading: "Planning a round trip well",
        body: [
          "The more of your itinerary we know at the enquiry stage, the more accurate the quote. Tell us the places you want to cover, roughly when you want to be back, and whether any day involves a lot of local driving.",
          "Hill destinations such as Shimla, Manali and Dharamshala are where round trips make the most difference, because local transport at the destination is limited and having your own vehicle changes what you can fit into the days.",
        ],
      },
    ],
    routeSlugs: [
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-manali-taxi",
      "chandigarh-to-dharamshala-taxi",
      "chandigarh-to-kasauli-taxi",
    ],
    vehicleSlugs: ["hatchback", "sedan", "suv", "premium-suv", "tempo-traveller"],
    faqs: [
      {
        question: "What does a round-trip taxi include?",
        answer:
          "The same vehicle and driver for your whole itinerary, including the journey out, local running and waiting at the destination as quoted, and the return leg.",
      },
      {
        question: "What is a driver allowance?",
        answer:
          "On trips spanning more than one day it covers the driver's stay. It is stated in your quote before you confirm, not added at the end of the trip.",
      },
      {
        question: "Can we change the itinerary during the trip?",
        answer:
          "Small changes are usually manageable. Anything that adds significant distance or days is discussed and agreed before it happens, so the fare stays predictable.",
      },
      {
        question: "Is sightseeing included in a round trip?",
        answer:
          "The sightseeing we quote for is included. Tell us the places you want to cover at the enquiry stage so they are in the itinerary rather than added later.",
      },
      {
        question: "How many days can a round trip run for?",
        answer:
          "Multi-day trips are normal, with driver rest planned into the schedule. Share your dates and itinerary and we will confirm what is workable.",
      },
    ],
    relatedSlugs: ["one-way-taxi-chandigarh", "outstation-taxi-chandigarh"],
    seo: {
      title: "Round-Trip Taxi from Chandigarh",
      description:
        "Book a round-trip taxi from Chandigarh with the same vehicle and driver throughout, including waiting and sightseeing. Driver allowance stated upfront.",
    },
    active: true,
    priority: 5,
    prefill: { pickup: "Chandigarh", tripType: "ROUND_TRIP" },
  },
];

export const activeServices = services
  .filter((s) => s.active)
  .sort((a, b) => a.priority - b.priority);

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug && s.active);
}
