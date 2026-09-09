import Link from "next/link";

import { Section, Container, SectionHeading } from "@/components/section/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LeadForm } from "@/components/lead-form/LeadForm";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { PhoneButton } from "@/components/cta/PhoneButton";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { BookingSteps } from "@/components/route/BookingSteps";
import { FareInclusions } from "@/components/route/FareInclusions";

import { resolvePage } from "@/data/pages";
import { businessConfig } from "@/config/business";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import type { TripTypeValue } from "@/lib/validation/lead";

export const metadata = buildMetadata({
  title: "Get a Confirmed Taxi Quote",
  description:
    "Send your trip details and get a confirmed taxi fare from Chandigarh, Mohali or Zirakpur. One-way, round-trip and airport transfers, answered on WhatsApp.",
  path: "/get-quote",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Get a quote", path: "/get-quote" },
];

const TRIP_TYPES: TripTypeValue[] = ["ONE_WAY", "ROUND_TRIP", "AIRPORT"];

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function GetQuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const routeSlug = first(params.route);
  const routePage = routeSlug ? resolvePage(routeSlug) : null;

  // Query values are used only to prefill the form; everything is re-validated
  // on the server when the enquiry is submitted.
  const tripTypeParam = first(params.tripType);
  const tripType = TRIP_TYPES.includes(tripTypeParam as TripTypeValue)
    ? (tripTypeParam as TripTypeValue)
    : undefined;

  const prefill = {
    pickup: first(params.pickup)?.slice(0, 160),
    destination: first(params.destination)?.slice(0, 160),
    tripType,
    routeSlug: routePage ? routeSlug : undefined,
  };

  const routeLabel =
    routePage?.kind === "route" ? routePage.data.displayName : undefined;

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="bg-primary text-primary-foreground">
        <Container className="pt-header pb-8 md:pb-12">
          <Breadcrumbs items={crumbs} />

          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_minmax(380px,1fr)] lg:gap-12">
            <div className="space-y-6">
              <h1 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                {routeLabel ? `Get a quote for ${routeLabel}` : "Get a confirmed taxi quote"}
              </h1>
              <p className="measure text-lg text-primary-foreground/90">
                Tell us the route, the dates and how many of you are travelling. We check
                what is available and reply with the fare, the vehicle options and exactly
                what the quote covers.
              </p>
              <p className="measure text-primary-foreground/80">
                {businessConfig.policies.enquiry}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton placement="get-quote:hero" label="Message us instead" />
                <PhoneButton
                  placement="get-quote:hero"
                  showNumber
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                />
              </div>
            </div>

            <div className="text-foreground">
              <LeadForm prefill={prefill} />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="space-y-8">
          <SectionHeading title="What happens after you send this" />
          <BookingSteps />
          <TrustStrip />
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="space-y-8">
          <SectionHeading
            title="What your quote will cover"
            description={businessConfig.pricing.explanation}
          />
          <FareInclusions />
          <p className="text-center text-sm text-muted-foreground">
            Looking for route details first?{" "}
            <Link href="/routes" className="font-medium text-primary underline underline-offset-4">
              Browse all routes
            </Link>
            .
          </p>
        </Container>
      </Section>
    </main>
  );
}
