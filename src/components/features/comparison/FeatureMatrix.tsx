"use client";

import { useState } from "react";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";
import { Mark } from "./Mark";

const shortName = (c: string) => c.replace(/\s+(Subscriptions|Memberships)$/, "");

export function FeatureMatrix({
  columns,
  rows,
  caption,
  accent,
  idPrefix,
}: {
  columns: string[];
  rows: { label: string; values: boolean[] }[];
  caption: string;
  accent: Accent;
  idPrefix: string;
}) {
  const [focus, setFocus] = useState<number | null>(null);
  const shown = (i: number) => i === 0 || focus === null || focus === i;
  const tableId = `${idPrefix}-matrix`;

  return (
    <div>
      <div role="group" aria-label="Compare with" className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        <span className="shrink-0 self-center pr-1 text-[0.8rem] font-semibold text-ink-subtle">Compare with</span>
        {[null, ...columns.slice(1).map((_, i) => i + 1)].map((i) => (
          <button
            key={i ?? "all"}
            type="button"
            aria-pressed={focus === i}
            aria-controls={tableId}
            onClick={() => setFocus(i)}
            className={cn(
              "inline-flex h-8 shrink-0 items-center rounded-full px-3 text-[0.8rem] font-semibold transition",
              focus === i ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25",
            )}
          >
            {i === null ? "All apps" : shortName(columns[i])}
          </button>
        ))}
      </div>
      <div className="scrollbar-none mt-3 overflow-x-auto rounded-2xl bg-white ring-1 ring-navy/8">
        <table id={tableId} className={cn("w-full table-fixed border-collapse text-left text-[0.84rem]", focus === null && "min-w-[56rem]")}>
          <caption className="sr-only">{caption}</caption>
          <colgroup>
            <col className={focus !== null ? "w-1/2" : columns.length > 9 ? "w-[15rem]" : "w-[20rem]"} />
            {columns.map((c, i) => (
              <col key={c} hidden={!shown(i)} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-navy/8 bg-cream-50">
              <th scope="col" className="sticky left-0 z-10 bg-cream-50 px-4 py-2.5 text-[0.8rem] font-semibold text-ink-muted">
                Features
              </th>
              {columns.map((c, i) => (
                <th key={c} scope="col" hidden={!shown(i)} className={cn("px-1.5 py-2.5 text-center text-[0.74rem] leading-tight font-semibold text-navy", i === 0 && cn("font-bold", accent.soft))}>
                  {focus === null ? (
                    <>
                      {shortName(c)}
                      <span className="sr-only">{c.slice(shortName(c).length)}</span>
                    </>
                  ) : (
                    c
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-navy/6 last:border-0">
                <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-2 align-middle text-[0.82rem] leading-snug font-medium text-navy short:py-1">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={columns[i]} hidden={!shown(i)} className={cn("px-2 py-2 text-center align-middle short:py-1", i === 0 && accent.soft)}>
                    <Mark value={v} accent={accent} strong={i === 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
