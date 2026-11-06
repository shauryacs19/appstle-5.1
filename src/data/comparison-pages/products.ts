import type { ComparisonProduct } from "@/data/content/types";

export const comparisonGroups: { id: ComparisonProduct; label: string; title: string; anchor: string }[] = [
  { id: "subscriptions", label: "Subscriptions", title: "Appstle Subscriptions comparisons", anchor: "appstle-subscription-comparision" },
  { id: "memberships", label: "Memberships", title: "Appstle Memberships comparisons", anchor: "appstle-membership-comparision" },
  { id: "loyalty", label: "Loyalty & Rewards", title: "Appstle Loyalty comparisons", anchor: "appstle-loyalty-comparision" },
  { id: "bundles", label: "Bundles & Upsells", title: "Appstle Bundles & Upsells comparisons", anchor: "appstle-bundles-comparison" },
  { id: "pickup", label: "Pickup & Delivery", title: "Appstle Pickup & Delivery comparisons", anchor: "appstle-pickup-delivery-comparison" },
];

export const groupFor = (id: ComparisonProduct) => comparisonGroups.find((g) => g.id === id)!;

export const titleLabel: Record<ComparisonProduct, string> = {
  subscriptions: "Subscriptions",
  memberships: "Memberships",
  loyalty: "Loyalty",
  bundles: "Bundles",
  pickup: "Pickup & Delivery",
};
