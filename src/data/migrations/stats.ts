import { bundlesPage } from "@/data/product-pages/bundles";
import { loyaltyPage } from "@/data/product-pages/loyalty";
import { membershipsPage } from "@/data/product-pages/memberships";
import { subscriptionsPage } from "@/data/product-pages/subscriptions";
import type { PagedProductId } from "@/lib/routes";

const pages = { subscriptions: subscriptionsPage, memberships: membershipsPage, loyalty: loyaltyPage, bundles: bundlesPage };

export const migrationStats = (product: PagedProductId) => {
  const m = pages[product].migration;
  return { sources: m?.sources, timeline: m?.timeline };
};

export const fastestShare = (product: PagedProductId) => migrationStats(product).timeline?.bars[0];
