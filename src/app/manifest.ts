import type { MetadataRoute } from "next";

import { brandConfig } from "@/config/brand";

/**
 * Web app manifest, replacing the placeholder site.webmanifest that shipped
 * with the icon set. Names come from the brand config so there is one source
 * of truth.
 *
 * The icons are declared `any` rather than `maskable`: a maskable icon is
 * cropped to a circular safe zone, and this mark fills its canvas, so
 * declaring it maskable would clip the outer ring on Android.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brandConfig.name} — ${brandConfig.tagline}`,
    short_name: brandConfig.name,
    description: brandConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: brandConfig.colors.background,
    theme_color: brandConfig.colors.primary,
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
