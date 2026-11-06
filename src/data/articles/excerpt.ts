import type { ContentEntry } from "@/data/content/types";
import { stripTags } from "@/lib/html";

export function excerptOf(e: Pick<ContentEntry, "excerpt" | "html">, max = 170) {
  const source =
    e.excerpt ||
    [...e.html.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
      .map((m) => stripTags(m[1]))
      .find((t) => t.split(" ").length > 12) ||
    "";
  const text = source.replace(/…$/, "").trim();
  if (text.length <= max) return e.excerpt ? source : text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:–—-]+$/, "")}…`;
}
