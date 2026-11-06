"use client";

import { Search, X } from "lucide-react";
import { useId, useState } from "react";
import { ComparisonCard } from "@/components/sections/comparison/ComparisonCard";
import type { ComparisonCardData } from "@/data/comparison-pages/cards";
import { cn } from "@/lib/cn";

type LibraryGroup = { id: string; label: string; title: string; anchor: string; cards: ComparisonCardData[] };

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();

export function ComparisonLibrary({ groups }: { groups: LibraryGroup[] }) {
  const [app, setApp] = useState<string>("all");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const q = norm(query);
  const match = (c: ComparisonCardData) => !q || norm(`${c.short} ${c.name}`).includes(q);
  const total = groups.reduce((n, g) => n + g.cards.length, 0);
  const visible = groups.reduce((n, g) => n + (app === "all" || app === g.id ? g.cards.filter(match).length : 0), 0);

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by Appstle app" className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {[{ id: "all", label: "All apps", n: total }, ...groups.map((g) => ({ id: g.id, label: g.label, n: g.cards.length }))].map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={app === o.id}
              onClick={() => setApp(o.id)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[0.85rem] font-semibold transition",
                app === o.id ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25",
              )}
            >
              {o.label}
              <span className={cn("tabular-nums", app === o.id ? "text-white/70" : "text-ink-subtle")}>{o.n}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <label htmlFor={searchId} className="sr-only">
            Search comparisons
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-subtle" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search an app, e.g. Recharge"
            className="h-10 w-full rounded-full bg-white pr-9 pl-10 text-[0.9rem] text-navy ring-1 ring-navy/12 placeholder:text-ink-subtle focus:ring-cobalt/50 focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-subtle hover:bg-navy/5 hover:text-navy">
              <X aria-hidden className="size-4" />
            </button>
          )}
        </div>
      </div>
      <p role="status" className="mt-3 text-[0.85rem] text-ink-subtle">
        {visible === total ? `${total} comparisons` : `Showing ${visible} of ${total} comparisons`}
      </p>

      {groups.map((g) => {
        const cards = g.cards.filter(match);
        const hidden = (app !== "all" && app !== g.id) || cards.length === 0;
        return (
          <section key={g.id} id={g.anchor} aria-labelledby={`${g.anchor}-title`} hidden={hidden} className="mt-8 scroll-mt-28">
            <h3 id={`${g.anchor}-title`} className="flex items-baseline gap-2 text-[1.5rem] font-bold text-navy">
              {g.title}
              <span className="font-sans text-base font-semibold text-ink-subtle tabular-nums">{g.cards.length}</span>
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {g.cards.map((c) => (
                <li key={c.href} hidden={!match(c)}>
                  <ComparisonCard card={c} headingLevel={4} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      {visible === 0 && (
        <p className="mt-8 rounded-2xl bg-cream-100 p-5 text-ink-muted">
          No comparison matches “{query}”. Try another app name, or{" "}
          <button type="button" className="font-semibold text-cobalt-700 underline" onClick={() => { setQuery(""); setApp("all"); }}>
            show all comparisons
          </button>
          .
        </p>
      )}
    </div>
  );
}
