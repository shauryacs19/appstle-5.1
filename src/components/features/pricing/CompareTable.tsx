"use client";

import { Check, ChevronDown, Minus } from "lucide-react";
import { useState } from "react";
import { TabList } from "@/components/ui/Tabs";
import type { FeatureGroup, FeatureRow, PlanCell } from "@/data/pricing";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";

const VISIBLE = 7;

export function CompareTable({ plans, groups, limit, accent, idPrefix }: { plans: string[]; groups: FeatureGroup[]; limit?: FeatureRow; accent: Accent; idPrefix: string }) {
  const ids = groups.map((_, i) => String(i));
  const [tab, setTab] = useState(ids[0]);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const panelId = (id: string) => `${idPrefix}-panel-${id}`;

  return (
    <div>
      {groups.length > 1 && (
        <TabList
          ids={ids}
          value={tab}
          onChange={setTab}
          idPrefix={idPrefix}
          label="Feature groups"
          panelId={panelId}
          className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
          renderTab={(id, selected) => ({
            className: cn(
              "inline-flex h-9 shrink-0 items-center rounded-full px-3.5 text-[0.85rem] font-semibold transition",
              selected ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25",
            ),
            children: `${groups[Number(id)].title} (${groups[Number(id)].rows.length})`,
          })}
        />
      )}

      {groups.map((g, gi) => {
        const id = String(gi);
        const expanded = !!open[id];
        const extra = g.rows.length - VISIBLE;
        return (
          <div key={g.title} id={panelId(id)} role={groups.length > 1 ? "tabpanel" : undefined} aria-labelledby={groups.length > 1 ? `${idPrefix}-tab-${id}` : undefined} hidden={id !== tab} className="mt-4">
            <div className="scrollbar-none overflow-x-auto rounded-2xl bg-white ring-1 ring-navy/8">
              <table className="w-full min-w-[46rem] border-collapse text-left text-[0.88rem]">
                <caption className="sr-only">{g.title}: features by plan</caption>
                <thead>
                  <tr className="border-b border-navy/8 bg-cream-50">
                    <th scope="col" className="sticky left-0 z-10 w-[34%] bg-cream-50 px-4 py-3 font-semibold text-navy">
                      {g.title}
                    </th>
                    {plans.map((p) => (
                      <th key={p} scope="col" className="px-3 py-3 text-center font-semibold whitespace-nowrap text-navy">
                        {p}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {limit && <Row row={limit} accent={accent} emphasis />}
                  {g.rows.map((r, ri) => (
                    <Row key={r.label} row={r} accent={accent} hidden={!expanded && ri >= VISIBLE} />
                  ))}
                </tbody>
              </table>
            </div>
            {extra > 0 && (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId(id)}
                onClick={() => setOpen((o) => ({ ...o, [id]: !expanded }))}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-700 hover:underline"
              >
                {expanded ? "Show fewer features" : `Show all ${g.rows.length} features`}
                <ChevronDown aria-hidden className={cn("size-4 transition-transform", expanded && "rotate-180")} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Row({ row, accent, emphasis, hidden }: { row: FeatureRow; accent: Accent; emphasis?: boolean; hidden?: boolean }) {
  return (
    <tr hidden={hidden} className={cn("border-b border-navy/6 last:border-0", emphasis && "bg-cream-50/60")}>
      <th scope="row" className={cn("sticky left-0 z-10 px-4 py-2.5 align-top font-medium", emphasis ? "bg-cream-50 text-navy" : "bg-white text-ink-muted")}>
        {row.label}
      </th>
      {row.values.map((v, i) => (
        <td key={i} className="px-3 py-2.5 text-center align-top">
          <Cell v={v} accent={accent} />
        </td>
      ))}
    </tr>
  );
}

function Cell({ v, accent }: { v: PlanCell; accent: Accent }) {
  if (v === true)
    return (
      <>
        <Check aria-hidden className={cn("mx-auto size-4", accent.text)} />
        <span className="sr-only">Included</span>
      </>
    );
  if (v === false)
    return (
      <>
        <Minus aria-hidden className="mx-auto size-4 text-navy/25" />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-[0.82rem] font-semibold text-navy">{v}</span>;
}
