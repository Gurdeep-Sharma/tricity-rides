import { ChevronDown } from "lucide-react";
import type { Faq as FaqItem } from "@/data/types";

/**
 * FAQ list built on native <details>.
 *
 * The answers are real text in the HTML whether or not an item is expanded, so
 * search engines and answer engines can read them without running JavaScript.
 */
function FaqItemBlock({ faq, open }: { faq: FaqItem; open: boolean }) {
  return (
    <details
      open={open}
      className="group overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-200 hover:border-secondary/40"
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 text-left font-medium transition-colors duration-200 hover:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <h3 className="text-sm text-primary sm:text-[0.95rem]">{faq.question}</h3>
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 text-secondary transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-border px-4 py-3.5">
        <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
      </div>
    </details>
  );
}

/**
 * FAQ list built on native <details>.
 *
 * Answers are real text in the HTML whether or not an item is expanded, so
 * search engines and answer engines can read them without running JavaScript.
 */
export function FaqList({ faqs, columns = 1 }: { faqs: FaqItem[]; columns?: 1 | 2 }) {
  if (faqs.length === 0) return null;

  if (columns === 2) {
    return (
      // items-start stops a grid row from stretching both cards to the height
      // of whichever one is open, which made the closed card look expanded.
      <div className="grid items-start gap-3 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <FaqItemBlock key={faq.question} faq={faq} open={index < 2} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <FaqItemBlock key={faq.question} faq={faq} open={index === 0} />
      ))}
    </div>
  );
}

/**
 * Answer-first block for the questions a visitor asks before anything else.
 * Rendered as plain headings and paragraphs, never behind an interaction.
 */
export function QuickAnswers({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <dl className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.question} className="rounded-2xl border border-border bg-surface p-5">
          <dt className="text-base font-semibold text-primary">{item.question}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.answer}</dd>
        </div>
      ))}
    </dl>
  );
}
