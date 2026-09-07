"use client";

import { useEffect, useState } from "react";

/**
 * Reports whether the page has been scrolled past a small threshold, so the
 * floating header can tighten and deepen its shadow. Reads scrollY directly on
 * a passive listener rather than relying on rAF or an observer.
 */
export function useScrolled(threshold = 12): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
