import { CalendarCheck, FileText, IdCard, MessageSquare } from "lucide-react";

/**
 * Operational assurances only.
 * Every claim here describes something the business actually does: pre-booking,
 * writing the fare down, sharing driver details, and answering on WhatsApp.
 * No claim about verification, guarantees or round-the-clock availability.
 */
const trustPoints = [
  {
    icon: CalendarCheck,
    title: "Pre-booked, not on-demand",
    body: "Your vehicle is arranged ahead of your travel date, so nothing is left to chance on the morning of the trip.",
  },
  {
    icon: FileText,
    title: "Fare written down first",
    body: "You get the fare and what it covers in writing before you confirm, including anything that may be charged separately.",
  },
  {
    icon: IdCard,
    title: "Driver details before pickup",
    body: "We share the driver's name, number and vehicle details before your pickup, so you know who is coming.",
  },
  {
    icon: MessageSquare,
    title: "A person on WhatsApp",
    body: "You talk to a person about your trip, not an automated flow. Changes and questions are handled in the same chat.",
  },
];

export function TrustStrip() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {trustPoints.map((point) => (
        <li
          key={point.title}
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
        >
          <point.icon aria-hidden="true" className="size-6 text-secondary" />
          <h3 className="mt-3 text-base font-semibold">{point.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{point.body}</p>
        </li>
      ))}
    </ul>
  );
}
