import { SnapshotTable } from "@/components/features/comparison/SnapshotTable";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { Prose } from "@/components/ui/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonCopy } from "@/data/comparison-pages/copy";
import { cleanHtml } from "@/data/comparison-pages/fix-html";
import { appstleAppOf, snapshotColumns, snapshotTitle } from "@/data/comparison-pages/meta";
import type { Comparison } from "@/data/content/types";
import { prepareContent, stripTags } from "@/lib/html";
import { cn } from "@/lib/cn";

function splitHeading(html: string) {
  const m = html.match(/^\s*<h([23])[^>]*>([\s\S]*?)<\/h\1>/i);
  return m ? { title: stripTags(m[2]), rest: html.slice(m[0].length) } : { title: "", rest: html };
}

export function ComparisonSnapshot({ c }: { c: Comparison }) {
  const app = appstleAppOf(c);
  const { title, rest } = splitHeading(cleanHtml(c.intro, c.product));
  const intro = prepareContent(rest, { toc: false }).html;
  const snap = c.snapshot;
  if (!snap && !rest.trim()) return null;
  const heading = title || snapshotTitle(c) || `Why ${app.name} is better`;

  return (
    <Panel id="at-a-glance" labelledBy="at-a-glance-title" className="bg-white ring-1 ring-navy/6">
      <div className={cn("grid grid-cols-1 gap-8 lg:gap-12", snap && "lg:grid-cols-12 lg:items-start")}>
        <div className={cn(snap ? "lg:col-span-5" : "max-w-3xl")}>
          <SectionHeading id="at-a-glance-title" eyebrow={comparisonCopy.single.snapshotEyebrow} title={heading} dot={app.accent.solid} titleClassName="lg:text-[2.3rem] short:text-[2rem]" />
          {rest.trim() && (
            <Reveal delay={0.1}>
              <Prose html={intro} size="compact" className="mt-4 text-[1rem] short:mt-3 short:text-[0.94rem]" />
            </Reveal>
          )}
        </div>
        {snap && (
          <Reveal delay={0.15} className="lg:col-span-7">
            {snapshotTitle(c) && snapshotTitle(c) !== heading && <h3 className="font-sans text-[1.05rem] font-semibold tracking-normal text-navy">{snapshotTitle(c)}</h3>}
            {snap.intro && <Prose html={prepareContent(cleanHtml(snap.intro, c.product), { toc: false }).html} size="compact" className="mt-1.5 text-[0.92rem]" />}
            <div className="mt-4 short:mt-3">
              <SnapshotTable rows={snap.rows} columns={snapshotColumns(c)} caption={snapshotTitle(c) || heading} accent={app.accent} idPrefix="snapshot" />
            </div>
          </Reveal>
        )}
      </div>
    </Panel>
  );
}
