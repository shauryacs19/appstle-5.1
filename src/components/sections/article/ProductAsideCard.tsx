import { ProductIcon } from "@/components/ui/ProductIcon";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

export function ProductAsideCard({ product, eyebrow = "Featured app" }: { product: Product; eyebrow?: string }) {
  return (
    <div className={cn("rounded-3xl p-5 ring-1 ring-navy/8", product.accent.soft)}>
      <p className="eyebrow text-ink-subtle">{eyebrow}</p>
      <div className="mt-3 flex items-center gap-3">
        <ProductIcon id={product.id} />
        <p className="font-display text-lg leading-tight font-bold text-navy">{product.name}</p>
      </div>
      <p className="mt-3 text-[0.88rem] leading-snug text-ink-muted">{product.tagline}</p>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
        <SmartLink href={product.href} className={cn("hover:underline", product.accent.text)}>
          Explore the app →
        </SmartLink>
        {product.pricingHref && (
          <SmartLink href={product.pricingHref} className="text-navy hover:underline">
            Pricing
          </SmartLink>
        )}
      </p>
    </div>
  );
}
