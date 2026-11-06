import { links } from "@/data/site";
import { products } from "@/data/products";

export const notFoundCopy = {
  eyebrow: "Error 404",
  title: "We couldn’t find that page",
  body: "The page may have moved or no longer exists. These links will get you back on track.",
  groups: [
    { title: "Apps", links: products.map((p) => ({ label: p.name, href: p.href })) },
    {
      title: "Learn",
      links: [
        { label: "Blog", href: links.blog },
        { label: "Case studies", href: links.caseStudies },
        { label: "Comparisons", href: links.comparisons },
        { label: "FAQ", href: links.faq },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: links.about },
        { label: "Contact us", href: links.contact },
        { label: "Help Center", href: links.helpCenter },
      ],
    },
  ],
};
