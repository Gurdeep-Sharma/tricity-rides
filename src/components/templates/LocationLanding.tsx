import Link from "next/link";
import { MapPin } from "lucide-react";

import { Section, Container, SectionHeading } from "@/components/section/Section";
import { Hero } from "@/components/section/Hero";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaSection } from "@/components/cta/CtaSection";
import { FaqList } from "@/components/faq/Faq";
import { BookingSteps } from "@/components/route/BookingSteps";
import { RouteCardGrid } from "@/components/route/RouteCard";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

import { getRouteBySlug } from "@/data/routes";
import { labelForSlug } from "@/data/pages";
import type { LocationPage } from "@/data/locations";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export function LocationLanding({ location }: { location: LocationPage }) {
  const routes = location.routeSlugs
    .map((slug) => getRouteBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: `${location.city} taxi`, path: `/${location.slug}` },
  ];

  return (
    <main className="pb-sticky-cta md:pb-0">
      <JsonLd
        data={serviceJsonLd({
          name: location.h1,
          description: location.seo.description,
          path: `/${location.slug}`,
          serviceType: `Taxi service in ${location.city}`,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(location.faqs)} />

      <Hero
        eyebrow={`Taxi service in ${location.city}`}
        title={location.h1}
        subtitle={location.heroSubtitle}
        points={[location.summary]}
        formHeading={`Taxi from ${location.city} — get a quote`}
        prefill={{ pickup: location.prefill.pickup, routeSlug: location.slug }}
        compact
      />

      <div className="border-b border-border bg-surface">
        <Container className="py-3">
          <div className="text-muted-foreground [&_a]:text-primary [&_span[aria-current]]:text-foreground">
            <Breadcrumbs items={crumbs} />
          </div>
        </Container>
      </div>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold md:text-3xl">
              Taxi service from {location.city}
            </h2>
            {location.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="measure leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold text-primary">
              <MapPin aria-hidden="true" className="size-4 text-secondary" />
              Pickup areas in {location.city}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {location.pickupAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </aside>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="space-y-8">
          <SectionHeading
            title={`What ${location.city} customers book most`}
            description="The trips we arrange most often from this part of Tricity."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {location.commonTrips.map((trip) => (
              <li key={trip.label} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-base font-semibold text-primary">{trip.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {trip.detail}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-6">
          <Reveal>
            <TrustStrip />
          </Reveal>
        </Container>
      </Section>

      {routes.length > 0 ? (
        <Section tone="muted">
          <Container className="space-y-8">
            <SectionHeading
              title={`Popular routes from ${location.city}`}
              description="Pickup from your address in this city is part of the quoted trip."
            />
            <Reveal>
              <RouteCardGrid routes={routes} />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container className="space-y-8">
          <SectionHeading title="How booking works" />
          <Reveal>
            <BookingSteps />
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="space-y-8">
          <SectionHeading title={`${location.city} taxi: frequently asked questions`} />
          <Reveal>
            <FaqList faqs={location.faqs} columns={2} />
          </Reveal>
        </Container>
      </Section>

      <ReviewsSection />

      <Section>
        <Container>
          <nav aria-label="Related pages" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {location.relatedSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {labelForSlug(slug)}
              </Link>
            ))}
          </nav>
        </Container>
      </Section>

      <CtaSection
        title={`Book a taxi from ${location.city}`}
        context={`a taxi from ${location.city}`}
        placement={`location:${location.slug}`}
      />

      <MobileStickyCta context={`a taxi from ${location.city}`} />
    </main>
  );
}
