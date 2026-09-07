/**
 * Genuine customer reviews only.
 *
 * This array is intentionally empty. The reviews section renders nothing while
 * it is empty and no AggregateRating structured data is emitted anywhere.
 * Add entries only for reviews that were actually given, with permission to publish.
 */
export interface Review {
  author: string;
  /** City or area the reviewer travelled from. */
  location: string;
  route: string;
  /** ISO date the review was given. */
  date: string;
  body: string;
  /** Where the review was originally left, e.g. "Google". */
  source: string;
}

export const reviews: Review[] = [];

export const hasReviews = reviews.length > 0;
