"use client";

import { Children, useState, type ReactNode } from "react";
import { TabList } from "@/components/ui/Tabs";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";

export function PanelTabs({
  tabs,
  children,
  idPrefix,
  label,
  accent,
  numbered,
  className,
}: {
  tabs: { id: string; label: string }[];
  children: ReactNode;
  idPrefix: string;
  label: string;
  accent: Accent;
  numbered?: boolean;
  className?: string;
}) {
  const ids = tabs.map((t) => t.id);
  const [value, setValue] = useState(ids[0]);
  const panels = Children.toArray(children);
  const panelId = (id: string) => `${idPrefix}-panel-${id}`;

  return (
    <div className={cn("grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8", className)}>
      <TabList
        ids={ids}
        value={value}
        onChange={setValue}
        idPrefix={idPrefix}
        label={label}
        orientation="vertical"
        panelId={panelId}
        className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:col-span-4 lg:mx-0 lg:grid lg:content-start lg:gap-1.5 lg:overflow-visible lg:px-0"
        renderTab={(id, selected) => {
          const i = ids.indexOf(id);
          return {
            className: cn(
              "group shrink-0 rounded-xl px-4 py-2.5 text-left text-[0.92rem] font-semibold transition-colors duration-300 lg:w-full lg:rounded-2xl lg:py-3 short:py-2",
              selected ? "bg-white text-navy shadow-card ring-1 ring-navy/8" : "text-ink-muted hover:bg-white/60 hover:text-navy",
            ),
            children: (
              <span className="flex items-center gap-3">
                {numbered ? (
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full text-[0.8rem] font-bold tabular-nums transition-colors",
                      selected ? "bg-navy text-white" : "bg-navy/8 text-ink-muted",
                    )}
                  >
                    {i + 1}
                  </span>
                ) : (
                  <span aria-hidden className={cn("hidden size-2 shrink-0 rounded-full transition-colors lg:block", selected ? accent.solid : "bg-navy/15")} />
                )}
                {numbered && <span className="sr-only">Step {i + 1}: </span>}
                {tabs[i].label}
              </span>
            ),
          };
        }}
      />
      <div className="min-w-0 lg:col-span-8">
        {panels.map((panel, i) => (
          <div
            key={ids[i]}
            id={panelId(ids[i])}
            role="tabpanel"
            aria-labelledby={`${idPrefix}-tab-${ids[i]}`}
            hidden={ids[i] !== value}
            tabIndex={0}
            className="rounded-3xl focus-visible:outline-offset-4"
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
