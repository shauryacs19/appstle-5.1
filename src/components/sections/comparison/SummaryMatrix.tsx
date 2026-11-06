import { FeatureMatrix } from "@/components/features/comparison/FeatureMatrix";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonCopy } from "@/data/comparison-pages/copy";
import type { SummaryPage, SummarySection } from "@/data/comparison-pages/summaries";
import type { Product } from "@/data/products";
import { stripTags } from "@/lib/html";

export function SummaryMatrix({ section, matrix, app }: { section?: SummarySection; matrix: SummaryPage["matrix"]; app: Product }) {
  const title = section?.title ?? `${app.name} compared`;
  return (
    <Panel id="feature-matrix" labelledBy="feature-matrix-title" className={app.accent.soft}>
      <SectionHeading
        id="feature-matrix-title"
        eyebrow={comparisonCopy.summary.matrixEyebrow}
        title={title}
        description={section?.html ? stripTags(section.html) : undefined}
        dot={app.accent.solid}
        className="max-w-4xl"
        titleClassName="lg:text-[2.3rem] short:text-[1.85rem]"
        descriptionClassName="short:mt-2 short:text-[0.95rem]"
      />
      <Reveal delay={0.12} className="mt-6 short:mt-3">
        <FeatureMatrix columns={matrix.columns} rows={matrix.rows} caption={title} accent={app.accent} idPrefix="summary" />
      </Reveal>
    </Panel>
  );
}
