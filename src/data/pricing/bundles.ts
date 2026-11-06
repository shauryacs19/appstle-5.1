import { row, type ProductPricing } from "./types";

export const bundlesPricing: ProductPricing = {
  product: "bundles",
  title: "Bundles & Upsells Pricing",
  tagline: "Take your e-commerce business to new heights, with the industry’s most trustable solution partners",
  finePrint: "*No hidden charges.",
  billing: "toggle",
  showTransactionFee: false,
  plans: [
    { name: "Launch", monthly: "$0", yearly: "$0", cta: "trial" },
    { name: "Starter", monthly: "$7.99", yearly: "$76.70", cta: "trial" },
    { name: "Growth", monthly: "$19.90", yearly: "$191.90", cta: "trial" },
    { name: "Pro", monthly: "$39.90", yearly: "$383.90", cta: "trial" },
  ],
  limit: row("Bundle Sales", ["Up to $750/mo in bundle sales", "Up to $2000/mo in bundle sales", "Up to $5000/mo in bundle sales", "Unlimited bundle sales"]),
  groups: [
    {
      title: "Features",
      rows: [
        row("Unlimited bundle creation", "1111"),
        row("Multiple layout styles", "1111"),
        row("Fully customizable bundles", "1111"),
        row("24/7 live support", "1111"),
      ],
    },
    { title: "Trial", rows: [row("Trial", ["Free", "14-day free trial", "14-day free trial", "14-day free trial"])] },
  ],
};
