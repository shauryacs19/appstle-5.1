import raw from "@/content/comparisons/singles.json";
import { competitorNames } from "@/data/comparison-pages/competitors";
import { slugOf } from "./format";
import type { Comparison, ComparisonProduct, ContentFile } from "./types";

const file = raw as unknown as ContentFile<Comparison>;

export const tidyText = (s: string) => s.replace(/[​-‍﻿]/g, "").replace(/\s+/g, " ").trim();

export const comparisonPages: Comparison[] = file.items;
export const comparisonSlug = (c: Comparison) => slugOf(c.path);
export const comparisonBySlug = (slug: string) => comparisonPages.find((c) => comparisonSlug(c) === slug);
export const comparisonsFor = (product: ComparisonProduct) => comparisonPages.filter((c) => c.product === product);

export const competitorOf = (c: Comparison) =>
  competitorNames[comparisonSlug(c)]?.name ?? tidyText(c.heroLabels[1] ?? c.title.replace(/^.*\bvs\.?\s+/i, ""));
