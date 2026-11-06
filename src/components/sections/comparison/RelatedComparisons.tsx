import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { comparisonCard } from "@/data/comparison-pages/cards";
import { comparisonCopy } from "@/data/comparison-pages/copy";
import { exploreLinks } from "@/data/comparison-pages/explore";
import { groupFor } from "@/data/comparison-pages/products";
import type { Comparison, ComparisonProduct } from "@/data/content/types";
import { productById } from "@/data/products";
import { routes } from "@/lib/routes";
import { ComparisonCard } from "./ComparisonCard";
import { ExploreLinks } from "./ExploreLinks";

export function RelatedComparisons({ product, items, skip }: { product: ComparisonProduct; items: Comparison[]; skip?: string }) {
  const app = productById[product];
  const group = groupFor(product);
  return (
    <Panel id="keep-exploring" labelledBy="keep-exploring-title" className={app.accent.soft}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading id="keep-exploring-title" eyebrow="Keep exploring" title={comparisonCopy.single.moreTitle(app)} dot={app.accent.solid} titleClassName="lg:text-[2.4rem] short:text-[2rem]" />
        <Reveal>
          <SmartLink href={`${routes.comparisons}#${group.anchor}`} className="text-sm font-semibold text-cobalt-700 hover:underline">
            {comparisonCopy.single.allIn(group.label)}
          </SmartLink>
        </Reveal>
      </div>
      {items.length > 0 && (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 short:mt-4">
          {items.slice(0, 6).map((c, i) => (
            <li key={c.path} className={i >= 4 ? "max-sm:hidden" : undefined}>
              <ComparisonCard card={{ ...comparisonCard(c), soft: "bg-white" }} />
            </li>
          ))}
        </ul>
      )}
      <ExploreLinks items={exploreLinks(product, skip)} className="mt-6 short:mt-4" />
    </Panel>
  );
}
