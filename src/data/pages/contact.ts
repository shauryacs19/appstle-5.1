import type { StaticImageData } from "next/image";
import { BookOpen, BriefcaseBusiness, Code2, Handshake, HelpCircle, LifeBuoy, type LucideIcon } from "lucide-react";
import contactIllustration from "@/assets/misc/contact-illustration.webp";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";

export type ContactRoute = { label: string; value: string; href: string; icon: LucideIcon; note?: string };

export const supportEmail = "support@appstle.com";

export const contactPage = {
  hero: {
    eyebrow: "Contact us",
    title: "Excellent round the clock support. Yes, we mean it! We are available 24x7x365",
    cta: "Get in touch",
    image: { src: contactIllustration as StaticImageData, alt: "" },
  },
  form: {
    title: "Get in touch with Appstle Team NOW!",
    submit: "Send",
    to: supportEmail,
    note: `Send opens your email app with your message addressed to ${supportEmail}.`,
  },
  routes: [
    { label: "Support", value: supportEmail, href: `mailto:${supportEmail}`, icon: LifeBuoy, note: "24x7x365" },
    { label: "Help Center", value: "help.appstle.com", href: links.helpCenter, icon: BookOpen },
    { label: "Careers", value: "careers@appstle.com", href: "mailto:careers@appstle.com", icon: BriefcaseBusiness },
    { label: "Partner program", value: "Become a Partner", href: links.partnerProgram, icon: Handshake },
  ] satisfies ContactRoute[],
  resources: [
    { label: "FAQ", href: routes.faq, icon: HelpCircle, body: "Answers to common questions about Appstle’s Shopify apps." },
    { label: "Developer docs", href: links.developers, icon: Code2, body: "APIs and webhooks for custom experiences." },
  ],
};
