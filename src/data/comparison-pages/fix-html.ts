import type { ComparisonProduct } from "@/data/content/types";
import { gonePaths, movedPaths } from "@/data/content/moved-paths";
import { routes } from "@/lib/routes";

const MOVED: Record<string, string> = {
  ...movedPaths,
  "/shopify-subscriptions/#pricing": routes.pricing.subscriptions,
};
const GONE = gonePaths;

const PRICING: Partial<Record<ComparisonProduct, string>> = routes.pricing;

function fixLinks(html: string, product?: ComparisonProduct) {
  return html
    .replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (m, raw: string, inner: string) => {
      const path = raw.replace(/(%20|\s)+$/, "");
      if (GONE.has(path)) return inner;
      return m.replace(`href="${raw}"`, `href="${fixPath(path, product)}"`);
    });
}

export function fixPath(path: string, product?: ComparisonProduct) {
  const clean = path.replace(/(%20|\s)+$/, "");
  if (clean === "/#pricing" && product && PRICING[product]) return PRICING[product]!;
  return MOVED[clean] ?? clean;
}

function tidyHtml(html: string) {
  return html
    .replace(/<\/strong>\s?<strong>/g, (m) => (m.includes(" ") ? " " : ""))
    .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>|<strong>(?:\s|&nbsp;|<br\s*\/?>)*<\/strong>)*<\/p>/gi, "")
    .replace(/<p>\s*<p>([\s\S]*?)<\/p>\s*<\/p>/gi, "<p>$1</p>")
    .replace(/,,/g, ",");
}

const SPELLING: [RegExp, string][] = [
  [/\bcomplementary to (merchants|all)/g, "complimentary to $1"],
  [/\bYopto\b/g, "Yotpo"],
];
const fixSpelling = (s: string) => SPELLING.reduce((t, [re, to]) => t.replace(re, to), s);

export const cleanHtml = (html: string, product?: ComparisonProduct) => fixSpelling(tidyHtml(fixLinks(html, product)));
