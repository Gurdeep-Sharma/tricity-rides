import Link from "next/link";

import { Section, Container, SectionHeading } from "@/components/section/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RouteCardGrid } from "@/components/route/RouteCard";
import { CtaSection } from "@/components/cta/CtaSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

import { activeRoutes } from "@/data/routes";
import { activeServices } from "@/data/services";
import { activeLocations } from "@/data/locations";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Taxi Routes from Chandigarh Tricity",
  description:
    "Every outstation taxi route we run from Chandigarh, Mohali and Zirakpur, with approximate distances, drive times and route-specific details.",
  path: "/routes",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "All routes", path: "/routes" },
];

export default function RoutesIndexPage() {
  return (
    <main className="pb-sticky-cta md:pb-0">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="bg-primary text-primary-foreground">
        <Container className="pt-header pb-8 md:pb-12">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 space-y-4">
            <h1 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              Taxi routes from Chandigarh Tricity
            </h1>
            <p className="measure text-lg text-primary-foreground/90">
              Every route below has its own page with the approximate distance, the drive
              time, pickup areas and the practical details that matter on that road.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="space-y-8">
          <SectionHeading
            align="left"
            title="Outstation routes"
            description="Pickup from Chandigarh, Mohali, Zirakpur, Kharar or Panchkula on every route."
          />
          <RouteCardGrid routes={activeRoutes} />
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="grid gap-10 md:grid-cols-2">
          <nav aria-label="Services">
            <h2 className="text-xl font-bold">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {activeServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {service.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Service areas">
            <h2 className="text-xl font-bold">Service areas</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {activeLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/${location.slug}`}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {location.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <CtaSection
        title="Do not see your destination?"
        description="Send us the trip and we will tell you whether we can arrange it properly, rather than accepting a booking we cannot honour."
        placement="routes-index"
        quoteHref="/get-quote"
      />

      <MobileStickyCta quoteHref="/get-quote" />
    </main>
  );
}
