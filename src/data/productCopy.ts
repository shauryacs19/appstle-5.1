import type { ProductId } from "./products";

type SuiteCopy = { title: string; intro: string; points: { label: string; text: string }[] };

export const suiteCopy: Record<ProductId, SuiteCopy> = {
  subscriptions: {
    title: "Subscriptions built around how your customers buy.",
    intro: "Recurring orders for every store, from brand-new shops to $100M+ brands.",
    points: [
      { label: "Offers that convert", text: "build-a-box, bundles, upsells and tiered discounts." },
      { label: "Less churn", text: "flexible plans, free gifts and discounts that keep subscribers." },
      { label: "Less admin", text: "inventory controls, custom billing and bulk automations." },
    ],
  },
  memberships: {
    title: "Memberships your best customers will want to keep.",
    intro: "Paid memberships from start to finish: plans, tiered perks and member billing.",
    points: [
      { label: "Tiered plans", text: "Set up as many membership levels as you need." },
      { label: "Perks that sell", text: "Member discounts and early access, tuned with built-in analytics." },
      { label: "One portal", text: "Manage plans, perks and billing rules in one place." },
    ],
  },
  bundles: {
    title: "Bigger baskets, built from the products they already love.",
    intro: "Bundles and volume discounts that grow every order.",
    points: [
      { label: "Fixed or mix-and-match", text: "Sell set bundles, or let shoppers build their own." },
      { label: "Tiered discounts", text: "Buy more, save more, and raise your average order value." },
      { label: "Live in minutes", text: "Create and manage bundles in a few clicks." },
    ],
  },
  loyalty: {
    title: "Give every shopper a reason to come back.",
    intro: "Points, rewards and referrals that bring shoppers back.",
    points: [
      { label: "Your rewards", text: "Points, discounts, store credit and exclusive offers." },
      { label: "Quick setup", text: "Built for Shopify and Shopify Plus. No code needed." },
      { label: "Personal touch", text: "Targeted rewards and messages for each shopper." },
    ],
  },
  pickup: {
    title: "Pickup, delivery & shipping — on their schedule.",
    intro: "Let shoppers choose store pickup, local delivery or scheduled shipping.",
    points: [
      { label: "Their pick at checkout", text: "Pickup, delivery or shipping, with a date and time." },
      { label: "No clashes", text: "Blackout dates, prep times, cutoffs and lead times." },
      { label: "Every location & POS", text: "All your orders in one dashboard." },
    ],
  },
};
