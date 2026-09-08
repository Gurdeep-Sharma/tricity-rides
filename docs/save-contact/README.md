# Digital visiting card — /save-contact

The page a customer lands on after scanning the QR code on the printed card.

It exists in two forms, built from the same source so they cannot drift:

| Form | Where | Use it when |
|---|---|---|
| **Next.js page** | `src/app/save-contact/` | The Next.js site is the live site |
| **Elementor block** | `elementor-widget.html` | The WordPress site is the live site |

The Elementor file is generated from the built Next.js page, so anything fixed
in one is fixed in the other after a regeneration (last section below).

## The QR code URL

Point the printed QR at exactly:

```
https://tricityrides.in/save-contact/
```

Nothing else. The QR must **not** encode the contact details themselves — if it
did, a change of phone number would mean reprinting every card. This way the
printed code never changes and the page behind it can be edited freely.

---

## WordPress / Elementor implementation

### 1. Upload the vCard

`tricity-rides-gurdeep-sharma.vcf` has to be reachable at a fixed URL.

**WordPress blocks `.vcf` uploads in the Media Library by default** — the upload
will fail with "Sorry, this file type is not permitted for security reasons".
Two ways round it, in order of preference:

**a. Upload via hosting File Manager or FTP (simplest, nothing to maintain)**

Put the file at:

```
/wp-content/uploads/tricity-rides-gurdeep-sharma.vcf
```

It is then served from:

```
https://tricityrides.in/wp-content/uploads/tricity-rides-gurdeep-sharma.vcf
```

**b. Allow the type, then upload through the Media Library**

Add to your child theme's `functions.php`:

```php
add_filter( 'upload_mimes', function ( $mimes ) {
    $mimes['vcf'] = 'text/vcard';
    return $mimes;
} );
```

### 2. Check the server sends the right content type

The file must be served as `text/vcard`. Most hosts do this already. Verify:

```bash
curl -sI https://tricityrides.in/wp-content/uploads/tricity-rides-gurdeep-sharma.vcf | grep -i content-type
```

If it says `text/plain` or `application/octet-stream`, add this to `.htaccess`
in the site root (Apache/LiteSpeed — most Indian shared hosting):

```apache
AddType text/vcard .vcf
```

This matters: served as `text/plain`, tapping Save Contact shows the customer a
screen of raw text instead of the "Add Contact" sheet.

### 3. Upload the logo

Upload `src/assets/tricity_rides_logo_icon.png` through the Media Library and
copy its URL. It must be **HTTPS** and a direct image URL.

### 4. Create the page

1. Pages → Add New, title **Save Contact**, permalink **save-contact**.
2. In Page Attributes, set the template to **Elementor Canvas**. This drops the
   theme header, menu and footer — which is the point: a QR visitor should see
   Save Contact, not a navigation menu.
3. Edit with Elementor, drag in a single **HTML** widget.
4. Paste the entire contents of `elementor-widget.html`.
5. Replace the two placeholders in the pasted code:
   - `LOGO_URL_HERE` → the Media Library URL from step 3
   - `VCARD_URL_HERE` → the `.vcf` URL from step 1
6. Publish.

Everything is one HTML widget with inline CSS and no JavaScript, so no other
plugin is needed. Every class is prefixed `tr-`, so it cannot collide with your
theme's styles.

### 5. Page metadata

Elementor does not set meta tags. With Yoast or Rank Math, set:

- **Title:** Tricity Rides | Save Contact
- **Description:** Save Tricity Rides contact details and book local, airport
  and outstation taxi services in Chandigarh, Mohali and Zirakpur.
- **Canonical:** `https://tricityrides.in/save-contact/`
- **Social image:** the Tricity Rides logo, so a WhatsApp share previews the brand.

`standalone.html` in this folder contains the full set of meta tags already
written out, if you would rather paste them into a header snippet.

---

## How Save Contact behaves, per platform

The button is a plain link to the `.vcf` file. No JavaScript, which is
deliberate — generated-on-the-fly blob downloads are exactly what fails inside
in-app browsers.

| Platform | What the customer sees |
|---|---|
| **iPhone, Safari** | The contact sheet opens directly with the photo, name and number. They tap **Add to Contacts** → Create New Contact. One tap after the button. |
| **iPhone, Chrome/Firefox** | Downloads, then offers to open in Contacts. One extra tap. |
| **Android, Chrome** | Downloads the file, shows a notification or a bottom bar. Tapping it opens Contacts with the details prefilled. |
| **Android, Samsung Internet** | Same as Chrome. |
| **In-app browsers** (Instagram, Facebook, LinkedIn) | These sometimes block file downloads entirely. If a customer reports this, tell them to tap "Open in browser" first. Nothing on the page can work around it — it is the app's restriction, not the site's. |

QR scans from the phone camera open the **default browser** (Safari on iPhone,
Chrome on Android), which is the well-behaved path in every case above.

### The contact photo

The vCard embeds the logo as a base64 JPEG (240×240, about 10 KB), so the photo
travels with the file and works offline. Compatibility notes:

- **iOS and Android**: the photo shows on the contact.
- **Some older Android builds and Outlook**: ignore embedded photos and just
  show the name. The contact still imports correctly — the photo is the only
  thing lost.
- A photo referenced by URL instead would be smaller, but iOS commonly ignores
  URL photos, so embedding is the more reliable choice.

If you ever want a photo-free card (smallest possible file, maximum
compatibility), delete the `PHOTO` line and all the indented lines under it from
the `.vcf`, or in the Next.js app call `buildVCard()` with no arguments.

---

## Changing things later

Every value lives in one place.

### Phone number

**Next.js site:** set `NEXT_PUBLIC_PHONE_NUMBER` in `.env` and redeploy. It moves
the card, the vCard, the site and the JSON-LD together. The fallback if the
variable is unset is `BUSINESS_NUMBER` in `src/config/business.ts`.

**WordPress:** the number appears in the pasted HTML in four places — the
`tel:` link, the `wa.me` link and the two visible numbers under Contact Details.
Search the widget for `9878649610` and replace all of them. Then edit the
`TEL;TYPE=CELL,VOICE:` line in the `.vcf` and re-upload it.

### WhatsApp number

Only needed if it ever differs from the phone number. Next.js: set
`NEXT_PUBLIC_WHATSAPP_NUMBER`. WordPress: change the `https://wa.me/…` links.
The message that pre-fills the chat is `contactCard.whatsappMessage` in
`src/config/contact-card.ts`, or the `?text=` part of the `wa.me` URL.

### Booking link

`contactCard.bookingUrl` in `src/config/contact-card.ts`, or the `href` on the
**Book Your Ride** button in the widget. It currently points at the site root
because there is no dedicated booking page yet.

### Logo

**Next.js:** replace `src/assets/tricity_rides_logo_icon.png`. To refresh the
vCard photo too, regenerate `src/app/save-contact/photo.ts`:

```bash
python3 - <<'PY'
from PIL import Image
import base64, io
src = Image.open("src/assets/tricity_rides_logo_icon.png").convert("RGBA")
canvas = Image.new("RGB", src.size, (255, 255, 255))
canvas.paste(src, mask=src.split()[3])
canvas = canvas.resize((240, 240), Image.LANCZOS)
buf = io.BytesIO(); canvas.save(buf, "JPEG", quality=82, optimize=True)
print(base64.b64encode(buf.getvalue()).decode())
PY
```

Paste the output into `CONTACT_PHOTO_JPEG_BASE64`. Flattening onto white matters:
the source is transparent, and devices that show contact photos on a dark sheet
would otherwise render the mark on black.

**WordPress:** upload the new image and change `LOGO_URL_HERE`.

---

## Analytics

The five action links carry `data-analytics` attributes and need no JavaScript
to work. To start recording clicks, add this once — Elementor HTML widget, or
`src/app/save-contact/page.tsx`:

```html
<script>
document.querySelectorAll('[data-analytics]').forEach(function (el) {
  el.addEventListener('click', function () {
    if (typeof gtag === 'function') {
      gtag('event', el.dataset.analytics);
    }
  });
});
</script>
```

Event names already on the page: `save_contact_click`, `call_click`,
`whatsapp_click`, `book_ride_click`, `website_click`, `email_click`.

---

## Testing the QR

Print the card, or display the QR on a second screen, then:

**iPhone** — open the Camera app, point it at the code, tap the banner. Confirm
the page loads without a navigation menu, that Save Contact is visible without
scrolling, and that tapping it opens the contact sheet with the logo showing.
Then check the saved contact has the number, email, website and company.

**Android** — open the Camera app (or Google Lens), tap the link. Confirm the
same, then tap the download notification and check Contacts imports it.

On both, also tap Call (the dialer should open pre-filled, not dial) and
WhatsApp (a chat with the message already typed).

Worth testing once on a phone that has **never** had the number saved, so you
see what a real customer sees rather than a duplicate-contact merge prompt.

---

## Regenerating the Elementor file

The Next.js page is the source of truth. After changing it:

```bash
npm run build
python3 docs/save-contact/regenerate.py
```

This re-extracts the markup from the production build, re-inlines the CSS, puts
the two placeholders back, and rewrites `elementor-widget.html`,
`standalone.html` and the `.vcf`.
