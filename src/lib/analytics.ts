"use client";

import { AnalyticsEvents, type AnalyticsEventName } from "@/config/analytics";
import { siteConfig } from "@/config/site";

type GtagFn = (
  command: "event" | "config" | "js",
  targetOrEvent: string | Date,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export const analyticsEnabled = Boolean(siteConfig.gaId);

/**
 * Sends an analytics event. Safe to call anywhere:
 * with no GA measurement ID configured this is a no-op and never throws.
 */
export function track(
  event: AnalyticsEventName,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  try {
    const payload = {
      ...params,
      page_path: window.location.pathname,
    };

    if (window.gtag) {
      window.gtag("event", event, payload);
    } else if (process.env.NODE_ENV === "development") {
      // Visible during development so the funnel can be checked without GA.
      console.info(`[analytics] ${event}`, payload);
    }
  } catch {
    /* analytics must never break the page */
  }
}

export { AnalyticsEvents };
