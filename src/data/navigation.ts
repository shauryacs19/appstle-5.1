import { comparisons, links, migrations } from "./links";
import { products, type ProductId } from "./products";

type NavLink = { label: string; href: string; description?: string; icon?: ProductId };
export type NavGroup = { id: string; label: string; columns: { title: string; links: NavLink[] }[] };

const idFor = (label: string) => products.find((p) => p.shortName.startsWith(label.split(" ")[0]))?.id;

export const navGroups: NavGroup[] = [
  {
    id: "products",
    label: "Products",
    columns: [
      { title: "The app suite", links: products.map((p) => ({ label: p.shortName, href: p.href, description: p.tagline, icon: p.id })) },
      {
        title: "Get started",
        links: [
          { label: "All apps on Shopify", href: links.shopifyPartner, description: "Install from the Shopify App Store." },
          { label: "Case studies", href: links.caseStudies, description: "Merchant success stories." },
          { label: "Merchants", href: links.merchants, description: "70,000+ Shopify & Shopify Plus merchants." },
        ],
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    columns: [
      {
        title: "Plans by app",
        links: products.map((p) => ({ label: p.shortName, href: p.pricingHref ?? p.installHref, description: p.pricingNote, icon: p.id })),
      },
      {
        title: "Good to know",
        links: [
          { label: "Billed through Shopify", href: links.shopifyPartner, description: "Every Appstle app is billed on your Shopify invoice." },
          { label: "Questions about plans?", href: links.contact, description: "Talk to the Appstle team." },
        ],
      },
    ],
  },
  {
    id: "migrating",
    label: "Migrating",
    columns: [
      {
        title: "Switch to Appstle",
        links: migrations.map((m) => ({ label: m.label, href: m.href, description: `Migrate your ${m.label.toLowerCase()} to Appstle.`, icon: idFor(m.label) })),
      },
      {
        title: "Switching help",
        links: [
          { label: "All migrations", href: links.migrations, description: "How moving to Appstle works." },
          { label: "Talk to our team", href: links.contact, description: "Plan your move with merchant success." },
        ],
      },
    ],
  },
  {
    id: "comparison",
    label: "Comparison",
    columns: [
      {
        title: "Compare Appstle",
        links: comparisons.map((c) => ({ label: c.label, href: c.href, description: `How Appstle ${c.label} stacks up.`, icon: idFor(c.label) })),
      },
      {
        title: "See for yourself",
        links: [
          { label: "All comparisons", href: links.comparisons },
          { label: "Best subscriptions app", href: links.bestSubscriptions, description: "Appstle vs the top Shopify subscription apps." },
          { label: "Best memberships app", href: links.bestMemberships, description: "Appstle vs the top Shopify membership apps." },
          { label: "Book a demo", href: links.contact },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    columns: [
      {
        title: "Learn",
        links: [
          { label: "Help Center", href: links.helpCenter, description: "Guides and tutorials for every Appstle app." },
          { label: "Developer docs", href: links.developers, description: "APIs and webhooks for custom experiences." },
          { label: "Blog", href: links.blog },
          { label: "Downloads", href: links.downloads },
          { label: "FAQ", href: links.faq },
        ],
      },
      {
        title: "Stay up to date",
        links: [
          { label: "News & press", href: links.news },
          { label: "Case studies", href: links.caseStudies },
          { label: "Contact us", href: links.contact },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    columns: [
      {
        title: "Appstle",
        links: [
          { label: "About us", href: links.about, description: "Founded in 2021, headquartered in Menlo Park, California." },
          { label: "Merchants", href: links.merchants, description: "70,000+ Shopify & Shopify Plus merchants." },
          { label: "Case studies", href: links.caseStudies, description: "Merchant success stories." },
          { label: "App partners", href: links.appPartners, description: "Integrations across the Shopify ecosystem." },
        ],
      },
      {
        title: "More",
        links: [
          { label: "Causes we support", href: links.causes },
          { label: "Careers", href: links.careers },
          { label: "News & press", href: links.news },
          { label: "Become a partner", href: links.partnerProgram },
        ],
      },
    ],
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  { title: "Products", links: products.map((p) => ({ label: p.name.replace("Appstle ", ""), href: p.href })) },
  { title: "Pricing", links: products.filter((p) => p.pricingHref).map((p) => ({ label: p.shortName, href: p.pricingHref! })) },
  {
    title: "Company",
    links: [
      { label: "About us", href: links.about },
      { label: "Merchants", href: links.merchants },
      { label: "Case studies", href: links.caseStudies },
      { label: "App partners", href: links.appPartners },
      { label: "Causes we support", href: links.causes },
      { label: "Careers", href: links.careers },
      { label: "News", href: links.news },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: links.helpCenter },
      { label: "Developer docs", href: links.developers },
      { label: "Blog", href: links.blog },
      { label: "Downloads", href: links.downloads },
      { label: "FAQ", href: links.faq },
      { label: "Migrations", href: links.migrations },
      { label: "Comparisons", href: links.comparisons },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Contact us", href: links.contact },
      { label: "support@appstle.com", href: links.supportEmail },
      { label: "Become a partner", href: links.partnerProgram },
      { label: "Apps on Shopify", href: links.shopifyPartner },
    ],
  },
];
