import { CONTACT_PHOTO_JPEG_BASE64 } from "@/app/save-contact/photo";
import { buildVCard, VCARD_FILENAME } from "@/lib/vcard";

/**
 * Serves the contact card as a .vcf download.
 *
 * The URL ends in `.vcf` via the filename in Content-Disposition, and the body
 * is served as text/vcard, which is what makes iOS offer "Add to Contacts" and
 * Android hand the file to the Contacts app. Serving it as text/plain instead
 * is the usual reason a save-contact button opens a wall of text.
 *
 * The card is build-time constant, so it is prerendered as a static asset
 * rather than running a function on every scan.
 */
export const dynamic = "force-static";

export async function GET() {
  const body = buildVCard({ photoBase64: CONTACT_PHOTO_JPEG_BASE64 });

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${VCARD_FILENAME}"`,
      // The card changes only when the business details change, and those are
      // a redeploy away, so a day of caching is safe and keeps the QR scan fast.
      "Cache-Control": "public, max-age=86400",
    },
  });
}
