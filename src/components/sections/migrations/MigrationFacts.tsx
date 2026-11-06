import { Reveal } from "@/components/motion/Reveal";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { migrationCopy } from "@/data/migrations/copy";
import { fastestShare } from "@/data/migrations/stats";
import type { MigrationPage } from "@/data/migrations/types";
import { productById } from "@/data/products";
import { cn } from "@/lib/cn";

export function MigrationFacts({ m }: { m: MigrationPage }) {
  const app = productById[m.product];
  const fast = m.stats ? fastestShare(m.product) : undefined;
  const fact = fast && migrationCopy.fastest(fast.value, fast.label);
  return (
    <Reveal delay={0.12} className={cn("rounded-4xl p-5 ring-1 ring-navy/8 sm:p-7 short:p-5", app.accent.soft)}>
      <div className="flex items-center gap-3">
        <ProductIcon id={app.id} size="lg" />
        <div>
          <p className="font-display text-[1.25rem] leading-tight font-extrabold tracking-tight text-navy">{app.name}</p>
          {m.free && <p className="text-[0.85rem] font-semibold text-ink-muted">{migrationCopy.freeLine}</p>}
        </div>
      </div>
      {fact && (
        <p className="mt-5 flex items-baseline gap-2 rounded-3xl bg-white px-5 py-4 shadow-soft short:mt-4 short:py-3">
          <span className="font-display text-[2.6rem] leading-none font-extrabold tracking-tight text-navy short:text-[2.2rem]">{fact.value}</span>
          <span className="text-[0.92rem] leading-snug text-ink-muted">{fact.label}</span>
        </p>
      )}
      <p className="mt-5 eyebrow text-ink-subtle short:mt-4">{m.path.title}</p>
      <ol className="mt-2 grid gap-1.5">
        {m.path.steps.map((s, i) => (
          <li key={s.title} className="flex items-center gap-2.5 text-[0.9rem] text-navy short:text-[0.86rem]">
            <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-[0.75rem] font-bold text-navy ring-1 ring-navy/10">
              {i + 1}
            </span>
            {s.title}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
