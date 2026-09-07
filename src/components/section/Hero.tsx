import Image from "next/image";
import type { StaticImageData } from "next/image";

import { HeroBackdrop } from "@/components/art/HeroBackdrop";
import { Container } from "@/components/section/Section";
import { LeadForm } from "@/components/lead-form/LeadForm";
import type { LeadFormPrefill } from "@/components/lead-form/types";
import { cn } from "@/lib/utils";

/**
 * Scenic hero with the quote card alongside.
 *
 * Above-the-fold content animates on load with a short stagger rather than on
 * scroll, so nothing important waits for an observer.
 */
export function Hero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  points,
  badges,
  formHeading,
  prefill,
  chips,
  image,
  imagePosition,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  /** Rendered in the accent colour on its own line. */
  titleAccent?: string;
  subtitle: string;
  /** Short bullet-separated benefit lines. */
  points?: string[];
  badges?: { icon: React.ComponentType<{ className?: string }>; title: string; detail: string }[];
  formHeading?: string;
  prefill?: LeadFormPrefill;
  /** Factual chips such as distance and duration, used on route pages. */
  chips?: React.ReactNode;
  /** Photograph behind the hero. Falls back to the drawn scene when absent. */
  image?: { src: StaticImageData; alt: string };
  /** CSS object-position for the hero photo, when the default crop is wrong. */
  imagePosition?: string;
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      {image ? (
        <div className="absolute inset-0 bg-[#05192B]">
          {/* The hero grows when the form gains its return-trip fields, so the
              photo box is given a geometry that does not depend on the section
              height. Otherwise `cover` re-crops and the background visibly
              zooms when the trip type changes.
              Narrow screens: a banner at the top that fades into the base
              colour, which also avoids cropping a landscape photo into a very
              tall column. Large screens: a fixed tall box the section clips. */}
          <div className="absolute inset-x-0 top-0 h-[70vh] max-h-[600px] lg:h-[1040px] lg:max-h-none">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              className="object-cover"
              /* Focal point chosen so the ridges and road read beside the copy
                 rather than sitting behind the quote card. */
              style={{ objectPosition: imagePosition ?? "30% 55%" }}
            />
            {/* Blends the bottom of the banner into the base colour on narrow
                screens, so the band has no visible edge. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-32 lg:hidden"
              style={{
                background: "linear-gradient(0deg, #05192B 0%, rgba(5,25,43,0) 100%)",
              }}
            />
          </div>
          {/* Scrim. The copy ends around 51% of the width, so the gradient stays
              dense out to ~48% and then clears, letting the photograph show on
              the right. It is opaque enough that white text clears 4.5:1 even
              if the photo behind it were pure white, so swapping the image can
              never break contrast. */}
          {/* Narrow screens: text spans the full width, so the scrim has to be
              even rather than graded left-to-right. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,25,43,0.86) 0%, rgba(5,25,43,0.90) 55%, rgba(5,25,43,0.94) 100%)",
            }}
          />
          {/* Wide screens: dense behind the copy column, clearing to the right. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 max-md:hidden"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,25,43,0.95) 0%, rgba(5,25,43,0.92) 30%, rgba(5,25,43,0.82) 53%, rgba(6,32,52,0.45) 66%, rgba(7,38,60,0.12) 82%, rgba(7,38,60,0.05) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(5,25,43,0.38) 0%, rgba(5,25,43,0) 22%)",
            }}
          />
        </div>
      ) : (
        <HeroBackdrop />
      )}

      <Container
        className={cn(
          "relative grid items-start gap-8 pt-28 pb-14 lg:grid-cols-[1.05fr_minmax(360px,0.92fr)] lg:gap-12",
          compact ? "md:pt-32 md:pb-16" : "md:pt-36 md:pb-20"
        )}
      >
        <div className="space-y-6">
          {eyebrow ? (
            <p
              className="enter-fade text-xs font-semibold tracking-[0.18em] text-accent uppercase"
              style={{ "--enter-delay": "40ms" } as React.CSSProperties}
            >
              {eyebrow}
            </p>
          ) : null}

          <h1
            className="enter-up text-[2rem] leading-[1.1] font-bold sm:text-4xl lg:text-[3.4rem]"
            style={{ "--enter-delay": "90ms" } as React.CSSProperties}
          >
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className="text-accent">{titleAccent}</span>
              </>
            ) : null}
          </h1>

          <p
            className="enter-up measure text-base text-white/85 sm:text-lg"
            style={{ "--enter-delay": "150ms" } as React.CSSProperties}
          >
            {subtitle}
          </p>

          {points?.length ? (
            <ul
              className="enter-up flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-white/80"
              style={{ "--enter-delay": "200ms" } as React.CSSProperties}
            >
              {points.map((point, index) => (
                <li key={point} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="size-1 rounded-full bg-accent/80" />
                  ) : null}
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          {chips ? (
            <div
              className="enter-up"
              style={{ "--enter-delay": "220ms" } as React.CSSProperties}
            >
              {chips}
            </div>
          ) : null}

          {badges?.length ? (
            <ul
              className="enter-up flex flex-wrap gap-2 pt-1"
              style={{ "--enter-delay": "260ms" } as React.CSSProperties}
            >
              {badges.map((badge) => (
                <li
                  key={badge.title}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
                >
                  <badge.icon className="size-4.5 shrink-0 text-accent" />
                  <span className="leading-tight">
                    <span className="block text-[0.8rem] font-semibold">{badge.title}</span>
                    <span className="block text-[0.68rem] text-white/70">{badge.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div
          className="enter-up text-foreground"
          style={{ "--enter-delay": "160ms" } as React.CSSProperties}
        >
          <LeadForm prefill={prefill} heading={formHeading ?? "Get a Quote"} />
        </div>
      </Container>
    </section>
  );
}
