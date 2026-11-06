import type { PagedProductId } from "@/lib/routes";

export type MigrationPage = {
  product: PagedProductId;
  slug: string;
  seoKey: "migrationSubscriptions" | "migrationMemberships" | "migrationLoyalty" | "migrationBundles";
  name: string;
  hero: { title: string; points: string[] };
  free: boolean;
  anywhere: { title: string; body: string };
  platforms: string[];
  apps: { title: string; names: string[] };
  stats: boolean;
  blocks: { title: string; body: string }[];
  path: { title: string; steps: { title: string; points: string[] }[] };
  cta: { title: string; body: string };
};
