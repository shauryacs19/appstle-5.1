import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { migrationCopy } from "@/data/migrations/copy";
import type { MigrationPage } from "@/data/migrations/types";
import { productById } from "@/data/products";
import { cn } from "@/lib/cn";

function Chips({ title, names, tone }: { title: string; names: string[]; tone: string }) {
  return (
    <div>
      <h3 className="font-sans text-[1rem] font-semibold tracking-normal text-navy">{title}</h3>
      <Stagger as="ul" className="mt-3 flex flex-wrap gap-2" interval={0.02}>
        {names.map((n) => (
          <StaggerItem as="li" key={n} className={cn("rounded-full px-3 py-1.5 text-[0.85rem] font-semibold text-navy ring-1 ring-navy/8 short:py-1 short:text-[0.8rem]", tone)}>
            {n}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function MigrateAnywhere({ m }: { m: MigrationPage }) {
  const app = productById[m.product];
  return (
    <Panel id="migrate-from-anywhere" labelledBy="migrate-from-anywhere-title" className="bg-white ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <SectionHeading
          id="migrate-from-anywhere-title"
          eyebrow={app.name}
          title={m.anywhere.title}
          description={m.anywhere.body}
          dot={app.accent.solid}
          className="lg:col-span-5"
          titleClassName="lg:text-[2.6rem] short:text-[2.2rem]"
        />
        <div className="grid gap-7 lg:col-span-7 short:gap-5">
          <Chips title={migrationCopy.platformsTitle} names={m.platforms} tone="bg-cream-100" />
          <Chips title={m.apps.title} names={m.apps.names} tone={app.accent.soft} />
        </div>
      </div>
    </Panel>
  );
}
