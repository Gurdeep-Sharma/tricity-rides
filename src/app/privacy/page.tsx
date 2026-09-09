import Link from "next/link";
import { Container, Section } from "@/components/section/Section";
import { businessConfig } from "@/config/business";
import { brandConfig } from "@/config/brand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Tricity Rides collects, uses and stores the details you provide when you send a taxi enquiry, and how to ask for them to be removed.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <Section className="pt-header">
        <Container>
          <article className="measure space-y-6">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground">
                This policy explains what {brandConfig.name} collects when you send an
                enquiry, and what we do with it.
              </p>
            </header>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">1. What we collect</h2>
              <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
                <li>Your name, phone number and WhatsApp number</li>
                <li>Your email address, if you choose to give one</li>
                <li>
                  Trip details: pickup, destination, dates, times, passenger count, vehicle
                  preference, and any notes you add
                </li>
                <li>
                  Basic information about how you reached the site, such as the page you
                  landed on, the referring website and campaign parameters in the link
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">2. Why we collect it</h2>
              <p className="leading-relaxed">
                We use the information you provide to respond to your enquiry, prepare a
                fare, arrange the vehicle and driver for your trip, and stay in touch with
                you about that trip. Information about how you reached the site helps us
                understand which channels bring genuine enquiries.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">3. Who we share it with</h2>
              <p className="leading-relaxed">
                To carry out a confirmed trip we share the details needed for that trip,
                such as your name, contact number and pickup address, with the driver or
                operator assigned to it. We do not sell your personal information.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">4. Service providers</h2>
              <p className="leading-relaxed">
                Enquiry details are stored in our database. We use an email delivery
                provider to send internal notifications about new enquiries, and we may use
                website analytics to understand how the site is used. WhatsApp conversations
                are subject to WhatsApp&apos;s own terms and privacy policy.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">5. Storage in your browser</h2>
              <p className="leading-relaxed">
                We store a small record in your browser noting how you first reached the
                site, so that an enquiry can be attributed to the right channel. You can
                clear it at any time through your browser settings, and the site works
                normally without it.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">6. How long we keep it</h2>
              <p className="leading-relaxed">
                We keep enquiry and trip records for as long as needed to provide the
                service, answer follow-up questions and meet our record-keeping obligations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">7. Your choices</h2>
              <p className="leading-relaxed">
                You can ask us what information we hold about you, ask us to correct it, or
                ask us to delete it. Contact us at{" "}
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
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">8. Changes to this policy</h2>
              <p className="leading-relaxed">
                If we change how we handle your information, we will update this page. See
                also our{" "}
                <Link href="/terms" className="text-primary underline underline-offset-4">
                  Terms of Service
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
