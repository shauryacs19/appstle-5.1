import { href, routes } from "@/lib/routes";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://appstle.com";

export const links = {
  home: href(routes.home),
  about: href(routes.about),
  merchants: href(routes.merchants),
  caseStudies: href(routes.caseStudies),
  appPartners: href(routes.appPartners),
  causes: href(routes.causes),
  careers: href(routes.careers),
  news: href(routes.news),
  blog: href(routes.blog),
  downloads: href(routes.downloads),
  faq: href(routes.faq),
  contact: href(routes.contact),
  partnerProgram: "https://appstle.firstpromoter.com/",
  migrations: href(routes.migrations),
  comparisons: href(routes.comparisons),
  bestSubscriptions: href(routes.bestSubscriptions),
  bestMemberships: href(routes.bestMemberships),
  privacy: href(routes.privacy),
  terms: href(routes.terms),
  amazon: href(routes.amazon),
  helpCenter: "https://help.appstle.com/en/",
  developers: "https://developers.appstle.com/",
  shopifyPartner: "https://apps.shopify.com/partners/appstle",
  supportEmail: "mailto:support@appstle.com",
} as const;

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/appstlehq/" },
  { label: "Facebook", href: "https://www.facebook.com/107026091637754/" },
  { label: "YouTube", href: "https://www.youtube.com/@appstleinc.2741" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/appstle/" },
  { label: "X (Twitter)", href: "https://twitter.com/appstleinc" },
] as const;

export const proof = {
  merchants: {
    value: 70000,
    display: "70,000+",
    label: "Shopify & Shopify Plus merchants",
    note: "Merchant count published by Appstle (as of Dec 2024).",
    source: "https://appstle.com/merchants/",
  },
  reviews: {
    value: 10000,
    display: "10,000+",
    label: "combined 5★ reviews",
    note: "Appstle homepage: “over 10,000 combined 5 ⭐ reviews” across its Shopify apps.",
    source: "https://appstle.com/",
  },
  subscriptionsRating: {
    value: 5.0,
    count: 9054,
    label: "Appstle Subscriptions rating on the Shopify App Store",
    asOf: "22 Oct 2026",
    source: "https://apps.shopify.com/subscriptions-by-appstle",
  },
  support: {
    display: "24/7/365",
    label: "merchant support",
    note: "Appstle states support is available 24x7x365.",
    source: "https://appstle.com/contact-us/",
  },
  founded: {
    display: "2021",
    label: "Founded in Menlo Park, California",
    source: "https://appstle.com/about/",
  },
} as const;

export const press = [
  {
    outlet: "Forbes",
    title: "Appstle – E-commerce software “Gamechangers”",
    date: "July 1, 2024",
    href: "/news/appstle-e-commerce-software-gamechangers-forbes/",
  },
  {
    outlet: "Bloomberg Businessweek",
    title: "Appstle – Story of an e-commerce Revolution",
    date: "June 3, 2024",
    href: "/news/appstle-story-of-an-e-commerce-revolution-bloomberg-businessweek/",
  },
  {
    outlet: "USA Today",
    title: "A Pioneering E-Commerce Software Provider That Is Bridging the ‘Demand’ Gap",
    date: "November 6, 2023",
    href: "/news/appstle-a-pioneering-e-commerce-software-provider-that-is-bridging-the-demand-gap-usa-today/",
  },
  {
    outlet: "Business Insider",
    title: "Appstle Plans to Further Disrupt eCommerce Space with ‘Compelling Apps at Compelling Prices’",
    date: "October 10, 2023",
    href: "/news/appstle-plans-to-further-disrupt-ecommerce-space-with-compelling-apps-at-compelling-prices/",
  },
  {
    outlet: "Yahoo Finance",
    title: "Appstle Introduces Appstle Subscriptions, a Pioneering Solution in the Subscription Economy",
    date: "October 9, 2023",
    href: "https://finance.yahoo.com/news/appstle-presents-appstle-subscriptions-pioneering-172900484.html",
  },
] as const;
