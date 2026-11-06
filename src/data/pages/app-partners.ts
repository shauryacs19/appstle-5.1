import type { StaticImageData } from "next/image";
import birdchime from "@/assets/partners/birdchime.webp";
import bogos from "@/assets/partners/bogos.webp";
import bundler from "@/assets/partners/bundler.webp";
import eber from "@/assets/partners/eber.webp";
import ecomposer from "@/assets/partners/ecomposer.webp";
import froonze from "@/assets/partners/froonze.webp";
import gorgias from "@/assets/partners/gorgias.webp";
import judgeme from "@/assets/partners/judgeme.webp";
import klaviyo from "@/assets/partners/klaviyo.webp";
import lantern from "@/assets/partners/lantern.webp";
import loox from "@/assets/partners/loox.webp";
import loyaltylion from "@/assets/partners/loyaltylion.webp";
import mailchimp from "@/assets/partners/mailchimp.webp";
import meta from "@/assets/partners/meta.webp";
import okendo from "@/assets/partners/okendo.webp";
import omnisend from "@/assets/partners/omnisend.webp";
import pagefly from "@/assets/partners/pagefly.webp";
import qikify from "@/assets/partners/qikify.webp";
import rebuy from "@/assets/partners/rebuy.webp";
import referralcandy from "@/assets/partners/referralcandy.webp";
import referrly from "@/assets/partners/referrly.webp";
import shopifyFlow from "@/assets/partners/shopify-flow.webp";
import transcy from "@/assets/partners/transcy.webp";
import upcart from "@/assets/partners/upcart.webp";
import uppromote from "@/assets/partners/uppromote.webp";
import yotpo from "@/assets/partners/yotpo.webp";
import zapier from "@/assets/partners/zapier.webp";
import zaymo from "@/assets/partners/zaymo.webp";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";

export const partnerCategories = [
  "Customer Concierge",
  "Loyalty",
  "Page Builder",
  "Helpdesk",
  "Global Presence",
  "Email and Marketing",
  "Popups & Digital Downloads",
  "Workflow Automation",
  "Mobile App Builder",
  "Bundling",
  "Upsell and Cross-sell",
  "Reviews",
  "CRM Group",
  "Store Management",
  "Shipping & Delivery",
] as const;

type PartnerCategory = (typeof partnerCategories)[number];

export type AppPartner = {
  name: string;
  description: string;
  categories: PartnerCategory[];
  logo?: StaticImageData;
  href?: string;
  native?: boolean;
};

const p = (name: string, categories: PartnerCategory[], description: string, extra: Omit<AppPartner, "name" | "description" | "categories"> = {}): AppPartner => ({
  name,
  categories,
  description,
  ...extra,
});

export const appPartners: AppPartner[] = [
  p("PageFly", ["Page Builder"], "Stunning store pages, no code required – unwavering page speed.", { logo: pagefly }),
  p("Klaviyo: Email Marketing & SMS", ["Email and Marketing"], "Email and SMS marketing platform for ecommerce brands.", { logo: klaviyo }),
  p("Klaviyo Contact Sync", ["Email and Marketing"], "Circular encrypted contact information flow between Klaviyo and Appstle."),
  p("Zapier", ["Workflow Automation"], "Automation for all – easily connect apps and automate workflows.", { logo: zapier }),
  p("Sky Pilot ‑ Digital Downloads", ["Popups & Digital Downloads"], "Sell and deliver music, videos, books, or any digital files instantly, and without limits."),
  p("Rebuy", ["Upsell and Cross-sell"], "End-to-end personalization platform for the world’s top brands.", { logo: rebuy }),
  p("Omnisend", ["Email and Marketing"], "Email marketing and newsletter campaigns. Popups to capture emails, to boost sales.", { logo: omnisend }),
  p("OneClick Upsell", ["Upsell and Cross-sell"], "Increased top-line revenue with optimized pre & post-purchase upsell funnels."),
  p("Transcy", ["Global Presence"], "Store translation into any language and currency convertors to drive sales worldwide.", { logo: transcy }),
  p("Langify", ["Global Presence"], "Translation & localization made easy for increased global sales."),
  p("UpPromote", ["Email and Marketing"], "Increased exposure & customer loyalty with an all-in-one affiliate and referral marketing app.", { logo: uppromote }),
  p("EComposer", ["Page Builder"], "Easy and fast page builder for any page type or section to increase conversions.", { logo: ecomposer }),
  p("Growave", ["Loyalty"], "Growave replaces several apps: loyalty, referrals, rewards, gift cards, VIP tiers, reviews, wishlist"),
  p("Judge.me", ["Reviews"], "Collect and display product reviews and star ratings. Build trust and boost sales with social proof.", { logo: judgeme }),
  p("Loox", ["Reviews"], "Grow your brand with social proof marketing – Customer reviews, photos, videos and referrals.", { logo: loox }),
  p("BYOB", ["Bundling"], "Let customers build their own bundles on a single page. Boost AOV. Sync with inventory."),
  p("Easy Bundles | Bundle Builder", ["Bundling"], "Upsell bundle products & cross sell, gift box, build a box."),
  p("FastBundle", ["Bundling"], "Easily create almost all types of product bundles and combo products – New pricing model!"),
  p("MBC Bundles — Bundle & Save", ["Bundling"], "Advanced bundle products app which help to enhance sales with multiple upsell and discount options"),
  p("Stamped", ["Loyalty"], "Combine Reviews and Loyalty to build trust and give your customers a voice."),
  p("Mailchimp", ["Email and Marketing"], "Win new customers with the email marketing and automations brand that recommends ways to get more opens, clicks, and sales.", { logo: mailchimp }),
  p("ToastiBar", ["Popups & Digital Downloads"], "Automatic display of recent sales & add to cart popups to increase sales."),
  p("MageNative", ["Mobile App Builder"], "The simplest & fastest native apps with no-code mobile app builder in minimum spend."),
  p("Froonze", ["Customer Concierge"], "Increased customer lifetime value with a beautiful, engaging and functional customer portal.", { logo: froonze }),
  p("Customer Accounts Hub", ["Customer Concierge"], "Increased customer loyalty with an enhanced customer account page experience."),
  p("Discounted Pricing", ["Loyalty"], "No-code volume discounted pricing builder."),
  p("Webrex Pricing By Country", ["Global Presence"], "Multi country pricing, Double Profit, Shipping Rate, Converter, Prices based on different markets."),
  p("Yotpo", ["Loyalty"], "Loyalty & Referrals", { logo: yotpo }),
  p("Monster Cart", ["Upsell and Cross-sell"], "Boost Revenue in minutes using a Slide Cart Drawer with Unlock Offers & Free Gift Rewards."),
  p("GemPages", ["Page Builder"], "A one-stop storefront customization solution with a Visual Editor and powerful AI-powered features"),
  p("UpCart", ["Upsell and Cross-sell"], "Create a custom, on-brand slide cart with upsells and add-ons to boost AOV.", { logo: upcart }),
  p("MultiVariants", ["Bundling"], "List variants in a beautiful table/grid layout. Let customers bulk order multiple variants easily."),
  p("Gorgias", ["Helpdesk"], "Unified support conversations (and related orders) to accelerate growth through happy customers.", { logo: gorgias }),
  p("Tapita", [], "All-in-one AI SEO & Speed tool to rank higher, load faster, and drive more sales."),
  p("LoyaltyLion", ["Loyalty"], "Sustainable growth fuelled by retention.", { logo: loyaltylion }),
  p("OrderMate", [], "Reduce delivery-date inquiries and lower cart abandonment with the Estimated Delivery Date app."),
  p("Bundler", ["Bundling"], "Create high-converting bundle offers and boost sales with quantity breaks and volume discounts!", { logo: bundler }),
  p("Okendo", ["Loyalty"], "Okendo is an all-in-one customer marketing platform that helps Shopify brands grow through reviews, loyalty, referrals, quizzes, and surveys.", { logo: okendo }),
  p("ReferralCandy", ["Loyalty"], "Your all-in-one affiliate & referral marketing solution.", { logo: referralcandy }),
  p("SE: Local Delivery + Pickup", [], "Streamline local delivery and pickup with flexible scheduling, AI routing, and fulfillment tools for seamless omnichannel retail."),
  p("EGO Slide Cart Drawer", ["Upsell and Cross-sell"], "Replaces the default cart with a slide-out cart drawer. Adds in-cart upsells, cross-sells and reward/progress bars to lift AOV."),
  p("Meta Conversions API", ["Email and Marketing"], "Sends server-side purchase and browsing events straight to Meta. Improves ad attribution accuracy where browser pixels are blocked.", { logo: meta }),
  p("Affiliate Marketing & Referral", ["Email and Marketing"], "Lets merchants run affiliate, influencer and customer-referral programs. Handles referral links, commission rules and payouts."),
  p("Subcraft", ["Workflow Automation"], "AI-driven subscription revenue recovery for failed payments", {
    href: "https://subcraft.ai/?utm_source=appstle&utm_medium=referral&utm_campaign=partner_listing",
  }),
  p("Shopify Flow", ["Workflow Automation"], "Shopify’s own no-code automation tool built on triggers, conditions and actions. Commonly used for order tagging, alerts and cross-app workflows.", { logo: shopifyFlow }),
  p("Eber", ["Loyalty"], "A loyalty marketing platform with ready-to-use tools for points, rewards and repeat-purchase engagement. Integrates with cart, POS and payment gateways for omnichannel programs.", { logo: eber }),
  p("ShipperHQ", ["Shipping & Delivery"], "Advanced shipping rate engine with rules by product, origin, zone and carrier. Popular with merchants running complex or multi-origin fulfilment."),
  p("ShipInsure", ["Shipping & Delivery"], "Offers shoppers optional shipping protection at checkout. Covers lost, stolen or damaged parcels and handles the claims process."),
  p("Zaymo", ["Email and Marketing"], "An interactive email builder that embeds shoppable, in-inbox blocks so customers can act without leaving the email. Includes in-email subscription portal blocks for skipping, swapping and delaying orders.", { logo: zaymo }),
  p("Clean Size Charts", ["Store Management"], "Creates customizable size charts and size guides with ready-made templates and AI size recommendations. Aimed at reducing fit-related returns for apparel brands."),
  p("Zapiet", ["Shipping & Delivery"], "Date/time picker for local delivery, store pickup and shipping. One of the largest incumbents in the pickup & delivery category."),
  p("For Deer", ["Store Management"], "Generates branded PDF invoices, packing slips and receipts. Supports bulk export and automated sending to customers."),
  p("Postscript", ["Email and Marketing"], "SMS campaign and automation platform for D2C brands. Covers list growth, flows, abandoned cart and conversational SMS."),
  p("Freshmarketer", ["Email and Marketing", "CRM Group"], "Freshworks’ marketing automation suite for email, SMS and customer journeys. Includes segmentation, cart recovery and campaign analytics."),
  p("Upsell, Cross sell & Bundles", ["Upsell and Cross-sell"], "Displays related-product and cross-sell recommendations across product, cart and post-purchase pages. Supports both manual and automatic recommendation rules."),
  p("Checkmate", ["Store Management"], "Sets no-code cart and checkout validation rules – max discount values, quantity limits, custom error messages and 20+ other conditions. Blocks orders that do not meet the merchant’s conditions."),
  p("OrderLogic", ["Store Management"], "Enforces minimum and maximum purchase limits by product, variant, collection or cart total. Useful for wholesale, allocation and compliance-driven stores."),
  p("Apploy", ["Mobile App Builder"], "No-code builder that publishes a branded iOS and Android app running on the store’s existing theme, staying in sync with products and discounts. Uses push notifications and app-only perks to drive repeat purchases."),
  p("Lantern", ["Customer Concierge"], "Builds interactive product-recommendation quizzes, with AI generating a product-matched quiz in under a minute. Captures customer preferences and emails, with A/B testing and discount incentives.", { logo: lantern }),
  p("AI Upsell & Cart – WeUpsell", ["Popups & Digital Downloads"], "AI-driven popup and upsell app showing personalized recommendations, bundle offers and timed discounts across the store. Also used for email/SMS capture and review collection."),
  p("Smart SEO", ["Store Management"], "Automates meta titles, descriptions, alt text and JSON-LD structured data. Includes broken-link and sitemap management."),
  p("Buy Me", ["Upsell and Cross-sell"], "Adds a persistent sticky add-to-cart / buy button on product pages. Reduces scroll friction and speeds up the path to checkout."),
  p("Stellar Delivery Date & Pickup", ["Shipping & Delivery"], "Date and time-slot picker for local delivery, store pickup and shipping. Popular with food, florist and bakery merchants; supports rescheduling and pickup fraud prevention."),
  p("Pickeasy", ["Shipping & Delivery"], "Logbase’s date/time picker for store pickup, local delivery and shipping. Supports cut-off times, prep time, blackout dates and slot limits."),
  p("ShipZip", ["Shipping & Delivery"], "Customizes shipping rates by zip code, product and delivery date, with 100+ rule conditions. Also offers local delivery and store pickup with time slots."),
  p("Commslayer", ["Helpdesk"], "AI helpdesk unifying live chat, email, WhatsApp, Instagram, Facebook and TikTok into one inbox, with an AI agent that resolves tickets and edits orders. Has a native Appstle integration – agents can pause, skip, cancel and swap subscription products from the inbox."),
  p("Birdchime", ["Shipping & Delivery"], "Built for Shopify date picker for store pickup, click & collect, local delivery and shipping, at checkout and POS. Supports time slots, blackout dates, cut-offs and prep times.", { logo: birdchime }),
  p("Qikify", ["Bundling"], "Creates quantity-break and tiered volume discount tables on product pages. Encourages larger basket sizes through automatic discounts.", { logo: qikify }),
  p("Eurus Theme", ["Page Builder"], "A premium, conversion-focused Shopify theme from Omni Themes (part of BSS Commerce), built for speed and mobile-first UX. Ships with built-in features intended to replace several third-party apps."),
  p("Local Delivery + Pickup Date", ["Shipping & Delivery"], "Scrollengine’s app combining pickup/delivery date scheduling with an AI route planner and real-time order tracking. Includes a driver app, proof of delivery and Appstle compatibility."),
  p("SearchPie", [], "Boost your SEO rankings and sales with auto-fix SEO, AI optimization, fast loading, and rich schema. Zero coding. Free plan available!"),
  p("BOGOS", ["Bundling"], "Creates BOGO, free-gift-with-purchase and gift-threshold offers. Also supports bundle and upsell promotions on product and cart pages.", { logo: bogos }),
  p("Wow Custom Product Options", [], "Turn your product options into a revenue stream", {
    href: "https://apps.shopify.com/product-options-app?utm_source=appstle&utm_medium=in_app&utm_campaign=appstle",
  }),
  p("Regios Discounts", [], "Advanced automatic and code discounts built on Shopify Functions. Nested logic, volume, BOGO, gifts, and product-page display, no code.", {
    href: "https://apps.shopify.com/regios-automatic-discounts?utm_source=appstle&utm_medium=referral&utm_campaign=partner",
  }),
  p("Customer Dashboard Pro", ["Customer Concierge"], "Customize the look and feel of the customer account page with features including profile management, custom fields and more."),
  p("Appstle Loyalty & Rewards", ["Loyalty"], "Comprehensive & customizable loyalty tool by Appstle℠ with rewards, store credits, & more", {
    native: true,
    href: routes.product.loyalty,
  }),
  p("ReferrLy", ["Email and Marketing"], "Affiliate and Referral Marketing tool. Commissions for brand ambassadors for referred sale.", { logo: referrly }),
];

export const appPartnersPage = {
  hero: {
    eyebrow: "App Partners",
    title: "App Integrations",
    intro:
      "Solutions developed by Appstle integrate with the best Shopify apps and ecommerce solutions to help you easily scale your business across all fronts. Appstle is a leading Shopify focused app provider, with top applications in the Subscriptions, Memberships, Bundles, Loyalty and Pickup app categories. In order to provide a seamless end-to-end e-commerce experience for our merchants, we have partnered with several other leading Shopify apps.",
  },
  directory: {
    eyebrow: "Partner directory",
    title: "Leading Shopify apps we’ve partnered with",
    description:
      "We strive to streamline the business operations and user experience for all our merchants, making it easier for them to scale their businesses and cater to their customers. Our advanced solutions also help our Shopify app partners enhance brand visibility, generate more revenue, and improve sales.",
  },
  byApp: {
    eyebrow: "By Appstle app",
    title: "What each app works with",
    description: "Integrations named under “Works with” on each Appstle app’s Shopify App Store listing, plus the ones Appstle features across appstle.com.",
  },
  become: {
    title: "Become an Appstle Partner",
    body: "Are you a Shopify app developer looking for ways and means to help your customers (clients) grow their business? Reach out to our experts today to become a partner!",
    partnerHref: links.partnerProgram,
    contactHref: links.contact,
  },
};
