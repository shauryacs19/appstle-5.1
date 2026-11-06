import { BriefcaseBusiness, Building2, Handshake, HeartHandshake, Mail, Newspaper, Store, Trophy, type LucideIcon } from "lucide-react";
import { links } from "@/data/site";

export type CompanyPageId = "about" | "merchants" | "appPartners" | "causes" | "careers" | "contact" | "caseStudies" | "news";

type CompanyLink = { id: CompanyPageId; label: string; href: string; description: string; icon: LucideIcon };

export const companyLinks: CompanyLink[] = [
  { id: "about", label: "About us", href: links.about, description: "Founded in 2021, headquartered in Menlo Park, California.", icon: Building2 },
  { id: "merchants", label: "Merchants", href: links.merchants, description: "40,000+ Shopify & Shopify Plus merchants.", icon: Store },
  { id: "caseStudies", label: "Case studies", href: links.caseStudies, description: "Merchant success stories.", icon: Trophy },
  { id: "appPartners", label: "App partners", href: links.appPartners, description: "Integrations across the Shopify ecosystem.", icon: Handshake },
  { id: "causes", label: "Causes we support", href: links.causes, description: "Girls Who Code, Khan Academy and UNICEF Guardian Circle.", icon: HeartHandshake },
  { id: "careers", label: "Careers", href: links.careers, description: "Join the Appstle team through exciting career opportunities.", icon: BriefcaseBusiness },
  { id: "news", label: "News & press", href: links.news, description: "Stay informed about the latest news and updates from Appstle.", icon: Newspaper },
  { id: "contact", label: "Contact us", href: links.contact, description: "Excellent round the clock support, 24x7x365.", icon: Mail },
];

export const companyCta = {
  title: "Get In Touch!",
  body: "If you are looking to understand more about Appstle Inc’s products and solutions, you can get in touch with us. Our 24x7x365 available experts will be happy to assist you further.",
};

export const companyBlurb =
  "Appstle℠ empowers Shopify merchants to grow and increase their sales through smart, unique, innovative apps. Appstle℠ is based in Menlo Park, California, with offices in Canada and India.";
