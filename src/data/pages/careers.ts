import type { StaticImageData } from "next/image";
import { HandHeart, Sprout, Users, Wallet, type LucideIcon } from "lucide-react";
import careersHero from "@/assets/misc/careers-hero.webp";
import type { ProductId } from "@/data/products";

export type CareerBenefit = { title: string; body: string; icon: LucideIcon };
export type Opening = { title: string; location: string; count: string };

const careersEmail = "careers@appstle.com";

export const careersPage = {
  hero: {
    eyebrow: "Careers",
    title: "Careers at Appstle",
    intro: [
      "Founded by an Apple-Siri Engineer, and a former BCG Consultant, Appstle is a B2B SaaS company in the e-commerce space.",
      "Appstle uses revolutionary technology to build unique, tailored, and affordable applications or software solutions, that enable e-commerce stores to provide the best end-to-end experience to their customers or shoppers. Appstle is a Silicon Valley based and funded company.",
    ],
    image: { src: careersHero as StaticImageData, alt: "Two people shaking hands across a desk beside a laptop and a résumé" },
  },
  values: {
    title: "Company Values",
    body: [
      "Appstle is a highly merit-based, equal opportunity employer that fosters and encourages passion for technology, innovation, and problem solving. We are a highly diverse team that cuts across age, location, race, and religion.",
      "Having founded and led by a female CEO, Appstle is committed to gender diversity. We are proud to share that as on May 1, 2022, the Appstle team achieved a natural 50% male-female ratio.",
    ],
    stat: { value: "50%", label: "male-female ratio, achieved naturally (as on May 1, 2022)" },
  },
  focus: {
    title: "Focus areas",
    body: "Appstle is focused on the customer retention, loyalty, and wallet share spaces. Appstle Subscriptions and Appstle Memberships are its 2 core products available on Shopify and Shopify Plus.",
    products: ["subscriptions", "memberships", "loyalty"] as ProductId[],
  },
  benefits: {
    title: "Benefits of working with Appstle",
    items: [
      {
        title: "Growth",
        body: "Appstle is a new-age and hi-tech SaaS company that is in hyper-growth mode. Appstle products and solutions have been consistently No. 1 in their categories, and revered for their performance and robustness. Being a part of Appstle will give you tremendous opportunity to grow your skillset and grow with the company",
        icon: Sprout,
      },
      {
        title: "Nurturing work environment",
        body: "Appstle is a team-oriented workplace, where the success of each member is highly valued and collectively worked towards. Being a part of Appstle will mean being a part of a high energy, passionate, hard-working, and highly respectful team",
        icon: Users,
      },
      { title: "Compensation", body: "Competitive. Above industry standards", icon: Wallet },
      { title: "Benefits", body: "2 weeks Paid Time Off; Paid maternity/paternity leave", icon: HandHeart },
    ] satisfies CareerBenefit[],
  },
  openings: {
    title: "Open positions",
    items: [
      { title: "Product Manager", location: "Location – US", count: "1 position" },
      { title: "Data Migration Specialist", location: "Location – US", count: "1 position" },
      { title: "Technical Sales Engineer - Shopify ecosystem", location: "Location – US", count: "1 position" },
    ] satisfies Opening[],
  },
  apply: {
    title: "How To Apply",
    label: "Apply now",
    email: careersEmail,
    href: `mailto:${careersEmail}`,
  },
};

export const applyHref = (role: string) => `mailto:${careersEmail}?subject=${encodeURIComponent(`Application: ${role}`)}`;
