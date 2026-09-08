"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the site header and footer on the standalone card routes.
 *
 * /save-contact is a QR landing page: a customer scanning a printed visiting
 * card must land on "Save Contact", not on a site navigation menu. Children are
 * passed in rather than imported here, so the Footer stays a server component
 * and none of its markup is shipped as client JavaScript.
 */
const BARE_ROUTES = ["/save-contact"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );

  if (isBare) return null;

  return <>{children}</>;
}
