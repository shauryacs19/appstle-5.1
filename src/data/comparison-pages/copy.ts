import type { Product } from "@/data/products";

export const comparisonCopy = {
  library: {
    browse: (n: number) => `Browse all ${n} comparisons`,
    ctaTitle: "Still weighing your options?",
    ctaBody: "Talk to our team about your setup, or start with a free migration to Appstle.",
  },
  single: {
    eyebrow: (app: Product) => `${app.shortName} comparison`,
    fullTitle: (short: string) => `Appstle vs ${short}: the full comparison`,
    snapshotEyebrow: "At a glance",
    moreTitle: (app: Product) => `More ${app.name} comparisons`,
    allIn: (label: string) => `All ${label} comparisons →`,
    ctaTitle: (app: Product) => `Ready to try ${app.name}?`,
    ctaBody: (app: Product, withMigration: boolean) =>
      withMigration
        ? `Install ${app.name} from the Shopify App Store, or talk to our team about a free, hands-on migration.`
        : `Install ${app.name} from the Shopify App Store, or talk to our team about your setup.`,
  },
  summary: {
    cardsEyebrow: "App by app",
    cardsTitle: (app: string) => `How ${app} compares, app by app`,
    readFull: "Read the full comparison",
    matrixEyebrow: "Feature by feature",
  },
};
