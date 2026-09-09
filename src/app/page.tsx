import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  MessageSquare,
  Clock3,
  UserRound,
  Car,
  MapPin,
} from "lucide-react";

import { Hero } from "@/components/section/Hero";
import { ServiceStrip } from "@/components/section/ServiceStrip";
import { Section, Container, SectionHeading } from "@/components/section/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RouteCardGrid } from "@/components/route/RouteCard";
import { VehicleGrid } from "@/components/vehicle/VehicleCard";
import { BookingSteps } from "@/components/route/BookingSteps";
import { FaqList } from "@/components/faq/Faq";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import heroPhoto from "@/assets/images/sedan_hero.webp";
import familySuvPhoto from "@/assets/images/indian_family_suv.webp";
import airportPhoto from "@/assets/images/airport.webp";

import { activeRoutes } from "@/data/routes";
import { activeVehicleTypes } from "@/data/vehicles";
import { activeLocations } from "@/data/locations";
import { homeFaqs } from "@/data/faqs";
import { businessConfig } from "@/config/business";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Outstation & Airport Taxi from Chandigarh | Tricity Rides",
  description:
    "Pre-booked outstation taxis and airport transfers from Chandigarh, Mohali and Zirakpur. One-way and round-trip cabs with a confirmed fare on WhatsApp.",
  path: "/",
});

const heroBadges = [
  { icon: ShieldCheck, title: "Pre-booked Travel", detail: "Arranged in advance" },
  { icon: IndianRupee, title: "Transparent Fares", detail: "Written before you book" },
  { icon: MessageSquare, title: "Human Support", detail: "Real people on WhatsApp" },
];

const whyPoints = [
  {
    icon: Clock3,
    title: "Reliable and on time",
    body: "Your cab is arranged before your travel date, not scrambled for on the morning.",
  },
  {
    icon: UserRound,
    title: "Driver details in advance",
    body: "You get the driver's name, number and vehicle before pickup, so you know who is coming.",
  },
  {
    icon: IndianRupee,
    title: "Transparent pricing",
    body: "The fare and what it covers are in writing, including anything that may be charged separately.",
  },
  {
    icon: MessageSquare,
    title: "Easy WhatsApp booking",
    body: "One chat from enquiry to confirmation, with a person answering rather than a bot.",
  },
  {
    icon: Car,
    title: "Comfortable vehicles",
    body: "Sedans, SUVs and tempo travellers matched to your group size and the road you are taking.",
  },
  {
    icon: MapPin,
    title: "A local Tricity company",
    body: "Based in Chandigarh Tricity, serving Chandigarh, Mohali and Zirakpur.",
  },
];

export default function HomePage() {
  const popularRoutes = activeRoutes.slice(0, 6);

  return (
    <main className="pb-sticky-cta md:pb-0">
      <Hero
        eyebrow="Chandigarh • Mohali • Zirakpur"
        title="Reliable Outstation Cabs from"
        titleAccent="Chandigarh Tricity"
        subtitle="Pre-booked one-way and round-trip taxis, plus Chandigarh Airport transfers. You get a confirmed fare, a confirmed vehicle and driver details before pickup."
        points={[
          "One-way & round-trip taxis",
          "Airport transfers",
          "Transparent pricing",
          "Friendly support on WhatsApp",
        ]}
        badges={heroBadges}
        image={{
          src: heroPhoto,
          alt: "A white sedan taxi on a hill road, with forested ridges falling away into the valley behind it",
        }}
      />

      <ServiceStrip />

      {/* Popular routes */}
      <Section>
        <Container className="space-y-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold md:text-3xl">Popular Outstation Routes</h2>
              <p className="text-muted-foreground">
                Most requested journeys from Chandigarh Tricity.
              </p>
            </div>
            <Link
              href="/routes"
              className="group flex min-h-11 items-center gap-1.5 text-sm font-semibold text-secondary-strong underline-offset-4 hover:underline"
            >
              View all routes
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <RouteCardGrid routes={popularRoutes} />
          </Reveal>
        </Container>
      </Section>

      {/* Split: brand statement + why us */}
      <Section tone="muted">
        <Container className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="relative isolate min-h-[300px] overflow-hidden rounded-2xl">
            <Image
              src={familySuvPhoto}
              alt="A family loading suitcases into an SUV at a mountain viewpoint, with snow-capped peaks behind"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06192B]/92 via-[#08273E]/60 to-[#08273E]/15" />
            <div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                More than a taxi service.
              </h2>
              <p className="mt-2 text-white/85">A travel partner you can rely on.</p>
              <span aria-hidden="true" className="mt-5 h-1 w-16 rounded-full bg-accent" />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <h2 className="text-2xl font-bold md:text-3xl">Why Choose Tricity Rides?</h2>
            </Reveal>
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {whyPoints.map((point, index) => (
                <Reveal as="li" key={point.title} delay={index * 60} className="flex gap-3">
                  <point.icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <div>
                    <h3 className="text-sm font-semibold text-primary">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {point.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Vehicles */}
      <Section>
        <Container className="space-y-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold md:text-3xl">Our Vehicle Options</h2>
              <p className="text-muted-foreground">
                Choose the right vehicle for a comfortable journey.
              </p>
            </div>
            <Link
              href="/get-quote"
              className="group flex min-h-11 items-center gap-1.5 text-sm font-semibold text-secondary-strong underline-offset-4 hover:underline"
            >
              Get vehicle options
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <VehicleGrid vehicles={activeVehicleTypes} />
          </Reveal>
        </Container>
      </Section>

      {/* Booking process */}
      <Section tone="muted">
        <Container className="space-y-8">
          <Reveal>
            <SectionHeading
              title="How booking works"
              description="Four steps from enquiry to a confirmed vehicle. Nothing is booked until you accept a quote."
            />
          </Reveal>
          <Reveal delay={80}>
            <BookingSteps />
          </Reveal>
        </Container>
      </Section>

      {/* Airport */}
      <Section>
        <Container>
          <Reveal className="grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card md:grid-cols-[1.3fr_1fr] md:p-10">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-secondary-strong uppercase">
                Airport transfers
              </p>
              <h2 className="text-2xl font-bold md:text-3xl">
                Chandigarh Airport pickups, drops and onward hill transfers
              </h2>
              <p className="measure leading-relaxed text-muted-foreground">
                Share your flight number and the pickup is planned around your actual arrival.
                Many travellers land at Chandigarh and continue straight to Shimla, Kasauli
                or Manali, and that whole journey can be booked as one trip.
              </p>
              <p className="text-sm text-muted-foreground">
                The airport sits on the Mohali side of Tricity, so Mohali and Zirakpur
                addresses are often a shorter run than the northern Chandigarh sectors.
              </p>
              <Link
                href="/chandigarh-airport-taxi"
                className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              >
                Airport taxi details
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  src={airportPhoto}
                  alt="Taxis waiting at the kerb outside an airport terminal as passengers arrive with luggage"
                  fill
                  sizes="(min-width: 768px) 38vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>

              <ul className="space-y-2.5">
                {activeLocations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/${location.slug}`}
                      className="group flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-muted/50 px-4 text-sm font-medium transition-colors duration-200 hover:border-secondary/40 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      Taxi service in {location.city}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-secondary transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ReviewsSection />

      {/* FAQ */}
      <Section tone="muted">
        <Container className="space-y-8">
          <Reveal>
            <SectionHeading
              title="Frequently Asked Questions"
              description="Quick answers to what customers ask before booking."
            />
          </Reveal>
          <Reveal delay={80}>
            <FaqList faqs={homeFaqs} columns={2} />
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="Ready for your next trip?"
        description={businessConfig.pricing.explanation}
        placement="home"
      />

      <MobileStickyCta />
    </main>
  );
}
