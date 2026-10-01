import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * AI search and assistant crawlers, named so it is explicit that they are
 * welcome. A crawler obeys only the most specific group that names it, so this
 * group must repeat every disallow in the `*` group.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

const disallow = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
