import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { RouteLanding } from "@/components/templates/RouteLanding";
import { ServiceLanding } from "@/components/templates/ServiceLanding";
import { LocationLanding } from "@/components/templates/LocationLanding";
import { allPageSlugs, resolvePage } from "@/data/pages";
import { buildMetadata } from "@/lib/seo";

/** Only the slugs in the data files exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = resolvePage(slug);

  if (!page) return { title: "Page not found" };

  return buildMetadata({
    title: page.data.seo.title,
    description: page.data.seo.description,
    path: `/${slug}`,
  });
}

export default async function FlatSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = resolvePage(slug);

  if (!page) notFound();

  if (page.kind === "route") return <RouteLanding route={page.data} />;
  if (page.kind === "service") return <ServiceLanding service={page.data} />;
  return <LocationLanding location={page.data} />;
}
