import { comparisonSlug, comparisonsFor, competitorOf, tidyText } from "@/data/content/comparisons";
import type { Comparison } from "@/data/content/types";
import { productById } from "@/data/products";
import { stripTags } from "@/lib/html";
import { fitDescription, fitTitle } from "@/lib/seo";
import { competitorNames, fixCompetitorColumn, titleOverrides, wrongLiveDescription } from "./competitors";
import { titleLabel } from "./products";

export const competitorShort = (c: Comparison) => competitorNames[comparisonSlug(c)]?.short ?? competitorOf(c);

export const appstleAppOf = (c: Comparison) => productById[c.product];

export function comparisonTitle(c: Comparison) {
  const override = titleOverrides[comparisonSlug(c)];
  if (override) return override;
  const label = titleLabel[c.product];
  const short = competitorShort(c);
  const candidates = [`Appstle vs ${short} | ${label} Comparison`, `Appstle vs ${short} | ${label}`, `Appstle vs ${short}`];
  return candidates.find((t) => t.length <= 60) ?? fitTitle("", `Appstle vs ${short}`);
}

export function liveDescription(c: Comparison) {
  const live = tidyText(c.seo.description);
  const firstWord = competitorShort(c).split(/[\s:]/)[0].toLowerCase();
  return live && !wrongLiveDescription.has(comparisonSlug(c)) && live.toLowerCase().includes(firstWord) ? live : "";
}

export function comparisonDescription(c: Comparison) {
  const intro = stripTags(c.intro.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, " "));
  return fitDescription(liveDescription(c), intro || `Compare ${appstleAppOf(c).name} with ${competitorOf(c)}, feature by feature.`);
}

export const comparisonHeading = (c: Comparison) => tidyText(c.h1 || c.lead || c.title);

export function snapshotColumns(c: Comparison): [string, string] {
  const cols = c.snapshot?.columns ?? [];
  const appstle = tidyText(cols[0] || appstleAppOf(c).name);
  const rival = fixCompetitorColumn.has(comparisonSlug(c)) || !cols[1] ? competitorOf(c) : tidyText(cols[1]);
  return [appstle, rival];
}

export const snapshotTitle = (c: Comparison) => tidyText(c.snapshot?.title ?? "");

export const relatedComparisons = (c: Comparison, count = 6) =>
  comparisonsFor(c.product)
    .filter((x) => x !== c)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
