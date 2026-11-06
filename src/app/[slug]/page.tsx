import { notFound } from "next/navigation";
import { ComparisonPage } from "@/components/sections/comparison/ComparisonPage";
import { comparisonDescription, comparisonTitle } from "@/data/comparison-pages/meta";
import { comparisonBySlug, comparisonPages, comparisonSlug } from "@/data/content/comparisons";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return comparisonPages.map((c) => ({ slug: comparisonSlug(c) }));
}

export async function generateMetadata({ params }: Props) {
  const c = comparisonBySlug((await params).slug);
  if (!c) return {};
  return buildMetadata({ path: c.path, title: comparisonTitle(c), description: comparisonDescription(c), noindex: c.seo.robots === "noindex" });
}

export default async function ComparisonRoute({ params }: Props) {
  const c = comparisonBySlug((await params).slug);
  if (!c) notFound();
  return <ComparisonPage c={c} />;
}
