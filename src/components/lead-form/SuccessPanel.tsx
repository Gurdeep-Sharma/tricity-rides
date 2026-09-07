"use client";

import { CheckCircle2, MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/config/business";
import { track, AnalyticsEvents } from "@/lib/analytics";
import type { LeadSuccess } from "@/components/lead-form/types";

/**
 * Shown after the lead is stored.
 *
 * WhatsApp opens only when the customer taps the button; there is no automatic
 * redirect. The wording says an enquiry was received, never that a taxi,
 * vehicle or driver has been confirmed, because at this point none has been.
 */
export function SuccessPanel({
  result,
  onReset,
}: {
  result: LeadSuccess;
  onReset: () => void;
}) {
  function recordWhatsAppClick() {
    track(AnalyticsEvents.WHATSAPP_CLICK, {
      placement: "lead-success",
      reference: result.reference,
    });

    // Telemetry only: fired without awaiting so it can never delay or block
    // WhatsApp from opening, and a failure here is silently ignored.
    try {
      const url = `/api/leads/${encodeURIComponent(result.reference)}/whatsapp-click`;
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(url);
      } else {
        void fetch(url, { method: "POST", keepalive: true }).catch(() => {});
      }
    } catch {
      /* ignored */
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-3">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-7 shrink-0 text-[var(--success)]" />
        <div>
          <h2 className="text-xl font-bold text-primary">Enquiry Received</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {result.duplicate
              ? "We already have this enquiry, so we have not created a second one."
              : "Thank you. Your enquiry is with our team."}{" "}
            We will check availability and come back to you with a fare and vehicle options.
          </p>
        </div>
      </div>

      <dl className="mt-5 rounded-xl bg-muted/60 px-4 py-3">
        <dt className="text-sm text-muted-foreground">Your reference</dt>
        <dd className="font-mono text-lg font-bold tracking-wide text-primary">
          {result.reference}
        </dd>
      </dl>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {businessConfig.policies.enquiry} Continue on WhatsApp for the quickest reply, or
        call us if you prefer to speak to someone.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        {/* Both navigate away, so they stay anchors styled as buttons. */}
        {result.whatsappUrl ? (
          <a
            href={result.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-slot="button"
            onClick={recordWhatsAppClick}
            className={cn(buttonVariants({ variant: "whatsapp", size: "xl" }), "flex-1")}
          >
            <MessageCircle aria-hidden="true" />
            WhatsApp Us
          </a>
        ) : null}

        <a
          href={businessConfig.contact.phoneHref}
          data-slot="button"
          onClick={() =>
            track(AnalyticsEvents.PHONE_CLICK, {
              placement: "lead-success",
              reference: result.reference,
            })
          }
          className={cn(buttonVariants({ variant: "outline", size: "xl" }), "flex-1")}
        >
          <Phone aria-hidden="true" />
          Call Now
        </a>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 min-h-11 cursor-pointer text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Send another enquiry
      </button>
    </div>
  );
}
