import { BookOpenText, LayoutGrid, MoveRight, Scale, Sparkles, Tag, type LucideIcon } from "lucide-react";
import { comparisonPages } from "@/data/content/comparisons";
import type { ComparisonProduct } from "@/data/content/types";
import { productById } from "@/data/products";
import { routes } from "@/lib/routes";
import { summaryFor } from "./summaries";

export type ExploreLink = { href: string; title: string; body: string; icon: LucideIcon };

export function exploreLinks(product: ComparisonProduct, skip?: string): ExploreLink[] {
  const app = productById[product];
  const migration = product === "pickup" ? undefined : routes.migration[product];
  const summary = summaryFor(product);
  const list: (ExploreLink | false)[] = [
    { href: app.href, title: app.name, body: app.tagline, icon: Sparkles },
    !!app.pricingHref && { href: app.pricingHref, title: `${app.shortName} pricing`, body: app.pricingNote, icon: Tag },
    !!migration && { href: migration, title: `Migrate to ${app.name}`, body: "The step-by-step migration path, with the team’s help.", icon: MoveRight },
    !!summary && { href: summary.path, title: summary.page.title, body: `Appstle side by side with ${summary.page.matrix.columns.length - 1} other apps.`, icon: Scale },
    { href: routes.caseStudies, title: "Case studies", body: "How Shopify brands grow with Appstle.", icon: BookOpenText },
    { href: routes.comparisons, title: "Comparison Library", body: `All ${comparisonPages.length} Appstle comparisons.`, icon: LayoutGrid },
  ];
  return list.filter((l): l is ExploreLink => !!l && l.href !== skip).slice(0, 6);
}
