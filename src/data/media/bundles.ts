import { shot } from "./index";
import activity from "@/assets/bundles/activity.webp";
import classic from "@/assets/bundles/classic.webp";
import featureAnalytics from "@/assets/bundles/feature-analytics.webp";
import featurePos from "@/assets/bundles/feature-pos.webp";
import featureTailored from "@/assets/bundles/feature-tailored.webp";
import featureUpsell from "@/assets/bundles/feature-upsell.webp";
import volume from "@/assets/bundles/volume.webp";
import bunMixMatch from "@/assets/shopify/bun-mix-match.webp";
import bunTypes from "@/assets/shopify/bun-types.webp";
import bunVolume from "@/assets/shopify/bun-volume.webp";
import bunWidget from "@/assets/shopify/bun-widget.webp";

const P = "/media/bundles";

export const bundlesMedia = {
  heroDesktop: shot("BUN-H1", `${P}/hero/dashboard.png`, "Bundles admin dashboard / offers list", "Appstle Bundles bundle types: mix and match, fixed, variant, sample, nested, wholesale, upsell, volume bundles and subscription boxes", { standIn: bunTypes, standInFit: "cover" }),
  heroMobile: shot("BUN-H2", `${P}/hero/widget-mobile.png`, "Product page bundle widget (volume tiers)", "Appstle bundle widget on a product page offering Buy 2, save 20% on a cleanser and a scalp mask", { frame: "mobile", standIn: featureUpsell }),
  classic: shot("BUN-01", `${P}/classic/widget.png`, "Product page Classic Bundle widget with 2–3 items and the bundle price", "Appstle bundle types in the admin: Classic Bundle, Dynamic Pricing Bundle, Fixed Pricing Bundle and Sectioned Bundle", { standIn: classic }),
  combo: shot("BUN-02", `${P}/combo/widget.png`, "Combo Bundle grid with the One-time / Subscribe selector", "Appstle bundle widget customization: layouts, colors and typography next to a frequently bought together widget", { standIn: bunWidget }),
  builder: shot("BUN-03", `${P}/builder/build.mp4`, "Bundle page mid-build: filter, 3 of 5 picked, tier bar, running total", "Appstle mix and match bundle letting shoppers combine skincare products with tiered savings", { kind: "video", standIn: bunMixMatch }),
  sectioned: shot("BUN-04", `${P}/sectioned/steps.mp4`, "Sectioned builder: step 2 of 3, min/max counter, progress bar", "Appstle sectioned bundle builder guiding shoppers through steps with a discount progress bar", { kind: "video" }),
  volume: shot("BUN-05", `${P}/volume/tiers.png`, "Volume tiers 1 / 2 / 3+, middle tier Most popular, gift row", "Appstle volume discounting: water bottle packs at different quantity prices", { standIn: bunVolume }),
  bxgy: shot("BUN-06", `${P}/bxgy/widget.png`, "Buy 2, get 1 free widget with the free item at $0", "Appstle discount types in the admin: Volume Discount, Buy X Get Y Discount, Product Discount and Shipping Discount", { standIn: volume }),
  discounts: shot("BUN-07", `${P}/discounts/checkout.png`, "Checkout summary: custom discount name and discounted shipping", "Shopify checkout order summary with an Appstle discount name and a discounted shipping line"),
  funnels: shot("BUN-08", `${P}/funnels/popup.mp4`, "Cart funnel pop-up with the bundle and Add all", "Appstle upsell offering Buy 2, save 20% on two skincare products", { kind: "video", standIn: featureUpsell }),
  cartbot: shot("BUN-09", `${P}/cartbot/auto-add.mp4`, "Cart right after a qualifying add, free gift line at $0", "Cart with a free gift added automatically by Appstle CartBot", { kind: "video" }),
  subscriptions: shot("BUN-10", `${P}/subscriptions/widget.png`, "Bundle widget with Subscribe & save and the frequency open", "Appstle bundle widget with a subscribe and save option and a delivery frequency selector"),
  targeting: shot("BUN-11", `${P}/targeting/editor.png`, "Offer editor: customer tag access and active dates", "Appstle bundle rules applied with the quantity and amount sold per rule", { standIn: activity }),
  design: shot("BUN-12", `${P}/design/customize.mp4`, "Style panel with live preview, primary color changing", "Appstle bundle widget styling with heading, color and tier options", { kind: "video", standIn: featureTailored }),
  pos: shot("BUN-13", `${P}/pos/pos.png`, "Shopify POS (iPad) cart with a Classic Bundle and its components", "Appstle Bundling tile in Shopify POS next to store products", { frame: "tablet", standIn: featurePos }),
  analytics: shot("BUN-14", `${P}/setup/analytics.png`, "Bundles dashboard / analytics with bundle revenue and AOV", "Appstle Bundles analytics with sales charts and totals", { standIn: featureAnalytics }),
};
