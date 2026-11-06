"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { TabList } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";

export function FeatureTabs({ items, idPrefix, label }: { items: { title: string; body: string }[]; idPrefix: string; label: string }) {
  const ids = items.map((_, i) => String(i));
  const [active, setActive] = useState(ids[0]);
  const item = items[Number(active)];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
      <TabList
        ids={ids}
        value={active}
        onChange={setActive}
        idPrefix={idPrefix}
        label={label}
        orientation="vertical"
        className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:col-span-5 lg:mx-0 lg:grid lg:gap-1 lg:overflow-visible lg:px-0"
        renderTab={(id, selected) => ({
          className: cn(
            "flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left text-[0.9rem] font-semibold transition lg:py-2 short:lg:py-1.5",
            selected ? "bg-navy text-white shadow-soft" : "bg-white text-navy ring-1 ring-navy/8 hover:ring-navy/20 lg:bg-transparent lg:ring-0 lg:hover:bg-white",
          ),
          children: (
            <>
              <span className={cn("font-mono text-[0.72rem]", selected ? "text-white/60" : "text-ink-subtle")}>{String(Number(id) + 1).padStart(2, "0")}</span>
              <span className="whitespace-nowrap lg:whitespace-normal">{items[Number(id)].title}</span>
            </>
          ),
        })}
      />
      <div id={`${idPrefix}-panel`} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${active}`} className="lg:col-span-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="h-full rounded-4xl bg-white p-6 ring-1 ring-navy/8 sm:p-8 short:p-6"
          >
            <p className="font-mono text-sm text-cobalt">{String(Number(active) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
            <h3 className="mt-3 text-[1.6rem] leading-tight font-bold text-navy short:text-[1.4rem]">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted short:text-[0.95rem]">{item.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
