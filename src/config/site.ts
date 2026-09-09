import { brandConfig } from "@/config/brand";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteConfig = {
  /** Absolute origin without trailing slash. */
  url: rawSiteUrl.replace(/\/+$/, ""),
  name: brandConfig.name,
  defaultTitle: `${brandConfig.name} | Outstation Taxi & Airport Cabs from Chandigarh`,
  titleTemplate: `%s | ${brandConfig.name}`,
  defaultDescription: brandConfig.description,
  locale: "en_IN",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  /** Bing Webmaster Tools token, rendered as <meta name="msvalidate.01">. */
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
} as const;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalised}`;
}
