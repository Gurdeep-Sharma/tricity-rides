import Image from "next/image";

import { RouteArt } from "@/components/art/RouteArt";
import type { RouteData } from "@/data/routes";

/**
 * Destination visual for a route.
 *
 * Renders the supplied photograph where one exists, and falls back to the
 * drawn scene for routes that do not have photography yet. Adding a photo to
 * `RouteData.image` is all it takes to swap one for the other.
 */
export function DestinationImage({
  route,
  sizes,
  priority = false,
  className,
}: {
  route: RouteData;
  /** Responsive sizes hint, so the browser downloads an appropriately sized file. */
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (route.image) {
    return (
      <Image
        src={route.image.src}
        alt={route.image.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className={className ?? "object-cover"}
      />
    );
  }

  return (
    <RouteArt
      motif={route.motif}
      label={`${route.destination}, ${route.destinationState}`}
      className={className}
    />
  );
}
