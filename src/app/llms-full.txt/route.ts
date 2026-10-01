import { buildLlmsFullTxt } from "@/lib/llms";

/** Every route, service and FAQ as one plain-text reference for AI assistants. */
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
