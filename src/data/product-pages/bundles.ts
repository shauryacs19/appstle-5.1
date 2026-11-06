import { BarChart3, Gift, Megaphone, PanelsTopLeft, Percent, ShoppingBag, Store, UsersRound } from "lucide-react";
import { bundlesMedia as m } from "@/data/media/bundles";
import { links } from "@/data/site";
import type { ProductPageData } from "./types";

const help = (path: string) => `https://help.appstle.com/en/${path}`;

export const bundlesPage: ProductPageData = {
  id: "bundles",
  hero: {
    title: "Unlock the Full Potential of Your Store with Appstle Bundles and Upsells",
    lead: "Increase AOV and Revenue with strategic and smart product combinations",
    points: [
      "Boost net profits with smart and targeted upselling",
      "Choose from multiple bundling types and upsell options",
      "Access 24x7x365 merchant support",
    ],
    visual: {
      desktop: m.heroDesktop,
      mobile: m.heroMobile,
      toasts: [
        { product: "bundles", title: "Bundle added", meta: "Buy 2, save 20%" },
        { product: "bundles", title: "Next tier unlocked", meta: "Tiered bundle discount" },
      ],
      description: "Appstle Bundles bundle types (mix and match, fixed, volume and more) and a Buy 2, save 20% bundle widget on a phone.",
      stage: "bg-gradient-to-br from-mint-200 via-mint to-mint-700",
    },
  },
  overview: {
    eyebrow: "Overview",
    title: "A Comprehensive Bundling Solution Built to Increase Your Sales, Average Order Value (AOV), and Profit",
    intro: "Your Customers Deserve the Best: Unlock the Power of Bundling & Upselling Today, with Appstle",
    labels: [
      "Classic & fixed bundles",
      "Mix & match",
      "Volume & tiered discounts",
      "BOGO / Buy X Get Y",
      "Frequently bought together",
      "Bundle builder",
      "Checkout upsells",
      "Thank-you page upsells",
    ],
    cardsTitle: "Shopify’s most complete Bundles & Upsells Solution",
    cards: [
      {
        icon: Gift,
        title: "Comprehensive Bundling Rules to Achieve Unlimited Use Cases",
        body: "Set up smart and flexible bundling rules that maximize your sales potential and total revenue. With Appstle Bundles and Upsells, you can create bundles that work perfectly for your business, no matter the size or industry. Customize and optimize based on your goals to offer unique, personalized shopping experiences for every customer.",
        cta: { label: "Get in touch", href: links.contact },
      },
      {
        icon: Percent,
        title: "Create Dynamic Bundles for Every Occasion",
        body: "Design bundles that increase your Average Order Value (AOV) by offering discounts on group purchases or complementary products. Create rules that automatically adjust based on customer behavior, stock levels, and more.",
        cta: { label: "Get in touch", href: links.contact },
      },
      {
        icon: UsersRound,
        title: "Bundle Based on Customer Activity",
        body: "Use real-time data to generate tailored bundles. Combine products based on customer purchases, visit frequency, or other key activities. Target specific customer segments with personalized deals to increase conversions.",
        cta: { label: "Get in touch", href: links.contact },
      },
      {
        icon: Store,
        title: "Seamless integrations with Shopify and popular apps",
        body: "Appstle Bundles & Upsells integrates effortlessly with your Shopify store, POS, and the platform’s most popular apps. In most cases, everything works right out of the box, minimizing the need for additional internal setup and ensuring a smooth fit into your existing tech stack. Manage all your bundle settings from a single, unified dashboard and deliver consistent bundling experiences across both online and in-store sales.",
        cta: { label: "Get in touch", href: links.contact },
      },
    ],
  },
  explorer: {
    eyebrow: "Features",
    title: "Every bundle and upsell type, in one app",
    description: "From a simple product-page bundle to a step-by-step box builder — pick a type to see it in the app.",
    items: [
      {
        id: "classic",
        label: "Classic & combo bundles",
        title: "Bundles right on the product page",
        body: "Group products into a Classic Bundle under one unifying product, or offer fixed product combos at a discounted price — shown in a widget on the product page.",
        bullets: [
          "Classic Bundles with an auto-generated bundle product, also shown on each component product",
          "Combo Bundles picked by product or collection, with a customer usage limit",
          "Vertical, horizontal or grid layouts with your colors and typography",
          "One-time, subscription or both, with a dedicated Add to Cart button",
        ],
        media: m.classic,
        caption: "Bundle types",
        link: { href: help("articles/9520690-how-to-configure-a-classic-bundle"), label: "Configure a Classic Bundle" },
      },
      {
        id: "builder",
        label: "Build-your-own pages",
        title: "Dedicated build-your-own bundle pages",
        body: "Run a bundle on its own storefront page: a Fixed Pricing Bundle under a single parent product, or a Dynamic Pricing Bundle where shoppers pick products and the discount follows your rules.",
        bullets: [
          "Percent, fixed or tiered discounts, or no discount",
          "Free shipping settings and purchase requirements (product count, order amount)",
          "Product filters, sort order and a redirect to cart, checkout or a custom page",
          "Announcement bar with unlocked and progress messages",
        ],
        media: m.builder,
        caption: "Mix and match bundle",
        link: { href: help("articles/9393261-how-to-configure-a-dynamic-pricing-bundle"), label: "Configure a Dynamic Pricing Bundle" },
      },
      {
        id: "sectioned",
        label: "Sectioned bundles",
        title: "A step-by-step bundle builder",
        body: "Guide shoppers through multiple sections — pick a base, then add-ons — each with its own name, description, image and minimum and maximum product count.",
        bullets: [
          "Sections built from collections or hand-picked products",
          "Discount progress bar and compare-at prices",
          "Percent, fixed, tiered or no discount",
          "Minimum and maximum order amounts",
        ],
        media: m.sectioned,
        caption: "Sectioned bundle",
        link: { href: help("articles/11103718-how-to-configure-a-sectioned-bundle"), label: "Configure a Sectioned Bundle" },
      },
      {
        id: "volume",
        label: "Volume discounts & gifts",
        title: "Buy more, save more — and unlock gifts",
        body: "Tiered quantity pricing in a product-page widget that can mix and match across products, combine with subscriptions, add upsells and unlock free gifts or free shipping at higher tiers.",
        bullets: [
          "Templates: buy more save more, volume + subscriptions, buy X get Y, mix and match, free gift threshold",
          "Preselect variants for each tier and choose how quantities are counted",
          "Progressive gifts: free products or free shipping with locked and unlocked badges",
          "Upsells inside the widget",
        ],
        media: m.volume,
        caption: "Volume discount",
        link: { href: help("articles/9797596-how-to-configure-a-volume-discount"), label: "Configure a Volume Discount" },
      },
      {
        id: "bxgy",
        label: "Buy X Get Y",
        title: "Buy X, get Y — free or discounted",
        body: "Customers buy one or more products and receive others as part of the offer, free or at a percent or fixed discount — including tiered and volume BOGO offers.",
        bullets: [
          "Customer buys / customer gets by product or collection",
          "Percent discount, fixed discount or free",
          "One-time or subscription purchases, with a recurring cycle limit",
          "Active dates and an announcement bar",
        ],
        media: m.bxgy,
        caption: "Discount types",
        link: { href: help("articles/15836980-how-to-configure-a-buy-x-get-y-discount"), label: "Configure a Buy X Get Y discount" },
      },
      {
        id: "funnels",
        label: "Funnels & CartBot",
        title: "Upsell before checkout, automatically",
        body: "Funnels show a bundle upgrade pop-up when a shopper adds a product, with a one-click “Add all”. CartBot adds or removes products automatically based on what is in the cart or the cart value.",
        bullets: [
          "Promote a Dynamic Pricing or Sectioned bundle on the cart page or any page",
          "Priority decides which funnel wins when several match",
          "CartBot triggers: a product added, or the cart value in a range",
          "Apply once per browser session",
        ],
        media: m.funnels,
        caption: "Bundle upsell",
        link: { href: help("articles/15838034-how-to-configure-a-funnel"), label: "Configure a Funnel" },
      },
      {
        id: "subscriptions",
        label: "Subscriptions on bundles",
        title: "Sell bundles as recurring orders",
        body: "Connect Appstle Subscriptions and compatible bundles and discounts show the subscription plans you created there — for the whole bundle or per product.",
        bullets: [
          "Connect from the Integrations tab (both apps installed)",
          "Bundle-level plan or a plan dropdown per product",
          "Tie a bundle to a specific subscription plan",
          "Checkbox, horizontal or vertical subscription widget layouts",
        ],
        media: m.subscriptions,
        caption: "Subscribe & save on a bundle",
        link: { href: help("articles/10324695-using-appstle-subscriptions-in-appstle-bundles"), label: "Using Appstle Subscriptions in Appstle Bundles" },
      },
      {
        id: "design",
        label: "Design & placement",
        title: "Match your store, place it anywhere",
        body: "Style widgets and bundle pages without code, then place offers with app blocks — or copy-paste snippets for themes and pages without app blocks.",
        bullets: [
          "Colors, backgrounds, buttons and disabled states",
          "Custom images or banners on bundle pages",
          "Manual integration via a Custom Liquid block",
          "Bundle page links in your navigation menu",
        ],
        media: m.design,
        caption: "Widget styling",
        link: { href: help("articles/15915157-how-to-manually-add-bundle-and-discount-blocks-manual-integration"), label: "Manually add bundle and discount blocks" },
      },
    ],
  },
  demos: {
    eyebrow: "Try it",
    title: "See the offers your shoppers see",
    description: "Hands-on versions of Appstle bundle and upsell widgets. Everything stays in your browser — no store, cart or account involved.",
    tryList: [
      "Pick a quantity tier and unlock progressive gifts",
      "Buy 2 and get the next one free",
      "Add to cart and meet a bundle upsell pop-up",
    ],
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "Everything you need to sell more",
    description: "Bundles, volume discounts, upsells, and subscriptions — all from one app, zero code required.",
    items: [
      { icon: ShoppingBag, title: "Increase Your Sales with Tailored Bundles for Your Store", body: "Classic, combo, mix & match, volume and sectioned bundles from one dashboard.", href: help("articles/9520690-how-to-configure-a-classic-bundle") },
      { icon: Megaphone, title: "Maximize Conversions with Targeted Upselling", body: "Upsells in the volume widget, funnels before checkout and CartBot auto-adds.", href: help("articles/15838034-how-to-configure-a-funnel") },
      { icon: BarChart3, title: "Real-Time Analytics for Smarter Decisions", body: "Track your bundling performance real-time with comprehensive and granular analytics" },
      { icon: Store, title: "Seamless Shopify POS Integration for an Omnichannel Experience", body: "Sell Classic Bundles in store with the Appstle Bundles tile in Shopify POS.", href: help("articles/9929040-integrating-appstle-bundles-into-shopify-pos") },
      { icon: Percent, title: "Product & shipping discounts", body: "Standalone product and shipping discounts with a custom checkout discount name and stacking controls.", href: help("articles/11113802-how-to-configure-a-product-discount") },
      { icon: UsersRound, title: "Targeting & scheduling", body: "Customer-tag access, usage limits, purchase requirements and active dates for every offer.", href: help("articles/10056832-bundles-allowances-restrictions-based-on-customer-tags") },
      { icon: Gift, title: "Progressive gifts", body: "Free products or free shipping that unlock as shoppers move up your quantity tiers.", href: help("articles/15838663-how-to-configure-a-volume-discount-progressive-gifts") },
      { icon: PanelsTopLeft, title: "Place offers anywhere", body: "App blocks on product pages, or copy-paste snippets for themes and pages without app blocks.", href: help("articles/15915157-how-to-manually-add-bundle-and-discount-blocks-manual-integration") },
    ],
  },
  integrations: {
    title: "Seamless integrations with top Shopify apps",
    description:
      "Easily connect your Bundles & Upsells program with Shopify’s most popular apps. In most cases, everything works right out of the box, minimizing the need for additional internal integration and allowing for a smooth fit into your existing tech stack.",
  },
  migration: {
    title: "Looking to migrate your bundles to Appstle Bundles?",
    body: "Our dedicated team has you covered! With thousands of successful migrations under their belt, our experts have the tools, experience, and hands-on expertise to ensure a smooth and seamless custom migration. Best of all, migrations to Appstle Bundles is completely free for merchants on all plans!",
  },
  trust: [
    {
      kind: "security",
      title: "Security and stability you can trust",
      body: "Appstle supports some of Shopify’s largest Shopify and Shopify Plus merchants. We know how important security and application stability are to our clients. Appstle’s infrastructure scales behind the scenes so that we support any volume of transactions.",
    },
    {
      kind: "support",
      title: "24x7x365 customer support",
      body: "Experience the Appstle difference! Our best in class customer support and a robust product! You’re only ever a couple minutes away from knowledgeable and hands-on support engineers who can help you build your bundles & upsells experience.",
      cta: { href: links.contact, label: "Contact Us" },
    },
  ],
  cta: {
    title: "Unlock the Power of Bundling & Upselling Today, with Appstle",
    body: "Install Appstle Bundles & Upsells from the Shopify App Store, or book a demo with our team.",
  },
};
