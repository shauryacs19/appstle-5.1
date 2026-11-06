import type { ProductId } from "@/data/products";
import { routes } from "@/lib/routes";

export const compareCopy = {
  eyebrow: "Compare",
  title: (name: string) => `How ${name} compares`,
  description: "Feature-by-feature comparisons with other Shopify apps, side by side.",
  all: "All comparisons",
};

export const libraryAnchor: Partial<Record<ProductId, string>> = {
  subscriptions: "appstle-subscription-comparision",
  memberships: "appstle-membership-comparision",
  loyalty: "appstle-loyalty-comparision",
  bundles: "appstle-bundles-comparison",
  pickup: "appstle-pickup-delivery-comparison",
};

export const summaryFor: Partial<Record<ProductId, { label: string; path: string }>> = {
  subscriptions: { label: "Best Shopify subscriptions app: Appstle compared", path: routes.bestSubscriptions },
  memberships: { label: "Best Shopify memberships app: Appstle compared", path: routes.bestMemberships },
};
