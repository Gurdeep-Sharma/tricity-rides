# Conversion funnel

```
Google / Maps / referral
      ↓
Route, service or location landing page
      ↓
Trust + route information
      ↓
Lead form  (2 steps)
      ↓
Lead stored in MongoDB      ← the lead exists from this point on
      ↓
Enquiry Received panel with reference
      ↓
WhatsApp (customer taps) or phone call
      ↓
Human conversation → manual quote → booking
```

## Conversion points per page

Landing pages give several natural opportunities rather than one wall of CTAs:

- Hero: **Get a Confirmed Quote**, WhatsApp, Call
- The lead form itself, beside the hero on desktop and directly below it on mobile
- After the vehicle section: **Get vehicle options**
- After the FAQ: **Ask us on WhatsApp**
- Closing CTA section: quote, WhatsApp, call
- Mobile: a sticky bottom bar with WhatsApp and Get Quote, which hides itself
  while the form is in the band it occupies so it never covers the fields

## Analytics events

Implemented in `src/lib/analytics.ts`, names in `src/config/analytics.ts`.

| Event | Fires when |
|---|---|
| `form_start` | First interaction with the lead form |
| `form_step_complete` | Step 1 validates and the customer moves to step 2 |
| `lead_submitted` | The API confirms the lead was stored |
| `lead_api_failed` | The submission could not be stored |
| `whatsapp_click` | Any WhatsApp button, with a `placement` value |
| `phone_click` | Any phone link, with a `placement` value |

Form submission and WhatsApp click are separate events, because they are
separate things. The database records the same distinction through
`whatsappClickedAt`.

GA4 loads only when `NEXT_PUBLIC_GA_ID` is set. Without it, `track()` is a
no-op in production and logs to the console in development. The site works
normally either way.

## Attribution

`src/lib/attribution.ts` stores first-touch attribution in `localStorage` for
30 days: UTM parameters, referrer, landing page, and a source/medium derived
from the referrer when no UTM parameters are present. UTM values override the
derived ones. A later visit carrying its own campaign parameters replaces the
stored record; otherwise the first touch is kept.

Every read and write is wrapped in try/catch. If storage is unavailable the
lead still submits normally, with whatever attribution could be determined.

## Questions this lets the business answer

Which pages produce leads, which routes produce leads, which source and campaign
produce leads, and how many of those leads went on to open WhatsApp.
