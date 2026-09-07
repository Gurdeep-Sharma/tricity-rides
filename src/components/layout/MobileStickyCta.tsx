"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

import { buildEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

/** Approximate height of the bar, in px, including its padding. */
const BAR_HEIGHT = 76;

/**
 * Mobile-only bottom CTA bar.
 *
 * It hides while the lead form occupies the strip of viewport the bar sits in,
 * so it never covers the fields the customer is filling in. The overlap is
 * measured directly from the element's position on scroll and resize rather
 * than via IntersectionObserver, which keeps the behaviour deterministic.
 */
export function MobileStickyCta({
  context,
  quoteHref = "#quote",
}: {
  context?: string;
  quoteHref?: string;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const form = document.getElementById("quote");
    if (!form) return;

    // A single getBoundingClientRect per event is cheap, and reading it
    // directly keeps the bar correct even where rAF callbacks are throttled.
    const update = () => {
      const rect = form.getBoundingClientRect();
      const barTop = window.innerHeight - BAR_HEIGHT;
      // Hide while the form overlaps the band the bar occupies.
      setHidden(rect.top < window.innerHeight && rect.bottom > barTop);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      hidden={hidden}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-2px_12px_rgba(18,59,93,0.10)] backdrop-blur md:hidden"
    >
      <div className="flex items-center gap-2">
        <a
          href={buildEnquiryWhatsAppUrl(context)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track(AnalyticsEvents.WHATSAPP_CLICK, {
              placement: "mobile-sticky",
              context: context ?? null,
            })
          }
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 font-semibold text-whatsapp-foreground transition-colors duration-200"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          WhatsApp
        </a>
        <Link
          href={quoteHref}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 font-semibold text-accent-foreground transition-colors duration-200"
        >
          Get Quote
          <ArrowRight aria-hidden="true" className="size-5" />
        </Link>
      </div>
    </div>
  );
}
