import { Reveal } from "@/components/motion/Reveal";
import type { SummaryPage } from "@/data/comparison-pages/summaries";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";

export function MatrixScore({ matrix, accent, title }: { matrix: SummaryPage["matrix"]; accent: Accent; title: string }) {
  const total = matrix.rows.length;
  const scores = matrix.columns
    .map((name, i) => ({ name, n: matrix.rows.filter((r) => r.values[i]).length, appstle: i === 0 }))
    .sort((a, b) => Number(b.appstle) - Number(a.appstle) || b.n - a.n);
  return (
    <Reveal delay={0.12} className="rounded-4xl bg-white p-5 shadow-card ring-1 ring-navy/6 sm:p-6 short:p-5">
      <p className="font-sans text-[0.95rem] font-semibold text-navy">{title}</p>
      <p className="mt-0.5 text-[0.8rem] text-ink-subtle">Features ticked in the comparison table, out of {total}</p>
      <ul className="mt-4 grid gap-2 short:mt-3 short:gap-1.5">
        {scores.map((s) => (
          <li key={s.name} className="grid grid-cols-[9.5rem_1fr_2.5rem] items-center gap-3 text-[0.82rem]">
            <span className={cn("truncate", s.appstle ? "font-bold text-navy" : "text-ink-muted")}>{s.name}</span>
            <span aria-hidden className="h-2.5 overflow-hidden rounded-full bg-cream-200/70">
              <span className={cn("block h-full rounded-full", s.appstle ? accent.solid : "bg-navy/25")} style={{ width: `${(s.n / total) * 100}%` }} />
            </span>
            <span className="text-right font-semibold text-navy tabular-nums">
              {s.n}/{total}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
