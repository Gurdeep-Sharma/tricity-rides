import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

/** Mountain-road mark. A supplied logo asset can replace the SVG in place. */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 34" className={cn("h-8 w-10", className)} aria-hidden="true">
      <path d="M2 26 L14 8 L22 20 L27 13 L42 26 Z" fill="currentColor" opacity="0.9" />
      <path d="M14 8 L18.5 14.75 L14 17 L9.5 14.75 Z" fill="#FFFFFF" opacity="0.55" />
      <path
        d="M1 30 C 12 30, 14 24, 24 24 C 34 24, 36 30, 43 30"
        stroke="#F4B942"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${brandConfig.name} — home`}
      className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <LogoMark className={light ? "text-primary-foreground" : "text-primary"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.05rem] font-bold tracking-wide uppercase",
            light ? "text-primary-foreground" : "text-primary"
          )}
        >
          Tricity <span className={light ? "text-accent" : "text-secondary-strong"}>Ride</span>
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
