import about from "@/content/pages/about.json";
import amazon from "@/content/pages/amazon-integration.json";
import appPartners from "@/content/pages/app-partners.json";
import bestMemberships from "@/content/pages/best-shopify-memberships-app.json";
import bestSubscriptions from "@/content/pages/best-shopify-subscriptions-app.json";
import careers from "@/content/pages/careers.json";
import causes from "@/content/pages/causes-and-non-profits-we-support.json";
import comparisons from "@/content/pages/comparisons.json";
import contact from "@/content/pages/contact-us.json";
import ebooks from "@/content/pages/ebooks.json";
import merchants from "@/content/pages/merchants.json";
import migrationBundles from "@/content/pages/migrations-bundles.json";
import migrationLoyalty from "@/content/pages/migrations-loyalty-rewards.json";
import migrationMemberships from "@/content/pages/migrations-memberships.json";
import migrationSubscriptions from "@/content/pages/migrations-subscriptions.json";
import migrations from "@/content/pages/migrations.json";
import news from "@/content/pages/news.json";
import privacy from "@/content/pages/privacy-policy.json";
import terms from "@/content/pages/terms-and-conditions.json";
import type { ContentEntry } from "./types";

export const livePages = {
  about,
  amazon,
  appPartners,
  bestMemberships,
  bestSubscriptions,
  careers,
  causes,
  comparisons,
  contact,
  ebooks,
  merchants,
  migrations,
  migrationSubscriptions,
  migrationMemberships,
  migrationLoyalty,
  migrationBundles,
  news,
  privacy,
  terms,
} as unknown as Record<
  | "about"
  | "amazon"
  | "appPartners"
  | "bestMemberships"
  | "bestSubscriptions"
  | "careers"
  | "causes"
  | "comparisons"
  | "contact"
  | "ebooks"
  | "merchants"
  | "migrations"
  | "migrationSubscriptions"
  | "migrationMemberships"
  | "migrationLoyalty"
  | "migrationBundles"
  | "news"
  | "privacy"
  | "terms",
  ContentEntry
>;
