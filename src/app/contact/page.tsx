import Link from "next/link";
import { Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";

import { Section, Container } from "@/components/section/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { PhoneButton } from "@/components/cta/PhoneButton";
import { QuoteButton } from "@/components/cta/QuoteButton";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

import { businessConfig } from "@/config/business";
import { brandConfig } from "@/config/brand";
import { activeRoutes } from "@/data/routes";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us | Taxi Enquiries from Chandigarh",
  description:
    "Call or WhatsApp Tricity Rides for outstation taxis and airport transfers from Chandigarh, Mohali and Zirakpur. Enquiry hours and contact details.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <main className="pb-sticky-cta md:pb-0">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="bg-primary text-primary-foreground">
        <Container className="pt-header pb-8 md:pb-12">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 space-y-4">
            <h1 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              Contact Tricity Rides
            </h1>
            <p className="measure text-lg text-primary-foreground/90">
              WhatsApp is the quickest way to reach us. Send your route and dates and a
              person will reply with the fare and vehicle options.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <WhatsAppButton placement="contact:hero" />
              <PhoneButton
                placement="contact:hero"
                showNumber
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How to reach us</h2>
            <ul className="space-y-4">
              <li className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
                <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a
                    href={businessConfig.contact.phoneHref}
                    className="text-sm text-primary underline underline-offset-4"
                  >
                    {businessConfig.contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
                <MessageCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">
                    Fastest for trip details, quotes and changes to a booking.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
                <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a
                    href={`mailto:${businessConfig.contact.email}`}
                    className="text-sm text-primary underline underline-offset-4"
                  >
                    {businessConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
                <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <h3 className="font-semibold">Enquiry hours</h3>
                  <p className="text-sm text-muted-foreground">
                    {businessConfig.hours.label}. {businessConfig.hours.note}
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <h3 className="font-semibold">Where we operate</h3>
                  <p className="text-sm text-muted-foreground">
                    We serve {businessConfig.serviceAreaLabel} as a service-area business
                    and do not run a walk-in office. Pickup is from your address.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Plain factual summary, written so people and answer engines can both use it. */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About {brandConfig.name}</h2>
            <dl className="space-y-3 rounded-2xl border border-border bg-surface p-5 text-sm">
              <div>
                <dt className="font-semibold text-primary">Who we are</dt>
                <dd className="text-muted-foreground">
                  {brandConfig.name}, a taxi booking service based in Chandigarh Tricity.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Where we operate</dt>
                <dd className="text-muted-foreground">
                  Chandigarh, Mohali and Zirakpur, including Chandigarh Airport.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">What we arrange</dt>
                <dd className="text-muted-foreground">
                  Outstation taxis, airport transfers, and one-way and round-trip private cabs.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Where we travel</dt>
                <dd className="text-muted-foreground">
                  Shimla, Manali, Delhi, Amritsar, Dharamshala, Dehradun, Haridwar,
                  Rishikesh, Jaipur, Kasauli and other destinations on request.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">How booking works</dt>
                <dd className="text-muted-foreground">
                  Send an enquiry through this website, on WhatsApp or by phone. We confirm
                  availability and fare, and the trip is booked only once you accept.
                </dd>
              </div>
            </dl>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-semibold">Popular routes</h3>
              <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                {activeRoutes.slice(0, 6).map((route) => (
                  <li key={route.slug}>
                    <Link
                      href={`/${route.slug}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {route.displayName} Taxi
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <QuoteButton href="/get-quote" label="Send a trip enquiry" />
          </div>
        </Container>
      </Section>

      <MobileStickyCta quoteHref="/get-quote" />
    </main>
  );
}
