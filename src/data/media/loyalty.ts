import { shot } from "./index";
import activityRules from "@/assets/loyalty/activity-rules.webp";
import customerData from "@/assets/loyalty/data.webp";
import featureActivity from "@/assets/loyalty/feature-activity.webp";
import featureOmnichannel from "@/assets/loyalty/feature-omnichannel.webp";
import featurePrograms from "@/assets/loyalty/feature-programs.webp";
import integrations from "@/assets/loyalty/integrations.webp";
import redemptionRules from "@/assets/loyalty/redemption-rules.webp";
import referral from "@/assets/loyalty/crop-referral.webp";
import loyPrograms from "@/assets/shopify/loy-programs.webp";
import loyRedemption from "@/assets/shopify/loy-redemption.webp";
import loyStoreCredit from "@/assets/shopify/loy-store-credit.webp";
import loyWidget from "@/assets/shopify/loy-widget.webp";

const P = "/media/loyalty";

export const loyaltyMedia = {
  heroDesktop: shot("LOY-H1", `${P}/hero/dashboard.png`, "Loyalty admin dashboard / analytics home", "Appstle Loyalty program types: rewards, points, store credits, discounts and referrals, with a shopper's points widget", { standIn: loyPrograms, standInFit: "cover" }),
  heroMobile: shot("LOY-H2", `${P}/hero/launcher-mobile.png`, "Storefront loyalty launcher open with balance, earn and redeem", "Appstle loyalty widget showing a 500-point balance, a referral offer and ways to earn", { frame: "mobile", standIn: featurePrograms }),
  earn: shot("LOY-01", `${P}/earn/rules.png`, "Activity Rules list with Purchase, Birthday, Instagram and Review rules", "Appstle Loyalty activity rules for birthdays, store visits, purchases, social follows and reviews", { standIn: activityRules }),
  redeem: shot("LOY-02", `${P}/redeem/claim.mp4`, "Widget Ways to Redeem: a reward claimed and its code shown", "Appstle Loyalty reward rules: discount, collection discount, free shipping, product discount and free product", { kind: "video", standIn: redemptionRules }),
  storeCredit: shot("LOY-03", `${P}/store-credit/checkout.png`, "Checkout with the store-credit toggle on and the total reduced", "Appstle Loyalty store credit: a returning shopper with $20 in store credit applying it to their order", { standIn: loyStoreCredit }),
  cartRedeem: shot("LOY-04", `${P}/redeem/checkout.png`, "Checkout points dropdown open and the cart Redeem widget", "Appstle Loyalty redemption options: discount, free shipping, exclusive views and gifts, with a reminder to use 500 points", { standIn: loyRedemption }),
  referrals: shot("LOY-05", `${P}/referrals/referral.png`, "Widget referral tab with the referral link and share icons", "Appstle referral offer: they get a $10 off coupon, you get 250 points, with a link to share", { standIn: referral }),
  vip: shot("LOY-06", `${P}/vip/tiers.png`, "Widget VIP section: three tiers and the shopper's progress", "Appstle VIP tiers Silver, Gold and Platinum with spend thresholds and the perks of each tier", { standIn: featureActivity }),
  widget: shot("LOY-07", `${P}/widget/launcher.png`, "Launcher open on desktop and the dedicated loyalty page", "Appstle loyalty widget customization: earn rewards, redeem rewards and a dedicated rewards page", { standIn: loyWidget }),
  emails: shot("LOY-08", `${P}/emails/editor.png`, "Reward Available Reminder email editor with live preview", "Appstle Loyalty email template editor with a live preview"),
  pos: shot("LOY-09", `${P}/pos/pos.png`, "Shopify POS loyalty tile with balance and rewards", "Appstle Loyalty in Shopify POS with a customer's points balance and reward actions", { frame: "tablet", standIn: featureOmnichannel }),
  analytics: shot("LOY-10", `${P}/analytics/overview.png`, "Analytics metric cards and a trend chart", "Appstle Loyalty customer list with points, activity history and current points, activities completed and rewards", { standIn: customerData }),
  bulk: shot("LOY-11", `${P}/automations/bulk.png`, "Bulk Operations page with the eight operation cards", "Appstle Loyalty bulk operations"),
  integrations: shot("LOY-12", `${P}/integrations/grid.png`, "App Integrations with Klaviyo, Omnisend, Judge.me, Loox connected", "Appstle Loyalty email and review integrations: Klaviyo, Mailchimp, Stamped.io, Loox and Judge.me", { standIn: integrations }),
  migration: shot("LOY-13", `${P}/migration/import.png`, "Migrations tab: source-app cards and the CSV Import step", "Appstle Loyalty migrations tab"),
  setup: shot("LOY-14", `${P}/setup/app-embed.png`, "Theme editor App embeds with Appstle Loyalty switched on", "Shopify theme editor with the Appstle Loyalty app embed enabled"),
};
