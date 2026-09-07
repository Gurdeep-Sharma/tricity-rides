import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics, AttributionCapture } from "@/components/analytics/Analytics";
import { organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { brandConfig } from "@/config/brand";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
  applicationName: brandConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
  robots: { index: true, follow: true },
  verification: siteConfig.googleSiteVerification
    ? { google: siteConfig.googleSiteVerification }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: brandConfig.colors.primary,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Header />
        <div id="main-content" className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
        <AttributionCapture />
        <Analytics />
      </body>
    </html>
  );
}
