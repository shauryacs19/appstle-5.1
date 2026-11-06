import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing } from "@/data/pricing";
import type { Product } from "@/data/products";
import type { PagedProductId } from "@/lib/routes";
import { cn } from "@/lib/cn";

export function PricingTeaser({ product }: { product: Product & { id: PagedProductId } }) {
  const p = pricing[product.id];
  return (
    <Panel id="pricing" labelledBy="pricing-title" className={product.accent.soft}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          title={`${product.name} plans`}
          description={`${p.showTransactionFee ? "0% transaction fee on every plan. " : ""}${p.finePrint.replace(/^\*/, "")}`}
          dot={product.accent.solid}
          titleClassName="lg:text-[2.6rem]"
        />
        {product.pricingHref && (
          <ButtonLink href={product.pricingHref} variant="dark" className="self-start lg:self-auto">
            Compare all <strong>plans</strong>
          </ButtonLink>
        )}
      </div>
      <Stagger as="ul" className={cn("mt-8 grid gap-3 sm:grid-cols-2", p.plans.length > 4 ? "lg:grid-cols-3 xl:grid-cols-6" : "lg:grid-cols-4")}>
        {p.plans.map((plan) => (
          <StaggerItem as="li" key={plan.name}>
            <div className="flex h-full flex-col rounded-2xl bg-white p-4 ring-1 ring-navy/8">
              <h3 className="font-sans text-[0.95rem] font-semibold tracking-normal text-navy">{plan.name}</h3>
              <p className="mt-2 font-display text-3xl font-bold text-navy">
                {plan.monthly}
                {plan.monthly !== "Custom" && <span className="ml-1 font-sans text-sm font-medium text-ink-subtle">/ month</span>}
              </p>
              {plan.note && <p className="mt-2 text-[0.8rem] leading-snug text-ink-muted">{plan.note}</p>}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
