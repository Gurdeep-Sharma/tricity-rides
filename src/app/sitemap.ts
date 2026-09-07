import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { activeRoutes } from "@/data/routes";
import { activeServices } from "@/data/services";
import { activeLocations } from "@/data/locations";

/**
 * Only pages worth indexing are listed.
 * The API and any future internal tooling are excluded here and in robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${siteConfig.url}${path}`;

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: url("/get-quote"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/routes"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/contact"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/terms"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = activeServices.map((service) => ({
    url: url(`/${service.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const locationPages: MetadataRoute.Sitemap = activeLocations.map((location) => ({
    url: url(`/${location.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const routePages: MetadataRoute.Sitemap = activeRoutes.map((route) => ({
    url: url(`/${route.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route.priority <= 5 ? 0.9 : 0.7,
  }));

  return [...core, ...servicePages, ...locationPages, ...routePages];
}
