import Image from "next/image";
import { Users, Briefcase } from "lucide-react";

import type { VehicleType } from "@/data/vehicles";

export function VehicleCard({ vehicle }: { vehicle: VehicleType }) {
  return (
    <li className="lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card hover:border-secondary/40 hover:shadow-float">
      <div className="bg-gradient-to-b from-muted/70 to-surface px-4 pt-4">
        <div className="relative mx-auto aspect-[5/3] w-full max-w-[240px]">
          {/* All five photos are studio shots on white. Multiply blending drops
              that white into the card's gradient, so the cars sit on the card
              rather than in a visible white rectangle. */}
          <Image
            src={vehicle.image.src}
            alt={vehicle.image.alt}
            fill
            sizes="(min-width: 1280px) 240px, (min-width: 640px) 45vw, 90vw"
            className="object-contain mix-blend-multiply"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-border p-4">
        <h3 className="text-base font-semibold text-primary">{vehicle.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{vehicle.examples}</p>

        <dl className="mt-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Users aria-hidden="true" className="size-4 text-secondary" />
            <dt className="sr-only">Passenger capacity</dt>
            <dd className="font-medium">{vehicle.seatCount}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase aria-hidden="true" className="size-4 text-secondary" />
            <dt className="sr-only">Luggage capacity</dt>
            <dd className="font-medium">{vehicle.luggageCount}</dd>
          </div>
        </dl>

        <p className="mt-3 flex-1 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
          {vehicle.bestFor}
        </p>
      </div>
    </li>
  );
}

export function VehicleGrid({ vehicles }: { vehicles: VehicleType[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.slug} vehicle={vehicle} />
      ))}
    </ul>
  );
}
