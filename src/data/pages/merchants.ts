import type { StaticImageData } from "next/image";
import membershipSupport from "@/assets/misc/membership-support.webp";
import { companyMedia } from "@/data/media/company";
import { productById, type ProductId } from "@/data/products";
import { routes } from "@/lib/routes";

const getStarted: Partial<Record<ProductId, string>> = {
  subscriptions: "Get started with Subscriptions",
  memberships: "Get started with Memberships",
  loyalty: "Get started with Loyalty",
  bundles: "Get started with Bundles",
};

export const merchantsPage = {
  hero: {
    eyebrow: "Merchants",
    title: "Trusted by 40,000+ merchants",
    intro:
      "Appstle℠ works with over 40,000+ (as on Dec ’24) trusted merchants on Shopify and Shopify Plus to help them provide compelling recurring orders, reward programs, memberships, bundles & discounts to their end customers or shoppers.",
  },
  proof: {
    count: 40000,
    asOf: "as on Dec ’24",
    offers: [
      { label: "Recurring orders", product: "subscriptions" },
      { label: "Reward programs", product: "loyalty" },
      { label: "Memberships", product: "memberships" },
      { label: "Bundles & discounts", product: "bundles" },
    ] satisfies { label: string; product: ProductId }[],
  },
  approach: {
    eyebrow: "Our merchants",
    title: "Select Merchants",
    body: [
      "We work closely with our merchant partners, fully analyzing and understanding their pain points, and develop strategies accordingly, to facilitate their e-commerce growth. Our robust solutions cater to all merchants, accommodating their specific needs.",
      "Whether you’re a small business owner or run a large enterprise, we’ve got you covered. Join our list of trusted merchants today and learn all about our sustainable solutions.",
    ],
  },
  caseStudyFor: {
    Vedix: "vedixs-global",
    "The Otaku Box": "the-otaku-box",
  } as Record<string, string>,
  charts: [
    { title: "Customer Share Across Geo", media: companyMedia.geoShare },
    { title: "Customer Share Across Industry", media: companyMedia.industryShare },
  ],
  grow: {
    title: "How Appstle helps you grow more?",
    intro: "Connect with our experts in just a click.",
    image: { src: membershipSupport as StaticImageData, alt: "An Appstle expert with a headset helping a merchant at her laptop" },
    apps: (Object.entries(getStarted) as [ProductId, string][]).map(([id, label]) => ({
      id,
      label,
      installHref: productById[id].installHref,
      productHref: productById[id].href,
    })),
  },
  caseStudiesHref: routes.caseStudies,
};
