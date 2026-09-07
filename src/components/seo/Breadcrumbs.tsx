import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail. Pair with breadcrumbJsonLd for the structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-primary-foreground/80">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-primary-foreground">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="rounded underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight aria-hidden="true" className="size-3.5 opacity-70" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
