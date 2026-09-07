# SEO

## URL structure

Flat, descriptive URLs. One page per search intent.

| Type | URLs |
|---|---|
| Services | `/outstation-taxi-chandigarh`, `/chandigarh-airport-taxi`, `/local-taxi-chandigarh`, `/one-way-taxi-chandigarh`, `/round-trip-taxi-chandigarh` |
| Locations | `/chandigarh-taxi`, `/mohali-taxi`, `/zirakpur-taxi` |
| Routes | `/chandigarh-to-{shimla,manali,delhi,amritsar,dharamshala,dehradun,haridwar,rishikesh,jaipur,kasauli}-taxi` |
| Support | `/routes`, `/get-quote`, `/contact`, `/terms`, `/privacy` |

## Redirects

The previous nested URLs are preserved with explicit **301** redirects in
`next.config.ts`. `statusCode: 301` is set rather than `permanent: true`,
because the latter emits a 308.

```
/outstation                          → /outstation-taxi-chandigarh
/outstation/shimla|manali|delhi      → matching route page
/outstation/:slug                    → /routes
/airport, /airport/:slug             → /chandigarh-airport-taxi
/local, /local/:slug                 → /local-taxi-chandigarh
```

## Per-page metadata

`src/lib/seo.ts` builds every page's metadata from one helper, so no page can
ship without a canonical or Open Graph tags. Each page supplies its own title
and description from its data file. Nothing is keyword-stuffed; titles read as
sentences a person would click.

Every page gets: unique title, unique meta description, canonical URL,
Open Graph (type, site name, locale, title, description, url, image) and a
Twitter summary card. The OG image is the generated brand card at
`src/app/opengraph-image.tsx`. It must be declared explicitly in the metadata
helper, because defining an `openGraph` object on a page replaces the image the
file convention would otherwise inherit.

`metadataBase` comes from `NEXT_PUBLIC_SITE_URL`. No production domain is
hardcoded anywhere.

## Structured data

| Type | Where |
|---|---|
| `LocalBusiness` + `TaxiService` | Root layout, on every page |
| `Service` | Route, service and location pages |
| `BreadcrumbList` | Route, service, location, `/routes`, `/get-quote`, `/contact` |
| `FAQPage` | Only where the same questions and answers are visible on the page |

**Not emitted:** `aggregateRating`, `Review`, `Offer` or any price. There are no
genuine reviews yet and pricing is not approved, so none is claimed. Structured
data always matches what a visitor can see.

## Sitemap and robots

`sitemap.ts` lists the 24 indexable pages and nothing else. `robots.ts` allows
everything except `/api/`, and points at the sitemap.

## Internal linking

No page is an orphan. The header links the service pages and `/routes`; the
footer links every route, every service and every location; each route page
links its related routes plus the outstation, airport and location pages;
service pages list their routes.

## Content rules

- Distances and durations are always described as approximate.
- No superlatives, no price claims, no unverifiable trust claims.
- Route pages carry genuinely route-specific content: the actual road, the
  slow sections, arrival constraints, seasonal considerations. A route page is
  never another route with the destination swapped.
