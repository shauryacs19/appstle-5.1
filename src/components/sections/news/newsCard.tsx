import type { EntryCardData } from "@/components/sections/article/EntryCard";
import { excerptOf } from "@/data/articles/excerpt";
import { fixNewsHtml, newsCopy, pressInfo } from "@/data/articles/news";
import { neutralAccent } from "@/data/content/accents";
import { formatDate } from "@/data/content/format";
import type { ContentEntry } from "@/data/content/types";
import { stripTags } from "@/lib/html";

export function newsCard(n: ContentEntry): EntryCardData {
  const press = pressInfo(n);
  const teaser = press ? stripTags(press.teaser) : excerptOf({ excerpt: n.excerpt, html: fixNewsHtml(n.html) }, 150);
  return {
    href: n.path,
    title: press?.headline ?? n.title,
    accent: neutralAccent,
    chip: press?.outlet ?? newsCopy.newsletterKind,
    kicker: press?.outlet ?? newsCopy.newsletterKind,
    excerpt: teaser.length > 160 ? `${teaser.slice(0, teaser.lastIndexOf(" ", 158))}…` : teaser || undefined,
    image: n.image,
    meta: [
      <time key="d" dateTime={n.date.slice(0, 10)}>
        {formatDate(n.date)}
      </time>,
    ],
  };
}
