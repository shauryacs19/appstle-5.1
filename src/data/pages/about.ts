import type { StaticImageData } from "next/image";
import growthGraph from "@/assets/misc/growth-graph.webp";
import { companyMedia } from "@/data/media/company";
import type { MediaItem } from "@/data/media";

export type Founder = {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  photo: MediaItem;
  bio: string[];
};

export const aboutPage = {
  hero: {
    eyebrow: "Our story",
    title: "About Appstle",
    intro:
      "Appstle℠ was founded in 2021, by an Apple-Siri Engineer, and an ex-BCG consultant. It is headquartered in Silicon Valley (Menlo Park, California), with offices in British Columbia (Canada) and South Asia.",
  },
  facts: [
    { value: "2021", label: "Founded" },
    { value: "Menlo Park", label: "Headquarters, California" },
    { value: "70,000+", label: "Merchant partners" },
    { value: "24x7x365", label: "Product & customer support" },
  ],
  founders: {
    title: "Meet Our Founders",
    people: [
      {
        name: "Rakshithaa (Ria) Mahesh",
        role: "Co-founder and CEO",
        email: "ria@appstle.com",
        linkedin: "https://www.linkedin.com/in/rakshithaa-ria-mahesh/",
        photo: companyMedia.founderRia,
        bio: [
          "Ria is a hard-core business strategist. What drew Ria to e-commerce, and specifically to solving the pain points of merchants in this industry, is the human element. She found customer behavior extremely fascinating, and from there, got drawn to working on some of the most significant E-commerce solutions that sellers need.",
          "Ria splits her time between Menlo Park, California (where Appstle℠ HQ is located), and Vancouver, British Columbia (where Appstle’s product incubation office is located).",
        ],
      },
      {
        name: "Hemant Purswani",
        role: "Co-founder and Chief Product Officer",
        email: "hemant@appstle.com",
        linkedin: "https://www.linkedin.com/in/hemant-purswani-6aa29557/",
        photo: companyMedia.founderHemant,
        bio: [
          "Hemant is a coder by heart, soul, and mind! What drew Hemant to e-commerce was its relative nascency, which makes it an ocean full of problems to crack and solve. He is driven by the need to provide the most robust and long-term viable solutions to merchants, so they can focus on what matters the most – growing their business.",
          "Hemant spends most of his time in the product incubation office in Vancouver, British Columbia, with frequent visits to Menlo Park, California, where Appstle is headquartered.",
        ],
      },
    ] satisfies Founder[],
  },
  mission: {
    title: "Mission Statement and Message From CEO",
    motto: "compelling apps at compelling prices",
    quote: [
      "Appstle’s main motto is to offer our merchants ‘compelling apps at compelling prices’. Having a strong e-commerce presence is no longer an optional feather in one’s cap, but a key necessity to run a successful business. This applies to businesses of all sizes, across all geographies. But still, to this day, most solutions and functionalities that make multi-billion dollar e-commerce giants stand out, are not available to other merchants. They are either too expensive, or come with significant flaws and compromises.",
      "Appstle builds robust solutions that solve strategic pain points of our merchant partners, and enable them to have a successful e-commerce journey. We do this at compelling and tiered price points, to meet the needs of all our merchants, from small businesses to large enterprises. Our lean and vigorously focused business model allows us to do this!",
    ],
    signature: "Ria Mahesh",
    signatureRole: "Co-founder and CEO",
  },
  growth: {
    title: "Customer (e-commerce merchant) Growth Rate",
    stat: "40,000+",
    asOf: "As on December 2024",
    range: "Mar 2021 - Dec 2024",
    lead: "40,000+",
    leadNote: "(and growing by the hour)",
    body: "merchant partners who trust us to help them win the e-commerce game.",
    thanks:
      "** The founders would like to specially thank our highly talented and entrepreneurial product development team, and our extremely dedicated and passionate product and customer support team, for making this success possible.",
    graph: { src: growthGraph as StaticImageData, alt: "Graph of Appstle’s merchant growth from March 2021 to December 2024, reaching 40,000+ merchants" },
  },
  brandDeck: {
    title: "Brand Deck",
    decks: [
      "https://docs.google.com/presentation/d/e/2PACX-1vTa7HRN6b0NJ8O2eCoCwXhFG-J07mJfTUVwhEbIzEWRQYw8Qt38bekMd_0SmNQJpEm5NayMQr3tWoMH/embed?start=true&loop=true&delayms=3000",
      "https://docs.google.com/presentation/d/e/2PACX-1vQ3ofCO9a6EB8bxCIA-db3hhk6H39xgzJjCot3ZKtqqDFpYPYmMpPzACr_PUNVwhA/embed?start=true&loop=true&delayms=3000",
    ],
  },
};
