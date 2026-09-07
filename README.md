# Tricity Rides

Lead-generation website for outstation taxis and airport transfers from
Chandigarh, Mohali and Zirakpur.

A single Next.js application: the site, the lead API, Prisma and MongoDB in
one codebase and one deployment.

## Requirements

- Node.js 20+
- MongoDB 6+

## Setup

```bash
npm install
cp .env.example .env     # then fill in the values
npx prisma db push       # applies the schema and creates indexes
npm run dev
```

A local MongoDB is available either through Homebrew
(`brew trust mongodb/brew && brew install mongodb-community && brew services
start mongodb-community`) or with the included `docker-compose.yml`
(`docker compose up -d`). Point `DATABASE_URL` at whichever you use.

MongoDB has no migration history in Prisma: `prisma db push` is the only way
the schema reaches the database, and it must be run against production too
whenever `schema.prisma` changes. Nothing enforces the `reference` unique
index except that push, so do not skip it.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npx prisma studio` | Browse leads |
| `npx prisma db push` | Apply `schema.prisma` and create indexes |

## Environment

See `.env.example`. Calls and WhatsApp both use the live business line
`+91 98786 49610`. Leads are stored whether or not SMTP is configured.

## How a lead flows

Form → `POST /api/leads` → validated, checked for spam and duplicates, stored →
the customer sees a reference and a WhatsApp button → the internal email is sent
afterwards and cannot affect the stored lead. Full detail in
[docs/LEAD_FLOW.md](docs/LEAD_FLOW.md).

## Documentation

| File | Contents |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Structure and directory map |
| [docs/LEAD_FLOW.md](docs/LEAD_FLOW.md) | Lead lifecycle, anti-spam, WhatsApp handoff |
| [docs/SEO.md](docs/SEO.md) | URLs, redirects, metadata, structured data |
| [docs/AEO-GEO.md](docs/AEO-GEO.md) | Answer-engine and local/generative search approach |
| [docs/CONVERSION-FUNNEL.md](docs/CONVERSION-FUNNEL.md) | Funnel, analytics events, attribution |
| [docs/IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md) | Outstanding configuration and known limitations |

## Adding a route

Add one object to `src/data/routes.ts` with genuinely route-specific content.
The page, metadata, sitemap entry, structured data and internal links follow
automatically. Do not invent distances, prices or facts.

## Content rules

No fabricated prices, reviews, ratings or certifications. No claims about
verified drivers, guaranteed vehicles or round-the-clock availability unless the
business actually operates that way. Distances and durations are always
approximate.
