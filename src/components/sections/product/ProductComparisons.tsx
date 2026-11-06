import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { compareCopy, libraryAnchor, summaryFor } from "@/data/compare-links";
import { comparisonsFor, competitorOf } from "@/data/content/comparisons";
import type { Product } from "@/data/products";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

const rival = (name: string) => name.replace(/^Appstle\b.*?\bvs\.?\s+/i, "");

export function ProductComparisons({ product }: { product: Product }) {
  const pages = comparisonsFor(product.id)
    .map((c) => ({ path: c.path, name: rival(competitorOf(c)), lead: c.lead }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const dupes = new Set(pages.filter((p, i) => pages.findIndex((q) => q.name === p.name) !== i).map((p) => p.name));
  const summary = summaryFor[product.id];
  const anchor = libraryAnchor[product.id];

  return (
    <Panel id="compare" labelledBy="compare-title" className="bg-white ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="compare-title" eyebrow={compareCopy.eyebrow} title={compareCopy.title(product.name)} description={compareCopy.description} dot={product.accent.solid} titleClassName="lg:text-[2.4rem] short:text-[2.1rem]" />
          <Reveal delay={0.12} className="mt-6 grid gap-3">
            {summary && (
              <SmartLink href={summary.path} className={cn("group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-[0.92rem] font-semibold text-navy ring-1 ring-navy/8 transition hover:shadow-card", product.accent.soft)}>
                {summary.label}
                <ArrowUpRight aria-hidden className={cn("size-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5", product.accent.text)} />
              </SmartLink>
            )}
            <SmartLink href={anchor ? `${routes.comparisons}#${anchor}` : routes.comparisons} className="text-sm font-semibold text-cobalt-700 hover:underline">
              {compareCopy.all} →
            </SmartLink>
          </Reveal>
        </div>
        <Stagger as="ul" className="grid grid-cols-1 content-start gap-2 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
          {pages.map((p) => (
            <StaggerItem as="li" key={p.path}>
              <SmartLink href={p.path} className="group flex h-full items-center justify-between gap-3 rounded-xl bg-cream-50 px-4 py-3 ring-1 ring-navy/6 transition hover:bg-white hover:shadow-soft">
                <span className="text-[0.9rem] leading-snug text-navy">
                  <span className="text-ink-subtle">vs </span>
                  <span className="font-semibold">{p.name}</span>
                  {dupes.has(p.name) && <span className="block text-[0.78rem] text-ink-subtle">{p.lead}</span>}
                </span>
                <ArrowUpRight aria-hidden className="size-4 shrink-0 text-ink-subtle transition group-hover:text-navy" />
              </SmartLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Panel>
  );
}
