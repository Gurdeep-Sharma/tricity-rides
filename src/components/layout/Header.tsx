"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { useScrolled } from "@/components/motion/ScrollHeader";
import { businessConfig } from "@/config/business";
import { track, AnalyticsEvents } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/outstation-taxi-chandigarh", label: "Outstation" },
  { href: "/chandigarh-airport-taxi", label: "Airport Taxi" },
  { href: "/local-taxi-chandigarh", label: "Local Taxi" },
  { href: "/routes", label: "Popular Routes" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-3 sm:pt-4">
      <div className="container-page">
        <div
          className={cn(
            "pointer-events-auto rounded-2xl border border-white/70 bg-surface/95 backdrop-blur",
            "transition-shadow duration-300",
            scrolled ? "shadow-header" : "shadow-card"
          )}
        >
          <nav
            aria-label="Main"
            className={cn(
              "flex items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-5",
              scrolled ? "h-14" : "h-16"
            )}
          >
            <Logo />

            <ul className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-200",
                        "after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-200",
                        "hover:text-primary hover:after:scale-x-100",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        active ? "text-primary after:scale-x-100" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={businessConfig.contact.phoneHref}
                onClick={() => track(AnalyticsEvents.PHONE_CLICK, { placement: "header" })}
                className="group flex min-h-11 items-center gap-2.5 rounded-lg px-2 transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-white transition-transform duration-200 group-hover:scale-105">
                  <Phone aria-hidden="true" className="size-4" />
                </span>
                <span className="hidden flex-col leading-none sm:flex">
                  <span className="text-sm font-bold text-primary">
                    {businessConfig.contact.phoneDisplay}
                  </span>
                  <span className="mt-0.5 text-[0.66rem] text-muted-foreground">
                    Call or WhatsApp
                  </span>
                </span>
                <span className="sr-only sm:hidden">
                  Call {businessConfig.contact.phoneDisplay}
                </span>
              </a>

              <button
                type="button"
                className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-primary transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </div>
          </nav>

          <div id="mobile-menu" hidden={!open} className="border-t border-border lg:hidden">
            <ul className="flex flex-col p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-lg px-3 font-medium text-primary transition-colors duration-200 hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="p-1 pt-2">
                <Link
                  href="/get-quote"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-xl bg-accent px-4 font-semibold text-accent-foreground transition-colors duration-200"
                >
                  Get My Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
