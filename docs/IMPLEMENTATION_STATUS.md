# Implementation status

Phase 1 (lead generation) is built. This file records what still needs a human
decision or a real-world credential.

## Blocking before launch

| Item | Where | Why it matters |
|---|---|---|
| **Business email** | `NEXT_PUBLIC_BUSINESS_EMAIL` | Defaults to `booking@tricityride.com`, which may not exist yet. |
| **Production database** | `DATABASE_URL` | A managed MongoDB instance. `npx prisma db push` must be run against it before the first lead arrives, otherwise the `reference` unique index does not exist. |
| **SMTP credentials** | `SMTP_USER`, `SMTP_PASSWORD`, `LEAD_NOTIFICATION_EMAIL` | Without them leads are still stored, but nobody is notified by email. For Gmail this must be an App Password with 2-Step Verification enabled; an account password will not authenticate. |
| **Site URL** | `NEXT_PUBLIC_SITE_URL` | Drives canonical URLs, Open Graph and the sitemap. |

## Configured

| Item | Value | Where |
|---|---|---|
| **Business line (calls and WhatsApp)** | `+91 98786 49610` | Default in `src/config/business.ts`, overridable with `NEXT_PUBLIC_PHONE_NUMBER`. Drives every `tel:` link, the number shown in the header and footer, every click-to-chat button, the URL the lead API returns after an enquiry, and the `telephone` field in the `LocalBusiness` structured data. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` only if the two ever need to differ. |

## Should be done soon after launch

- **Google Analytics**: set `NEXT_PUBLIC_GA_ID` to start collecting the funnel
  events. The site works without it.
- **Google Search Console**: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then
  submit `/sitemap.xml`.
- **Google Business Profile**: create it using the details in
  `src/config/business.ts` so the profile and site stay consistent.
- **Logo**: `src/components/layout/Logo.tsx` renders a text mark with a "TR"
  badge. Drop a real logo in and replace the badge; no other file changes.

## Deliberately left empty, awaiting real material

| Item | Where | Rule |
|---|---|---|
| **Reviews** | `src/data/reviews.ts` (empty array) | The reviews section renders nothing while empty and no rating structured data is emitted. Add entries only for reviews actually given, with permission to publish. |
| **Route photography** | `RouteData.image` | Supplied photographs are in use for Shimla, Manali, Delhi, Amritsar and Dharamshala. The remaining five routes (Dehradun, Haridwar, Rishikesh, Jaipur, Kasauli) still fall back to the drawn scenes in `src/components/art/RouteArt.tsx`. Adding an `image` entry to a route is all that is needed to switch it over. |
| **Vehicle photography** | `src/components/art/VehicleArt.tsx` | Vehicle cards still use neutral side profiles rather than photos of specific cars, so nothing implies a particular vehicle before it is assigned. |
| **Logo asset** | `src/components/layout/Logo.tsx` | A drawn mountain-road mark plus wordmark. Replace the inline SVG when the real logo arrives; no call site changes. |
| **Pricing** | `businessConfig.pricing.showStartingFares = false` | No rupee amount appears anywhere on the site. Set the flag to `true` only once route fares are commercially approved and filled into `RouteData.indicativeFare`. |

## Content review worth doing

The route pages state approximate distances, drive times and road conditions
from general knowledge of these routes. Someone who drives them should read the
ten route pages once and correct anything that has changed, particularly:

- Kalka–Solan four-laning progress on the Shimla route
- Mandi–Kullu conditions on the Manali route
- Wagah ceremony timing wording on the Amritsar route

## Photography

Supplied images live in `src/assets/images/` and are imported statically, so
Next.js handles sizing, format negotiation and blur placeholders.

| File | Used for |
|---|---|
| `sedan_hero.webp` | Homepage hero, outstation service page hero |
| `chandigarh_airport.webp` | Airport service page hero |
| `indian_family_suv.webp` | Homepage brand panel, round-trip service page hero |
| `airport.webp` | Homepage airport section |
| `shimla`, `manali`, `india_gate_delhi`, `amritsar`, `dharamshala` | Route cards and route page heroes |

Hero scrims are built so white text clears 4.5:1 **even if the photo behind it
were pure white**, which means swapping an image can never break contrast. The
scrim is graded left-to-right on wide screens, where the copy sits in a column,
and even on narrow screens, where text spans the full width.

## Design system notes

- The locked brand palette is unchanged. `--secondary` (#0F8B8D) is 4.12:1 on
  white, which is fine for icons but short of the 4.5:1 small text needs, so a
  darker companion token `--secondary-strong` (#0D7476) is used wherever the
  colour carries text or sits behind white text. The brand value still drives
  every icon.
- `--whatsapp` was darkened to #0D7065 so white button text clears 4.5:1.
- A full-page contrast audit of the homepage reports zero failures, and every
  interactive target measures at least 44px.

## Known limitations

- **Rate limiting is in-memory** (`src/lib/server/rate-limit.ts`). Counters live
  in one process, so on a multi-instance or serverless deployment the limit
  applies per instance. Move to a shared store before scaling past one instance.
- **No migration history**: Prisma's MongoDB connector has no migration engine.
  `prisma db push` is the only path from `schema.prisma` to the database, so
  schema changes are not versioned, not reviewable as files and not replayable.
  Every environment must be pushed to individually, and a forgotten push is
  silent — the app keeps working while the `reference` unique index is missing,
  which is exactly the index the collision-retry in `POST /api/leads` relies on.
  The superseded Postgres DDL is kept for reference in
  `prisma/legacy-postgres-migrations/` and does not run.
- **Transactions need a replica set**: nothing in Phase 1 writes more than one
  document at a time, so a standalone `mongod` is sufficient today. A later
  phase that must write two documents atomically (a booking plus a payment, say)
  will need a replica set or a managed cluster.

## Not built (later phases)

Admin dashboard, vendor and driver portals, customer accounts, payments,
automated dispatch or matching, live tracking, SMS, WhatsApp Business API, CRM,
settlements and commissions.
