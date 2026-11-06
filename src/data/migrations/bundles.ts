import { examplePlatforms, smoothTransitionBody, subscriptionBlocks, subscriptionSteps } from "./steps";
import type { MigrationPage } from "./types";

export const bundlesMigration: MigrationPage = {
  product: "bundles",
  slug: "bundles",
  seoKey: "migrationBundles",
  name: "Bundles",
  hero: {
    title: "Looking to migrate your bundles to Appstle Bundles?",
    points: [
      "Our dedicated team has you covered! With thousands of successful migrations under their belt, our experts have the tools, experience, and hands-on expertise to ensure a smooth and seamless custom migration.",
      "Best of all, migrations to Appstle Bundles is completely free for merchants on all plans!",
    ],
  },
  free: true,
  anywhere: {
    title: "Migrate from anywhere",
    body: "Appstle supports migrations from all bundles apps within the Shopify ecosystem, as well as from select non-Shopify eCommerce platforms.",
  },
  platforms: examplePlatforms,
  apps: {
    title: "Example bundle apps you can migrate from",
    names: ["Vitals", "AOV"],
  },
  stats: false,
  blocks: [{ title: "Simplifying Your Bundles Management with Seamless Migrations", body: smoothTransitionBody }, ...subscriptionBlocks],
  path: { title: "Subscription Migration Path", steps: subscriptionSteps },
  cta: {
    title: "Plan your move to Appstle Bundles",
    body: "Best of all, migrations to Appstle Bundles is completely free for merchants on all plans!",
  },
};
