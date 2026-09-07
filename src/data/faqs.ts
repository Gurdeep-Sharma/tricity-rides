import type { Faq } from "@/data/types";

/** Site-level FAQs shown on the homepage. Route pages carry their own. */
export const homeFaqs: Faq[] = [
  {
    question: "How do I book a taxi with Tricity Rides?",
    answer:
      "Send your trip details through the enquiry form on this site. We reply on WhatsApp with the fare and vehicle options, and the trip is confirmed once you accept. You can also call us directly if you prefer.",
  },
  {
    question: "Does submitting the form confirm my booking?",
    answer:
      "No. The form starts a conversation. We check availability, send you a fare, and the booking is confirmed only after you accept it.",
  },
  {
    question: "Why do you not show prices on the website?",
    answer:
      "Because an honest fare depends on your route, dates, vehicle and whether you need a one-way drop or a round trip. Rather than publish a number that changes at booking time, we send you a confirmed fare with the inclusions written out.",
  },
  {
    question: "Where do you pick up from?",
    answer:
      "Chandigarh, Mohali, Zirakpur, Kharar and Panchkula, including Chandigarh Airport and the railway station. Pickup from your address is part of the quoted trip on outstation routes.",
  },
  {
    question: "What is the difference between one-way and round-trip?",
    answer:
      "One-way is a single-direction drop and the vehicle leaves after dropping you. A round trip keeps the same vehicle and driver with you for the whole itinerary, including waiting and local running at the destination.",
  },
  {
    question: "Are tolls, parking and state taxes included?",
    answer:
      "It depends on the route. Some quotes include them and others show them as actuals paid along the way. Whichever applies to your trip is written into your quote before you confirm.",
  },
  {
    question: "Will I know the driver and vehicle before the trip?",
    answer:
      "Yes. We share the driver's name, contact number and vehicle details before your pickup, so you are not waiting for an unknown car.",
  },
  {
    question: "What if I need to cancel?",
    answer:
      "Contact us as early as you can. Cancellation terms are shared with your quote and confirmed before booking, so you know them in advance.",
  },
];
