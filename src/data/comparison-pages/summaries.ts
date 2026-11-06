import raw from "@/content/comparisons/summaries.json";
import type { ComparisonProduct, ContentFile } from "@/data/content/types";
import { routes } from "@/lib/routes";

type SummaryButton = { label: string; href: string };
export type SummarySection = { title: string; tag: string; html: string; buttons: SummaryButton[]; video: string };
export type SummaryCard = { appstle: string; competitor: string; html: string; link: SummaryButton | null };
export type SummaryPage = {
  slug: string;
  path: string;
  title: string;
  modified: string;
  sections: SummarySection[];
  matrix: { columns: string[]; rows: { label: string; values: boolean[] }[] };
  cards: SummaryCard[];
  cta: { title: string; html: string; buttons: SummaryButton[] };
};

const file = raw as unknown as ContentFile<SummaryPage>;

export type SummaryProduct = Extract<ComparisonProduct, "subscriptions" | "memberships">;

const bySlug = Object.fromEntries(file.items.map((s) => [s.slug, s]));

export const summaries: Record<SummaryProduct, { page: SummaryPage; path: string; seoKey: "bestSubscriptions" | "bestMemberships" }> = {
  subscriptions: { page: bySlug["best-shopify-subscriptions-app"], path: routes.bestSubscriptions, seoKey: "bestSubscriptions" },
  memberships: { page: bySlug["best-shopify-memberships-app"], path: routes.bestMemberships, seoKey: "bestMemberships" },
};

export const summaryFor = (product: ComparisonProduct) => (product === "subscriptions" || product === "memberships" ? summaries[product] : undefined);
