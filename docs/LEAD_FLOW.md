# Lead flow

## Order of operations in `POST /api/leads`

The order matters and is enforced in this sequence:

1. **Parse and validate** with the shared Zod schema (`src/lib/validation/lead.ts`),
   `.strict()` so unknown keys are rejected.
2. **Honeypot check.** A populated `_hp` field returns a harmless success-shaped
   response, writes nothing and sends no email.
3. **Duplicate check.** Same phone + pickup + destination + journey date within
   10 minutes returns the existing reference and WhatsApp URL, with no second row.
   This runs *before* the rate limit so a re-submitting customer does not spend
   their hourly allowance.
4. **Rate limit.** 5 accepted submissions per IP per hour; the 6th gets 429 with
   a `Retry-After` header.
5. **Persist the lead.** The database write must succeed before any success
   response is returned.
6. **Respond** with `{ success, data: { reference, whatsappUrl } }`.
7. **Email**, scheduled with `after()` so it runs once the response is sent.

## Email never affects the lead

The SMTP send happens after the response and cannot change it. If SMTP is
unconfigured it logs a skip; if the server rejects the message it logs the error.
In both cases the lead is already in the database and the customer already has
their reference. Nothing retries the request, so a mail failure can never
produce a duplicate lead.

## Reference

`src/lib/reference.ts` generates `TR-XXXXXX` from an alphabet with no
easily-confused characters. It is unique in the database, and it is what the
customer sees. The Prisma cuid is never exposed.

## WhatsApp handoff

After a successful submission the customer sees an **Enquiry Received** panel
with their reference, a **WhatsApp Us** button and a **Call Now** button. There
is no automatic redirect; WhatsApp opens only when the customer taps.

The message says the customer *submitted an enquiry*. It never says a taxi,
vehicle or driver is confirmed, because at that point none is. It carries the
reference, trip type, pickup, destination, date, pickup time, return details
when applicable, passengers, vehicle and name, and is percent-encoded.

## WhatsApp click tracking

Tapping the button fires the `whatsapp_click` analytics event and posts to
`/api/leads/[reference]/whatsapp-click`, which sets `whatsappClickedAt`. The
request is sent with `sendBeacon` and never awaited, so a failure cannot stop
WhatsApp from opening. This is what separates FORM SUBMITTED from
WHATSAPP CLICKED in reporting.

## Failure handling in the form

If the API is unreachable or returns an error, the form shows a message and
points the customer at WhatsApp and the phone number, so a server problem does
not end the conversation.

## Lead statuses

`NEW → CONTACTED → VENDOR_CHECKING → QUOTE_SENT → CUSTOMER_ACCEPTED → CONVERTED`,
with `LOST` and `CANCELLED` as terminal states. Phase 1 only ever writes `NEW`;
the later states exist so Phase 2 can move leads through a pipeline without a
schema rewrite.
