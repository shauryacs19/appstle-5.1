import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { StatBar } from "@/data/product-pages/types";
import { cn } from "@/lib/cn";

export function BarList({ title, bars, barClass = "bg-cobalt", className }: { title: string; bars: StatBar[]; barClass?: string; className?: string }) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <figure className={cn("rounded-3xl bg-white p-5 ring-1 ring-navy/8 short:p-4", className)}>
      <figcaption className="font-sans text-[0.95rem] font-semibold text-navy">{title}</figcaption>
      <Stagger as="ul" className="mt-4 grid gap-2.5 short:mt-3 short:gap-2" interval={0.04}>
        {bars.map((b) => (
          <StaggerItem as="li" key={b.label} className="grid grid-cols-[7.5rem_1fr_2.75rem] items-center gap-3 text-[0.85rem]">
            <span className="truncate text-ink-muted">{b.label}</span>
            <span aria-hidden className="h-2.5 overflow-hidden rounded-full bg-cream-200/70">
              <span className={cn("block h-full rounded-full", barClass)} style={{ width: `${(b.value / max) * 100}%` }} />
            </span>
            <span className="text-right font-semibold text-navy tabular-nums">{b.value}%</span>
          </StaggerItem>
        ))}
      </Stagger>
    </figure>
  );
}
