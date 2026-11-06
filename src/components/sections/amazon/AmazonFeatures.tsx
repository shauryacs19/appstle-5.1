import { FeatureTabs } from "@/components/features/company/FeatureTabs";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AmazonFeatures({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <Panel id="features" labelledBy="features-title" className="bg-peach/30 ring-1 ring-navy/6">
      <SectionHeading id="features-title" eyebrow="Features" title={title} titleClassName="lg:text-[2.6rem] short:text-[2.15rem]" className="mb-7 short:mb-5" />
      <FeatureTabs items={items} idPrefix="amazon-features" label="Key features" />
    </Panel>
  );
}
