import { Crown, Gift, PackagePlus, Repeat2, Store } from "lucide-react";
import type { ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

const icons = { subscriptions: Repeat2, memberships: Crown, loyalty: Gift, bundles: PackagePlus, pickup: Store } as const;

/* Each app's tile colour: four blues and the red, used wherever the app icon appears */
export const productTone: Record<ProductId, string> = {
  subscriptions: "bg-brand text-white",
  memberships: "bg-blue-ink text-white",
  loyalty: "bg-red text-white",
  bundles: "bg-powder text-blue-ink",
  pickup: "bg-sky-blue text-blue-ink",
};

export function ProductIcon({ id, className, size = "md" }: { id: ProductId; className?: string; size?: "sm" | "md" | "lg" }) {
  const Icon = icons[id];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid shrink-0 place-items-center ring-0",
        productTone[id],
        size === "sm" && "size-7 rounded-lg",
        size === "md" && "size-10 rounded-xl",
        size === "lg" && "size-12 rounded-2xl",
        className,
      )}
    >
      <Icon className={cn(size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6")} strokeWidth={2.1} />
    </span>
  );
}
