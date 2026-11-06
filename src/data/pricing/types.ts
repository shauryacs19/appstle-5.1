import type { PagedProductId } from "@/lib/routes";

export type PlanCell = boolean | string;

export type PricingPlan = {
  name: string;
  monthly: string;
  yearly?: string;
  note?: string;
  cta: "trial" | "contact";
};

export type FeatureRow = { label: string; values: PlanCell[] };
export type FeatureGroup = { title: string; rows: FeatureRow[] };

export type ProductPricing = {
  product: PagedProductId;
  title: string;
  tagline: string;
  finePrint: string;
  billing: "toggle" | "inline" | "monthly";
  plans: PricingPlan[];
  limit?: FeatureRow;
  groups: FeatureGroup[];
  showTransactionFee: boolean;
};

export function row(label: string, mask: string | string[]): FeatureRow {
  return { label, values: Array.isArray(mask) ? mask : [...mask].map((c) => c === "1") };
}
