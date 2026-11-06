import { productById, type Accent, type ProductId } from "@/data/products";

export const categoryProduct: Record<string, ProductId | undefined> = {
  subscriptions: "subscriptions",
  memberships: "memberships",
  "loyalty-and-rewards": "loyalty",
  "product-bundles": "bundles",
};

export const neutralAccent: Accent = {
  solid: "bg-navy",
  soft: "bg-cream-100",
  chip: "bg-cream-200",
  text: "text-navy-700",
  ring: "ring-cream-300",
  hex: "#202B45",
};

export const accentFor = (id?: ProductId) => (id ? productById[id].accent : neutralAccent);
