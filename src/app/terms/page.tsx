import Link from "next/link";
import { Container, Section } from "@/components/section/Section";
import { businessConfig } from "@/config/business";
import { brandConfig } from "@/config/brand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for Tricity Rides taxi enquiries and bookings from Chandigarh, Mohali and Zirakpur.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main>
      <Section className="pt-header">
        <Container>
          <article className="measure space-y-6">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold md:text-4xl">Terms of Service</h1>
              <p className="text-sm text-muted-foreground">
                These terms govern your use of the {brandConfig.name} website and the
                enquiry and booking service offered through it.
              </p>
            </header>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">1. About this service</h2>
              <p className="leading-relaxed">
                {brandConfig.name} arranges private taxi journeys from Chandigarh, Mohali
                and Zirakpur. Trips are carried out using vehicles and drivers arranged by
                us for your journey.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">2. Enquiries are not bookings</h2>
              <p className="leading-relaxed">
                {businessConfig.policies.enquiry} Submitting the enquiry form, sending a
                WhatsApp message or calling us starts a conversation. A booking exists only
                once we have confirmed availability, given you a fare, and you have accepted
                it.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">3. Fares and charges</h2>
              <p className="leading-relaxed">
                Fares depend on the route, dates, vehicle and trip type. The fare we confirm
                to you states what is included and what may be charged separately, which can
                include tolls, parking, state taxes, driver allowance, waiting time,
                additional kilometres and additional stops.
              </p>
              <p className="leading-relaxed">
                If your itinerary changes during a trip in a way that adds distance, time or
                days, the additional charge is discussed and agreed before it applies where
                circumstances allow.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">4. Changes and cancellation</h2>
              <p className="leading-relaxed">
                {businessConfig.policies.cancellation} Please tell us as early as possible
                if your plans change, so we can adjust or release the vehicle.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">5. Travel conditions</h2>
              <p className="leading-relaxed">
                Distances and journey times shown on this website are approximate. Actual
                travel time varies with traffic, weather, road works and road closures,
                particularly on hill routes. We plan around known conditions but cannot
                control them.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">6. Your responsibilities</h2>
              <p className="leading-relaxed">
                Please give accurate trip details, including pickup address, passenger
                numbers and luggage, and be ready at the agreed pickup time. Vehicle
                capacity limits apply and passengers must comply with applicable law during
                the journey.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">7. Limitation of liability</h2>
              <p className="leading-relaxed">
                We take reasonable care in arranging your trip. To the extent permitted by
                law, we are not liable for indirect or consequential losses, including
                missed connections, arising from delays caused by circumstances beyond our
                reasonable control.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">8. Contact</h2>
              <p className="leading-relaxed">
                For questions about these terms, contact us at{" "}
                <a
                  href={`mailto:${businessConfig.contact.email}`}
                  className="text-primary underline underline-offset-4"
                >
                  {businessConfig.contact.email}
                </a>{" "}
                or call{" "}
                <a
                  href={businessConfig.contact.phoneHref}
                  className="text-primary underline underline-offset-4"
                >
                  {businessConfig.contact.phoneDisplay}
                </a>
                . See also our{" "}
                <Link href="/privacy" className="text-primary underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </article>
        </Container>
      </Section>
    </main>
  );
}
