import Link from "next/link";
import { Clock, MapPin, Navigation, Route as RouteIcon } from "lucide-react";

import { Section, Container, SectionHeading } from "@/components/section/Section";
import { Hero } from "@/components/section/Hero";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteButton } from "@/components/cta/QuoteButton";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { CtaSection } from "@/components/cta/CtaSection";
import { FaqList, QuickAnswers } from "@/components/faq/Faq";
import { FareInclusions } from "@/components/route/FareInclusions";
import { BookingSteps } from "@/components/route/BookingSteps";
import { RouteCardGrid } from "@/components/route/RouteCard";
import { VehicleGrid } from "@/components/vehicle/VehicleCard";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

import { formatDuration, getRelatedRoutes, type RouteData } from "@/data/routes";
import { vehicleTypes } from "@/data/vehicles";
import { businessConfig } from "@/config/business";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export function RouteLanding({ route }: { route: RouteData }) {
  const vehicles = vehicleTypes.filter((v) => route.vehicleSlugs.includes(v.slug));
  const related = getRelatedRoutes(route);
  const context = `${route.origin} to ${route.destination}`;

  // The first four FAQs double as the answer-first block, so the visible page
  // and the FAQ structured data always carry the same questions and answers.
  const quickAnswers = route.faqs.slice(0, 4);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Outstation taxi", path: "/outstation-taxi-chandigarh" },
    { name: `${route.displayName} Taxi`, path: `/${route.slug}` },
  ];

  return (
    <main className="pb-sticky-cta md:pb-0">
      <JsonLd
        data={serviceJsonLd({
          name: `${route.displayName} Taxi`,
          description: route.seo.description,
          path: `/${route.slug}`,
          serviceType: "Outstation taxi service",
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(route.faqs)} />

      <Hero
        eyebrow={`${route.origin} → ${route.destination}`}
        title={route.h1}
        subtitle={route.heroSubtitle}
        formHeading={`${route.displayName} — get a quote`}
        prefill={{
          pickup: route.prefill.pickup,
          destination: route.prefill.destination,
          routeSlug: route.slug,
        }}
        image={route.image}
        chips={
          <ul className="flex flex-wrap gap-2.5">
            <li className="flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Navigation aria-hidden="true" className="size-4 text-accent" />
              About {route.distanceKm} km
            </li>
            <li className="flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Clock aria-hidden="true" className="size-4 text-accent" />
              {formatDuration(route)}
            </li>
            <li className="flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <RouteIcon aria-hidden="true" className="size-4 text-accent" />
              {route.tripTypes.join(" & ")}
            </li>
          </ul>
        }
        compact
      />

      {/* Breadcrumbs sit below the hero on a light band for legibility */}
      <div className="border-b border-border bg-surface">
        <Container className="py-3">
          <div className="text-muted-foreground [&_a]:text-primary [&_span[aria-current]]:text-foreground">
            <Breadcrumbs items={crumbs} />
          </div>
        </Container>
      </div>

      {/* Answer-first block */}
      <Section>
        <Container className="space-y-8">
          <Reveal>
          <SectionHeading
            align="left"
            title={`${route.displayName} taxi: the essentials`}
            description={`Approximate distance, travel time, vehicles and how booking works on the ${context} route.`}
          />
          </Reveal>
          <Reveal delay={80}>
            <QuickAnswers items={quickAnswers} />
          </Reveal>
        </Container>
      </Section>

      {/* Route overview */}
      <Section tone="muted">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold md:text-3xl">
              About the {context} route
            </h2>
            {route.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="measure leading-relaxed">
                {paragraph}
              </p>
            ))}

            <h3 className="pt-2 text-lg font-semibold text-primary">
              Good to know before you travel
            </h3>
            <ul className="space-y-3">
              {route.travelNotes.map((note) => (
                <li key={note.slice(0, 40)} className="measure flex gap-2.5 leading-relaxed">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-base font-semibold text-primary">Route at a glance</h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">From</dt>
                  <dd className="text-right font-medium">{route.origin}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">To</dt>
                  <dd className="text-right font-medium">
                    {route.destination}, {route.destinationState}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Approx. distance</dt>
                  <dd className="text-right font-medium">{route.distanceKm} km</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Approx. drive time</dt>
                  <dd className="text-right font-medium">{formatDuration(route)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Trip types</dt>
                  <dd className="text-right font-medium">{route.tripTypes.join(", ")}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                Distances and times are approximate and vary with traffic, weather and road conditions.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="flex items-center gap-2 text-base font-semibold text-primary">
                <MapPin aria-hidden="true" className="size-4 text-secondary" />
                Pickup areas
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {route.pickupAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed">{route.pickupNotes}</p>
            </div>
          </aside>
        </Container>
      </Section>

      {/* Vehicles */}
      <Section>
        <Container className="space-y-8">
          <SectionHeading
            title={`Vehicles for ${context}`}
            description="Choose the category that suits your group and luggage. Availability is confirmed with your quote."
          />
          <Reveal>
            <VehicleGrid vehicles={vehicles} />
          </Reveal>
          <div className="flex justify-center">
            <QuoteButton label="Get vehicle options" />
          </div>
        </Container>
      </Section>

      {/* Fare transparency */}
      <Section tone="muted">
        <Container className="space-y-8">
          <SectionHeading
            title="Fare, inclusions and possible extras"
            description={businessConfig.pricing.explanation}
          />
          <Reveal>
            <FareInclusions extraCharges={route.extraCharges} />
          </Reveal>
        </Container>
      </Section>

      {/* Booking process */}
      <Section>
        <Container className="space-y-8">
          <SectionHeading
            title="How booking works"
            description="Four steps from enquiry to a confirmed vehicle, with nothing charged until you accept a quote."
          />
          <Reveal>
            <BookingSteps />
          </Reveal>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="muted">
        <Container className="space-y-8">
          <SectionHeading
            title={`${route.displayName} taxi: frequently asked questions`}
            description="Straight answers to what customers ask most about this route."
          />
          <Reveal>
            <FaqList faqs={route.faqs} columns={2} />
          </Reveal>
          <div className="flex justify-center">
            <WhatsAppButton
              context={context}
              placement={`route:${route.slug}:faq`}
              label="Ask us on WhatsApp"
            />
          </div>
        </Container>
      </Section>

      <ReviewsSection />

      {/* Related routes and internal links */}
      <Section>
        <Container className="space-y-8">
          <SectionHeading
            title="Related routes"
            description="Other journeys we run from Chandigarh Tricity."
          />
          <Reveal>
            <RouteCardGrid routes={related} />
          </Reveal>

          <nav aria-label="Related pages" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/outstation-taxi-chandigarh" className="font-medium text-primary underline-offset-4 hover:underline">
              Outstation taxi from Chandigarh
            </Link>
            <Link href="/chandigarh-airport-taxi" className="font-medium text-primary underline-offset-4 hover:underline">
              Chandigarh Airport taxi
            </Link>
            <Link href="/mohali-taxi" className="font-medium text-primary underline-offset-4 hover:underline">
              Taxi service in Mohali
            </Link>
            <Link href="/zirakpur-taxi" className="font-medium text-primary underline-offset-4 hover:underline">
              Taxi service in Zirakpur
            </Link>
            <Link href="/routes" className="font-medium text-primary underline-offset-4 hover:underline">
              All routes
            </Link>
          </nav>
        </Container>
      </Section>

      <CtaSection
        title={`Ready to book your ${context} taxi?`}
        context={context}
        placement={`route:${route.slug}`}
      />

      <MobileStickyCta context={context} />
    </main>
  );
}
