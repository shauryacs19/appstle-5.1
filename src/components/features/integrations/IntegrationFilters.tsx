"use client";

import { LayoutGroup, motion } from "motion/react";
import { Search } from "lucide-react";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { productById, products, type ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

export type AppFilter = "all" | ProductId;

const pill = "relative inline-flex shrink-0 items-center gap-2 rounded-full font-semibold transition-colors";
const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

export function AppFilterPills({ value, onChange, id }: { value: AppFilter; onChange: (v: AppFilter) => void; id: string }) {
  return (
    <LayoutGroup id={`${id}-apps`}>
      <div role="group" aria-label="Filter integrations by app" className="flex flex-wrap gap-1.5">
        {(["all", ...products.map((p) => p.id)] as AppFilter[]).map((f) => {
          const on = value === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(f)}
              className={cn(pill, "h-9 px-3.5 text-[0.85rem]", on ? "text-white" : "text-navy ring-1 ring-navy/12 hover:ring-navy/25")}
            >
              {on && <motion.span layoutId={`${id}-app-pill`} className="absolute inset-0 rounded-full bg-navy" transition={spring} />}
              {f !== "all" && <ProductIcon id={f} size="sm" className="relative size-5 rounded-md [&_svg]:size-3" />}
              <span className="relative">{f === "all" ? "All apps" : productById[f].shortName}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export function CategoryAndSearch({
  categories,
  category,
  onCategory,
  query,
  onQuery,
  id,
}: {
  categories: string[];
  category: string;
  onCategory: (c: string) => void;
  query: string;
  onQuery: (q: string) => void;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
      <LayoutGroup id={`${id}-cats`}>
        <div
          role="group"
          aria-label="Filter integrations by category"
          className="scrollbar-none -mx-1 flex min-w-0 gap-1 overflow-x-auto pr-8 pb-1 pl-1 [mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)]"
        >
          {categories.map((c) => {
            const on = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => onCategory(c)}
                className={cn(pill, "h-8 px-3 text-[0.8rem] font-medium", on ? "text-white" : "text-ink-muted hover:text-navy")}
              >
                {on && <motion.span layoutId={`${id}-cat-pill`} className="absolute inset-0 rounded-full bg-cobalt" transition={spring} />}
                <span className="relative">{c}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      <label htmlFor={`${id}-search`} className="relative block w-full shrink-0 lg:w-56">
        <span className="sr-only">Search integrations</span>
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-subtle" />
        <input
          id={`${id}-search`}
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search integrations"
          className="h-10 w-full rounded-xl bg-white pr-3 pl-10 text-[0.92rem] text-navy ring-1 ring-navy/10 placeholder:text-ink-subtle focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:outline-none"
        />
      </label>
    </div>
  );
}
