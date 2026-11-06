"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, LayoutGrid, Rows3 } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { FitDemos } from "./FitDemos";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import { SmartLink } from "@/components/ui/SmartLink";
import { productById, type ProductId } from "@/data/products";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type View = "grid" | "list";

/* one short line per app for the grid; the full story lives in list view and on each product page */
const blurb: Record<ProductId, string> = {
  subscriptions: "Recurring orders with a self-serve customer portal.",
  memberships: "Paid, tiered memberships with member-only perks.",
  loyalty: "Points, referrals and VIP tiers that bring shoppers back.",
  bundles: "Bundles and volume discounts that grow every order.",
  pickup: "Store pickup, local delivery and scheduled shipping.",
};

function GridCard({ id }: { id: ProductId }) {
  const p = productById[id];
  return (
    <article aria-labelledby={`grid-${id}`} className="flex h-full flex-col rounded-[1.5rem] bg-[#fff] p-2.5 ring-1 ring-line transition-[translate] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1">
      {/* image slot: a neutral placeholder until the product image is supplied */}
      <div aria-hidden className="grid h-40 place-items-center rounded-[1.1rem] sm:h-80 bg-[#2A2D33] text-sm font-medium tracking-wide text-white/55">
        Image here
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <AppstleMark className="size-6 shrink-0 rounded-md" />
          <h3 id={`grid-${id}`} className="text-[1rem] leading-tight font-bold tracking-[-0.02em] text-ink">
            {p.name}
          </h3>
        </div>
        <p className="mt-2 text-[0.88rem] leading-snug text-ink-muted">{blurb[id]}</p>
        <SmartLink
          href={p.href}
          className="group/lm mt-auto inline-flex items-center gap-1 self-start pt-4 text-sm font-semibold text-brand-700 hover:text-blue-ink"
        >
          Learn more
          <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover/lm:translate-x-0.5 group-hover/lm:-translate-y-0.5" />
          <span className="sr-only"> about {p.name}</span>
        </SmartLink>
      </div>
    </article>
  );
}

/* Products: a compact grid of the five apps by default (less scrolling), or a list that shows one full
   interactive demo card at a time with tabs and previous / next to cycle through them. */
export function SuiteViews({ panels }: { panels: { id: ProductId; label: string; node: ReactNode }[] }) {
  const [view, setView] = useState<View>("grid");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = panels.length;

  const go = (i: number) => setActive(((i % n) + n) % n);
  const tryLive = (i: number) => {
    setActive(i);
    setView("list");
    requestAnimationFrame(() => root.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    go(i + step);
    tabs.current[(i + step + n) % n]?.focus();
  };

  return (
    <div ref={root} className="mt-10 scroll-mt-28">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {view === "list" ? (
          <div role="tablist" aria-label="Appstle apps" className="scrollbar-none -mx-1 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-1 py-1">
            {panels.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`suite-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="suite-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center rounded-full px-4 text-[0.92rem] font-semibold ring-1 transition-colors",
                    on ? "bg-blue-ink text-white ring-blue-ink" : "bg-[#fff] text-ink-muted ring-line hover:text-ink",
                  )}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-ink-muted">
            <strong className="font-semibold text-ink">{n} apps</strong>, each built for Shopify and Shopify Plus.
          </p>
        )}

        <div className="flex items-center gap-2">
          {view === "grid" && (
            <button
              type="button"
              onClick={() => tryLive(0)}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-blue-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-orange motion-safe:animate-[pulse-ring_2s_ease-out_infinite]" />
                <span className="relative size-2 rounded-full bg-orange" />
              </span>
              Try the apps live
            </button>
          )}
          {view === "list" && (
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => go(active - 1)} aria-label="Previous app" className="grid size-10 place-items-center rounded-full bg-[#fff] text-ink ring-1 ring-line transition hover:bg-ice hover:text-brand-700">
                <ArrowLeft className="size-4" />
              </button>
              <button type="button" onClick={() => go(active + 1)} aria-label="Next app" className="grid size-10 place-items-center rounded-full bg-[#fff] text-ink ring-1 ring-line transition hover:bg-ice hover:text-brand-700">
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
          <div role="group" aria-label="View" className="flex items-center gap-1 rounded-full bg-[#fff] p-1 ring-1 ring-line">
            {(
              [
                ["grid", "Grid", LayoutGrid],
                ["list", "List", Rows3],
              ] as const
            ).map(([v, label, Icon]) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors",
                  view === v ? "bg-blue-ink text-white" : "text-ink-muted hover:text-ink",
                )}
              >
                <Icon aria-hidden className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === "grid" ? (
          <motion.ul
            key="grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: ease.out }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            {panels.map((p, i) => (
              <li key={p.id} className={cn(i === n - 1 && n % 2 === 1 && "sm:col-span-2")}>
                <GridCard id={p.id} />
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.div key="list" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: ease.out }} className="mt-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={panels[active].id}
                id="suite-panel"
                role="tabpanel"
                aria-labelledby={`suite-tab-${panels[active].id}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: ease.out }}
              >
                {panels[active].node}
                <FitDemos key={panels[active].id} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-6 text-center text-xs text-ink-subtle">Demos use illustrative values and don’t create orders or bookings. Ratings from the Shopify App Store.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
