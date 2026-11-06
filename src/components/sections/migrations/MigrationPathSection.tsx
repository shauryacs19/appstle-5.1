import { Check } from "lucide-react";
import { PanelTabs } from "@/components/features/comparison/PanelTabs";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { migrationCopy } from "@/data/migrations/copy";
import type { MigrationPage } from "@/data/migrations/types";
import { productById } from "@/data/products";
import { links } from "@/data/site";
import { cn } from "@/lib/cn";

export function MigrationPathSection({ m }: { m: MigrationPage }) {
  const app = productById[m.product];
  return (
    <Panel id="migration-path" labelledBy="migration-path-title" className="bg-white ring-1 ring-navy/6">
      <SectionHeading id="migration-path-title" eyebrow={migrationCopy.pathEyebrow} title={m.path.title} dot={app.accent.solid} className="max-w-3xl" titleClassName="lg:text-[2.5rem] short:text-[2.1rem]" />
      <Reveal delay={0.1} className="mt-7 short:mt-5">
        <PanelTabs tabs={m.path.steps.map((s, i) => ({ id: `step-${i + 1}`, label: s.title }))} idPrefix="migration-step" label={m.path.title} accent={app.accent} numbered>
          {m.path.steps.map((s, i) => (
            <div key={s.title} className={cn("rounded-3xl p-5 ring-1 ring-navy/8 sm:p-7 short:p-5", app.accent.soft)}>
              <p className="eyebrow text-ink-subtle">{migrationCopy.stepOf(i + 1, m.path.steps.length)}</p>
              <h3 className="mt-1.5 text-[1.4rem] font-bold text-navy short:text-[1.25rem]">{s.title}</h3>
              <ul className="mt-4 grid gap-3 short:mt-3 short:gap-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-navy short:text-[0.88rem] short:leading-snug">
                    <Check aria-hidden className={cn("mt-1 size-4 shrink-0", app.accent.text)} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink href={links.contact} variant="dark" size="sm" className="mt-6 short:mt-4">
                Contact <strong>Us</strong>
              </ButtonLink>
            </div>
          ))}
        </PanelTabs>
      </Reveal>
    </Panel>
  );
}
