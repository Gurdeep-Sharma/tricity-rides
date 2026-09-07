import Link from "next/link";
import { ArrowRight, Clock, Navigation } from "lucide-react";

import { DestinationImage } from "@/components/art/DestinationImage";
import { formatDuration, type RouteData } from "@/data/routes";
import { businessConfig } from "@/config/business";

/**
 * Route card with a destination scene on top.
 *
 * The whole card is one link, so mobile gets a large tap target and keyboard
 * users get a single focus stop. No fare is shown: pricing stays off until it
 * is commercially approved, so the card promises a confirmed quote instead.
 */
export function RouteCard({ route }: { route: RouteData }) {
  return (
    <li>
      <Link
        href={`/${route.slug}`}
        className="lift group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card hover:border-secondary/40 hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]">
            <DestinationImage
              route={route}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
          <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-2.5 py-1 text-[0.68rem] font-semibold text-primary backdrop-blur">
            {route.destinationState}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-semibold text-primary">{route.displayName}</h3>

          <dl className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Navigation aria-hidden="true" className="size-3.5 text-secondary" />
              <dt className="sr-only">Approximate distance</dt>
              <dd>~{route.distanceKm} km</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock aria-hidden="true" className="size-3.5 text-secondary" />
              <dt className="sr-only">Approximate duration</dt>
              <dd>{formatDuration(route)}</dd>
            </div>
          </dl>

          {/* Route-specific line, so no two cards read the same */}
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {route.heroSubtitle}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg bg-muted px-3 py-2 text-sm font-semibold text-primary transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-foreground">
            {businessConfig.pricing.quoteCta}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </li>
  );
}

export function RouteCardGrid({ routes }: { routes: RouteData[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {routes.map((route) => (
        <RouteCard key={route.slug} route={route} />
      ))}
    </ul>
  );
}
