import type { ProductId } from "@/data/products";

export const downloadsCopy = {
  eyebrow: "Free eBooks",
  h1: "Downloads",
  intro: "Our collection of resources, ebooks for eCommerce store owners.",
  download: "Download Now",
  details: "What’s inside",
  landingCta: "Download the free ebook",
  insideTitle: "What’s inside the eBook",
} as const;

type EbookMeta = {
  product: ProductId;
  pdf: string;
  lessons: string[];
};

export const ebookMeta: Record<string, EbookMeta> = {
  "getting-started-with-ecommerce-memberships": {
    product: "memberships",
    pdf: "https://appstle.com/wp-content/uploads/2022/07/Memberships-E-Book.pdf",
    lessons: [
      "Understanding the value add(s) that would make a store ‘Membership’ worth it, for ‘your’ customers",
      "Understanding how to price ecommerce store memberships, for ‘your’ members to find value in it",
      "How To Keep Your Shopify Memberships Updated, Relevant, And Engaging For Customers",
      "How to Measure The Success of Your Ecommerce Member Programs?",
    ],
  },
  "getting-started-with-ecommerce-subscriptions": {
    product: "subscriptions",
    pdf: "https://appstle.com/wp-content/uploads/2022/06/Subscription-E-Book-1.pdf",
    lessons: [
      "Identifying the target audience and demand for your Shopify store's subscription model",
      "How to choose the right products for the subscription model in your Shopify store?",
      "The different types of subscription models for eCommerce businesses",
      "How To Set Up A Winning Subscription Model For Your eCommerce Store",
      "How to keep customers engaged after they subscribe for recurring orders",
    ],
  },
};
