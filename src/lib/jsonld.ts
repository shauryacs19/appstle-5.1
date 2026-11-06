import { SITE_URL } from "@/data/site";

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

const ORG_ID = `${SITE_URL.replace(/\/$/, "")}/#organization`;

export type Crumb = { name: string; path: string };

export function breadcrumbLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

type Offer = { name: string; price: string; priceCurrency?: string; description?: string };

export function softwareAppLd(app: {
  name: string;
  description: string;
  path: string;
  installUrl: string;
  offers?: Offer[];
  rating?: { value: number; count: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: absoluteUrl(app.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Shopify",
    installUrl: app.installUrl,
    publisher: { "@id": ORG_ID },
    offers: app.offers?.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: o.priceCurrency ?? "USD",
      description: o.description,
    })),
    aggregateRating: app.rating
      ? { "@type": "AggregateRating", ratingValue: app.rating.value, ratingCount: app.rating.count, bestRating: 5 }
      : undefined,
  };
}

export type Qa = { question: string; answer: string; answerHtml?: string };

export function faqLd(items: Qa[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
  };
}

export function articleLd(a: {
  type?: "Article" | "BlogPosting" | "NewsArticle";
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": a.type ?? "Article",
    headline: a.headline,
    description: a.description,
    url: absoluteUrl(a.path),
    mainEntityOfPage: absoluteUrl(a.path),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: a.author && !/^(appstle|team appstle)$/i.test(a.author) ? { "@type": "Person", name: a.author } : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    image: a.image,
    articleSection: a.section,
  };
}

export function collectionLd(c: { name: string; description: string; path: string; items: { name: string; path: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.name,
    description: c.description,
    url: absoluteUrl(c.path),
    isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: c.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
    },
  };
}
