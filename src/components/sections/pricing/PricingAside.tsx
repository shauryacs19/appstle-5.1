import { BadgePercent, Receipt, Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Product } from "@/data/products";
import { cn, formatNumber } from "@/lib/cn";

export function PricingAside({ product, showFee }: { product: Product; showFee: boolean }) {
  const facts = [
    ...(showFee ? [{ icon: BadgePercent, title: "0% transaction fee", body: "On every plan, from Free to Enterprise Plus." }] : []),
    { icon: Receipt, title: "Billed through Shopify", body: "Appstle apps are paid through Shopify’s own billing, on your Shopify invoice." },
    {
      icon: Star,
      title: `${product.rating.value.toFixed(1)} · ${formatNumber(product.rating.count)} reviews`,
      body: `Shopify App Store rating (${product.rating.asOf}).`,
    },
  ];
  return (
    <Reveal delay={0.15}>
      <div className={cn("rounded-[2rem] p-6 ring-1 ring-navy/8 short:p-5", product.accent.soft)}>
        <p className="flex items-center gap-2.5 font-semibold text-navy">
          <ProductIcon id={product.id} size="sm" />
          {product.name}
        </p>
        <ul className="mt-5 grid gap-3">
          {facts.map((f) => (
            <li key={f.title} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-navy/6">
              <f.icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", product.accent.text)} />
              <span>
                <span className="block text-[0.95rem] font-semibold text-navy">{f.title}</span>
                <span className="text-[0.87rem] leading-snug text-ink-muted">{f.body}</span>
              </span>
            </li>
          ))}
        </ul>
        <SmartLink href={product.href} className={cn("mt-4 inline-flex text-sm font-semibold hover:underline", product.accent.text)}>
          Explore {product.shortName} features →
        </SmartLink>
      </div>
    </Reveal>
  );
}
