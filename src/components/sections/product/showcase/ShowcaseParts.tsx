import type { ReactNode } from "react";
import { BookOpen, MonitorPlay } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { ProductIcon } from "@/components/ui/ProductIcon";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

export function ShowcasePanel({
  id,
  labelledBy,
  className,
  children,
}: {
  id: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Panel id={id} labelledBy={labelledBy} className={className}>
      {children}
    </Panel>
  );
}

export function ProductKicker({ product, className }: { product: Product; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2.5 rounded-full bg-white/80 py-1 pr-3.5 pl-1 text-sm font-semibold text-navy ring-1 ring-navy/8", className)}>
      <ProductIcon id={product.id} size="sm" />
      {product.name}
    </p>
  );
}

export function ProductLinks({ product, learnMore = false, className }: { product: Product; learnMore?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {product.pricingHref ? (
        <>
          <ButtonLink href={product.pricingHref} variant="dark">
            See <strong>Pricing</strong>
          </ButtonLink>
          <ButtonLink href={product.installHref} variant="secondary">
            Install on <strong>Shopify</strong>
          </ButtonLink>
        </>
      ) : (
        <ButtonLink href={product.installHref} variant="dark">
          Install on <strong>Shopify</strong>
        </ButtonLink>
      )}
      {learnMore && (
        <ButtonLink href={product.href} variant="ghost">
          Learn <strong>more</strong>
        </ButtonLink>
      )}
    </div>
  );
}

export function ProductResources({ product, className }: { product: Product; className?: string }) {
  const link = "inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm font-semibold text-navy/75 transition-colors hover:text-navy hover:underline";
  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {product.demoHref && (
        <a href={product.demoHref} className={link}>
          <MonitorPlay aria-hidden className="size-4" /> Demo store
        </a>
      )}
      <a href={product.helpHref} className={link}>
        <BookOpen aria-hidden className="size-4" /> Help guides
      </a>
    </div>
  );
}
