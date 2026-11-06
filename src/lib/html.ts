import { contentMedia } from "@/data/content/config";
import { gonePaths, movedPaths } from "@/data/content/moved-paths";
import { href } from "@/lib/routes";

export type TocItem = { id: string; text: string; level: 2 | 3 };

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };

const decodeEntities = (s: string) =>
  s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
    return ENTITIES[e.toLowerCase()] ?? m;
  });

export const stripTags = (s: string) => decodeEntities(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "section";

const attr = (tag: string, name: string) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1] ?? "";
const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function placeholder(img: string) {
  const alt = decodeEntities(attr(img, "alt")).trim();
  const w = Number(attr(img, "width")) || 16;
  const h = Number(attr(img, "height")) || 9;
  const label = alt ? `<span class="content-ph-alt">${escapeAttr(alt)}</span>` : "";
  const a11y = alt ? `role="img" aria-label="${escapeAttr(`Image: ${alt}`)}"` : `aria-hidden="true"`;
  return `<span class="content-ph" ${a11y} style="aspect-ratio:${w} / ${h}"><span class="content-ph-tag">Image</span>${label}</span>`;
}

export function prepareContent(html: string, opts: { toc?: boolean } = {}) {
  const used = new Map<string, number>();
  const toc: TocItem[] = [];

  let out = html.replace(/<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (m, tag: string, attrs = "", inner: string) => {
    const text = stripTags(inner);
    if (!text) return "";
    const base = slugify(text);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    const id = n ? `${base}-${n + 1}` : base;
    if (opts.toc !== false) toc.push({ id, text, level: tag.toLowerCase() === "h2" ? 2 : 3 });
    return `<${tag} id="${id}"${attrs.replace(/\sid="[^"]*"/i, "")}>${inner}</${tag}>`;
  });

  out = out.replace(/<img\b[^>]*>/gi, (img) =>
    contentMedia.images === "placeholder" ? placeholder(img) : img.replace(/<img\b/i, '<img loading="lazy" decoding="async"'),
  );

  out = out.replace(/<a\b([^>]*)\shref="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi, (m, pre: string, raw: string, post: string, inner: string) => {
    const path = decodeEntities(raw).replace(/(%20|\s)+$/, "");
    if (gonePaths.has(path)) return inner;
    const [base, hash] = path.split("#");
    const to = (movedPaths[base] ?? movedPaths[base.replace(/\/?$/, "/")] ?? base) + (hash ? `#${hash}` : "");
    return `<a${pre} href="${escapeAttr(href(to))}"${post}>${inner}</a>`;
  });
  out = out.replace(/<p>\s*(&nbsp;|\s)*\s*<\/p>/gi, "");

  return { html: out, toc };
}
