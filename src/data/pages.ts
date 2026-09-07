import { activeRoutes, getRouteBySlug, type RouteData } from "@/data/routes";
import { activeServices, getServiceBySlug, type ServicePage } from "@/data/services";
import { activeLocations, getLocationBySlug, type LocationPage } from "@/data/locations";

export type ResolvedPage =
  | { kind: "route"; data: RouteData }
  | { kind: "service"; data: ServicePage }
  | { kind: "location"; data: LocationPage };

/** Resolves a flat URL slug to the entity that owns it. */
export function resolvePage(slug: string): ResolvedPage | null {
  const route = getRouteBySlug(slug);
  if (route) return { kind: "route", data: route };

  const service = getServiceBySlug(slug);
  if (service) return { kind: "service", data: service };

  const location = getLocationBySlug(slug);
  if (location) return { kind: "location", data: location };

  return null;
}

/** Every statically generated flat slug. */
export function allPageSlugs(): string[] {
  return [
    ...activeServices.map((s) => s.slug),
    ...activeLocations.map((l) => l.slug),
    ...activeRoutes.map((r) => r.slug),
  ];
}

/** Human label for a slug, used by breadcrumbs and internal link lists. */
export function labelForSlug(slug: string): string {
  const page = resolvePage(slug);
  if (!page) return slug;
  if (page.kind === "route") return `${page.data.displayName} Taxi`;
  return page.data.h1;
}
