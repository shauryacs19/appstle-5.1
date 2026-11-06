import { competitorShort } from "./meta";
import { comparisonPages, comparisonsFor, competitorOf } from "@/data/content/comparisons";
import { livePages } from "@/data/content/pages";
import type { Comparison } from "@/data/content/types";
import { productById, type ProductId } from "@/data/products";
import { comparisonGroups } from "./products";

export type ComparisonCardData = {
  href: string;
  short: string;
  name: string;
  product: ProductId;
  soft: string;
};

export const comparisonCard = (c: Comparison): ComparisonCardData => ({
  href: c.path,
  short: competitorShort(c),
  name: competitorOf(c),
  product: c.product,
  soft: productById[c.product].accent.soft,
});

const liveOrder = [...livePages.comparisons.html.matchAll(/href="(\/[^"]+\/)"/g)].map((m) => m[1]);
const rank = (c: Comparison) => {
  const i = liveOrder.indexOf(c.path);
  return i < 0 ? Number.MAX_SAFE_INTEGER : i;
};
const byLibraryOrder = (a: Comparison, b: Comparison) => rank(a) - rank(b) || competitorShort(a).localeCompare(competitorShort(b));

export const libraryGroups = comparisonGroups.map((g) => ({
  ...g,
  cards: comparisonsFor(g.id).sort(byLibraryOrder).map(comparisonCard),
}));

export const comparisonCount = comparisonPages.length;
