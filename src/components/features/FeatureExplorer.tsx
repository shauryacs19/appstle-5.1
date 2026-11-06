"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Media } from "@/components/ui/Media";
import { SmartLink } from "@/components/ui/SmartLink";
import { TabList } from "@/components/ui/Tabs";
import type { MediaItem } from "@/data/media";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export type ExplorerItem = {
  id: string;
  label: string;
  title: string;
  body: string;
  bullets?: string[];
  media: MediaItem;
  caption?: string;
  link?: { href: string; label: string };
};

export function FeatureExplorer({ items, idPrefix, label, accent }: { items: ExplorerItem[]; idPrefix: string; label: string; accent: Accent }) {
  const ids = items.map((i) => i.id);
  const [value, setValue] = useState(ids[0]);
  const panelId = (id: string) => `${idPrefix}-panel-${id}`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <TabList
        ids={ids}
        value={value}
        onChange={setValue}
        idPrefix={idPrefix}
        label={label}
        orientation="vertical"
        panelId={panelId}
        className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:col-span-3 lg:mx-0 lg:grid lg:content-start lg:gap-1.5 lg:overflow-visible lg:px-0"
        renderTab={(id, selected) => {
          const item = items.find((i) => i.id === id)!;
          return {
            className: cn(
              "group relative shrink-0 rounded-xl px-4 py-2.5 text-left text-[0.92rem] font-semibold transition-colors duration-300 lg:w-full lg:rounded-2xl lg:py-3 short:py-2",
              selected ? "bg-white text-navy shadow-card ring-1 ring-navy/8" : "text-ink-muted hover:bg-white/60 hover:text-navy",
            ),
            children: (
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={cn("hidden size-2 shrink-0 rounded-full transition-colors lg:block", selected ? accent.solid : "bg-navy/15")}
                />
                {item.label}
              </span>
            ),
          };
        }}
      />

      <div className="lg:col-span-9">
        {items.map((item) => {
          const selected = item.id === value;
          return (
            <div
              key={item.id}
              id={panelId(item.id)}
              role="tabpanel"
              aria-labelledby={`${idPrefix}-tab-${item.id}`}
              hidden={!selected}
              tabIndex={0}
              className="rounded-3xl focus-visible:outline-offset-4"
            >
              <motion.div
                initial={false}
                animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease: ease.out }}
                className="grid grid-cols-1 gap-6 xl:grid-cols-[1.55fr_1fr] xl:items-center"
              >
                <BrowserFrame label={item.caption ?? item.label}>
                  <Media item={item.media} className="rounded-none" sizes="(min-width: 1280px) 560px, (min-width: 1024px) 60vw, 100vw" />
                </BrowserFrame>
                <div>
                  <h3 className="text-2xl leading-tight font-bold text-navy short:text-xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted short:mt-2 short:text-[0.92rem] short:leading-snug">{item.body}</p>
                  {item.bullets && (
                    <ul className="mt-4 grid gap-2 short:mt-3 short:gap-1.5">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[0.93rem] leading-snug text-navy short:text-[0.86rem]">
                          <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", accent.text)} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.link && (
                    <SmartLink href={item.link.href} className={cn("mt-5 inline-flex text-sm font-semibold hover:underline", accent.text)}>
                      {item.link.label} →
                    </SmartLink>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
