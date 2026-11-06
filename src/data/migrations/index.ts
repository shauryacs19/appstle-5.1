import { routes } from "@/lib/routes";
import { bundlesMigration } from "./bundles";
import { loyaltyMigration } from "./loyalty";
import { membershipsMigration } from "./memberships";
import { subscriptionsMigration } from "./subscriptions";
import type { MigrationPage } from "./types";

export const migrationPages: MigrationPage[] = [subscriptionsMigration, membershipsMigration, loyaltyMigration, bundlesMigration];

export const migrationBySlug = (slug: string) => migrationPages.find((m) => m.slug === slug);
export const migrationPath = (m: MigrationPage) => `${routes.migrations}${m.slug}/`;
