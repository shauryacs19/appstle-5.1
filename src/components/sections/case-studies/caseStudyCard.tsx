import type { EntryCardData } from "@/components/sections/article/EntryCard";
import { caseStudyMeta } from "@/data/articles/case-studies";
import { excerptOf } from "@/data/articles/excerpt";
import { accentFor } from "@/data/content/accents";
import { caseStudySlug } from "@/data/content/case-studies";
import { readingMinutes } from "@/data/content/format";
import type { ContentEntry } from "@/data/content/types";
import { productById } from "@/data/products";

export function caseStudyCard(c: ContentEntry): EntryCardData {
  const meta = caseStudyMeta[caseStudySlug(c)];
  const product = meta?.products[0];
  return {
    href: c.path,
    title: c.title,
    accent: accentFor(product),
    product,
    chip: meta ? meta.products.map((p) => productById[p].shortName).join(" + ") : "Case study",
    kicker: meta?.customer,
    excerpt: excerptOf(c, 150),
    image: c.image,
    meta: [meta?.industry, `${readingMinutes(c.words)} min read`],
  };
}
