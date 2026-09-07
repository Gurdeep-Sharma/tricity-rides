import { Quote } from "lucide-react";
import { reviews, type Review } from "@/data/reviews";
import { Section, Container, SectionHeading } from "@/components/section/Section";

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <Quote aria-hidden="true" className="size-5 text-secondary" />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {review.body}
      </blockquote>
      <footer className="mt-4 text-sm">
        <p className="font-semibold text-primary">{review.author}</p>
        <p className="text-muted-foreground">
          {review.location} · {review.route}
        </p>
      </footer>
    </li>
  );
}

/**
 * Renders nothing until genuine, publishable reviews exist in src/data/reviews.ts.
 * No ratings or review structured data is emitted anywhere on the site.
 */
export function ReviewsSection() {
  if (reviews.length === 0) return null;

  return (
    <Section tone="muted">
      <Container className="space-y-8">
        <SectionHeading
          title="What our customers say"
          description="Reviews shared by customers who travelled with us."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={`${review.author}-${review.date}`} review={review} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
