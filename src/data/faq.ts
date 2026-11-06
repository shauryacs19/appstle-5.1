import faq from "@/content/faq.json";
import type { ProductId } from "@/data/products";
import type { Qa } from "@/lib/jsonld";

export { faqCopy } from "./faq-copy";

type FaqGroupId = "general" | "subscriptions" | "memberships" | "loyalty";
export type FaqGroup = { id: FaqGroupId; title: string; items: Qa[]; product?: ProductId };

const groupIds: Record<string, FaqGroupId> = {
  "Appstle General": "general",
  "Appstle Subscriptions": "subscriptions",
  "Appstle Membership": "memberships",
  "Appstle Loyalty & Rewards": "loyalty",
};

export const faqPage = {
  title: faq.title,
  source: faq.source,
  modified: faq.modified,
  groups: faq.groups.map((g): FaqGroup => {
    const id = groupIds[g.title] ?? "general";
    return { id, title: g.title, items: g.items, product: id === "general" ? undefined : id };
  }),
};

export const faqItemId = (group: FaqGroupId, index: number) => `faq-${group}-${index}`;

export const faqFor = (id: string): Qa[] => faqPage.groups.find((g) => g.id === id)?.items ?? [];
