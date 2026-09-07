import { createHash } from "node:crypto";

/**
 * Best-effort client IP. Behind a proxy or CDN the left-most entry of
 * x-forwarded-for is the client; falls back to other common headers.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headers.get("x-real-ip")?.trim() ||
    headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

/** One-way hash so the raw IP is never stored. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}
