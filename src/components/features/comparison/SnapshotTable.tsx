"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { SnapshotRow } from "@/data/content/types";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";
import { Mark } from "./Mark";

const VISIBLE = 8;

export function SnapshotTable({ rows, columns, caption, accent, idPrefix }: { rows: SnapshotRow[]; columns: [string, string]; caption: string; accent: Accent; idPrefix: string }) {
  const [onlyDiff, setOnlyDiff] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const diff = rows.filter((r) => r.appstle !== r.competitor);
  const list = onlyDiff ? diff : rows;
  const extra = list.length - VISIBLE;
  const tableId = `${idPrefix}-table`;

  return (
    <div>
      {diff.length > 0 && diff.length < rows.length && (
        <div role="group" aria-label="Rows to show" className="mb-3 inline-flex rounded-full bg-cream-100 p-1 ring-1 ring-navy/8">
          {[
            { on: false, label: `All features (${rows.length})` },
            { on: true, label: `Differences (${diff.length})` },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={onlyDiff === o.on}
              aria-controls={tableId}
              onClick={() => setOnlyDiff(o.on)}
              className={cn("rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold transition", onlyDiff === o.on ? "bg-white text-navy shadow-soft" : "text-ink-muted hover:text-navy")}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-navy/8">
        <table id={tableId} className="w-full table-fixed border-collapse text-left text-[0.88rem]">
          <caption className="sr-only">{caption}</caption>
          <colgroup>
            <col />
            <col className="w-[26%] sm:w-[22%]" />
            <col className="w-[26%] sm:w-[22%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-navy/8 bg-cream-50 text-[0.8rem]">
              <th scope="col" className="px-4 py-3 font-semibold text-ink-muted">
                Feature
              </th>
              <th scope="col" className={cn("px-2 py-3 text-center leading-tight font-bold text-navy", accent.soft)}>
                {columns[0]}
              </th>
              <th scope="col" className="px-2 py-3 text-center leading-tight font-semibold text-navy">
                {columns[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((r, i) => (
              <tr key={r.label} hidden={!expanded && i >= VISIBLE} className="border-b border-navy/6 last:border-0">
                <th scope="row" className="px-4 py-2.5 align-middle leading-snug font-medium text-navy short:py-2">
                  {r.label}
                </th>
                <td className={cn("px-2 py-2.5 text-center align-middle short:py-2", accent.soft)}>
                  <Mark value={r.appstle} accent={accent} strong />
                </td>
                <td className="px-2 py-2.5 text-center align-middle short:py-2">
                  <Mark value={r.competitor} accent={accent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {extra > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={tableId}
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-700 hover:underline"
        >
          {expanded ? "Show fewer features" : `Show all ${list.length} features`}
          <ChevronDown aria-hidden className={cn("size-4 transition-transform", expanded && "rotate-180")} />
        </button>
      )}
    </div>
  );
}
