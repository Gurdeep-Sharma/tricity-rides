import type { Metadata } from "next";
import Image from "next/image";

import logoMark from "@/assets/tricity_rides_logo_icon.png";
import { businessConfig } from "@/config/business";
import { contactCard, whatsappHref } from "@/config/contact-card";
import { buildMetadata } from "@/lib/seo";

import "./card.css";

const { person, tagline, servicesLine, websiteUrl, websiteLabel, bookingUrl, services } =
  contactCard;
const { phoneDisplay, phoneHref, email } = businessConfig.contact;
const areaLabel = businessConfig.serviceAreas.map((a) => a.name).join(" • ");

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${businessConfig.legalName} | Save Contact`,
    description:
      "Save Tricity Rides contact details and book local, airport and outstation taxi services in Chandigarh, Mohali and Zirakpur.",
    path: contactCard.canonicalPath,
  }),
  // `absolute` stops the root layout's "%s | Tricity Rides" template from
  // appending the brand name a second time.
  title: { absolute: `${businessConfig.legalName} | Save Contact` },
};

/* Icons are inline so the first viewport needs no extra network request. */
const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function DownloadIcon() {
  return (
    <svg {...iconProps} width={22} height={22}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.18 8.18 0 0 1 5.82 2.42 8.15 8.15 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.24.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37.99 2.53c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps} width={18} height={18}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg {...iconProps} width={18} height={18}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps} width={18} height={18}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const SERVICE_ICONS = [
  // Outstation — a road heading to the horizon
  <svg key="outstation" {...iconProps} width={22} height={22}>
    <path d="M4 21 9 3M20 21 15 3M12 7v2M12 13v2M12 19v2" />
  </svg>,
  // Airport transfer
  <svg key="airport" {...iconProps} width={22} height={22}>
    <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9 1.7L8 11l-2 3H3l2 3 3 2 1-3 3-2 3.1 4.1a1 1 0 0 0 1.7-.9Z" />
  </svg>,
  // Local rides — a car
  <svg key="local" {...iconProps} width={22} height={22}>
    <path d="M5 17h14M6.5 17V13l1.8-4.2A2 2 0 0 1 10.1 7.5h3.8a2 2 0 0 1 1.8 1.3L17.5 13v4M4 13h16" />
    <circle cx="8" cy="17.5" r="1.5" />
    <circle cx="16" cy="17.5" r="1.5" />
  </svg>,
  // Corporate travel — a briefcase
  <svg key="corporate" {...iconProps} width={22} height={22}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>,
];

export default function SaveContactPage() {
  return (
    <main className="tr-card">
      {/* ---------------------------------------------- 1. Brand header --- */}
      <header className="tr-hero">
        <svg
          className="tr-hero-motif"
          viewBox="0 0 460 96"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 96 L92 30 L138 62 L196 14 L268 70 L330 34 L400 78 L460 44 V96 Z" fill="#ffffff" />
          <path
            d="M150 96 C 190 60, 240 60, 300 20"
            stroke="#F4B942"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <Image
          src={logoMark}
          alt="Tricity Rides logo"
          className="tr-logo"
          width={74}
          height={74}
          priority
        />

        <p className="tr-wordmark">
          Tricity <span>Rides</span>
        </p>
        <p className="tr-tagline">{tagline}</p>

        <hr className="tr-rule" />

        {/* ------------------------------------------ 2. Contact person --- */}
        <h1 className="tr-person-name">{person.name}</h1>
        <p className="tr-person-role">
          <b>{person.title}</b>, {businessConfig.legalName}
        </p>
        <p className="tr-person-services">{servicesLine}</p>
      </header>

      {/* --------------------------------------------- 3 & 4. Actions ----- */}
      <section className="tr-actions" aria-label="Contact actions">
        <a
          className="tr-btn tr-btn-save"
          href="/save-contact/vcard"
          download="tricity-rides-gurdeep-sharma.vcf"
          data-analytics="save_contact_click"
        >
          <DownloadIcon />
          Save Contact
        </a>
        <p className="tr-btn-help">Save our number for your next ride</p>

        <div className="tr-pair">
          <a className="tr-btn tr-btn-call" href={phoneHref} data-analytics="call_click">
            <PhoneIcon />
            Call Now
          </a>
          <a
            className="tr-btn tr-btn-whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noopener"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </section>

      {/* ------------------------------------------- 5. Book your ride ---- */}
      <section className="tr-section" aria-label="Book a ride">
        <div className="tr-book">
          <h2>Need a Ride?</h2>
          <p>
            Book a reliable taxi from Chandigarh Tricity for local, airport and outstation
            travel.
          </p>
          <a className="tr-btn tr-btn-book" href={bookingUrl} data-analytics="book_ride_click">
            Book Your Ride
          </a>
        </div>
      </section>

      {/* ----------------------------------------------- 6. Services ------ */}
      <section className="tr-section" aria-labelledby="tr-services-heading">
        <h2 id="tr-services-heading" className="tr-heading">
          Our Services
        </h2>
        <ul className="tr-services">
          {services.map((service, index) => (
            <li className="tr-service" key={service.name}>
              {SERVICE_ICONS[index]}
              <span>{service.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------- 7. Service area ----- */}
      <section className="tr-area" aria-label="Service area">
        <p className="tr-area-cities">Serving {areaLabel}</p>
        <p>
          Reliable rides for local travel, airport transfers and journeys beyond the Tricity.
        </p>
      </section>

      {/* ----------------------------------------- 8. Contact details ----- */}
      <section className="tr-section" aria-labelledby="tr-details-heading">
        <h2 id="tr-details-heading" className="tr-heading">
          Contact Details
        </h2>
        <div className="tr-details">
          <a className="tr-detail" href={phoneHref} data-analytics="call_click">
            <span className="tr-detail-icon">
              <PhoneIcon />
            </span>
            <span className="tr-detail-text">
              <span className="tr-detail-label">Phone</span>
              <span className="tr-detail-value">{phoneDisplay}</span>
            </span>
          </a>

          <a
            className="tr-detail"
            href={whatsappHref}
            target="_blank"
            rel="noopener"
            data-analytics="whatsapp_click"
          >
            <span className="tr-detail-icon">
              <WhatsAppIcon />
            </span>
            <span className="tr-detail-text">
              <span className="tr-detail-label">WhatsApp</span>
              <span className="tr-detail-value">{phoneDisplay}</span>
            </span>
          </a>

          <a className="tr-detail" href={`mailto:${email}`} data-analytics="email_click">
            <span className="tr-detail-icon">
              <MailIcon />
            </span>
            <span className="tr-detail-text">
              <span className="tr-detail-label">Email</span>
              <span className="tr-detail-value">{email}</span>
            </span>
          </a>

          <a className="tr-detail" href={websiteUrl} data-analytics="website_click">
            <span className="tr-detail-icon">
              <GlobeIcon />
            </span>
            <span className="tr-detail-text">
              <span className="tr-detail-label">Website</span>
              <span className="tr-detail-value">{websiteLabel}</span>
            </span>
          </a>

          <div className="tr-detail">
            <span className="tr-detail-icon">
              <PinIcon />
            </span>
            <span className="tr-detail-text">
              <span className="tr-detail-label">Service Area</span>
              <span className="tr-detail-value">
                {businessConfig.serviceAreas.map((a) => a.name).join(" | ")}
              </span>
            </span>
          </div>
        </div>

        {/* --------------------------------------------- 9. Website ------- */}
        <a className="tr-website" href={websiteUrl} data-analytics="website_click">
          <GlobeIcon />
          Visit Tricity Rides
        </a>
      </section>

      {/* ------------------------------------------------ 10. Footer ------ */}
      <footer className="tr-footer">
        <p className="tr-footer-name">Tricity Rides</p>
        <p className="tr-footer-tagline">{tagline}</p>
        <p className="tr-footer-area">
          {businessConfig.serviceAreas.map((a) => a.name).join(" | ")}
        </p>
        <p className="tr-footer-copy">
          © {new Date().getFullYear()} {businessConfig.legalName}
        </p>
      </footer>
    </main>
  );
}
