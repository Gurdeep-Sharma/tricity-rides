import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Primary conversion call to action. It navigates to the lead form, so it is a
 * link styled as a button rather than a button element.
 */
export function QuoteButton({
  href = "#quote",
  label = "Get My Quote",
  className,
  size = "xl",
  variant = "accent",
}: {
  href?: string;
  label?: string;
  className?: string;
  size?: "default" | "lg" | "xl";
  variant?: "accent" | "default" | "outline";
}) {
  return (
    <Link
      href={href}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {label}
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}
