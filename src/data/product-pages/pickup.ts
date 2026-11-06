import { Building2, CalendarX2, Headset, MapPinned, Truck } from "lucide-react";
import type { GridFeature } from "@/components/sections/shared/FeatureGrid";
import { pickupMedia as m } from "@/data/media/pickup";
import { homeProductCopy } from "@/data/home";
import type { ProductPageData } from "./types";

export const pickupPage = {
  hero: {
    title: "Flexible and scalable pickup, delivery click & collect, and shipping scheduling",
    lead: homeProductCopy.pickup.intro,
    visual: {
      desktop: m.heroDesktop,
      mobile: m.heroMobile,
      toasts: [
        { product: "pickup", title: "Pickup booked", meta: "Store pickup · date & time chosen" },
        { product: "pickup", title: "Local delivery", meta: "Rate by zip code" },
      ],
      description: "Appstle Pickup & Delivery delivery-zone management and a product page offering pickup, delivery and shipping with a date picker.",
      stage: "bg-gradient-to-br from-blush-100 via-blush to-blush-700",
    },
  } satisfies Pick<ProductPageData["hero"], "title" | "lead" | "visual">,
  features: {
    eyebrow: "Features",
    title: "Pickup, delivery and shipping, managed from one dashboard",
    items: [
      { icon: Truck, title: "Customize last-mile", body: "Pickup date/time, click & collect, local delivery & more." },
      { icon: MapPinned, title: "Boost conversion", body: "With rates by zipcode, distance, weight, cart value & time slot." },
      { icon: CalendarX2, title: "Prevent overbooking", body: "With blackout dates, prep times, and order cutoffs." },
      { icon: Building2, title: "Run multi-location & Shopify POS orders", body: "From one dashboard — no swivel-chair ops." },
      { icon: Headset, title: "Scale confidently", body: "With 24×7 support and extensive integrations." },
    ] satisfies GridFeature[],
  },
  worksWith: ["Checkout", "Customer accounts", "Shopify POS", "Shopify Admin", "Appstle Bundles", "Appstle Loyalty", "Appstle Memberships", "Appstle Subscriptions"],
  cta: {
    title: "Give shoppers pickup, delivery and shipping on their schedule",
    body: "Install Appstle Pickup & Delivery free from the Shopify App Store, or talk to our team about your locations and delivery zones.",
  },
};
