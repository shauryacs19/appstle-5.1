import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { migrationHub } from "@/data/migrations/hub";

export function TopMigrated() {
  return (
    <Panel id="migrated-from" labelledBy="migrated-from-title" className="bg-cobalt-50">
      <SectionHeading id="migrated-from-title" eyebrow={migrationHub.topEyebrow} title={migrationHub.topTitle} className="max-w-3xl" titleClassName="lg:text-[2.5rem] short:text-[2.1rem]" />
      <Stagger as="ul" className="mt-8 flex flex-wrap gap-2 short:mt-5" interval={0.015}>
        {migrationHub.top.map((n) => (
          <StaggerItem as="li" key={n} className="rounded-full bg-white px-3.5 py-2 text-[0.9rem] font-semibold text-navy shadow-hairline short:py-1.5 short:text-[0.85rem]">
            {n}
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
