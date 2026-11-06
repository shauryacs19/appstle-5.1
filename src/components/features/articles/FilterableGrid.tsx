"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type FilterOption = { id: string; label: string };
type FilterableItem = { key: string; tags: string[]; node: ReactNode };

export function FilterableGrid({ options, items, allLabel = "All", label, className }: { options: FilterOption[]; items: FilterableItem[]; allLabel?: string; label: string; className?: string }) {
  const [active, setActive] = useState("");
  const visible = items.filter((i) => !active || i.tags.includes(active));
  const pill = (on: boolean) =>
    cn("inline-flex h-10 items-center rounded-full px-4 text-[0.9rem] font-semibold transition", on ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25");
  return (
    <div className={className}>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!active} onClick={() => setActive("")} className={pill(!active)}>
          {allLabel}
        </button>
        {options.map((o) => (
          <button key={o.id} type="button" aria-pressed={active === o.id} onClick={() => setActive(o.id)} className={pill(active === o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {visible.length} shown
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li key={i.key} hidden={!visible.includes(i)}>
            {i.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
