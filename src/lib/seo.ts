import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import { brandConfig } from "@/config/brand";
import type { Faq } from "@/data/types";

export interface BuildMetadataInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/chandigarh-to-shimla-taxi". */
  path: string;
  noIndex?: boolean;
}

/**
 * The generated brand card at app/opengraph-image.tsx.
 * Declaring it explicitly is required: defining an `openGraph` object on a page
 * replaces the image the file convention would otherwise inherit down the tree.
 */
const ogImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: "Tricity Rides — outstation taxis and airport cabs from Chandigarh",
};

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

/** Serialises JSON-LD with `<` escaped, per the Next.js JSON-LD guidance. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const areaServed = businessConfig.serviceAreas.map((area) => ({
  "@type": "City" as const,
  name: area.name,
}));

/**
 * Organisation-level structured data.
 * Deliberately contains no aggregateRating, review or price information,
 * because none of those exist yet and schema must match the visible page.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService"],
    "@id": `${siteConfig.url}/#organization`,
    name: businessConfig.legalName,
    description: brandConfig.description,
    url: siteConfig.url,
    telephone: businessConfig.contact.phone,
    email: businessConfig.contact.email,
    areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressRegion: "Chandigarh",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Outstation taxi from Chandigarh",
      "Chandigarh Airport transfers",
      "One-way and round-trip cabs",
      "Local taxi hire in Chandigarh Tricity",
    ],
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: absoluteUrl(input.path),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Only call this when the same questions and answers are visible on the page. */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
