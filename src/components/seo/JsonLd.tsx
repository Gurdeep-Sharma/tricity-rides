import { jsonLdString } from "@/lib/seo";

/** Renders a JSON-LD block with `<` escaped, per Next.js guidance. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
    />
  );
}
