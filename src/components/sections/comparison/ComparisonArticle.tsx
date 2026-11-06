import { TableOfContents } from "@/components/features/content/TableOfContents";
import { Panel } from "@/components/ui/Panel";
import { Prose } from "@/components/ui/Prose";
import { comparisonCopy } from "@/data/comparison-pages/copy";
import { cleanHtml } from "@/data/comparison-pages/fix-html";
import { competitorShort } from "@/data/comparison-pages/meta";
import type { Comparison } from "@/data/content/types";
import { prepareContent } from "@/lib/html";

export function ComparisonArticle({ c }: { c: Comparison }) {
  const { html, toc } = prepareContent(cleanHtml(c.html, c.product));
  if (!html.trim()) return null;
  const h2s = toc.filter((t) => t.level === 2).length;
  return (
    <Panel id="comparison" labelledBy="comparison-title" fit="flow" bare>
      <h2 id="comparison-title" className="sr-only">
        {comparisonCopy.single.fullTitle(competitorShort(c))}
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <TableOfContents items={toc} depth={h2s < 3 ? 3 : 2} className="sticky top-28 max-h-[calc(100svh-8rem)] overflow-y-auto pr-2" />
        </aside>
        <div className="min-w-0 lg:col-span-9">
          {h2s >= 2 && (
            <details className="mb-8 rounded-2xl bg-white p-4 ring-1 ring-navy/8 lg:hidden">
              <summary className="cursor-pointer font-semibold text-navy">On this page</summary>
              <TableOfContents items={toc} depth={2} title="Sections" className="mt-3" />
            </details>
          )}
          <Prose html={html} className="max-w-3xl" />
        </div>
      </div>
    </Panel>
  );
}
