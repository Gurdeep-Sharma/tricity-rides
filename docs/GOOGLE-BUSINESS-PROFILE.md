# Google Business Profile — Tricity Rides

Ready-to-paste copy for the listing. Per the SEO audit this is the highest-leverage
lead source available, because local taxi searches are answered by the map pack
before anyone reaches the organic results.

Everything here follows the same content rules as the site: no prices, no
invented claims, nothing about 24/7 availability or being cheapest or best.

---

## Business information

These must match the website character for character. Inconsistent NAP data is
the most common reason a local listing underperforms.

| Field | Value |
|---|---|
| Business name | `Tricity Rides` |
| Primary phone | `+91 98786 49610` |
| Website | `https://tricityrides.in` |
| Appointment link | `https://tricityrides.in/get-quote` |
| Email | `tricityrides.info@gmail.com` |

**Do not** add descriptors to the name — "Tricity Rides Taxi Service" or
"Tricity Rides Chandigarh" is a guideline violation and a suspension risk.
The name field is the name; the category field carries what you do.

### Address — hide it

You have no walk-in office. During setup, answer **"No"** to "Do you have a
location customers can visit?" That makes this a **service-area business**: the
address stays private and the listing shows the areas you serve.

### Service areas

| Area | Note |
|---|---|
| Chandigarh | Primary |
| Mohali | Primary |
| Zirakpur | Primary |
| Panchkula | Named across the site as a pickup area |
| Kharar | Named across the site as a pickup area |

Google allows up to 20 service areas but dilutes relevance if you list too many.
Five is right. Do not add Shimla or Manali — you travel there, you don't serve
customers based there.

### Hours

Monday to Sunday, **07:00 – 22:00**.

This matches `businessConfig.hours.label` and the `openingHoursSpecification` now
in the site's schema. If you change one, change all three. Do not set 24 hours
unless someone genuinely answers at 3am — a listing that doesn't answer calls
during its own stated hours gets poor reviews fast.

---

## Business description (750 character limit)

**Use this — 734 characters, measured:**

> Tricity Rides is a pre-booked taxi service operating from Chandigarh, Mohali and Zirakpur. We arrange outstation cabs, Chandigarh Airport transfers, local half-day and full-day hire, and travel for corporate guests.
>
> Every trip is a private vehicle for your group alone, with the same driver for the whole itinerary. Your vehicle and driver are arranged ahead of the travel date rather than found on the morning, and we share the driver's name, number and vehicle details before pickup.
>
> We confirm the fare in writing before you book, including what is covered and anything charged separately. Regular routes include Shimla, Manali, Dharamshala, Dalhousie, Amritsar and Delhi.
>
> Send your trip details on WhatsApp or call for a quote.

Notes on why it reads this way:
- No URL. Google strips links from descriptions and repeated attempts look spammy.
- No prices, no offers, no superlatives — the same rule the site follows.
- The first sentence carries the primary keywords naturally, because Google
  truncates the description in some surfaces after roughly 250 characters.

---

## Categories

| Slot | Category | Why |
|---|---|---|
| **Primary** | **Taxi service** | The category almost every competing local operator uses, and what "taxi service in Chandigarh" maps to |
| Secondary | Airport shuttle service | Airport transfers are a distinct, high-intent service you already have a page for |
| Secondary | Car service | Catches "car hire" and "cab service" phrasing |
| Secondary | Chauffeur service | Corporate and guest travel |
| Secondary | Tour operator | Only if you actively sell sightseeing itineraries — skip it if not |

The primary category carries far more ranking weight than the secondaries. Don't
change it once set; churn hurts.

---

## Services list

Add these under **Services**. Each name maps to a page you already have, which is
what makes the listing and the site reinforce each other.

| Service | Description (paste as-is) |
|---|---|
| Outstation Taxi | Private one-way and round-trip cabs from Chandigarh, Mohali and Zirakpur to Himachal, Punjab, Uttarakhand and Delhi NCR. Vehicle and driver arranged in advance, fare confirmed in writing before you book. |
| Chandigarh Airport Transfer | Pickups and drops at Chandigarh Airport, plus onward transfers to Shimla, Manali and Kasauli. Driver and vehicle details shared before your pickup. |
| Local Taxi Hire | Half-day and full-day cabs within Chandigarh, Mohali, Zirakpur and Panchkula, with waiting included, for city work, family events and guest travel. |
| One-Way Taxi | Single-direction drops priced as a one-way journey, for travellers who are flying back, staying on or continuing onward. |
| Round-Trip Taxi | The same vehicle and driver for the whole trip, including waiting and local running at the destination. Driver allowance stated upfront on multi-day trips. |
| Corporate Travel | Travel for staff, visiting guests and events, arranged in advance with the vehicle and driver confirmed ahead of the date. |
| Tempo Traveller Hire | 12 to 17 seater vehicles for larger family groups, wedding parties and office outings travelling together. |

---

## Route highlights

Under **Services**, you can also list individual routes. Add these as they match
the pages you now have live:

Chandigarh to Shimla · Chandigarh to Manali · Chandigarh to Dharamshala ·
Chandigarh to Dalhousie · Chandigarh to Amritsar · Chandigarh to Delhi ·
Chandigarh to Dehradun · Chandigarh to Haridwar · Chandigarh to Rishikesh ·
Chandigarh to Jaipur · Chandigarh to Kasauli · Chandigarh to Kufri ·
Chandigarh to Palampur · Chandigarh to Chamba

---

## Attributes

Turn on:
- **Onsite services** / **Online appointments** — you take bookings remotely
- **Identifies as a small business** — if you're comfortable with it; it's honest and it helps

Leave off anything you cannot evidence.

---

## Photos

Photos are one of the strongest engagement signals on a listing, and most small
operators upload three and stop.

| Slot | What to upload | Source |
|---|---|---|
| Logo | Square mark, minimum 720×720 | `src/assets/tricity_rides_logo_icon.png` |
| Cover | 1024×576 landscape | A real vehicle photo, not stock |
| Vehicles | One clean shot per category | Your own cars — **not** the manufacturer press images on the site |
| At work | Driver with a vehicle, boot loaded, a hill road stop | Take these on real trips |

**Use your own vehicle photographs on the listing.** The manufacturer press
shots on the website are fine as category illustrations there, but on a GBP
listing they read as a stock-photo business and Google's photo guidelines expect
images of the actual business.

Aim for roughly 10 photos at launch, then a few every month.

---

## First-week checklist

1. Create the profile, choose **Taxi service**, answer **No** to a visitable location.
2. Add the five service areas, hours, phone, website and `/get-quote` as the appointment link.
3. Paste the description and all seven services.
4. Upload the logo, cover and at least six photos.
5. Request verification — usually a postcard or video in India. Nothing shows publicly until this completes, so start it first.
6. Once verified, copy the profile URL into `businessConfig.social.googleBusinessProfile`. The site's `sameAs` schema picks it up automatically and links the two entities.
7. Set up the review request flow — the profile's *Ask for reviews* link plus the WhatsApp templates.

## Ongoing

- **Post weekly.** A short update on a route, a seasonal note ("Kufri has snow this week"), or a vehicle photo. Posts are a freshness signal and appear in the listing.
- **Answer every question** in the Q&A section. You can seed genuine questions yourself — that is allowed, unlike fake reviews — using the FAQs already written on your route pages.
- **Reply to every review** within a day, including critical ones. Reply text is indexed.
- **Keep NAP identical** to the site. If the phone number changes, change it in `.env`, on the GBP, and on the printed cards on the same day.
