import { StickyCtaBar } from "@/components/features/StickyCtaBar";
import { StickySubnav, type SubnavItem } from "@/components/features/StickySubnav";
import { ProductComparisons } from "@/components/sections/product/ProductComparisons";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";
import { ProductHero } from "@/components/sections/shared/ProductHero";
import { ScreenStrip } from "@/components/sections/shared/ScreenStrip";
import pickupOrders from "@/assets/pickup/orders.webp";
import pickupRates from "@/assets/pickup/rates.webp";
import pickupDates from "@/assets/pickup/checkout-dates.webp";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { pickupPage as d } from "@/data/product-pages/pickup";
import { productById } from "@/data/products";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { softwareAppLd } from "@/lib/jsonld";
import { routes } from "@/lib/routes";
import { PickupShowcase } from "./PickupShowcase";

const product = productById.pickup;

const nav: SubnavItem[] = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "features", label: "Features" },
  { id: "compare", label: "Compare" },
];

export function PickupPage() {
  return (
    <>
      <JsonLd
        data={softwareAppLd({
          name: product.name,
          description: seo.pickup.description,
          path: routes.pickup,
          installUrl: product.installHref,
          offers: [{ name: product.pricingNote, price: "0" }],
          rating: { value: product.rating.value, count: product.rating.count },
        })}
      />
      <ProductHero
        product={product}
        crumbs={[
          { name: "Home", path: routes.home },
          { name: product.name, path: routes.pickup },
        ]}
        title={d.hero.title}
        lead={d.hero.lead}
        visual={d.hero.visual}
      />
      <StickySubnav
        items={nav}
        label={`${product.name} on this page`}
        action={
          <ButtonLink href={product.installHref} size="sm">
            Install <strong>app</strong>
          </ButtonLink>
        }
      />
      <PickupShowcase />
      <FeatureGrid
        id="features"
        eyebrow={d.features.eyebrow}
        title={d.features.title}
        description={`Works with ${d.worksWith.join(", ")}.`}
        items={d.features.items}
        accent={product.accent}
        compact
      />
      <ScreenStrip
        id="dashboard"
        eyebrow="Inside the app"
        title="One dashboard for every order"
        screens={[
          { image: pickupOrders, caption: "Delivery zones, rates and location rules" },
          { image: pickupRates, caption: "Prep time and daily order limits" },
          { image: pickupDates, caption: "Pickup and delivery options on the product page" },
        ]}
      />
      <ProductComparisons product={product} />
      <CtaBand
        title={d.cta.title}
        body={d.cta.body}
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
        <ProductIcon id="pickup" size="sm" />
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
