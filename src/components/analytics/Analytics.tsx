"use client";

import { useEffect } from "react";
import Script from "next/script";
import { siteConfig } from "@/config/site";
import { captureAttribution } from "@/lib/attribution";

/**
 * Captures first-touch attribution on load.
 * Wrapped so a storage failure can never break rendering.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}

/**
 * Loads GA4 only when NEXT_PUBLIC_GA_ID is configured.
 * With no ID the site behaves normally and every event becomes a no-op.
 */
export function Analytics() {
  if (!siteConfig.gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${siteConfig.gaId}');`}
      </Script>
    </>
  );
}
