# Architecture — Phase 1

## Shape

Tricity Ride is a **single Next.js application**. There is no separate backend
service, no second package.json and no second deployment.

```
Browser
  → Next.js (App Router, React 19, Tailwind v4, shadcn/base-ui)
    → /api/leads            (Route Handler: validation, anti-spam, persistence)
      → Prisma
        → MongoDB
    → SMTP / Gmail          (internal notification, fired after the response)
```

A dedicated backend service can be introduced later if operational scale
requires it. Nothing in Phase 1 depends on that happening.

## Directory map

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Homepage |
| `src/app/[slug]/page.tsx` | One dynamic segment serving every route, service and location page |
| `src/app/routes`, `get-quote`, `contact`, `terms`, `privacy` | Supporting pages |
| `src/app/api/leads/route.ts` | Lead creation endpoint |
| `src/app/api/leads/[reference]/whatsapp-click/route.ts` | WhatsApp click telemetry |
| `src/app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `not-found.tsx` | Technical SEO |
| `src/config/` | `brand`, `business` (canonical NAP), `site`, `analytics` |
| `src/data/` | `routes`, `services`, `locations`, `vehicles`, `faqs`, `reviews`, `pages` resolver |
| `src/components/templates/` | `RouteLanding`, `ServiceLanding`, `LocationLanding` |
| `src/components/lead-form/` | `LeadForm`, `SuccessPanel` |
| `src/lib/` | `validation/lead`, `whatsapp`, `attribution`, `analytics`, `seo`, `reference`, `format` |
| `src/lib/server/` | `rate-limit`, `request`, `notify-email` |
| `src/components/art/` | `HeroBackdrop`, `RouteArt`, `VehicleArt` — designed SVG scenery |
| `src/components/motion/` | `Reveal` scroll animation, `useScrolled` header hook |
| `prisma/` | Schema (MongoDB; applied with `prisma db push`) |

## Content architecture

Content, SEO metadata and business rules are separated:

- **Route/service/location data** lives in `src/data/*.ts` as typed objects.
- **Pricing and policy rules** live in `src/config/business.ts`, never in components.
- **Templates** render whatever the data gives them, so adding a route means
  adding one object, not writing a page.

`src/data/pages.ts` resolves a flat slug to whichever entity owns it. The
`[slug]` segment sets `dynamicParams = false`, so only slugs present in the data
files exist and everything else is a 404.

## Imagery and motion

The reference design calls for destination photography and product shots of
cars. No licensed imagery exists for this project, and fabricating photographs
of real places or implying a specific vehicle is not acceptable, so every image
slot is filled by a designed SVG scene in the brand palette:

- `HeroBackdrop` — layered ridges, mist and a valley road behind the hero and
  the closing CTA band.
- `RouteArt` — one of seven destination motifs (`snow-peaks`, `hill-town`,
  `monument`, `golden-temple`, `river-ghats`, `palace`, `valley`), chosen per
  route through `RouteData.motif`.
- `VehicleArt` — neutral side profiles keyed off `VehicleType.shape`.

`RouteData.image` remains the slot for real photography. Dropping files in and
rendering them through `next/image` replaces the artwork without touching any
component.

Motion is deliberately restrained. Above-the-fold content animates once on load
with a short stagger; everything below animates in on scroll through `Reveal`.
`Reveal` is written so decoration can never hide content: it shows immediately
when `IntersectionObserver` is unavailable, carries a timeout failsafe if the
observer never fires, and the reduced-motion block in `globals.css` forces the
visible state and cancels hover transforms.

## Rendering

All 18 landing pages plus the static pages are prerendered at build time.
`/api/*` is dynamic. `/get-quote` is server-rendered because it reads
`searchParams` to prefill the form.

## What Phase 1 deliberately does not contain

No admin dashboard, vendor or driver portal, customer accounts, payment
gateway, dispatch, tracking, SMS, WhatsApp Business API or CRM. Phase 1 ends at
ENQUIRY → LEAD → CUSTOMER CONTACT.
