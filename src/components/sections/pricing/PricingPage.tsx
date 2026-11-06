import { CompareTable } from "@/components/features/pricing/CompareTable";
import { PricingPlans } from "@/components/features/pricing/PricingPlans";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqFor } from "@/data/faq";
import { offersFor, planAdditions, pricing } from "@/data/pricing";
import { productById } from "@/data/products";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { softwareAppLd } from "@/lib/jsonld";
import { routes, type PagedProductId } from "@/lib/routes";
import { OtherPricing } from "./OtherPricing";
import { PricingAside } from "./PricingAside";

const seoKey = { subscriptions: "subscriptionsPricing", memberships: "membershipsPricing", loyalty: "loyaltyPricing", bundles: "bundlesPricing" } as const;

export function PricingPage({ id }: { id: PagedProductId }) {
  const product = productById[id];
  const p = pricing[id];
  const path = routes.pricing[id];
  const faq = faqFor(id);
  const page = seo[seoKey[id]];

  return (
    <>
      <JsonLd
        data={softwareAppLd({
          name: product.name,
          description: page.description,
          path,
          installUrl: product.installHref,
          offers: offersFor(id),
          rating: { value: product.rating.value, count: product.rating.count },
        })}
      />
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: product.name, path: routes.product[id] },
          { name: "Pricing", path },
        ]}
        eyebrow={product.name}
        dot={product.accent.solid}
        title={p.title}
        intro={
          <>
            <p>{p.tagline}</p>
            <p className="mt-2 text-base font-semibold text-navy">{p.finePrint}</p>
          </>
        }
        actions={
          <>
            <ButtonLink href={product.installHref} size="lg">
              Get <strong>Started</strong>
            </ButtonLink>
            <ButtonLink href={links.partnerProgram} variant="secondary" size="lg">
              Become a <strong>Partner</strong>
            </ButtonLink>
          </>
        }
        aside={<PricingAside product={product} showFee={p.showTransactionFee} />}
      />

      <Panel id="plans" labelledBy="plans-title" className={product.accent.soft}>
        <SectionHeading id="plans-title" eyebrow="Plans" title={`Choose your ${product.shortName} plan`} dot={product.accent.solid} titleClassName="lg:text-[2.6rem] short:text-[2.2rem]" className="mb-6 max-w-3xl short:mb-4" />
        <PricingPlans
          plans={p.plans}
          additions={planAdditions(id)}
          hasToggle={p.billing === "toggle"}
          showFee={p.showTransactionFee}
          accent={product.accent}
          installHref={product.installHref}
          contactHref={links.contact}
        />
      </Panel>

      <Panel id="compare" labelledBy="compare-title" className="bg-white ring-1 ring-navy/6">
        <SectionHeading id="compare-title" eyebrow="Compare plans" title="Every feature, plan by plan" dot={product.accent.solid} titleClassName="lg:text-[2.6rem]" className="max-w-3xl" />
        <div className="mt-6 short:mt-4">
          <CompareTable plans={p.plans.map((x) => x.name)} groups={p.groups} limit={p.limit} accent={product.accent} idPrefix={`${id}-compare`} />
        </div>
      </Panel>

      {faq.length > 0 && <FaqSection title={`${product.name} questions`} items={faq.slice(0, 6)} moreHref={links.faq} />}
      <OtherPricing current={id} />
      <CtaBand
        title={`Start growing with ${product.name}`}
        body="Install from the Shopify App Store, or talk to our team about Enterprise plans and custom requirements."
        actions={
          <>
            <ButtonLink href={product.installHref} variant="light" size="lg">
              Get <strong>Started</strong>
            </ButtonLink>
            <ButtonLink href={links.contact} variant="outlineLight" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
