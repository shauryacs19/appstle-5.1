import type { ProductId } from "@/data/products";

export const caseStudyCopy = {
  eyebrow: "Case studies",
  h1: "Merchant Success Stories",
  intro: "Explore real success stories with Appstle’s subscription tools, driving business growth and customer satisfaction.",
  latest: "Latest story",
  gridTitle: "Every story",
  allLabel: "All stories",
  related: "Related Posts",
  author: "Joy Lake",
  featured: {
    eyebrow: "Your story here",
    title: "Want to be featured next?",
    body: [
      "Are you a merchant using Appstle to run your subscription-based business? Would you like to share your success story and be featured in an Appstle case study?",
      "Don’t miss out on the opportunity to showcase your business and the impact Appstle has had on it. Join the Appstle community of successful merchants by sharing your story in an Appstle case study. Fill out the form now to express your interest!",
    ],
  },
} as const;

type CaseStudyMeta = { customer: string; industry: string; platform: string; products: ProductId[] };

export const caseStudyMeta: Record<string, CaseStudyMeta> = {
  "how-paradisefold-scaled-customer-loyalty-with-appstle-a-seamless-cost-effective-solution-for-growth": { customer: "Paradisefold", industry: "Retail", platform: "Shopify", products: ["loyalty"] },
  "birch-boys-enhances-customer-retention-purchase-journey-and-operational-efficiency-with-appstle-subscriptions": { customer: "Birch Boys", industry: "Retail", platform: "Shopify Plus", products: ["subscriptions"] },
  "rosemiras-journey-to-finding-the-right-subscription-solution-with-appstle-subscriptions": { customer: "Rosemira", industry: "Retail", platform: "Shopify", products: ["subscriptions"] },
  "aic-expat-expanding-relocation-services": { customer: "AIC Expat", industry: "Entertainment Providers", platform: "Shopify", products: ["memberships"] },
  "true-moringa-boosts-skincare-subscriptions": { customer: "True Moringa", industry: "Retail", platform: "Shopify", products: ["subscriptions"] },
  "haypigs-from-pet-passion-to-retail-success": { customer: "HayPigs!®", industry: "Retail", platform: "Shopify", products: ["subscriptions"] },
  "two-dudes-uncomplicates-mens-grooming-with-appstle-subscriptions": { customer: "Two Dudes", industry: "Retail", platform: "Shopify", products: ["subscriptions"] },
  pandoo: { customer: "Pandoo", industry: "Retail", platform: "Shopify", products: ["subscriptions"] },
  "vedixs-global": { customer: "Vēdix", industry: "Retail", platform: "Shopify Plus", products: ["subscriptions"] },
  "kibbles-sg": { customer: "Kibbles", industry: "Retail", platform: "Shopify", products: ["subscriptions", "memberships"] },
  "the-otaku-box": { customer: "The Otaku Box", industry: "Retail", platform: "Shopify", products: ["subscriptions"] },
};
