import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { appstleAppOf, competitorShort } from "@/data/comparison-pages/meta";
import { competitorOf } from "@/data/content/comparisons";
import type { Comparison } from "@/data/content/types";
import { cn } from "@/lib/cn";

export function VsCard({ c }: { c: Comparison }) {
  const app = appstleAppOf(c);
  const rows = c.snapshot?.rows ?? [];
  const score = (k: "appstle" | "competitor") => rows.filter((r) => r[k] === true).length;
  const short = competitorShort(c);

  return (
    <Reveal delay={0.12} className="relative">
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-3">
        <div className={cn("flex flex-col rounded-4xl p-5 ring-1 ring-navy/8 sm:p-6 short:p-5", app.accent.soft)}>
          <ProductIcon id={app.id} size="lg" />
          <p className="mt-4 font-display text-[1.25rem] leading-tight font-extrabold tracking-tight text-navy sm:text-[1.45rem]">{app.name}</p>
          <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-ink-muted">
            <Star aria-hidden className="size-3.5 fill-current text-coral" />
            <span>
              <strong className="font-semibold text-navy">{app.rating.value.toFixed(1)}</strong> · {app.rating.count.toLocaleString("en-US")} reviews
            </span>
          </p>
          <p className="mt-0.5 text-[0.72rem] text-ink-subtle">Shopify App Store, {app.rating.asOf}</p>
          {rows.length > 0 && (
            <p className="mt-auto pt-5 text-[0.85rem] text-navy">
              <strong className="font-display text-[1.6rem] font-extrabold">{score("appstle")}</strong>
              <span className="text-ink-muted">/{rows.length} listed features</span>
            </p>
          )}
        </div>
        <div aria-hidden className="grid place-items-center">
          <span className="grid size-11 place-items-center rounded-full bg-navy font-display text-sm font-extrabold text-white shadow-float sm:size-12">VS</span>
        </div>
        <div className="flex flex-col rounded-4xl bg-white p-5 ring-1 ring-navy/8 sm:p-6 short:p-5">
          <span aria-hidden className="grid size-12 place-items-center rounded-2xl bg-cream-200 font-display text-xl font-extrabold text-navy-700">
            {short.charAt(0)}
          </span>
          <p className="mt-4 font-display text-[1.25rem] leading-tight font-extrabold tracking-tight text-navy sm:text-[1.45rem]">{competitorOf(c)}</p>
          {rows.length > 0 && (
            <p className="mt-auto pt-5 text-[0.85rem] text-navy">
              <strong className="font-display text-[1.6rem] font-extrabold">{score("competitor")}</strong>
              <span className="text-ink-muted">/{rows.length} listed features</span>
            </p>
          )}
        </div>
      </div>
      {rows.length > 0 && <p className="mt-3 text-center text-[0.78rem] text-ink-subtle">Counts from the feature table on this page.</p>}
    </Reveal>
  );
}
