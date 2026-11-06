import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { pricing } from "@/data/pricing";
import { products } from "@/data/products";
import type { PagedProductId } from "@/lib/routes";
import { cn } from "@/lib/cn";

export function OtherPricing({ current }: { current: PagedProductId }) {
  const others = products.filter((p): p is (typeof products)[number] & { id: PagedProductId } => p.id !== current && p.id !== "pickup");
  return (
    <Panel id="more-pricing" labelledBy="more-pricing-title" bare>
      <SectionHeading id="more-pricing-title" eyebrow="The Appstle suite" title="Pricing for the other Appstle apps" titleClassName="lg:text-[2.4rem]" />
      <Stagger as="ul" className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {others.map((p) => {
          const plans = pricing[p.id].plans;
          return (
            <StaggerItem as="li" key={p.id}>
              <div className={cn("group relative flex h-full items-center gap-4 rounded-3xl p-5 ring-1 ring-navy/8 transition hover:-translate-y-0.5 hover:shadow-card", p.accent.soft)}>
                <ProductIcon id={p.id} size="lg" />
                <div>
                  <h3 className="font-sans text-base font-semibold tracking-normal text-navy">
                    <SmartLink href={p.pricingHref ?? p.href} className="after:absolute after:inset-0 after:rounded-3xl">
                      {p.shortName} pricing
                    </SmartLink>
                  </h3>
                  <p className="text-sm text-ink-muted">
                    {plans.length} plans · from {plans[0].monthly} / month
                  </p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
