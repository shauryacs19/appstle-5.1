import { PickupSchedulerDemo } from "@/components/features/demos/PickupSchedulerDemo";
import { Reveal } from "@/components/motion/Reveal";
import { homeProductCopy } from "@/data/home";
import { productById } from "@/data/products";
import { slideFrom } from "@/lib/motion";
import checkout from "@/assets/pickup/checkout-dates.webp";
import zones from "@/assets/pickup/orders.webp";
import prep from "@/assets/pickup/rates.webp";
import pos from "@/assets/pickup/pos.webp";
import promo from "@/assets/pickup/promo.webp";
import { ShowcaseCopy } from "@/components/sections/product/showcase/ShowcaseCopy";
import { ProductResources, ShowcasePanel } from "@/components/sections/product/showcase/ShowcaseParts";
import { ShowcaseStage } from "@/components/features/ShowcaseStage";

const product = productById.pickup;

const industries = ["Florists", "Bakeries", "Grocery", "Restaurants", "Meal prep", "Multi-location stores"];

export function PickupShowcase() {
  return (
    <ShowcasePanel id="at-a-glance" labelledBy="pick-title" className="bg-blush-50">
      <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-40 -z-10 size-[36rem] rounded-full bg-blush-100 blur-3xl" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <ShowcaseCopy
            product={product}
            titleId="pick-title"
            title="Pickup, delivery & shipping — on their schedule."
            intro={homeProductCopy.pickup.intro}
            points={homeProductCopy.pickup.points}
            extra={
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built for">
                {industries.map((i) => (
                  <li key={i} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy ring-1 ring-blush-100">
                    {i}
                  </li>
                ))}
              </ul>
            }
          />
        </div>
        <Reveal variants={slideFrom(50)} className="lg:col-span-7">
          <ShowcaseStage
            idPrefix="pickup"
            label="Appstle Pickup & Delivery: demo and screens"
            activeClass="bg-blush-700 text-white"
            items={[
              {
                id: "demo",
                label: "Pick a slot",
                kind: "demo",
                content: (
                  <div className="mx-auto max-w-md" data-guide="pickup-demo">
                    <PickupSchedulerDemo />
                  </div>
                ),
              },
              {
                id: "options",
                label: "Checkout",
                kind: "image",
                image: promo,
                alt: "Pickup, Delivery and Shipping options with pickup location and date selection",
                caption: "Appstle Pickup & Delivery · Checkout options",
                title: "Date & time at checkout",
                body: "Shoppers pick store pickup, local delivery or shipping with a date and time.",
              },
              {
                id: "product",
                label: "Product page",
                kind: "image",
                image: checkout,
                alt: "Pickup and delivery options shown directly on a product page",
                caption: "Appstle Pickup & Delivery · Product page",
              },
              {
                id: "zones",
                label: "Delivery zones",
                kind: "image",
                image: zones,
                alt: "Delivery zone management with zones, rates and location-based rules on a map",
                caption: "Appstle Pickup & Delivery · Delivery zones",
                title: "Rates your way",
                body: "Delivery rates by zip code, distance, weight, cart value and time slot.",
              },
              {
                id: "prep",
                label: "Prep & limits",
                kind: "image",
                image: prep,
                alt: "Settings for preparation time, daily order limits and availability rules",
                caption: "Appstle Pickup & Delivery · Prep time & limits",
                title: "No more overbooking",
                body: "Blackout dates, prep times, order cutoffs and product-specific lead times.",
              },
              {
                id: "pos",
                label: "Shopify POS",
                kind: "image",
                image: pos,
                alt: "Pickup orders managed in Shopify POS on tablet and phone",
                caption: "Appstle Pickup & Delivery · Shopify POS",
                title: "One dashboard",
                body: "Run multi-location and Shopify POS orders without juggling tools.",
              },
            ]}
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <p className="text-xs text-ink-subtle">Screens: official images from the Appstle Pickup &amp; Delivery Shopify App Store listing.</p>
            <ProductResources product={product} className="-mr-2" />
          </div>
        </Reveal>
      </div>
    </ShowcasePanel>
  );
}
