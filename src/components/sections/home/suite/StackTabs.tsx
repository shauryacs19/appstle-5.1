"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

export function StackTabs({ panels }: { panels: { id: ProductId; label: string; accent: string; node: ReactNode }[] }) {
  const [active, setActive] = useState(panels[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(panels[i].id);
    tabs.current[i]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const to = e.key === "Home" ? 0 : e.key === "End" ? panels.length - 1 : step ? (i + step + panels.length) % panels.length : -1;
    if (to < 0) return;
    e.preventDefault();
    select(to);
    tabs.current[to]?.focus();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="Appstle apps"
        className="scrollbar-none -mx-5 mt-10 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:hidden"
      >
        {panels.map((p, i) => {
          const on = p.id === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`stack-tab-${p.id}`}
              aria-selected={on}
              aria-controls={`stack-panel-${p.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "inline-flex h-11 shrink-0 snap-start items-center gap-2 rounded-full px-4 py-1 text-[0.95rem] font-semibold ring-1 transition-colors",
                on ? "bg-white text-navy ring-brand/40 shadow-soft" : "bg-white/60 text-ink-muted ring-line",
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <Stagger className="mt-4 grid grid-cols-1 gap-5 sm:gap-6 lg:mt-12" interval={0.08} amount={0.05}>
        {panels.map((p) => (
          <StaggerItem key={p.id} className={cn("max-lg:opacity-100! max-lg:transform-none!", p.id !== active && "max-lg:hidden")}>
            <div id={`stack-panel-${p.id}`} role="tabpanel" aria-labelledby={`stack-tab-${p.id}`}>
              {p.node}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}
