"use client";

import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { businessConfig } from "@/config/business";
import { track, AnalyticsEvents } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface PhoneButtonProps {
  placement: string;
  /** Shows the number instead of "Call Now" — useful on desktop and in the footer. */
  showNumber?: boolean;
  className?: string;
  size?: "default" | "lg" | "xl";
  variant?: "default" | "outline" | "ghost" | "accent";
}

/** A `tel:` link styled as a button, so it keeps link semantics. */
export function PhoneButton({
  placement,
  showNumber = false,
  className,
  size = "xl",
  variant = "outline",
}: PhoneButtonProps) {
  return (
    <a
      href={businessConfig.contact.phoneHref}
      data-slot="button"
      onClick={() => track(AnalyticsEvents.PHONE_CLICK, { placement })}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <Phone aria-hidden="true" />
      {showNumber ? businessConfig.contact.phoneDisplay : "Call Now"}
    </a>
  );
}
