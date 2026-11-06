import type { Metadata } from "next";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
};

export function buildMetadata({ path, title, description, image, noindex }: PageSeo): Metadata {
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: "Appstle", locale: "en_US", title, description, images },
    twitter: { card: "summary_large_image", site: "@appstleinc", title, description, images: image ? [image] : undefined },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

const clip = (s: string, max: number) => {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 20)).replace(/[\s,;:–—-]+$/, "")}…`;
};

export function fitTitle(live: string, title: string) {
  const clean = (s: string) => s.replace(/\s+/g, " ").trim();
  if (live && clean(live).length <= 60) return clean(live);
  const branded = `${clean(title)} | Appstle`;
  if (branded.length <= 60) return branded;
  return clip(title, 60);
}

export function fitDescription(live: string, fallback: string) {
  const clean = live.replace(/\s+/g, " ").trim();
  if (clean && clean.length <= 155) return clean;
  return clip(clean || fallback, 155);
}

export function entryMetadata(e: {
  path: string;
  title: string;
  seo: { title: string; description: string; robots: string };
  excerpt?: string;
  date?: string;
  modified?: string;
  article?: boolean;
}): Metadata {
  const title = fitTitle(e.seo.title, e.title);
  const description = fitDescription(e.seo.description, e.excerpt ?? e.title);
  const base = buildMetadata({ path: e.path, title, description, noindex: e.seo.robots === "noindex" });
  if (!e.article) return base;
  return {
    ...base,
    openGraph: {
      type: "article",
      url: e.path,
      siteName: "Appstle",
      locale: "en_US",
      title,
      description,
      publishedTime: e.date?.slice(0, 10),
      modifiedTime: e.modified?.slice(0, 10),
    },
  };
}
