"use client";

import { Search } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import { faqCopy } from "@/data/faq-copy";
import { cn } from "@/lib/cn";

export type FaqIndexItem = { id: string; group: string; question: string; text: string };

function reveal(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLDetailsElement)) return;
  el.open = true;
  el.scrollIntoView({ behavior: smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto", block: "center" });
  el.querySelector("summary")?.focus({ preventScroll: true });
}

export function FaqSearch({ items, groups }: { items: FaqIndexItem[]; groups: { id: string; title: string; count: number }[] }) {
  const [q, setQ] = useState("");
  const inputId = useId();
  const resultsId = useId();
  const query = q.trim().toLowerCase();
  const matches = useMemo(
    () => (query.length < 2 ? [] : items.filter((i) => `${i.question} ${i.text}`.toLowerCase().includes(query)).slice(0, 8)),
    [items, query],
  );

  useEffect(() => {
    const open = () => location.hash.length > 1 && reveal(decodeURIComponent(location.hash.slice(1)), false);
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-navy/6 sm:p-6">
      <label htmlFor={inputId} className="text-sm font-semibold text-navy">
        {faqCopy.searchLabel}
      </label>
      <div className="relative mt-2">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-subtle" />
        <input
          id={inputId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={faqCopy.searchPlaceholder}
          aria-controls={resultsId}
          autoComplete="off"
          className="h-12 w-full rounded-xl bg-cream-50 pr-4 pl-10 text-[0.95rem] text-navy ring-1 ring-navy/10 transition outline-none placeholder:text-ink-subtle focus:bg-white focus:ring-2 focus:ring-cobalt"
        />
      </div>
      <div id={resultsId} aria-live="polite">
        {query.length >= 2 && (
          <>
            <p className="mt-3 text-[0.8rem] text-ink-subtle">{matches.length ? faqCopy.resultsLabel(matches.length) : faqCopy.noResults}</p>
            {matches.length > 0 && (
              <ul className="mt-2 grid max-h-64 gap-1 overflow-y-auto">
                {matches.map((m) => (
                  <li key={m.id}>
                    <a
                      href={`#${m.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        history.replaceState(null, "", `#${m.id}`);
                        reveal(m.id, true);
                      }}
                      className="block rounded-xl px-3 py-2 text-[0.9rem] leading-snug text-navy transition hover:bg-cobalt-50"
                    >
                      <span className="block text-[0.7rem] font-semibold tracking-wide text-ink-subtle uppercase">{m.group}</span>
                      {m.question}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      <p className="mt-5 text-sm font-semibold text-navy">{faqCopy.jumpLabel}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {groups.map((g) => (
          <li key={g.id}>
            <a href={`#${g.id}`} className={cn("inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1.5 text-[0.84rem] font-semibold text-navy ring-1 ring-navy/8 transition hover:bg-cobalt-50 hover:ring-cobalt-200")}>
              {g.title}
              <span className="rounded-full bg-white px-1.5 text-[0.72rem] text-ink-subtle">{g.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
