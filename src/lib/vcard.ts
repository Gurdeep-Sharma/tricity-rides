import { businessConfig } from "@/config/business";
import { contactCard } from "@/config/contact-card";

/**
 * vCard 3.0 builder for the digital visiting card.
 *
 * 3.0 rather than 4.0 deliberately: it is what iOS Contacts, Android and
 * Outlook all import without complaint. 4.0 is newer but less uniformly
 * handled on the phones that will actually scan the printed QR code.
 */

/** Escapes the characters that carry meaning inside a vCard value. */
function escapeValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

const encoder = new TextEncoder();

/**
 * Folds a line the way RFC 2426 requires: at most 75 octets, each continuation
 * beginning with a single space. Applied to every property, not just the photo
 * — an unfolded 14 KB photo line is the usual reason an embedded image "breaks"
 * a contact card, but an over-long NOTE is silently truncated by strict
 * importers too.
 *
 * The limit is octets rather than characters, and the split never lands inside
 * a multi-byte character, so an accented name or a bullet cannot be cut in half.
 */
function fold(line: string): string {
  if (encoder.encode(line).length <= 75) return line;

  const out: string[] = [];
  let current = "";
  let budget = 75;

  for (const char of line) {
    const size = encoder.encode(char).length;
    if (encoder.encode(current).length + size > budget) {
      out.push(current);
      current = char;
      // Continuations spend one octet on the leading space.
      budget = 74;
    } else {
      current += char;
    }
  }
  if (current) out.push(current);

  return out.map((part, index) => (index === 0 ? part : ` ${part}`)).join("\r\n");
}

export interface VCardOptions {
  /** Base64 JPEG to embed as the contact photo. Omitted when absent. */
  photoBase64?: string;
}

export function buildVCard({ photoBase64 }: VCardOptions = {}): string {
  const { person, websiteUrl, address, tagline } = contactCard;
  const phone = businessConfig.contact.phone;
  const { email } = businessConfig.contact;

  const note =
    `${businessConfig.legalName} - ${tagline}. ` +
    "Outstation, Airport Transfer, Local Rides and Corporate Travel. " +
    `Serving ${businessConfig.serviceAreaLabel}.`;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeValue(person.familyName)};${escapeValue(person.givenName)};;;`,
    `FN:${escapeValue(person.name)}`,
    `ORG:${escapeValue(businessConfig.legalName)}`,
    `TITLE:${escapeValue(person.title)}`,
    `TEL;TYPE=CELL,VOICE:${phone}`,
    `EMAIL;TYPE=INTERNET:${email}`,
    `URL:${websiteUrl}`,
    `ADR;TYPE=WORK:;;;${escapeValue(address.city)};${escapeValue(
      address.region
    )};;${escapeValue(address.country)}`,
    `NOTE:${escapeValue(note)}`,
  ];

  if (photoBase64) {
    lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`);
  }

  lines.push("END:VCARD");

  // CRLF throughout: the spec requires it, and Outlook in particular mangles
  // a card that uses bare newlines.
  return `${lines.map(fold).join("\r\n")}\r\n`;
}

/** Filename offered to the browser. Kept readable, since users see it. */
export const VCARD_FILENAME = "tricity-rides-gurdeep-sharma.vcf";
