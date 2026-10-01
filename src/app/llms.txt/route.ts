import { buildLlmsTxt } from "@/lib/llms";

/** Short guide for AI assistants (llms.txt convention), built from site data. */
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
