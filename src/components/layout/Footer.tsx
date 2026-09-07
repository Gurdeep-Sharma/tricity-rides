import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { businessConfig } from "@/config/business";
import { brandConfig } from "@/config/brand";
import { activeRoutes } from "@/data/routes";
import { activeServices } from "@/data/services";
import { activeLocations } from "@/data/locations";

export default function Footer() {
  const year = new Date().getFullYear();

  // Social links appear only where a real profile URL is configured, so the
  // footer never links to an account that does not exist. Text labels are used
  // rather than brand marks, which this icon set no longer ships.
  const socialLinks: { label: string; href: string }[] = [
    { label: "Facebook", href: businessConfig.social.facebook },
    { label: "Instagram", href: businessConfig.social.instagram },
  ].filter((item) => item.href.length > 0);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo tone="light" />
            <p className="measure text-sm leading-relaxed text-primary-foreground/80">
              {brandConfig.description}
            </p>
            <p className="text-sm text-primary-foreground/70">
              {businessConfig.hours.label}
            </p>
          </div>

          <nav aria-label="Popular routes" className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wide uppercase">Popular routes</h2>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {activeRoutes.slice(0, 8).map((route) => (
                <li key={route.slug}>
                  <Link
                    href={`/${route.slug}`}
                    className="rounded underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {route.displayName} Taxi
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/routes" className="font-medium underline-offset-4 hover:underline">
                  All routes
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services and areas" className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wide uppercase">Services</h2>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {activeServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="rounded underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {service.h1}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="pt-3 text-sm font-semibold tracking-wide uppercase">Service areas</h2>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {activeLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/${location.slug}`}
                    className="rounded underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {location.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wide uppercase">Contact</h2>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>
                <a
                  href={businessConfig.contact.phoneHref}
                  className="flex min-h-11 items-center gap-2 rounded underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Phone aria-hidden="true" className="size-4 shrink-0" />
                  {businessConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${businessConfig.contact.email}`}
                  className="flex min-h-11 items-center gap-2 rounded underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {businessConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>
                  Serving {businessConfig.serviceAreaLabel}. We operate as a service-area
                  business and do not run a walk-in office.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-primary-foreground/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-primary-foreground/70">
            &copy; {year} {brandConfig.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <ul className="flex flex-wrap gap-4 text-sm text-primary-foreground/70">
              <li>
                <Link href="/terms" className="underline-offset-4 hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="underline-offset-4 hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            {/* Only rendered for profiles that actually exist. */}
            {socialLinks.length > 0 ? (
              <ul className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-9 items-center rounded-full bg-primary-foreground/10 px-3.5 text-xs font-medium transition-colors duration-200 hover:bg-primary-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
