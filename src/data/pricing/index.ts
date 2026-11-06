import type { PagedProductId } from "@/lib/routes";
import { bundlesPricing } from "./bundles";
import { loyaltyPricing } from "./loyalty";
import { membershipsPricing } from "./memberships";
import { subscriptionsPricing } from "./subscriptions";
import type { ProductPricing } from "./types";

export type { FeatureGroup, FeatureRow, PlanCell, PricingPlan, ProductPricing } from "./types";

export const pricing: Record<PagedProductId, ProductPricing> = {
  subscriptions: subscriptionsPricing,
  memberships: membershipsPricing,
  loyalty: loyaltyPricing,
  bundles: bundlesPricing,
};

export function offersFor(id: PagedProductId) {
  return pricing[id].plans
    .filter((p) => p.monthly.startsWith("$"))
    .map((p) => ({ name: `${p.name} (monthly)`, price: p.monthly.replace(/[$,]/g, ""), description: p.note }));
}

export function planAdditions(id: PagedProductId, max = 3): string[][] {
  const p = pricing[id];
  const rows = p.groups.flatMap((g) => g.rows).filter((r) => r.values.every((v) => typeof v === "boolean"));
  return p.plans.map((_, i) =>
    rows
      .filter((r) => r.values[i] === true && (i === 0 || r.values[i - 1] === false))
      .slice(0, max)
      .map((r) => r.label),
  );
}
