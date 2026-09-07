/**
 * Fixed-window, in-memory rate limiter.
 *
 * LIMITATION: state lives in the process memory of a single instance. On a
 * multi-instance or serverless deployment each instance keeps its own counter,
 * so the effective limit is per instance. Move to a shared store (for example
 * Redis or a database table) before scaling beyond one instance.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Bounded so a flood of unique keys cannot grow memory without limit. */
const MAX_TRACKED_KEYS = 10_000;

export interface RateLimitResult {
  limited: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfterSeconds: number;
}

function sweep(now: number): void {
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}

/**
 * Consumes one unit against `key`. Only call this for requests that should
 * count towards the limit, so rejected spam does not consume a genuine
 * customer's allowance in a shared-IP situation.
 */
export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now > existing.resetAt) {
    if (buckets.size >= MAX_TRACKED_KEYS) sweep(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  if (existing.count >= limit) {
    return { limited: true, remaining: 0, retryAfterSeconds };
  }

  existing.count += 1;
  return {
    limited: false,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds,
  };
}

/** Test helper: clears all counters. */
export function resetRateLimits(): void {
  buckets.clear();
}
