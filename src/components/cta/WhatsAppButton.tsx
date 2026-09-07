"use client";

import { MessageCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { buildEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  /** What the customer is enquiring about, e.g. "Chandigarh to Shimla". */
  context?: string;
  /** Where on the site the click happened, for reporting. */
  placement: string;
  label?: string;
  className?: string;
  size?: "default" | "lg" | "xl";
  variant?: "whatsapp" | "outline";
  /** Pre-built URL, used by the enquiry success panel. */
  href?: string;
  onClick?: () => void;
}

/**
 * This navigates to WhatsApp, so it is a real anchor styled as a button rather
 * than a button element. Screen readers announce it as a link, and the browser
 * keeps open-in-new-tab and copy-link behaviour.
 */
export function WhatsAppButton({
  context,
  placement,
  label = "WhatsApp Us",
  className,
  size = "xl",
  variant = "whatsapp",
  href,
  onClick,
}: WhatsAppButtonProps) {
  const url = href ?? buildEnquiryWhatsAppUrl(context);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="button"
      onClick={() => {
        track(AnalyticsEvents.WHATSAPP_CLICK, { placement, context: context ?? null });
        onClick?.();
      }}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <MessageCircle aria-hidden="true" />
      {label}
    </a>
  );
}
