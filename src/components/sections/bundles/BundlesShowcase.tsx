import { BundleBuilderDemo } from "@/components/features/demos/BundleBuilderDemo";
import { Reveal } from "@/components/motion/Reveal";
import { homeProductCopy } from "@/data/home";
import { productById } from "@/data/products";
import { slideFrom } from "@/lib/motion";
import classic from "@/assets/bundles/classic.webp";
import volume from "@/assets/bundles/volume.webp";
import analytics from "@/assets/bundles/feature-analytics.webp";
import pos from "@/assets/bundles/feature-pos.webp";
import tailored from "@/assets/bundles/feature-tailored.webp";
import { ShowcaseCopy } from "@/components/sections/product/showcase/ShowcaseCopy";
import { ProductResources, ShowcasePanel } from "@/components/sections/product/showcase/ShowcaseParts";
import { ShowcaseStage } from "@/components/features/ShowcaseStage";

const product = productById.bundles;

export function BundlesShowcase() {
  return (
    <ShowcasePanel id="at-a-glance" labelledBy="bun-title" className="bg-mint-50">
      <div aria-hidden className="bg-dots-ink absolute inset-0 -z-10 opacity-30 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal variants={slideFrom(-50)} className="order-2 lg:order-1 lg:col-span-7">
          <ShowcaseStage
            idPrefix="bun"
            label="Appstle Bundles & Upsells: demo and screens"
            activeClass="bg-mint-700 text-white"
            items={[
              {
                id: "demo",
                label: "Build a bundle",
                kind: "demo",
                content: (
                  <div data-guide="bun-demo">
                    <BundleBuilderDemo />
                  </div>
                ),
              },
              { id: "types", label: "Bundle types", kind: "image", image: classic, alt: "Bundle types in the Appstle admin: classic, fixed pricing, dynamic pricing and sectioned bundles", caption: "Appstle Bundles · Bundle types in the admin" },
              { id: "discounts", label: "Discount types", kind: "image", image: volume, alt: "Discount types: volume discount, product discount, Buy X Get Y and shipping discount", caption: "Appstle Bundles · Discount types" },
              { id: "styling", label: "Widget styling", kind: "image", image: tailored, alt: "Bundle widget customization showing tiered pair offers", caption: "Appstle Bundles · Widget styling" },
              { id: "pos", label: "Shopify POS", kind: "image", image: pos, alt: "Appstle Bundling tile in Shopify POS", caption: "Appstle Bundles · Shopify POS" },
              { id: "analytics", label: "Analytics", kind: "image", image: analytics, alt: "Bundle analytics charts and totals", caption: "Appstle Bundles · Real-time analytics" },
            ]}
          />
          <ProductResources product={product} className="-mr-2 mt-2 justify-end" />
        </Reveal>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <ShowcaseCopy
            product={product}
            titleId="bun-title"
            title="Bigger baskets, built from the products they already love."
            intro={homeProductCopy.bundles.intro}
            points={homeProductCopy.bundles.points}
          />
        </div>
      </div>
    </ShowcasePanel>
  );
}
