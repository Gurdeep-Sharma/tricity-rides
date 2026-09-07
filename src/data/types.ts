export type TripTypeValue = "ONE_WAY" | "ROUND_TRIP" | "AIRPORT";

export interface Faq {
  question: string;
  answer: string;
}

export interface SeoMeta {
  title: string;
  description: string;
}

export interface PrefillHint {
  pickup?: string;
  destination?: string;
  tripType?: TripTypeValue;
}

/** Shared shape used by route, service and location landing pages. */
export interface BasePage {
  slug: string;
  h1: string;
  heroSubtitle: string;
  seo: SeoMeta;
  faqs: Faq[];
  active: boolean;
  priority: number;
}
