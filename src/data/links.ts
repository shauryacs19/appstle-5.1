import { routes } from "@/lib/routes";

export const links = {
  home: routes.home,
  about: routes.about,
  merchants: routes.merchants,
  caseStudies: routes.caseStudies,
  appPartners: routes.appPartners,
  causes: routes.causes,
  careers: routes.careers,
  news: routes.news,
  blog: routes.blog,
  downloads: routes.downloads,
  faq: routes.faq,
  contact: routes.contact,
  migrations: routes.migrations,
  comparisons: routes.comparisons,
  bestSubscriptions: routes.bestSubscriptions,
  bestMemberships: routes.bestMemberships,
  privacy: routes.privacy,
  terms: routes.terms,
  amazon: routes.amazon,
  supportEmail: "mailto:support@appstle.com",
  partnerProgram: "https://appstle.firstpromoter.com/",
  helpCenter: "https://help.appstle.com/en/",
  developers: "https://developers.appstle.com/",
  shopifyPartner: "https://apps.shopify.com/partners/appstle",
} as const;

export const migrations = [
  { label: "Subscriptions", href: routes.migration.subscriptions },
  { label: "Memberships", href: routes.migration.memberships },
  { label: "Loyalty & Rewards", href: routes.migration.loyalty },
  { label: "Bundles", href: routes.migration.bundles },
] as const;

export const comparisons = [
  { label: "Subscriptions", href: `${routes.comparisons}#appstle-subscription-comparision` },
  { label: "Memberships", href: `${routes.comparisons}#appstle-membership-comparision` },
  { label: "Loyalty & Rewards", href: `${routes.comparisons}#appstle-loyalty-comparision` },
  { label: "Bundles & Upsells", href: `${routes.comparisons}#appstle-bundles-comparison` },
  { label: "Pickup & Delivery", href: `${routes.comparisons}#appstle-pickup-delivery-comparison` },
] as const;
