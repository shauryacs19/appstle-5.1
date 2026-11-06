import type { EntryCardData } from "@/components/sections/article/EntryCard";
import { categoryName, primaryCategory, productOfPost } from "@/data/articles/blog";
import { accentFor } from "@/data/content/accents";
import { formatDate, readingMinutes } from "@/data/content/format";
import type { BlogPost } from "@/data/content/types";

export function postCard(p: BlogPost): EntryCardData {
  const product = productOfPost(p);
  return {
    href: p.path,
    title: p.title,
    accent: accentFor(product),
    product,
    chip: categoryName(primaryCategory(p)),
    kicker: categoryName(primaryCategory(p)),
    excerpt: p.excerpt,
    image: p.image,
    meta: [
      <time key="d" dateTime={p.date.slice(0, 10)}>
        {formatDate(p.date)}
      </time>,
      `${readingMinutes(p.words)} min read`,
      p.author,
    ],
  };
}
