import Link from "next/link";
import { Plane, Route, Building2, Users, Headphones } from "lucide-react";

const items = [
  {
    icon: Plane,
    title: "Airport Transfers",
    detail: "Pick, drop and onward",
    href: "/chandigarh-airport-taxi",
  },
  {
    icon: Route,
    title: "Outstation Taxi",
    detail: "One-way & round-trip",
    href: "/outstation-taxi-chandigarh",
  },
  {
    icon: Building2,
    title: "Local Taxi",
    detail: "Chandigarh • Mohali • Zirakpur",
    href: "/local-taxi-chandigarh",
  },
  {
    icon: Users,
    title: "Group & Corporate",
    detail: "For teams and families",
    href: "/round-trip-taxi-chandigarh",
  },
  {
    icon: Headphones,
    title: "Human Support",
    detail: "Real people on WhatsApp",
    href: "/contact",
  },
];

/** Band of service shortcuts sitting directly beneath the hero. */
export function ServiceStrip() {
  return (
    <section aria-label="Our services" className="border-y border-border bg-surface">
      <div className="container-page">
        <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
          {items.map((item) => (
            <li key={item.title} className="sm:border-b sm:border-border lg:border-b-0">
              <Link
                href={item.href}
                className="group flex h-full cursor-pointer items-center gap-3 px-2 py-4 transition-colors duration-200 hover:bg-muted/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring lg:px-4"
              >
                <item.icon
                  aria-hidden="true"
                  className="size-6 shrink-0 text-secondary transition-transform duration-200 group-hover:-translate-y-0.5"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-primary">{item.title}</span>
                  <span className="block text-xs text-muted-foreground">{item.detail}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
