import { BarList } from "@/components/features/BarList";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { migrationCopy } from "@/data/migrations/copy";
import { migrationStats } from "@/data/migrations/stats";
import type { MigrationPage } from "@/data/migrations/types";
import { productById } from "@/data/products";

export function MigrationStats({ m }: { m: MigrationPage }) {
  const app = productById[m.product];
  const { sources, timeline } = migrationStats(m.product);
  const charts = [sources, timeline].filter((c): c is NonNullable<typeof c> => !!c);
  if (!m.stats || charts.length === 0) return null;
  const bar = m.product === "subscriptions" ? "bg-cobalt" : app.accent.solid;
  return (
    <Panel id="migration-statistics" labelledBy="migration-statistics-title" className="on-dark bg-navy text-white">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-40 -z-10 size-[30rem] rounded-full bg-cobalt/40 blur-3xl" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <SectionHeading
          id="migration-statistics-title"
          eyebrow={migrationCopy.statsEyebrow}
          title={migrationCopy.statsTitle}
          tone="light"
          dot="bg-coral"
          className="lg:col-span-4"
          titleClassName="lg:text-[2.6rem] short:text-[2.2rem]"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
          {charts.map((c) => (
            <BarList key={c.title} title={c.title} bars={c.bars} barClass={bar} className="text-navy" />
          ))}
        </div>
      </div>
    </Panel>
  );
}
