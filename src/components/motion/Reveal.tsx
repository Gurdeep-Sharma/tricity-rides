"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals its children with a short fade-and-rise when they scroll into view.
 *
 * Safety rules this follows, because a decorative effect must never be able to
 * hide real content:
 *  - If IntersectionObserver is unavailable, content shows immediately.
 *  - A timeout fallback reveals the content even if the observer never fires.
 *  - Under prefers-reduced-motion the CSS forces the visible state anyway.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  /** Stagger in ms. Keep small; long chains feel sluggish. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Failsafe: if the observer never reports (some embedded or automated
    // browsers never fire it), show the content regardless.
    const failsafe = window.setTimeout(() => setVisible(true), 700);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
          window.clearTimeout(failsafe);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
