import Link from "next/link";

import { Container, Section } from "@/components/section/Section";
import { QuoteButton } from "@/components/cta/QuoteButton";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { PhoneButton } from "@/components/cta/PhoneButton";
import { activeRoutes } from "@/data/routes";
import { activeServices } from "@/data/services";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <Section className="pt-header">
        <Container className="space-y-10">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="text-sm font-semibold tracking-wide text-secondary-strong uppercase">
              Page not found
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">Looking for a taxi?</h1>
            <p className="leading-relaxed text-muted-foreground">
              That page does not exist, but we can still help with your trip. Send us your
              route and dates, or pick a route below.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <QuoteButton href="/get-quote" label="Get My Quote" />
              <WhatsAppButton placement="404" />
              <PhoneButton placement="404" variant="outline" />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <nav aria-label="Popular routes">
              <h2 className="text-lg font-semibold">Popular routes</h2>
              <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                {activeRoutes.slice(0, 8).map((route) => (
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
            </nav>

            <nav aria-label="Services">
              <h2 className="text-lg font-semibold">Services</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {activeServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/${service.slug}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {service.h1}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/routes" className="text-primary underline-offset-4 hover:underline">
                    All routes
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </Section>
    </main>
  );
}
