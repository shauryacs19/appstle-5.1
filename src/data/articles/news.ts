import type { ContentEntry } from "@/data/content/types";

export const newsCopy = {
  eyebrow: "Newsroom",
  h1: "News & Announcements",
  pressLabel: "In the press",
  newsletterLabel: "Newsletters",
  newsletterKind: "Newsletter",
  readFull: "Read the full article",
  related: "Related News",
  about: [
    "Appstle℠ empowers Shopify merchants to grow and increase their sales through smart, unique, innovative apps.",
    "Appstle℠ is based in Menlo Park, California, with offices in Canada and India.",
  ],
} as const;

const newsFixes: [RegExp, string][] = [
  [/\bconventiently\b/g, "conveniently"],
  [/\bofcourse\b/g, "of course"],
  [/\bnot not\b/g, "not"],
  [/href="\/top-2-customer-retention/g, 'href="/blog/top-2-customer-retention'],
];

export const fixNewsHtml = (html: string) => newsFixes.reduce((h, [re, to]) => h.replace(re, to), html);

export function pressInfo(item: ContentEntry) {
  const m = item.title.match(/^(.*?)\s+\|\s+([^|]+)$/);
  const links = [...item.html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>[\s\S]*?<\/a>/gi)];
  const last = links.at(-1);
  if (!m || !last) return null;
  const teaser = item.html
    .slice(0, last.index)
    .replace(/<p>\s*$/i, "")
    .replace(/(<br>\s*)?<strong>\s*Read Full Article[^<]*<\/strong>\s*(<\/p>)?\s*(<p>)?\s*$/i, "")
    .replace(/<p>\s*$/i, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .trim();
  const open = (teaser.match(/<p\b/gi) ?? []).length - (teaser.match(/<\/p>/gi) ?? []).length;
  return { headline: m[1], outlet: m[2].trim(), url: last[1], isPdf: /\.pdf($|\?)/i.test(last[1]), teaser: open > 0 ? `${teaser}</p>` : teaser };
}
