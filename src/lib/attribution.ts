"use client";

/**
 * First-touch attribution stored in localStorage for 30 days.
 *
 * This must never block a lead submission: every read and write is wrapped, and
 * an empty result is a perfectly valid outcome (private browsing, blocked storage).
 */

export interface StoredAttribution {
  source?: string;
  medium?: string;
  campaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt?: string;
}

const STORAGE_KEY = "tr_attribution_v1";
const TTL_DAYS = 30;
const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;

function safeGet(): (StoredAttribution & { capturedAt?: string }) | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed.capturedAt) return parsed;
    if (Date.now() - Date.parse(parsed.capturedAt) > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeSet(value: StoredAttribution): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable — attribution is optional, never block the user */
  }
}

/** Derives source/medium from the referrer when no UTM parameters are present. */
function deriveFromReferrer(referrer: string): { source: string; medium: string } {
  if (!referrer) return { source: "direct", medium: "none" };

  let host = "";
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return { source: "direct", medium: "none" };
  }

  if (!host || host === window.location.hostname) {
    return { source: "direct", medium: "none" };
  }

  const searchEngines: Record<string, string> = {
    "google.com": "google",
    "google.co.in": "google",
    "bing.com": "bing",
    "duckduckgo.com": "duckduckgo",
    "search.yahoo.com": "yahoo",
    "ecosia.org": "ecosia",
  };

  const social: Record<string, string> = {
    "facebook.com": "facebook",
    "instagram.com": "instagram",
    "l.instagram.com": "instagram",
    "t.co": "twitter",
    "x.com": "twitter",
    "linkedin.com": "linkedin",
    "youtube.com": "youtube",
  };

  for (const [domain, name] of Object.entries(searchEngines)) {
    if (host === domain || host.endsWith(`.${domain}`)) {
      return { source: name, medium: "organic" };
    }
  }

  for (const [domain, name] of Object.entries(social)) {
    if (host === domain || host.endsWith(`.${domain}`)) {
      return { source: name, medium: "social" };
    }
  }

  if (host.includes("whatsapp")) return { source: "whatsapp", medium: "referral" };

  return { source: host, medium: "referral" };
}

/**
 * Captures first-touch attribution once per visitor.
 * UTM parameters, when present, override the values derived from the referrer.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const existing = safeGet();
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") || undefined;
    const hasUtm = Boolean(utmSource || params.get("utm_medium") || params.get("utm_campaign"));

    // Keep the first touch unless this visit carries its own campaign parameters.
    if (existing && !hasUtm) return;

    const referrer = document.referrer || "";
    const derived = deriveFromReferrer(referrer);

    const attribution: StoredAttribution = {
      utmSource,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
      source: utmSource || derived.source,
      medium: params.get("utm_medium") || derived.medium,
      campaign: params.get("utm_campaign") || undefined,
      landingPage: `${window.location.pathname}${window.location.search}`.slice(0, 500),
      referrer: referrer.slice(0, 500) || undefined,
      capturedAt: new Date().toISOString(),
    };

    safeSet(attribution);
  } catch {
    /* never let attribution capture throw into the page */
  }
}

/** Attribution to send with a lead. Returns an empty object when unavailable. */
export function getAttribution(): StoredAttribution {
  if (typeof window === "undefined") return {};

  try {
    const stored = safeGet() ?? {};
    const { capturedAt: _capturedAt, ...rest } = stored;
    void _capturedAt;

    const cleaned: StoredAttribution = {};
    for (const [key, value] of Object.entries(rest)) {
      if (typeof value === "string" && value.trim().length > 0) {
        cleaned[key as keyof StoredAttribution] = value.slice(0, 500);
      }
    }

    // Always report the page the lead was actually submitted from if nothing was stored.
    if (!cleaned.landingPage) {
      cleaned.landingPage = window.location.pathname.slice(0, 500);
    }

    return cleaned;
  } catch {
    return {};
  }
}
