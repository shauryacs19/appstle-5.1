import type { PageSeo } from "@/lib/seo";
import { routes } from "@/lib/routes";

export const seo = {
  home: {
    path: routes.home,
    title: "Appstle — Shopify Subscription, Membership & Loyalty Apps",
    description:
      "Appstle builds Shopify apps for subscriptions, memberships, loyalty, bundles and pickup & delivery. Trusted by 70,000+ merchants, with 24x7x365 support.",
  },
  subscriptions: {
    path: routes.product.subscriptions,
    title: "Appstle Subscriptions — Shopify Subscription App",
    description:
      "Launch subscribe-and-save, build-a-box and prepaid plans on Shopify, with a self-serve portal, churn tools and free migration. Free plan available.",
  },
  memberships: {
    path: routes.product.memberships,
    title: "Appstle Memberships — Shopify Membership App",
    description:
      "Sell paid and tiered memberships on Shopify with member pricing, gated access, a member portal and automatic renewals. Free plan for up to 25 members.",
  },
  loyalty: {
    path: routes.product.loyalty,
    title: "Appstle Loyalty & Rewards — Shopify Loyalty App",
    description:
      "Points, referrals, VIP tiers and store credit for Shopify, with cart and checkout redemption and Shopify POS support. Free plan up to 250 orders a month.",
  },
  bundles: {
    path: routes.product.bundles,
    title: "Appstle Bundles & Upsells — Shopify Bundles App",
    description:
      "Create classic, mix & match, volume and BOGO bundles on Shopify, plus upsell funnels and subscription bundles. Free plan up to $750/mo in bundle sales.",
  },
  pickup: {
    path: routes.pickup,
    title: "Appstle Pickup & Delivery — Shopify Pickup & Delivery App",
    description:
      "Store pickup, local delivery and shipping with date & time selection at checkout, plus blackout dates, prep times and Shopify POS. Free on Shopify.",
  },
  subscriptionsPricing: {
    path: routes.pricing.subscriptions,
    title: "Appstle Subscriptions Pricing | Plans from $0/month",
    description:
      "Appstle Subscriptions plans: Free, Starter $10, Business $30, Business Premium $100 and Enterprise $300 a month. 0% transaction fee on every plan.",
  },
  membershipsPricing: {
    path: routes.pricing.memberships,
    title: "Appstle Memberships Pricing | Plans from $0/month",
    description:
      "Appstle Memberships plans: Free for 25 members, Starter $19, Business $39, Business Premium $79, Enterprise $300 a month. Save 20% yearly, 0% fees.",
  },
  loyaltyPricing: {
    path: routes.pricing.loyalty,
    title: "Appstle Loyalty & Rewards Pricing | Plans from $0/month",
    description:
      "Appstle Loyalty plans: Free up to 250 orders, Starter $10, Business $30, Business Premium $100, Enterprise $300 a month. 0% transaction fee.",
  },
  bundlesPricing: {
    path: routes.pricing.bundles,
    title: "Appstle Bundles & Upsells Pricing | Plans from $0/month",
    description:
      "Appstle Bundles plans: Launch is free up to $750/mo in bundle sales; Starter, Growth and Pro add more, up to unlimited bundle sales. 14-day free trial.",
  },
  about: {
    path: routes.about,
    title: "About Appstle | Shopify Apps Built in Menlo Park, CA",
    description:
      "Appstle builds Shopify apps for subscriptions, memberships, loyalty and bundles. Founded in 2021 in Menlo Park, CA, with offices in Canada and India.",
  },
  merchants: {
    path: routes.merchants,
    title: "Appstle Merchants | 40,000+ Shopify & Shopify Plus Brands",
    description:
      "Brands across the globe and various industries trust Appstle to set up business models designed for sustainable growth in revenue.",
  },
  appPartners: {
    path: routes.appPartners,
    title: "Appstle App Partners & Shopify Integrations",
    description:
      "Appstle works with leading Shopify apps for email, SMS, reviews, loyalty, page building and more. Browse integrations or become an Appstle partner.",
  },
  causes: {
    path: routes.causes,
    title: "Causes & Non-Profits Appstle Supports",
    description:
      "Discover the causes and non-profits supported by Appstle. Learn how we're making a positive impact through our partnerships.",
  },
  careers: {
    path: routes.careers,
    title: "Careers at Appstle | Join Our Team",
    description:
      "Join the Appstle team through exciting career opportunities. Discover a path to innovation and growth in our dynamic work environment.",
  },
  contact: {
    path: routes.contact,
    title: "Contact Appstle | Demos, Enterprise & 24/7 Support",
    description:
      "Get in touch with Appstle. Reach out for inquiries, collaboration, or to learn more about our services and solutions.",
  },
  privacy: {
    path: routes.privacy,
    title: "Privacy Policy | Appstle",
    description:
      "Learn about Appstle's commitment to privacy through our comprehensive Privacy Policy. Understand how we handle and protect your data with transparency.",
  },
  terms: {
    path: routes.terms,
    title: "Terms & Conditions | Appstle",
    description:
      "Review Appstle's Terms and Conditions to understand our policies, guidelines, and practices. Gain insights into our terms of service.",
  },
  amazon: {
    path: routes.amazon,
    title: "Appstle Amazon Integration for Shopify",
    description:
      "Sync products, orders, inventory and shipping between Shopify and Amazon in real time with Appstle Amazon Integrations.",
    noindex: true,
  },
  comparisons: {
    path: routes.comparisons,
    title: "Appstle vs Competitors | Shopify App Comparisons",
    description:
      "Compare Appstle with other Shopify apps for subscriptions, memberships, loyalty, bundles and pickup & delivery, feature by feature.",
  },
  bestSubscriptions: {
    path: routes.bestSubscriptions,
    title: "Best Shopify Subscriptions App: Appstle Compared",
    description:
      "Unlock the full potential of your Shopify store with Appstle Subscriptions. Elevate your subscription business and explore advanced features. Book a demo!",
  },
  bestMemberships: {
    path: routes.bestMemberships,
    title: "Best Shopify Memberships App: Appstle Compared",
    description:
      "Discover why Appstle Memberships is the top choice for Shopify brands. Compare features, explore benefits, and migrate seamlessly. Book a demo today!",
  },
  caseStudies: {
    path: routes.caseStudies,
    title: "Appstle Case Studies | Shopify Merchant Success Stories",
    description:
      "How Shopify brands like Birch Boys, The Otaku Box, Vedix and Paradisefold grow retention and recurring revenue with Appstle apps.",
  },
  news: {
    path: routes.news,
    title: "Appstle News & Press | Announcements and Coverage",
    description:
      "Stay informed about the latest news and updates from Appstle. Explore our announcements to stay up-to-date with our developments.",
  },
  blog: {
    path: routes.blog,
    title: "Appstle Blog | Shopify Subscription & Retention Guides",
    description:
      "Explore Appstle's blog to learn how to grow your e-commerce business, memberships, loyalty, and customer retention.",
  },
  downloads: {
    path: routes.downloads,
    title: "Free eBooks | Appstle Downloads",
    description:
      "Free Appstle eBooks on getting started with ecommerce subscriptions and memberships for your Shopify store.",
  },
  faq: {
    path: routes.faq,
    title: "Appstle FAQ | Subscriptions, Memberships & Loyalty",
    description:
      "Answers to common questions about Appstle's Shopify apps: platforms, payment gateways, plans, loyalty rules, migrations and integrations.",
  },
  migrations: {
    path: routes.migrations,
    title: "Migrate to Appstle | Free Hands-On Migrations",
    description:
      "Effortlessly migrate to Appstle, Shopify’s top ecommerce solution. Our dedicated team guides you with precision, with checklists for a seamless move.",
  },
  migrationSubscriptions: {
    path: routes.migration.subscriptions,
    title: "Migrate Subscriptions to Appstle | Free Migration",
    description:
      "Unlock easy transitions with Appstle Subscriptions. Free migrations for all plans. Seamless switch from V1/V2 apps. Elevate your subscription management.",
  },
  migrationMemberships: {
    path: routes.migration.memberships,
    title: "Migrate Memberships to Appstle | Free Migration",
    description:
      "Seamless membership migration with Appstle. Complimentary for all plans. Our experts ensure a smooth transition, elevating your online community.",
  },
  migrationLoyalty: {
    path: routes.migration.loyalty,
    title: "Migrate Loyalty & Rewards to Appstle | Free Migration",
    description:
      "Simplify your loyalty program transition with Appstle: a smooth shift backed by support and top-notch security, so your rewards keep customers engaged.",
  },
  migrationBundles: {
    path: routes.migration.bundles,
    title: "Migrate Bundles to Appstle | Free Migration",
    description:
      "Migrate your bundles to Appstle Bundles from any Shopify bundles app or select non-Shopify platforms. Free for merchants on all plans, done by our team.",
  },
} satisfies Record<string, PageSeo>;
