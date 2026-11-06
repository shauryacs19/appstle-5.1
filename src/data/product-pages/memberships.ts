import { BadgePercent, Code2, Layers, Link2, LockKeyhole, Mail, ScanLine, Tags, UserRoundCog, CalendarSync, ClipboardList } from "lucide-react";
import { membershipsMedia as m } from "@/data/media/memberships";
import { links } from "@/data/site";
import type { ProductPageData } from "./types";

const help = (path: string) => `https://help.appstle.com/en/${path}`;

export const membershipsPage: ProductPageData = {
  id: "memberships",
  hero: {
    title: "Build strong Memberships designed to build and retain your customer's loyalty",
    lead: "Offer strong memberships with Appstle, with comprehensive benefits",
    points: [
      "Sell recurring and tiered membership plans to drive revenue",
      "Provide member-only discounts, shipping perks, and gifts to draw members",
      "Gate access to products, pages, membership portals, and more",
    ],
    visual: {
      desktop: m.heroDesktop,
      mobile: m.heroMobile,
      toasts: [
        { product: "memberships", title: "New Gold member", meta: "Tiered member perks" },
        { product: "memberships", title: "Member discount applied", meta: "Members-only pricing" },
      ],
      description: "The Appstle Memberships plan editor, and the member portal on a phone listing two active memberships.",
      stage: "bg-gradient-to-br from-lavender-200 via-lavender to-lavender-700",
    },
  },
  logos: { title: "We're trusted by some of the largest merchants on Shopify. You'll be in good company." },
  overview: {
    eyebrow: "Overview",
    title: "Shopify's Most Powerful Membership Solution",
    intro:
      "Appstle offers end-to-end membership functionality, covering membership plan creation & management, tiered member perks, and member billing.",
    labels: [
      "Unlimited membership tiers and custom plans",
      "Advanced feature and product gating for member exclusivity",
      "Innovative benefits for members (price discounts, shipping benefits, free products and more)",
      "Flexible and highly customizable memberships portal",
    ],
    cards: [
      {
        icon: BadgePercent,
        title: "Reward your best customers with exclusive member perks",
        body: "Give your best customers access to exclusive content, products, and discounts. Appstle Memberships is the only end-to-end Shopify memberships tool that does not require third party app for pricing discounts.",
        cta: { label: "Get in touch", href: links.contact },
      },
      {
        icon: ClipboardList,
        title: "Collect first party data in a safe and secure manner",
        body: "Create powerful forms to learn about your customer and create segments. Build custom product forms in a few clicks that integrate into your membership page.",
        cta: { label: "Get in touch", href: links.contact },
      },
      {
        icon: CalendarSync,
        title: "Recurring billing and membership management",
        body: "Bill your customers for their membership at any frequency and allow for ongoing membership management through Appstle’s membership portal.",
        cta: { label: "Get in touch", href: links.contact },
      },
      {
        icon: Code2,
        title: "API access and automations",
        body: "Build custom experiences on top of Appstle Memberships with our APIs. Run bulk automations to make changes to customers memberships whenever you need to.",
        cta: { label: "Get in touch", href: links.contact },
      },
    ],
  },
  explorer: {
    eyebrow: "Features",
    title: "Everything your membership program needs",
    description: "Plans, perks, access, billing and the member portal — pick a feature to see it in the app.",
    items: [
      {
        id: "plans",
        label: "Plans & tiers",
        title: "Membership plans and tiers",
        body: "Turn a Shopify product into a membership plan with its own name, customer and order tags, renewal cycle, trial and discount — and offer several options or tiers as its variants.",
        bullets: [
          "Monthly vs yearly or Gold vs Platinum as variants of one product",
          "Customer tags connect each member to the right perks",
          "Require or exclude specific tags to limit who can buy a plan",
          "Membership widget on the membership product page",
        ],
        media: m.plans,
        caption: "Membership widget",
        link: { href: help("articles/6048127-memberships-how-to-create-and-offer-membership-plans-in-shopify"), label: "Create and offer membership plans" },
      },
      {
        id: "perks",
        label: "Member pricing & perks",
        title: "Member discounts without another app",
        body: "Give members automatic discounts that Shopify checkout limits to members, email them discount codes, and show member prices next to regular prices on the storefront.",
        bullets: [
          "Free shipping, percentage, fixed amount and Buy X Get Y discounts",
          "Shopify Checkout automatically blocks non-members from using them",
          "Discount codes emailed to members at a set interval",
          "Member vs non-member pricing on product pages",
        ],
        media: m.pricing,
        caption: "Member benefits",
        link: { href: help("articles/9462380-membership-perks"), label: "Membership perks" },
      },
      {
        id: "access",
        label: "Members-only access",
        title: "Gate what matters to members",
        body: "Restrict the Add to Cart button, product pages, collections, blog posts and other pages to logged-in active members — and show members their own theme templates.",
        bullets: [
          "Non-members see your blocked message instead of Add to Cart",
          "Target by URL, product tag, collection, product type or vendor",
          "Members-only product, collection, blog and page access",
          "Alternate Templates: a different theme template for members",
        ],
        media: m.gating,
        caption: "Members-only access",
        link: { href: help("articles/6090896-members-only-add-to-cart-access"), label: "Members-only Add to Cart access" },
      },
      {
        id: "forms",
        label: "Forms & first-party data",
        title: "Learn about your members as they join",
        body: "Add questions to a membership plan that customers answer when they buy. Answers are stored on the order and the membership, and exported with your members.",
        bullets: [
          "Text, dropdown, checkbox, radio and date picker fields",
          "Required and visible settings per field",
          "Answers on the Shopify order under Attributes",
          "One column per field in the members CSV export",
        ],
        media: m.forms,
        caption: "Membership form",
        link: { href: help("articles/9298954-personalise-membership-experience-with-form-fields"), label: "Membership form fields" },
      },
      {
        id: "billing",
        label: "Recurring billing",
        title: "Recurring member billing, on your terms",
        body: "Bill members automatically on the cycle you set, with optional trials, intro discounts, minimum and maximum terms and a fixed renewal day — and retry failed charges.",
        bullets: [
          "Renewal frequency in days, months or years",
          "Free trials and an introductory membership discount",
          "Minimum and maximum renewals, or one renewal day for everyone",
          "Failed payment retries, then cancel, pause or skip",
        ],
        media: m.billing,
        caption: "Memberships",
        link: { href: help("articles/6089681-failed-payment-recovery-in-appstle-memberships"), label: "Failed payment recovery" },
      },
      {
        id: "portal",
        label: "Member portal",
        title: "A portal members manage themselves",
        body: "Members pause or resume, skip a renewal, upgrade their tier, update payment details or cancel — from the Manage Membership button or a magic link in their welcome email.",
        bullets: [
          "Upgrade or downgrade with unused time applied as a discount",
          "Welcome email magic link, no login needed",
          "Portal permissions, labels and CSS under your control",
          "Customer tag switches automatically with the new tier",
        ],
        media: m.portal,
        caption: "Member portal",
        link: { href: help("articles/5972158-member-portal-for-customers-overview"), label: "Member portal overview" },
      },
      {
        id: "retention",
        label: "Retention & cancellations",
        title: "Keep members who are about to leave",
        body: "Decide what happens when a member cancels: cancel at once, show your own instructions, or run a retention flow that answers each cancellation reason.",
        bullets: [
          "Cancel immediately, cancellation instructions or a member retention flow",
          "A retention action for every cancellation reason",
          "Pause or skip a renewal instead of cancelling",
        ],
        media: m.retention,
        caption: "Member retention flow",
        link: { href: help("articles/6089704-how-to-smartly-use-appstle-s-cancellation-management-feature-to-retain-members"), label: "Cancellation management" },
      },
      {
        id: "automations",
        label: "Automations & APIs",
        title: "Bulk automations, APIs and webhooks",
        body: "Change many memberships at once with an activity log for every run, and build custom experiences on Appstle’s APIs and membership webhooks.",
        bullets: [
          "11 bulk automations, from status and renewal date to switching memberships",
          "Activity log: type, status, errors, start and end time",
          "Webhooks for activated, created, updated, paused, cancelled and billing events",
        ],
        media: m.automations,
        caption: "Memberships APIs",
        link: { href: help("articles/9467322-bulk-automations-for-memberships-activity-logs"), label: "Bulk automations" },
      },
    ],
  },
  demos: {
    eyebrow: "Try it",
    title: "See your membership from the member’s side",
    description: "Hands-on versions of what your members see. Everything stays in your browser — no store, cart or account involved.",
    tryList: [
      "See a members-only product as a guest and as a member",
      "Pause, skip a renewal or upgrade from the member portal",
      "Try to cancel and meet a retention offer",
    ],
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "The only end-to-end Shopify memberships tool",
    description: "Member plans, perks (e.g. discounts, access) and billing — in one app.",
    items: [
      { icon: Layers, title: "Unlimited tiers and custom plans", body: "Offer multiple tiered or custom plans, paid or free, as variants of one membership product.", href: help("articles/6048127-memberships-how-to-create-and-offer-membership-plans-in-shopify") },
      { icon: LockKeyhole, title: "Feature and product gating", body: "Limit Add to Cart, products, collections, blogs and pages to members only.", href: help("articles/6090896-members-only-add-to-cart-access") },
      { icon: BadgePercent, title: "Benefits for members", body: "Price discounts, shipping benefits, free products and more, with member prices on the storefront.", href: help("articles/9462380-membership-perks") },
      { icon: UserRoundCog, title: "Customizable memberships portal", body: "Members pause, skip, upgrade, update payment or cancel; you set permissions, labels and CSS.", href: help("articles/5972158-member-portal-for-customers-overview") },
      { icon: Tags, title: "Smart member tagging", body: "Customer and order tags per plan connect the right perks to the right members.", href: help("articles/6048127-memberships-how-to-create-and-offer-membership-plans-in-shopify") },
      { icon: Mail, title: "Branded member emails", body: "Edit templates, add your logo, use custom HTML or send from your own domain.", href: help("articles/6089718-how-to-customise-emails-in-appstle-memberships") },
      { icon: ScanLine, title: "Shopify POS", body: "Apply member discounts in store from the Appstle Memberships tile on the POS Smart Grid.", href: help("articles/10186318-adding-appstle-memberships-to-the-shopify-pos") },
      { icon: Link2, title: "Quick Checkout Links", body: "Send shoppers straight to membership checkout, optionally pre-filled with their details.", href: help("articles/9467311-quick-checkout-links-for-memberships") },
    ],
  },
  integrations: {
    title: "Best in class integrations",
    description: "We play nice with Shopify’s most popular apps so you can integrate your membership program easily into your existing tech stack.",
  },
  reviews: { title: "Rated 5 out of 5 by Shopify merchants", description: "Reviews published on appstle.com." },
  migration: {
    title: "Looking to migrate your store’s recurring membership plans to Appstle Memberships?",
    body: "Our dedicated team has you covered. With thousands of successful migrations under its belt, our team has the tools, experience, and hands-on expertise to help you with your custom migration. Best of all, migrations to Appstle Memberships is complimentary to all our merchants, across plans, including the free plan!",
    sources: {
      title: "Where merchants come from",
      bars: [
        { label: "Conjured", value: 8 },
        { label: "Subscription Plus", value: 10 },
        { label: "Bold", value: 15 },
        { label: "Subi Subscriptions", value: 11 },
        { label: "Love Loyalty", value: 14 },
        { label: "WooCommerce", value: 11 },
        { label: "WordPress", value: 15 },
        { label: "Magento", value: 8 },
        { label: "Other", value: 8 },
      ],
    },
    timeline: {
      title: "Migration timeline",
      bars: [
        { label: "0–1 days", value: 75 },
        { label: "2–3 days", value: 15 },
        { label: "4–7 days", value: 6 },
        { label: "8–14 days", value: 4 },
      ],
    },
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
      body: "The Appstle difference is our best in class customer support. You’re only ever a couple minutes away from knowledgeable support engineers who can help you build your membership experience.",
    },
    {
      kind: "enterprise",
      title: "Have custom requirements? Let’s talk about Appstle Enterprise plans",
      body: "We’ll help you build custom membership experiences on Appstle enterprise plans. Speak to an enterprise success specialist today to learn more.",
      cta: { href: links.contact, label: "Talk to expert" },
    },
  ],
  cta: {
    title: "Offer strong memberships with Appstle, with comprehensive benefits",
    body: "Install Appstle Memberships from the Shopify App Store, or book a demo with our team.",
  },
};
