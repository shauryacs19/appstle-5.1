import type { ReactNode } from "react";
import { StickyCtaBar } from "@/components/features/StickyCtaBar";
import { StickySubnav, type SubnavItem } from "@/components/features/StickySubnav";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";
import { LogoStrip } from "@/components/sections/shared/LogoStrip";
import { PricingTeaser } from "@/components/sections/shared/PricingTeaser";
import { ProductHero } from "@/components/sections/shared/ProductHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { faqFor } from "@/data/faq";
import { offersFor } from "@/data/pricing";
import type { ProductPageData } from "@/data/product-pages/types";
import { productById } from "@/data/products";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { softwareAppLd } from "@/lib/jsonld";
import { href, routes } from "@/lib/routes";
import { comparisonsFor } from "@/data/content/comparisons";
import { ProductDemos } from "./ProductDemos";
import { ProductExplorer } from "./ProductExplorer";
import { ProductIntegrations } from "./ProductIntegrations";
import { ProductMigration } from "./ProductMigration";
import { ProductOverview } from "./ProductOverview";
import { ProductReviews } from "./ProductReviews";

export function ProductPage({ data, demos, showcase }: { data: ProductPageData; demos: ReactNode; showcase?: ReactNode }) {
  const product = productById[data.id];
  const path = routes.product[data.id];
  const faq = faqFor(data.id);
  const hasReviews = !!data.reviews;

  const compared = comparisonsFor(data.id).length > 0;

  void showcase;
  void compared;
  const nav: SubnavItem[] = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "try-it", label: "Try it" },
    ...(hasReviews ? [{ id: "reviews", label: "Reviews" }] : []),
    { id: "pricing", label: "Pricing" },
    ...(faq.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <>
      <JsonLd
        data={softwareAppLd({
          name: product.name,
          description: seo[data.id].description,
          path,
          installUrl: product.installHref,
          offers: offersFor(data.id),
          rating: { value: product.rating.value, count: product.rating.count },
        })}
      />
      <ProductHero
        product={product}
        crumbs={[
          { name: "Home", path: routes.home },
          { name: product.name, path },
        ]}
        title={data.hero.title}
        lead={data.hero.lead}
        points={data.hero.points}
        visual={data.hero.visual}
      />
      {data.logos && <LogoStrip title={data.logos.title} names={data.logos.names} />}
      <StickySubnav
        items={nav}
        label={`${product.name} on this page`}
        action={
          <ButtonLink href={product.installHref} size="sm">
            Install <strong>app</strong>
          </ButtonLink>
        }
      />
      <ProductOverview product={{ ...product, id: data.id }} data={data.overview} />
      <ProductExplorer product={product} data={data.explorer} />
      <ProductDemos product={product} data={data.demos}>
        {demos}
      </ProductDemos>
      <FeatureGrid
        id="capabilities"
        eyebrow={data.capabilities.eyebrow}
        title={data.capabilities.title}
        description={data.capabilities.description}
        items={data.capabilities.items}
        accent={product.accent}
        compact
      />
      <ProductIntegrations product={product} data={data.integrations} />
      {data.reviews && <ProductReviews product={product} data={data.reviews} />}
      <PricingTeaser product={{ ...product, id: data.id }} />
      {data.migration && <ProductMigration product={product} data={data.migration} guideHref={href(routes.migration[data.id])} />}
      {faq.length > 0 && (
        <FaqSection title={`${product.name} questions`} items={faq.slice(0, 6)} moreHref={links.faq} />
      )}
      <CtaBand
        title={data.cta.title}
        body={data.cta.body}
        actions={
          <>
            <ButtonLink href={product.installHref} variant="light" size="lg">
              Install on <strong>Shopify</strong>
            </ButtonLink>
            <ButtonLink href={links.contact} variant="outlineLight" size="lg">
              Book a <strong>Demo</strong>
            </ButtonLink>
          </>
        }
      />
      <StickyCtaBar afterId="hero" untilId="get-started">
        <ProductIcon id={data.id} size="sm" />
        <p className="mr-2 hidden text-sm leading-tight sm:block">
          <span className="font-semibold">{product.name}</span>
          <span className="block text-white/65">{product.pricingNote}</span>
        </p>
        <ButtonLink href={product.installHref} variant="light" size="sm">
          Install <strong>app</strong>
        </ButtonLink>
      </StickyCtaBar>
    </>
  );
}
