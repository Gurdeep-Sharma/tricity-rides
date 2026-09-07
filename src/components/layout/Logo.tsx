import Image from "next/image";
import Link from "next/link";

import logoMark from "@/assets/tricity_rides_logo_icon.png";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: the supplied mark plus the wordmark as live text.
 *
 * The full logo file (tricity_rides_logo.png) carries its own wordmark, but it
 * is a 2:1 lockup with a strapline that would be a few pixels tall inside a
 * 64px header. Keeping the wordmark as text stays legible, scales with the
 * user's font settings, and lets the footer flip to light type on the dark
 * background.
 */
export function Logo({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${brandConfig.name} — home`}
      className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {/* The mark's road and car are brand navy, which disappears against the
          navy footer, so on dark backgrounds it sits on a light disc. */}
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center",
          light && "rounded-full bg-white/95 p-1"
        )}
      >
        <Image
          src={logoMark}
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          priority
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.05rem] font-bold tracking-wide uppercase",
            light ? "text-primary-foreground" : "text-primary"
          )}
        >
          Tricity <span className={light ? "text-accent" : "text-secondary-strong"}>Rides</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.62rem] font-medium tracking-wide",
            light ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {brandConfig.geography.label}
        </span>
      </span>
    </Link>
  );
}
