import { CountUp } from "@/components/motion/CountUp";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ProductIcon } from "@/components/ui/ProductIcon";
import type { ProductId } from "@/data/products";

export function MerchantProofCard({ count, asOf, offers }: { count: number; asOf: string; offers: { label: string; product: ProductId }[] }) {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-cobalt-100/70 via-lavender-100/50 to-coral-100/60 blur-2xl" />
      <div className="rounded-4xl bg-white p-6 shadow-float ring-1 ring-navy/8 sm:p-8 short:p-6">
        <p className="font-display text-[4rem] leading-none font-extrabold tracking-tight text-cobalt short:text-[3.4rem]">
          <CountUp to={count} suffix="+" />
        </p>
        <p className="mt-2 text-[0.95rem] text-ink-muted">
          trusted merchants on Shopify and Shopify Plus <span className="whitespace-nowrap">({asOf})</span>
        </p>
        <Stagger as="ul" className="mt-6 grid grid-cols-1 gap-2 border-t border-navy/8 pt-5 sm:grid-cols-2 short:mt-4 short:pt-4" aria-label="What they offer with Appstle">
          {offers.map((o) => (
            <StaggerItem as="li" key={o.label} className="flex items-center gap-2.5 rounded-2xl bg-cream-50 p-2.5 text-[0.9rem] font-semibold text-navy ring-1 ring-navy/6">
              <ProductIcon id={o.product} size="sm" />
              {o.label}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
