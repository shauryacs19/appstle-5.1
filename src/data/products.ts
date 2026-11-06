import type { StaticImageData } from "next/image";
import { href, routes } from "@/lib/routes";
import subsCard from "@/assets/subscriptions/feature-loyalty.webp";
import memCard from "@/assets/memberships/feature-tiers.webp";
import loyCard from "@/assets/loyalty/feature-programs.webp";
import bunCard from "@/assets/bundles/feature-upsell.webp";
import pickupCard from "@/assets/pickup/promo.webp";

export type ProductId = "subscriptions" | "memberships" | "loyalty" | "bundles" | "pickup";

export type Accent = {
  solid: string;
  soft: string;
  chip: string;
  text: string;
  ring: string;
  hex: string;
};

export type Product = {
  id: ProductId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  highlights: string[];
  href: string;
  installHref: string;
  pricingHref?: string;
  helpHref: string;
  demoHref?: string;
  pricingNote: string;
  builtForShopify: boolean;
  rating: { value: number; count: number; asOf: string };
  accent: Accent;
  image: StaticImageData;
  imageAlt: string;
};

export const products: Product[] = [
  {
    id: "subscriptions",
    name: "Appstle Subscriptions",
    shortName: "Subscriptions",
    tagline: "Recurring orders, subscription boxes and a self-serve customer portal.",
    description:
      "Create subscription offers that convert in a few clicks — build-a-box, bundling offers, upsells, tiered discounts and more — with flexible billing and bulk automations.",
    highlights: ["Build-a-box, bundling & upsells", "Customer portal to pause, skip or swap"],
    href: href(routes.product.subscriptions),
    installHref: "https://apps.shopify.com/subscriptions-by-appstle",
    pricingHref: href(routes.pricing.subscriptions),
    helpHref: "https://help.appstle.com/en/collections/2776373-subscriptions",
    demoHref: "https://demo.appstle.com/pages/features-we-offer",
    pricingNote: "Free plan available",
    builtForShopify: true,
    rating: { value: 5.0, count: 9054, asOf: "22 Oct 2026" },
    accent: {
      solid: "bg-cobalt",
      soft: "bg-cobalt-50",
      chip: "bg-cobalt-100",
      text: "text-cobalt-700",
      ring: "ring-cobalt-200",
      hex: "#2457E6",
    },
    image: subsCard,
    imageAlt: "Appstle Subscriptions purchase options widget with subscribe-and-save and subscriber rewards",
  },
  {
    id: "memberships",
    name: "Appstle Memberships",
    shortName: "Memberships",
    tagline: "Paid and tiered memberships with perks, gated access and billing.",
    description:
      "End-to-end membership functionality covering plan creation and management, tiered member perks and automated member billing.",
    highlights: ["Unlimited tiers & custom plans", "Product, page & content gating"],
    href: href(routes.product.memberships),
    installHref: "https://apps.shopify.com/appstle-memberships",
    pricingHref: href(routes.pricing.memberships),
    helpHref: "https://help.appstle.com/en/collections/3293196-memberships",
    demoHref: "https://demo-appstle-membership.myshopify.com/pages/features-we-offer",
    pricingNote: "Free to install",
    builtForShopify: true,
    rating: { value: 5.0, count: 926, asOf: "22 Oct 2026" },
    accent: {
      solid: "bg-lavender",
      soft: "bg-lavender-50",
      chip: "bg-lavender-100",
      text: "text-lavender-700",
      ring: "ring-lavender-200",
      hex: "#8B6EF5",
    },
    image: memCard,
    imageAlt: "Appstle Memberships Bronze, Silver and Gold tiers with member perks",
  },
  {
    id: "loyalty",
    name: "Appstle Loyalty & Rewards",
    shortName: "Loyalty & Rewards",
    tagline: "Points, referrals, store credit and VIP tiers that bring shoppers back.",
    description:
      "Build a customized loyalty program with points, store credits, rewards, referrals, VIP perks and cart & checkout redemption.",
    highlights: ["Points, referrals & store credit", "Cart & checkout redemption"],
    href: href(routes.product.loyalty),
    installHref: "https://apps.shopify.com/appstle-loyalty",
    pricingHref: href(routes.pricing.loyalty),
    helpHref: "https://help.appstle.com/en/collections/3787343-loyalty-rewards",
    demoHref: "https://loyaltyuidev.myshopify.com/pages/loyalty-program",
    pricingNote: "Free plan available",
    builtForShopify: true,
    rating: { value: 5.0, count: 1441, asOf: "22 Oct 2026" },
    accent: {
      solid: "bg-coral",
      soft: "bg-coral-50",
      chip: "bg-coral-100",
      text: "text-coral-700",
      ring: "ring-coral-200",
      hex: "#FF8C69",
    },
    image: loyCard,
    imageAlt: "Appstle Loyalty rewards widget showing a points balance, referral offer and reward options",
  },
  {
    id: "bundles",
    name: "Appstle Bundles & Upsells",
    shortName: "Bundles & Upsells",
    tagline: "Fixed, mix & match and volume bundles plus post-purchase upsells.",
    description:
      "Offer curated bundles or volume discounts for multi-item purchases, with tiered discounts designed to lift average order value.",
    highlights: ["Classic, mix & match & volume bundles", "Checkout & thank-you page upsells"],
    href: href(routes.product.bundles),
    installHref: "https://apps.shopify.com/appstle-bundles",
    pricingHref: href(routes.pricing.bundles),
    helpHref: "https://help.appstle.com/en/collections/9086094-bundles-discounts",
    demoHref: "https://demo.appstle.com/pages/appstle-bundles",
    pricingNote: "Free plan available",
    builtForShopify: false,
    rating: { value: 5.0, count: 1171, asOf: "22 Oct 2026" },
    accent: {
      solid: "bg-mint",
      soft: "bg-mint-50",
      chip: "bg-mint-100",
      text: "text-mint-700",
      ring: "ring-mint-200",
      hex: "#3FAE79",
    },
    image: bunCard,
    imageAlt: "Appstle Bundles storefront widget offering Buy 2, Save 20% on two products",
  },
  {
    id: "pickup",
    name: "Appstle Pickup & Delivery",
    shortName: "Pickup & Delivery",
    tagline: "Store pickup, local delivery and shipping with date & time selection.",
    description:
      "Flexible fulfillment for Shopify stores — store pickup, local delivery and shipping scheduling — managed from one dashboard.",
    highlights: ["Blackout dates, prep times & cutoffs", "Multi-location & Shopify POS"],
    href: href(routes.pickup),
    installHref: "https://apps.shopify.com/appstle-pickup-delivery",
    helpHref: "https://help.appstle.com/en/collections/19646956-pickup-delivery",
    pricingNote: "Free",
    builtForShopify: false,
    rating: { value: 4.8, count: 21, asOf: "23 Oct 2026" },
    accent: {
      solid: "bg-blush",
      soft: "bg-blush-50",
      chip: "bg-blush-100",
      text: "text-blush-700",
      ring: "ring-blush",
      hex: "#E86A8E",
    },
    image: pickupCard,
    imageAlt: "Appstle Pickup & Delivery order widget with Pickup, Delivery and Shipping options and a date selector",
  },
];

export const productById = Object.fromEntries(products.map((p) => [p.id, p])) as Record<ProductId, Product>;
