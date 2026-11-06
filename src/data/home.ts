export const commerceHero = {
  eyebrow: "The apps that power growth",
  lead: "Revenue through retention",
};

export type HomePoint = { label?: string; text: string };

export const homeProductCopy: Record<"subscriptions" | "memberships" | "loyalty" | "bundles" | "pickup", { intro: string; points: HomePoint[] }> = {
  subscriptions: {
    intro:
      "Appstle powers subscription experiences for brands processing over $100 million in revenue to brands that are just getting started.",
    points: [
      { text: "Create subscription offers that convert in just a few clicks. Build-a-box, bundling offers, upsells, tiered discounts, and more." },
      { text: "Reduce customer churn with flexible subscriptions, free product offers, discounts, and seamless integration into your Shopify store." },
      { text: "Maximize profit and achieve efficiency with Inventory management controls, customizable billing options, and bulk automations." },
    ],
  },
  memberships: {
    intro:
      "Appstle offers end-to-end membership functionality, covering membership plan creation & management, tiered member perks, and member billing.",
    points: [
      { text: "Set up with ease multiple and tiered membership plans that help boost your reach, and customer loyalty." },
      {
        text: "Improve conversion through targeted and continuously updated member perks spanning varied discount types and access benefits. Smartly iterate using our in-depth performance analytics.",
      },
      { text: "Customize and manage your membership plans, member perks, and billing rules using our robust merchant portal." },
    ],
  },
  loyalty: {
    intro:
      "Unlock the full potential of your brand with Appstle Loyalty & Rewards, your ultimate solution for building lasting customer relationships! Appstle’s intuitive loyalty app makes it easy to create a customized loyalty program that keeps your customers coming back for more.",
    points: [
      { label: "Customizable Rewards", text: "Tailor rewards to fit your brand. Offer points, discounts, store credits, exclusive offers, and more." },
      { label: "Seamless Setup", text: "Natively integrates with your Shopify or Shopify Plus store. Launch your loyalty program in just a few clicks - no technical expertise required." },
      { label: "Engaging Customer Experience", text: "Boost customer engagement through personalized experiences. Send targeted rewards, store credits, and notifications that resonate with each shopper." },
      { label: "Analytics and Insights", text: "Gain valuable insights into customer behavior and program performance. Track engagement, redemption rates, and more to continually optimize your retention strategy." },
    ],
  },
  bundles: {
    intro:
      "Your go-to solution for creating compelling product combinations! Whether you’re looking to offer curated bundles or enticing volume discounts for multi-item purchases, Appstle Bundles & Upsells makes it possible.",
    points: [
      { label: "Easy Bundle Creation", text: "Design custom bundles that showcase your products in a way that captures attention and drives sales. Choose from fixed bundles or flexible options where customers can mix and match!" },
      { label: "Discounts that Delight", text: "Offer customers the incentive they crave! Set tiered discounts on bundles to drive larger purchases and increase average order value (AOV) effortlessly." },
      { label: "User-Friendly Interface", text: "With our intuitive setup, you can create and manage bundles in just a few clicks. Start selling more in minutes!" },
    ],
  },
  pickup: {
    intro:
      "Appstle Pickup & Delivery helps merchants offer flexible fulfillment experiences — from store pickup and local delivery to shipping scheduling — for Shopify stores of every size.",
    points: [
      { text: "Enable shoppers to choose store pickup, local delivery, or shipping with date & time selection at checkout. Manage all fulfillment from one powerful dashboard." },
      { text: "Prevent scheduling conflicts with automated blackout dates, prep times, order cutoffs, and product-specific lead times tailored to your store's needs." },
      { text: "Run multi-location & Shopify POS orders seamlessly from one dashboard — no juggling multiple tools or manual coordination required." },
    ],
  },
};
