import type { ProductId } from "@/data/products";

const LIVE_ORIGIN = "https://appstle.com";

export const routes = {
  home: "/",
  about: "/about/",
  merchants: "/merchants/",
  appPartners: "/app-partners/",
  causes: "/causes-and-non-profits-we-support/",
  careers: "/careers/",
  contact: "/contact-us/",
  privacy: "/privacy-policy/",
  terms: "/terms-and-conditions/",
  amazon: "/amazon-integration/",
  comparisons: "/comparisons/",
  product: {
    subscriptions: "/products/ecommerce-subscriptions/",
    memberships: "/products/ecommerce-memberships/",
    loyalty: "/products/appstle-loyalty-and-rewards/",
    bundles: "/products/appstle-bundles-and-upsells/",
  },
  pickup: "/products/appstle-pickup-and-delivery/",
  pricing: {
    subscriptions: "/products/appstle-subscriptions-pricing/",
    memberships: "/products/appstle-memberships-pricing/",
    loyalty: "/products/appstle-loyalty-and-rewards-pricing/",
    bundles: "/products/appstle-bundles-and-upsells-pricing/",
  },
  bestSubscriptions: "/best-shopify-subscriptions-app/",
  bestMemberships: "/best-shopify-memberships-app/",
  caseStudies: "/case-studies/",
  news: "/news/",
  blog: "/blog/",
  downloads: "/ebooks/",
  faq: "/faq/",
  migrations: "/migrations/",
  migration: {
    subscriptions: "/migrations/subscriptions/",
    memberships: "/migrations/memberships/",
    loyalty: "/migrations/loyalty-rewards/",
    bundles: "/migrations/bundles/",
  },
} as const;

export const entryRoutes = {
  blogPost: (slug: string) => `/blog/${slug}/`,
  blogPage: (page: number) => (page <= 1 ? routes.blog : `/blog/page/${page}/`),
  blogCategory: (slug: string, page = 1) => (page <= 1 ? `/blog/category/${slug}/` : `/blog/category/${slug}/page/${page}/`),
  news: (slug: string) => `/news/${slug}/`,
  newsPage: (page: number) => (page <= 1 ? routes.news : `/news/page/${page}/`),
  caseStudy: (slug: string) => `/case-studies/${slug}/`,
  ebook: (slug: string) => `/ebook/${slug}/`,
  comparison: (slug: string) => `/${slug}/`,
} as const;

export type PagedProductId = Exclude<ProductId, "pickup">;

const liveOnly = new Set<string>(["/feedback/", "/keynotes/", "/thank-you/", "/subscription-article/"]);
const liveOnlyPrefixes = ["/ecommerce-subscriptions/", "/wp-content/"];

const isBuilt = (path: string) => !liveOnly.has(path) && !liveOnlyPrefixes.some((p) => path.startsWith(p));

export function href(path: string) {
  if (path.startsWith("#") || /^[a-z]+:/i.test(path)) return path;
  const [base, hash = ""] = path.split("#");
  if (isBuilt(base)) return path;
  return `${LIVE_ORIGIN}${base}${hash ? `#${hash}` : ""}`;
}
