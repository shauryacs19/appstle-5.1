import type { StaticImageData } from "next/image";
import type { ProductId } from "./products";
import klaviyo from "@/assets/integrations/klaviyo.webp";
import omnisend from "@/assets/integrations/omnisend.webp";
import gorgias from "@/assets/integrations/gorgias.webp";
import growave from "@/assets/integrations/growave.webp";
import loyaltylion from "@/assets/integrations/loyaltylion.webp";
import yotpo from "@/assets/integrations/yotpo.webp";
import judgeme from "@/assets/integrations/judgeme.webp";
import loox from "@/assets/integrations/loox.webp";
import pagefly from "@/assets/integrations/pagefly.webp";
import zapier from "@/assets/integrations/zapier.webp";
import shopifyFlow from "@/assets/integrations/shopify-flow.webp";
import bundler from "@/assets/integrations/bundler.webp";
import ecomsolid from "@/assets/integrations/ecomsolid.webp";
import transcy from "@/assets/integrations/transcy.webp";
import uppromote from "@/assets/integrations/uppromote.webp";
import discountedPricing from "@/assets/integrations/discounted-pricing.webp";
import rebuy from "@/assets/integrations/rebuy.webp";
import langify from "@/assets/integrations/langify.webp";
import zipify from "@/assets/integrations/zipify.webp";
import oneclick from "@/assets/integrations/oneclick-upsell.webp";
import lantern from "@/assets/integrations/lantern.webp";

export type Integration = {
  name: string;
  category: "Email & SMS" | "Reviews" | "Loyalty & referrals" | "Support" | "Storefront & pages" | "Upsell & pricing" | "Translation" | "Automation" | "Payments";
  logo?: StaticImageData;
  listedOn: ProductId[];
  onAppstleSite: boolean;
};

export const integrations: Integration[] = [
  { name: "Klaviyo", category: "Email & SMS", logo: klaviyo, listedOn: ["subscriptions", "memberships", "loyalty", "bundles"], onAppstleSite: true },
  { name: "Omnisend", category: "Email & SMS", logo: omnisend, listedOn: ["loyalty"], onAppstleSite: true },
  { name: "Mailchimp", category: "Email & SMS", listedOn: ["loyalty"], onAppstleSite: false },
  { name: "Gorgias", category: "Support", logo: gorgias, listedOn: ["subscriptions", "memberships"], onAppstleSite: true },
  { name: "Growave", category: "Loyalty & referrals", logo: growave, listedOn: ["subscriptions", "memberships"], onAppstleSite: true },
  { name: "LoyaltyLion", category: "Loyalty & referrals", logo: loyaltylion, listedOn: ["memberships"], onAppstleSite: true },
  { name: "UpPromote", category: "Loyalty & referrals", logo: uppromote, listedOn: ["memberships"], onAppstleSite: true },
  { name: "Yotpo", category: "Reviews", logo: yotpo, listedOn: ["memberships"], onAppstleSite: true },
  { name: "Judge.me", category: "Reviews", logo: judgeme, listedOn: ["loyalty"], onAppstleSite: true },
  { name: "Loox", category: "Reviews", logo: loox, listedOn: ["loyalty"], onAppstleSite: true },
  { name: "Stamped.io", category: "Reviews", listedOn: ["loyalty"], onAppstleSite: false },
  { name: "PageFly", category: "Storefront & pages", logo: pagefly, listedOn: ["subscriptions", "memberships", "bundles"], onAppstleSite: true },
  { name: "EcomSolid", category: "Storefront & pages", logo: ecomsolid, listedOn: ["memberships"], onAppstleSite: true },
  { name: "Zipify", category: "Storefront & pages", logo: zipify, listedOn: [], onAppstleSite: true },
  { name: "Lantern", category: "Storefront & pages", logo: lantern, listedOn: [], onAppstleSite: true },
  { name: "Bundler", category: "Upsell & pricing", logo: bundler, listedOn: ["memberships"], onAppstleSite: true },
  { name: "Discounted Pricing", category: "Upsell & pricing", logo: discountedPricing, listedOn: ["memberships"], onAppstleSite: true },
  { name: "Rebuy", category: "Upsell & pricing", logo: rebuy, listedOn: [], onAppstleSite: true },
  { name: "OneClickUpsell", category: "Upsell & pricing", logo: oneclick, listedOn: [], onAppstleSite: true },
  { name: "Transcy", category: "Translation", logo: transcy, listedOn: ["memberships"], onAppstleSite: true },
  { name: "Langify", category: "Translation", logo: langify, listedOn: [], onAppstleSite: true },
  { name: "Zapier", category: "Automation", logo: zapier, listedOn: ["subscriptions", "memberships"], onAppstleSite: true },
  { name: "Shopify Flow", category: "Automation", logo: shopifyFlow, listedOn: ["subscriptions", "memberships", "loyalty", "bundles"], onAppstleSite: true },
  { name: "Stripe", category: "Payments", listedOn: ["subscriptions"], onAppstleSite: false },
];

export const shopifySurfaces: Record<ProductId, string[]> = {
  subscriptions: ["Checkout", "Customer accounts", "Shopify POS", "Shopify Flow"],
  memberships: ["Checkout", "Customer accounts", "Shopify POS", "Shopify Flow"],
  loyalty: ["Checkout", "Customer accounts", "Shopify POS", "Shopify Flow"],
  bundles: ["Checkout", "Shopify Flow"],
  pickup: ["Checkout", "Customer accounts", "Shopify POS"],
};

export const appstleCrossApp: Record<ProductId, ProductId[]> = {
  subscriptions: ["loyalty", "bundles", "pickup"],
  memberships: ["loyalty", "pickup"],
  loyalty: ["subscriptions", "memberships", "bundles", "pickup"],
  bundles: ["subscriptions", "loyalty", "pickup"],
  pickup: ["subscriptions", "memberships", "loyalty", "bundles"],
};

export function integrationsFor(id: ProductId): Integration[] {
  const listed = integrations.filter((i) => i.listedOn.includes(id));
  const site = integrations.filter((i) => !i.listedOn.includes(id) && i.onAppstleSite);
  return [...listed, ...site];
}

const byName = (n: string) => {
  const i = integrations.find((x) => x.name === n);
  if (!i) throw new Error(`Unknown integration: ${n}`);
  return i;
};
export const integrationGroups = [
  { title: "Email & SMS marketing", icon: "Mail", blurb: "Flows and campaigns for shoppers", items: ["Klaviyo", "Omnisend"].map(byName) },
  { title: "Reviews", icon: "Star", blurb: "Social proof on every product", items: ["Yotpo", "Judge.me", "Loox"].map(byName) },
  { title: "Customer support", icon: "Headset", blurb: "Helpdesk for every ticket", items: ["Gorgias"].map(byName) },
  { title: "Loyalty & referrals", icon: "Gift", blurb: "Rewards and affiliate programs", items: ["Growave", "LoyaltyLion", "UpPromote"].map(byName) },
  { title: "Automation", icon: "Workflow", blurb: "Workflows across your stack", items: ["Shopify Flow", "Zapier"].map(byName) },
  { title: "Storefront & upsells", icon: "LayoutTemplate", blurb: "Pages, funnels and offers", items: ["PageFly", "Zipify", "Rebuy"].map(byName) },
] as const;
