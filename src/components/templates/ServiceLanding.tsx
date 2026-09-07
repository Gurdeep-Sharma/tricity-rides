import Link from "next/link";

import { Section, Container, SectionHeading } from "@/components/section/Section";
import { Hero } from "@/components/section/Hero";
import { serviceHeroImage } from "@/data/service-images";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaSection } from "@/components/cta/CtaSection";
import { FaqList } from "@/components/faq/Faq";
import { FareInclusions } from "@/components/route/FareInclusions";
import { BookingSteps } from "@/components/route/BookingSteps";
import { RouteCardGrid } from "@/components/route/RouteCard";
import { VehicleGrid } from "@/components/vehicle/VehicleCard";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

import { getRouteBySlug } from "@/data/routes";
import { vehicleTypes } from "@/data/vehicles";
import { labelForSlug } from "@/data/pages";
import type { ServicePage } from "@/data/services";
import { businessConfig } from "@/config/business";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export function ServiceLanding({ service }: { service: ServicePage }) {
  const vehicles = vehicleTypes.filter((v) => service.vehicleSlugs.includes(v.slug));
  const routes = service.routeSlugs
    .map((slug) => getRouteBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const heroImage = serviceHeroImage(service.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: service.navLabel, path: `/${service.slug}` },
  ];

  return (
    <main className="pb-sticky-cta md:pb-0">
      <JsonLd
        data={serviceJsonLd({
          name: service.h1,
          description: service.seo.description,
          path: `/${service.slug}`,
          serviceType: service.h1,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(service.faqs)} />

      <Hero
        eyebrow={service.navLabel}
        title={service.h1}
        subtitle={service.heroSubtitle}
        points={[service.summary]}
        image={heroImage}
        imagePosition={heroImage?.position}
        prefill={{
          pickup: service.prefill.pickup,
          destination: service.prefill.destination,
          tripType: service.prefill.tripType,
          routeSlug: service.slug,
        }}
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
        <Container className="space-y-6">
          <Reveal>
            <TrustStrip />
          </Reveal>
        </Container>
      </Section>

      {service.sections.map((section, index) => (
        <Section key={section.heading} tone={index % 2 === 0 ? "muted" : "default"}>
          <Container className="space-y-5">
            <h2 className="text-2xl font-bold md:text-3xl">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="measure leading-relaxed">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed"
                  >
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </Section>
      ))}

      <Section>
        <Container className="space-y-8">
          <SectionHeading
            title="Vehicle options"
            description="Pick the category that suits your group and luggage. Availability is confirmed with your quote."
          />
          <Reveal>
            <VehicleGrid vehicles={vehicles} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="space-y-8">
          <SectionHeading
            title="Fare, inclusions and possible extras"
            description={businessConfig.pricing.explanation}
          />
          <Reveal>
            <FareInclusions />
          </Reveal>
        </Container>
      </Section>

      {routes.length > 0 ? (
        <Section>
          <Container className="space-y-8">
            <SectionHeading
              title="Popular routes"
              description="Journeys we run most often from Chandigarh Tricity."
            />
            <Reveal>
              <RouteCardGrid routes={routes} />
            </Reveal>
            <div className="flex justify-center">
              <Link href="/routes" className="font-medium text-primary underline-offset-4 hover:underline">
                See all routes
              </Link>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone={routes.length > 0 ? "muted" : "default"}>
        <Container className="space-y-8">
          <SectionHeading
            title="How booking works"
            description="From enquiry to confirmed vehicle, with nothing charged until you accept a quote."
          />
          <Reveal>
            <BookingSteps />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <SectionHeading title="Frequently asked questions" />
          <Reveal>
            <FaqList faqs={service.faqs} columns={2} />
          </Reveal>
        </Container>
      </Section>

      <ReviewsSection />

      <Section tone="muted">
        <Container>
          <nav aria-label="Related pages" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {service.relatedSlugs.map((slug) => (
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
        title={`Plan your ${service.navLabel.toLowerCase()} trip with us`}
        context={service.navLabel.toLowerCase() + " travel"}
        placement={`service:${service.slug}`}
      />

      <MobileStickyCta context={service.navLabel.toLowerCase() + " travel"} />
    </main>
  );
}
