import type { TripTypeValue } from "@/lib/validation/lead";

export interface LeadFormPrefill {
  pickup?: string;
  destination?: string;
  tripType?: TripTypeValue;
  /** Slug of the page the enquiry came from, stored with the lead. */
  routeSlug?: string;
}

export interface LeadSuccess {
  reference: string;
  whatsappUrl: string | null;
  duplicate: boolean;
}
