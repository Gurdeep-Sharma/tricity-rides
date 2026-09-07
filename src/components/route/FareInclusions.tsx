import { Check, Plus } from "lucide-react";
import { businessConfig } from "@/config/business";

/**
 * Fare transparency block. No rupee amounts appear anywhere while
 * businessConfig.pricing.showStartingFares is false.
 */
export function FareInclusions({ extraCharges = [] }: { extraCharges?: string[] }) {
  const extras = [...businessConfig.fare.extras, ...extraCharges];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-base font-semibold text-primary">
          What a quote normally includes
        </h3>
        <ul className="mt-3 space-y-2.5">
          {businessConfig.fare.included.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-secondary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-base font-semibold text-primary">
          What may be charged separately
        </h3>
        <ul className="mt-3 space-y-2.5">
          {extras.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
              <Plus aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-foreground/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground md:col-span-2">
        {businessConfig.fare.note} {businessConfig.pricing.explanation}
      </p>
    </div>
  );
}
