import type { BasePage, PrefillHint } from "@/data/types";

export interface LocationPage extends BasePage {
  city: string;
  navLabel: string;
  summary: string;
  /** Genuine pickup areas we serve in this city. */
  pickupAreas: string[];
  /** Paragraphs unique to this city. */
  overview: string[];
  /** What people in this city most often book. */
  commonTrips: { label: string; detail: string }[];
  routeSlugs: string[];
  relatedSlugs: string[];
  prefill: PrefillHint;
}

export const locations: LocationPage[] = [
  {
    slug: "chandigarh-taxi",
    city: "Chandigarh",
    navLabel: "Chandigarh",
    h1: "Taxi Service in Chandigarh",
    heroSubtitle:
      "Outstation cabs, airport transfers and local hire with pickup from any Chandigarh sector.",
    summary:
      "Pre-booked taxis from Chandigarh for hill routes, Delhi runs, airport transfers and full-day local hire.",
    pickupAreas: [
      "Sectors 1–47 (city centre and southern sectors)",
      "Sector 17 and Sector 22 commercial areas",
      "Sector 43 ISBT and Sector 17 ISBT",
      "Chandigarh Railway Station",
      "Industrial Area Phase 1 and Phase 2",
      "Manimajra and Elante area",
      "PGIMER and Panjab University",
    ],
    overview: [
      "Chandigarh sits at the start of the road into the Himalayas, which is why so much travel from here is outbound rather than within the city. Shimla, Kasauli, Manali and Dharamshala are all reachable in a day, and Delhi is a comfortable morning drive.",
      "The city's sector grid makes pickups predictable. Tell us the sector and house or block number and the driver finds it without a string of phone calls on the morning of travel.",
      "We also handle a steady flow of travel for PGIMER visits, university and school runs, and guests staying in the sectors who want a car for the whole day rather than a series of app rides.",
    ],
    commonTrips: [
      {
        label: "Chandigarh to Shimla and the hills",
        detail:
          "The most requested direction from the city, as a one-way drop or a round trip with sightseeing around Kufri and Chail.",
      },
      {
        label: "Chandigarh to Delhi and IGI Airport",
        detail:
          "Planned backwards from your flight or meeting rather than from the distance, with a buffer for highway traffic.",
      },
      {
        label: "Chandigarh Airport transfers",
        detail:
          "Pickups planned around your actual flight arrival, including onward journeys straight to the hills.",
      },
      {
        label: "Full-day local hire",
        detail:
          "A car and driver for the day across the sectors and into Mohali and Panchkula, with waiting between stops.",
      },
    ],
    routeSlugs: [
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-manali-taxi",
      "chandigarh-to-delhi-taxi",
      "chandigarh-to-amritsar-taxi",
    ],
    faqs: [
      {
        question: "Which areas of Chandigarh do you pick up from?",
        answer:
          "All city sectors, plus the railway station, both ISBTs, the Industrial Area and the Manimajra and Elante side. Share the sector and block and the driver will find it.",
      },
      {
        question: "Can I book a taxi in Chandigarh for the whole day?",
        answer:
          "Yes. Half-day and full-day local hire keeps the same car and driver with you, including waiting between stops across Tricity.",
      },
      {
        question: "How early should I book an outstation taxi from Chandigarh?",
        answer:
          "For weekends, holidays and hill routes, as early as you can. For ordinary weekday travel a day or two ahead is usually enough.",
      },
      {
        question: "Do you charge extra for a Chandigarh sector pickup?",
        answer:
          "Pickup from your address within Chandigarh is part of the quoted trip on our outstation routes, not an add-on.",
      },
      {
        question: "Can you pick up from Chandigarh Railway Station or ISBT?",
        answer:
          "Yes. Share your train or bus arrival time and the pickup is planned around it.",
      },
    ],
    relatedSlugs: ["mohali-taxi", "zirakpur-taxi", "chandigarh-airport-taxi"],
    seo: {
      title: "Taxi Service in Chandigarh | Outstation",
      description:
        "Book a taxi in Chandigarh for outstation trips, airport transfers or full-day local hire. Pickup from any sector with a confirmed quote from Tricity Rides.",
    },
    active: true,
    priority: 1,
    prefill: { pickup: "Chandigarh" },
  },

  {
    slug: "mohali-taxi",
    city: "Mohali",
    navLabel: "Mohali",
    h1: "Taxi Service in Mohali",
    heroSubtitle:
      "Outstation cabs and airport transfers from Mohali, Kharar and the IT belt.",
    summary:
      "Pre-booked taxis from Mohali with the airport on your doorstep and the Ludhiana and Ropar highways minutes away.",
    pickupAreas: [
      "Phase 1 to Phase 11",
      "Sectors 66 to 91 and Aerocity",
      "IT City and the Quark and Infosys campuses",
      "Kharar and Landran",
      "Mohali Cricket Stadium area",
      "Airport Road and Sector 82",
    ],
    overview: [
      "Mohali has two advantages for road travel that Chandigarh does not. The airport is on this side of Tricity, so airport runs are short, and the Kharar road puts you on the Ludhiana and Jalandhar highway within minutes, which shortens the practical start of any Punjab trip.",
      "A large part of our Mohali travel is corporate. The IT City and Aerocity offices generate airport transfers, client visits across Punjab and day hires for visiting teams, where waiting between meetings makes per-trip booking impractical.",
      "For families, the pattern is different: weekend hill trips to Kasauli and Shimla, and pilgrimage travel to Amritsar and Anandpur Sahib.",
    ],
    commonTrips: [
      {
        label: "Mohali to Chandigarh Airport",
        detail:
          "A short run from most of Mohali, planned around your flight rather than a fixed departure time.",
      },
      {
        label: "Mohali to Amritsar",
        detail:
          "Kharar puts you on the Ludhiana highway quickly, which makes this one of the easier long runs from Tricity.",
      },
      {
        label: "Mohali to Shimla and Kasauli",
        detail:
          "Weekend hill trips, as a drop or a round trip with the vehicle staying with you.",
      },
      {
        label: "Corporate day hire",
        detail:
          "A car and driver for a day of meetings across the IT belt and into Chandigarh and Panchkula.",
      },
    ],
    routeSlugs: [
      "chandigarh-to-amritsar-taxi",
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-manali-taxi",
      "chandigarh-to-delhi-taxi",
    ],
    faqs: [
      {
        question: "Do you pick up from Mohali for outstation trips?",
        answer:
          "Yes. Mohali, Kharar and Landran pickups are standard on every outstation route, and they are usually on the way out of Tricity rather than a detour.",
      },
      {
        question: "How far is Chandigarh Airport from Mohali?",
        answer:
          "The airport is on the Mohali side of Tricity, so most Mohali addresses are a short run. We plan the pickup around your flight time.",
      },
      {
        question: "Can I book a cab from Mohali IT City for client visits?",
        answer:
          "Yes. Day hire with the same car and driver suits meeting schedules better than separate rides, because the waiting between appointments is included.",
      },
      {
        question: "Is the fare different for a Mohali pickup?",
        answer:
          "Your quote is based on the actual trip from your address. On most routes a Mohali pickup is on the way, so it does not change the journey.",
      },
      {
        question: "Can you pick up from the Mohali stadium area?",
        answer:
          "Yes, including on match and event days, though we suggest booking earlier when there is an event on.",
      },
    ],
    relatedSlugs: ["chandigarh-taxi", "zirakpur-taxi", "chandigarh-airport-taxi"],
    seo: {
      title: "Taxi Service in Mohali | Outstation Cabs",
      description:
        "Book a taxi in Mohali for outstation travel, Chandigarh Airport transfers or corporate day hire. Pickup from Phases, Sectors, Aerocity and Kharar.",
    },
    active: true,
    priority: 2,
    prefill: { pickup: "Mohali" },
  },

  {
    slug: "zirakpur-taxi",
    city: "Zirakpur",
    navLabel: "Zirakpur",
    h1: "Taxi Service in Zirakpur",
    heroSubtitle:
      "Cabs from Zirakpur, already on the highway for Shimla, Delhi and Dehradun.",
    summary:
      "Pre-booked taxis from Zirakpur, the Tricity corner where the Shimla, Delhi and Patiala highways meet.",
    pickupAreas: [
      "VIP Road and Patiala Road",
      "Dhakoli and Peer Muchalla",
      "Bhabat and Lohgarh",
      "Zirakpur–Panchkula highway",
      "Airport Road side of Zirakpur",
      "Baltana",
    ],
    overview: [
      "Zirakpur sits where the roads to Shimla, Delhi, Patiala and the airport separate, and that location shapes everything about travel from here. A Shimla trip is on the highway from the moment you leave, and a Delhi departure does not have to cross Tricity traffic first.",
      "For hill routes this is the fastest practical start in Tricity. Kasauli is barely an hour and a half away, and the Parwanoo climb begins about 30 km up the road.",
      "The area has grown quickly with high-rise housing along VIP Road and Dhakoli, so we plan pickups by tower and gate rather than by a general address, which saves the usual back-and-forth on the morning of travel.",
    ],
    commonTrips: [
      {
        label: "Zirakpur to Shimla",
        detail:
          "The quickest start in Tricity for this route, since the Kalka road begins right here.",
      },
      {
        label: "Zirakpur to Delhi and IGI Airport",
        detail:
          "Straight onto the Ambala highway without crossing Chandigarh traffic first.",
      },
      {
        label: "Zirakpur to Kasauli",
        detail:
          "Close enough for a comfortable day trip with the cab waiting while you walk the Mall.",
      },
      {
        label: "Zirakpur to Dehradun and Haridwar",
        detail:
          "The Ambala side of Tricity, which suits early-morning departures on these routes.",
      },
    ],
    routeSlugs: [
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-kasauli-taxi",
      "chandigarh-to-delhi-taxi",
      "chandigarh-to-dehradun-taxi",
    ],
    faqs: [
      {
        question: "Can I book a Shimla taxi from Zirakpur?",
        answer:
          "Yes, and Zirakpur is the quickest start in Tricity for that route because the Kalka road begins here. The route and quote are the same journey, just starting from your address.",
      },
      {
        question: "Which parts of Zirakpur do you pick up from?",
        answer:
          "VIP Road, Patiala Road, Dhakoli, Peer Muchalla, Bhabat, Lohgarh, Baltana and the Panchkula highway side. Share the tower or gate name for high-rise addresses.",
      },
      {
        question: "How far is Chandigarh Airport from Zirakpur?",
        answer:
          "It is a short run on the airport road side of Tricity. We plan the pickup around your flight time rather than a fixed departure.",
      },
      {
        question: "Is Zirakpur pickup charged separately?",
        answer:
          "No. Pickup from your Zirakpur address is part of the quoted trip on our outstation routes.",
      },
      {
        question: "Can you do a Kasauli day trip from Zirakpur?",
        answer:
          "Yes, and it is comfortable from here. The cab waits while you cover the Mall, Christ Church and Sunset Point on foot.",
      },
    ],
    relatedSlugs: ["chandigarh-taxi", "mohali-taxi", "chandigarh-to-shimla-taxi"],
    seo: {
      title: "Taxi Service in Zirakpur | Airport Cabs",
      description:
        "Book a taxi in Zirakpur for Shimla, Delhi, Kasauli or Chandigarh Airport. Pickup from VIP Road, Dhakoli, Baltana and Peer Muchalla with a confirmed quote.",
    },
    active: true,
    priority: 3,
    prefill: { pickup: "Zirakpur" },
  },

  // ------------------------------------------------------------- Panchkula
  {
    slug: "panchkula-taxi",
    city: "Panchkula",
    navLabel: "Panchkula",
    h1: "Taxi Service in Panchkula",
    heroSubtitle:
      "Cabs from Panchkula, on the Kalka road and closest to the hill routes.",
    summary:
      "Pre-booked taxis from Panchkula, the Haryana corner of Tricity where the Kalka and Shimla road begins.",
    pickupAreas: [
      "Sectors 1 to 21",
      "Mansa Devi Complex (MDC)",
      "Panchkula Extension and Sector 25",
      "Pinjore and Kalka",
      "Chandimandir and the Barwala road",
      "Zirakpur–Panchkula highway",
    ],
    overview: [
      "Panchkula sits at the Haryana end of Tricity, directly on the road that climbs to Kalka, Parwanoo and Shimla. For anything heading into the hills, a Panchkula pickup starts closer to the climb than a Chandigarh one does, and the fare is quoted for that shorter run rather than assuming a Sector 17 start.",
      "The sector grid here is compact and easy to plan pickups around, though MDC and the Panchkula Extension sectors sit further out towards the Barwala side. Pinjore and Kalka are effectively on the way for hill routes, so a pickup there costs almost nothing in detour.",
      "Morni Hills is the one destination people ask about that is closer to Panchkula than to anywhere else in Tricity. It is a short run rather than an outstation trip, and it is usually booked as a local full-day hire.",
    ],
    commonTrips: [
      {
        label: "Panchkula to Shimla",
        detail:
          "The Kalka road starts here, so this is among the quickest departures in Tricity for the route.",
      },
      {
        label: "Panchkula to Kasauli",
        detail:
          "Close enough for a relaxed day trip, with the cab waiting while you walk the Mall.",
      },
      {
        label: "Panchkula to Kufri",
        detail:
          "The Shimla run continued another 15 km, usually booked as one trip with Shimla.",
      },
      {
        label: "Panchkula to Chandigarh Airport",
        detail:
          "The airport sits on the Mohali side, so we plan the pickup time around your flight rather than a fixed slot.",
      },
    ],
    routeSlugs: [
      "chandigarh-to-shimla-taxi",
      "chandigarh-to-kasauli-taxi",
      "chandigarh-to-kufri-taxi",
      "chandigarh-to-dehradun-taxi",
    ],
    faqs: [
      {
        question: "Can I book a Shimla taxi from Panchkula?",
        answer:
          "Yes. Panchkula is on the Kalka road, so it is one of the quickest starts in Tricity for the Shimla route. It is the same journey and the same booking, quoted from your Panchkula address.",
      },
      {
        question: "Is a Panchkula pickup cheaper than a Chandigarh one for hill routes?",
        answer:
          "For routes towards Kalka, Kasauli and Shimla the drive from Panchkula is shorter, and the quote reflects the distance actually travelled rather than a fixed city-centre start.",
      },
      {
        question: "Which parts of Panchkula do you pick up from?",
        answer:
          "Sectors 1 to 21, Mansa Devi Complex, the Panchkula Extension sectors, Pinjore, Kalka, Chandimandir and the Barwala road side.",
      },
      {
        question: "Do you cover Pinjore and Kalka?",
        answer:
          "Yes. Both are on the way for hill routes, so a pickup there adds almost nothing to the drive and is included in the quoted trip.",
      },
      {
        question: "Is Panchkula pickup charged separately?",
        answer:
          "No. Pickup from your Panchkula address is part of the quoted trip on our outstation routes.",
      },
    ],
    relatedSlugs: ["chandigarh-taxi", "zirakpur-taxi", "chandigarh-to-shimla-taxi"],
    seo: {
      title: "Taxi Service in Panchkula | Hill Routes",
      description:
        "Book a taxi in Panchkula for Shimla, Kasauli, Kufri or Chandigarh Airport. Pickup from Sectors 1–21, MDC, Pinjore and Kalka with a confirmed quote.",
    },
    active: true,
    priority: 4,
    prefill: { pickup: "Panchkula" },
  },

  // ---------------------------------------------------------------- Kharar
  {
    slug: "kharar-taxi",
    city: "Kharar",
    navLabel: "Kharar",
    h1: "Taxi Service in Kharar",
    heroSubtitle:
      "Cabs from Kharar, already on the Ludhiana and Ropar highways.",
    summary:
      "Pre-booked taxis from Kharar, the western edge of Tricity and the closest start to Punjab and the Kangra routes.",
    pickupAreas: [
      "Sunny Enclave",
      "Desu Majra and Landran road",
      "Kurali road and Gillco Valley",
      "Chandigarh–Kharar highway",
      "Sectors 125 to 127",
      "Balongi side",
    ],
    overview: [
      "Kharar sits on the western edge of Tricity, where the Ludhiana and Ropar highways begin. That makes it the closest start in Tricity for anything heading into Punjab or up towards Kangra, and a departure from here skips Chandigarh traffic entirely.",
      "For Amritsar and Jalandhar the Ludhiana highway is reached almost immediately. For Dalhousie, Palampur and Chamba the route runs through Ropar, which is also on the Kharar side, so the first hour of those long drives is saved compared with a city-centre pickup.",
      "The area has grown quickly with housing societies along Sunny Enclave, Gillco and the Kurali road, so we plan pickups by society and gate rather than a general address. It saves the usual phone calls on the morning of travel.",
    ],
    commonTrips: [
      {
        label: "Kharar to Amritsar",
        detail:
          "Straight onto the Ludhiana highway, which makes this among the quickest Amritsar starts in Tricity.",
      },
      {
        label: "Kharar to Dalhousie and Chamba",
        detail:
          "The Ropar road begins here, saving the first stretch of an already long drive.",
      },
      {
        label: "Kharar to Dharamshala",
        detail:
          "The Una and Kangra route runs the same way, out through Ropar.",
      },
      {
        label: "Kharar to Chandigarh Airport",
        detail:
          "A straightforward run across the Mohali side, planned around your flight time.",
      },
    ],
    routeSlugs: [
      "chandigarh-to-amritsar-taxi",
      "chandigarh-to-dalhousie-taxi",
      "chandigarh-to-dharamshala-taxi",
      "chandigarh-to-palampur-taxi",
    ],
    faqs: [
      {
        question: "Can I book an outstation taxi from Kharar?",
        answer:
          "Yes. Kharar is one of our standard pickup areas, and for Punjab and Kangra routes it is the closest start in Tricity. It is the same trip, quoted from your Kharar address.",
      },
      {
        question: "Is a Kharar pickup quicker for Amritsar?",
        answer:
          "Usually, yes. The Ludhiana highway is reached almost immediately from Kharar, so the drive avoids crossing Chandigarh traffic first.",
      },
      {
        question: "Which parts of Kharar do you pick up from?",
        answer:
          "Sunny Enclave, Desu Majra, the Landran and Kurali roads, Gillco Valley, Sectors 125 to 127, Balongi and along the Chandigarh–Kharar highway.",
      },
      {
        question: "Do you pick up from housing societies in Kharar?",
        answer:
          "Yes, and it helps to share the society and gate name when you enquire so the driver reaches the right entrance without calling.",
      },
      {
        question: "Is Kharar pickup charged separately?",
        answer:
          "No. Pickup from your Kharar address is part of the quoted trip on our outstation routes.",
      },
    ],
    relatedSlugs: ["mohali-taxi", "chandigarh-taxi", "chandigarh-to-amritsar-taxi"],
    seo: {
      title: "Taxi Service in Kharar | Outstation Cabs",
      description:
        "Book a taxi in Kharar for Amritsar, Dalhousie, Dharamshala or Chandigarh Airport. Pickup from Sunny Enclave, Desu Majra and Kurali road.",
    },
    active: true,
    priority: 5,
    prefill: { pickup: "Kharar" },
  },
];

export const activeLocations = locations
  .filter((l) => l.active)
  .sort((a, b) => a.priority - b.priority);

export function getLocationBySlug(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug && l.active);
}
