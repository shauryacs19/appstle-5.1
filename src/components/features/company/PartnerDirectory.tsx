"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { AppPartner } from "@/data/pages/app-partners";
import { cn } from "@/lib/cn";
import { PartnerCard } from "./PartnerCard";

export function PartnerDirectory({ partners, categories, limit = 8 }: { partners: AppPartner[]; categories: readonly string[]; limit?: number }) {
  const id = useId().replace(/:/g, "");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const q = useDeferredValue(query.trim().toLowerCase());

  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, partners.filter((p) => (p.categories as string[]).includes(c)).length])), [categories, partners]);
  const shown = partners.filter(
    (p) =>
      (category === "All" || (p.categories as string[]).includes(category)) &&
      (!q || `${p.name} ${p.description} ${p.categories.join(" ")}`.toLowerCase().includes(q)),
  );
  const filtered = category !== "All" || !!q;
  const visible = filtered || expanded ? shown : shown.slice(0, limit);
  const chips = ["All", ...categories];

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div role="group" aria-label="Filter partners by category" className="scrollbar-none mask-fade-x -mx-1 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-1 py-0.5">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[0.84rem] font-semibold transition",
                category === c ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25",
              )}
            >
              {c}
              <span className={cn("text-[0.72rem] font-medium", category === c ? "text-white/70" : "text-ink-subtle")}>{c === "All" ? partners.length : counts[c]}</span>
            </button>
          ))}
        </div>
        <label htmlFor={`${id}-q`} className="relative block md:w-64">
          <span className="sr-only">Search partners</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-subtle" />
          <input
            id={`${id}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search partners"
            className="h-10 w-full rounded-full bg-white pr-4 pl-9 text-sm text-navy ring-1 ring-navy/12 outline-none placeholder:text-ink-subtle focus-visible:ring-2 focus-visible:ring-cobalt"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "partner" : "partners"} found
      </p>

      {visible.length ? (
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p) => (
            <li key={p.name}>
              <PartnerCard partner={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-3xl bg-white p-6 text-center text-ink-muted ring-1 ring-navy/8">No partners match “{query}”.</p>
      )}

      {!filtered && shown.length > limit && (
        <Button variant="secondary" size="sm" className="mt-4" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Show fewer" : `Show all ${shown.length} partners`}
        </Button>
      )}
    </div>
  );
}
