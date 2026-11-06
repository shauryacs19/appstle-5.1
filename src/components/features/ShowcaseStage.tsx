"use client";

import Image,{ type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { FlaskConical } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ScaleToFit } from "@/components/features/ScaleToFit";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { TabList } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export type StageItem =
  | { id: string; label: string; kind: "demo"; content: ReactNode }
  | { id: string; label: string; kind: "image"; image: StaticImageData; alt: string; caption: string; title?: string; body?: string };

export function ShowcaseStage({
  items,
  idPrefix,
  label,
  value: controlled,
  onChange,
  activeClass = "bg-navy text-white",
  className,
}: {
  items: StageItem[];
  idPrefix: string;
  label: string;
  value?: string;
  onChange?: (id: string) => void;
  activeClass?: string;
  className?: string;
}) {
  const [own, setOwn] = useState(items[0].id);
  const value = controlled ?? own;
  const select = (id: string) => {
    setOwn(id);
    onChange?.(id);
  };
  const panelId = (id: string) => `${idPrefix}-panel-${id}`;

  useEffect(() => {
    const tab = document.getElementById(`${idPrefix}-tab-${value}`);
    const strip = tab?.parentElement;
    if (!tab || !strip || strip.scrollWidth <= strip.clientWidth) return;
    const left = tab.offsetLeft - strip.offsetLeft;
    const right = left + tab.offsetWidth;
    const pad = 40;
    if (left < strip.scrollLeft + 4) strip.scrollTo({ left: Math.max(0, left - 8), behavior: "smooth" });
    else if (right > strip.scrollLeft + strip.clientWidth - pad) strip.scrollTo({ left: right - strip.clientWidth + pad, behavior: "smooth" });
  }, [idPrefix, value]);

  return (
    <div className={className}>
      <TabList
        ids={items.map((i) => i.id)}
        value={value}
        onChange={select}
        idPrefix={idPrefix}
        label={label}
        panelId={panelId}
        className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto pr-10 pl-1 pb-1 [mask-image:linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)]"
        renderTab={(id, selected) => {
          const item = items.find((i) => i.id === id)!;
          return {
            className: cn(
              "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[0.85rem] font-semibold transition",
              selected ? activeClass : "bg-white/80 text-navy ring-1 ring-navy/10 hover:ring-navy/25",
            ),
            children: (
              <>
                {item.kind === "demo" && <FlaskConical aria-hidden className="size-3.5" />}
                {item.label}
              </>
            ),
          };
        }}
      />

      <div className="relative mt-3 lg:h-[clamp(25rem,61svh,34rem)]">
        {items.map((item) => {
          const selected = item.id === value;
          return (
            <motion.div
              key={item.id}
              id={panelId(item.id)}
              role="tabpanel"
              aria-labelledby={`${idPrefix}-tab-${item.id}`}
              hidden={!selected}
              tabIndex={0}
              data-guide={`${idPrefix}-${item.id}`}
              initial={false}
              animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: ease.out }}
              className="h-full rounded-[1.75rem] focus-visible:outline-offset-4"
            >
              {item.kind === "demo" ? (
                <ScaleToFit>{item.content}</ScaleToFit>
              ) : (
                <figure className="flex h-full flex-col">
                  <BrowserFrame label={item.caption} className="flex min-h-0 flex-1 flex-col">
                    <div className="relative min-h-56 flex-1 bg-white">
                      <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 760px, 95vw" className="object-contain p-3 sm:p-5" />
                    </div>
                  </BrowserFrame>
                  {(item.title || item.body) && (
                    <figcaption className="mt-3 text-[0.92rem] leading-snug text-ink-muted">
                      {item.title && <strong className="font-semibold text-navy">{item.title}. </strong>}
                      {item.body}
                    </figcaption>
                  )}
                </figure>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
