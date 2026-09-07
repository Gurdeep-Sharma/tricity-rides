# AEO and GEO

## AEO — answer engine optimization

Each route page opens with a **"the essentials"** block: four questions as
headings, each followed by a direct one-or-two sentence answer. Those four are
the same questions that lead the page's FAQ list, so the visible page, the FAQ
section and the `FAQPage` structured data always agree.

Every answer is in the HTML on load. The FAQ list uses native `<details>`
elements, so the answer text is present whether or not an item is expanded, and
nothing important is hidden behind JavaScript.

Answers lead with the answer. "About four and a half to five hours for roughly
230 km" comes first; the explanation follows.

Each route page lets a visitor answer, without scrolling past marketing copy:

- What service is offered, and from and to where
- How far and how long, approximately
- Which vehicles are available
- What a quote covers and what may be charged separately
- How to book and how to make contact
- Whether one-way is possible and whether pickup from Mohali or Zirakpur works

## Pricing questions

"How much does it cost?" is answered honestly rather than avoided: the answer
explains what the fare depends on and that a confirmed fare is sent before
booking. No invented number is published, and no page implies a price it cannot
honour.

## GEO — geographic and generative search

The site states plainly, in `/contact` and in the footer, who the business is,
where it operates, what it arranges, where it travels and how booking works.
`src/config/business.ts` is the single source of that information, so the same
facts appear everywhere.

| Question | Answer given on the site |
|---|---|
| Who | Tricity Ride |
| Where | Chandigarh, Mohali, Zirakpur, including Chandigarh Airport |
| What | Outstation taxis, airport transfers, one-way and round-trip private cabs |
| To | Shimla, Manali, Delhi, Amritsar, Dharamshala, Dehradun, Haridwar, Rishikesh, Jaipur, Kasauli |
| Why | Pre-booked travel, fare in writing, driver details before pickup, human WhatsApp support |
| How | Website enquiry, WhatsApp or phone |

## Entity consistency

The brand is written **Tricity Ride** everywhere. No page uses Tricity Cab,
Tricity Cabs, Tricity Taxi or Tricity Rides. Location pages use the real area
names people search and travel from: Chandigarh sectors, Mohali phases and
Aerocity, Zirakpur's VIP Road and Dhakoli.

## Google Business Profile readiness

`src/config/business.ts` holds the canonical name, phone, email, service areas
and enquiry hours, so the profile and the website can be kept consistent. No
street address is published, because the business operates as a service-area
business. No fake branch, permit or certification is claimed anywhere.
