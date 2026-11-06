"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Minus, PackageOpen, Plus, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const items = [
  { id: "cleanser", name: "Custom Cleanser", price: 29, color: "#CFE0FB", cap: "#14275C" },
  { id: "mask", name: "Shampoo Scalp Mask", price: 48, color: "#8CB8F7", cap: "#2A56D8" },
  { id: "moisturizer", name: "Face Moisturizer", price: 36, color: "#EAF1FD", cap: "#B4472A" },
  { id: "oil", name: "Body Oil", price: 24, color: "#3F7BEA", cap: "#14275C" },
] as const;
type ItemId = (typeof items)[number]["id"];

const tiers = [
  { count: 2, off: 10 },
  { count: 3, off: 15 },
  { count: 4, off: 20 },
];

export function BundleBuilderDemo() {
  const [picked, setPicked] = useState<ItemId[]>(["cleanser"]);
  const toggle = (id: ItemId) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const subtotal = picked.reduce((s, id) => s + items.find((i) => i.id === id)!.price, 0);
  const tier = [...tiers].reverse().find((t) => picked.length >= t.count);
  const nextTier = tiers.find((t) => picked.length < t.count);
  const discount = tier ? (subtotal * tier.off) / 100 : 0;
  const total = subtotal - discount;

  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-float ring-1 ring-ink/8 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
        <div className="min-w-0">
          <p className="font-display text-lg font-bold text-ink">Build your routine</p>
          <p className="text-sm text-ink-muted">Mix &amp; match any products — the more you add, the more you save.</p>
        </div>
        <DemoBadge className="shrink-0 whitespace-nowrap" />
      </div>

      <LayoutGroup id="bundle">
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((it) => {
            const on = picked.includes(it.id);
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => toggle(it.id)}
                  aria-pressed={on}
                  className={cn(
                    "group relative flex h-full w-full flex-col rounded-2xl p-3 text-left ring-1 transition duration-300",
                    on ? "bg-ice ring-brand/50" : "bg-stage ring-ink/8 hover:-translate-y-1 hover:ring-ink/20",
                  )}
                >
                  <div className="relative grid h-20 place-items-center">
                    {!on && (
                      <motion.div layoutId={`art-${it.id}`} transition={{ type: "spring", stiffness: 300, damping: 26 }}>
                        <Bottle color={it.color} cap={it.cap} />
                      </motion.div>
                    )}
                    {on && (
                      <div className="grid size-12 place-items-center rounded-full border-2 border-dashed border-brand-700/30 text-brand-700">
                        <PackageOpen aria-hidden className="size-5" />
                      </div>
                    )}
                  </div>
                  <span className="mt-2 text-sm leading-tight font-semibold text-ink">{it.name}</span>
                  <span className="mt-0.5 text-sm text-ink-muted">${it.price.toFixed(2)}</span>
                  <span
                    className={cn(
                      "absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-full text-white transition",
                      on ? "bg-red" : "bg-blue-ink group-hover:scale-110",
                    )}
                    aria-hidden
                  >
                    {on ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                  <span className="sr-only">{on ? `Remove ${it.name} from bundle` : `Add ${it.name} to bundle`}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 rounded-2xl bg-ice p-3 ring-1 ring-powder">
          <div className="flex min-h-16 items-center gap-2 overflow-x-auto overflow-y-hidden">
            <AnimatePresence initial={false}>
              {picked.length === 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-2 text-sm text-brand-700">
                  Your bundle is empty — add a product above.
                </motion.p>
              )}
            </AnimatePresence>
            {picked.map((id) => {
              const it = items.find((i) => i.id === id)!;
              return (
                <motion.div
                  key={id}
                  layoutId={`art-${id}`}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="grid size-16 shrink-0 place-items-center rounded-xl bg-white shadow-soft ring-1 ring-ink/6"
                >
                  <Bottle color={it.color} cap={it.cap} small />
                </motion.div>
              );
            })}
          </div>

          <ol className="mt-3 grid grid-cols-3 gap-2" aria-label="Bundle discount tiers">
            {tiers.map((t) => {
              const reached = picked.length >= t.count;
              return (
                <li
                  key={t.count}
                  className={cn(
                    "rounded-xl px-3 py-2 text-center text-xs font-semibold ring-1 transition duration-300",
                    reached ? "bg-red text-white ring-red" : "bg-white text-blue-ink ring-powder",
                  )}
                >
                  Buy {t.count} · {t.off}% off
                </li>
              );
            })}
          </ol>
        </div>
      </LayoutGroup>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4" aria-live="polite">
        <div>
          <AnimatePresence mode="wait">
            <motion.p
              key={nextTier?.count ?? "max"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-700"
            >
              <Sparkles aria-hidden className="size-4" />
              {nextTier
                ? `Add ${nextTier.count - picked.length} more to save ${nextTier.off}%`
                : "Top tier unlocked — 20% off the bundle"}
            </motion.p>
          </AnimatePresence>
          <p className="mt-1 text-xs text-ink-subtle">
            Subtotal ${subtotal.toFixed(2)}
            {discount > 0 && ` · Bundle saving −$${discount.toFixed(2)}`}
          </p>
          <button
            type="button"
            onClick={() => setPicked([])}
            className="hit-area mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink"
          >
            <RotateCcw aria-hidden className="size-3.5" /> Clear bundle
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-subtle">Bundle total (demo)</p>
          <motion.p key={total} initial={{ scale: 0.9, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-3xl font-bold text-ink tabular-nums">
            ${total.toFixed(2)}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function Bottle({ color, cap, small }: { color: string; cap: string; small?: boolean }) {
  return (
    <svg viewBox="0 0 48 72" className={small ? "h-12 w-auto" : "h-[4.5rem] w-auto"} aria-hidden>
      <rect x="17" y="2" width="14" height="12" rx="3" fill={cap} />
      <rect x="20" y="13" width="8" height="6" fill={cap} opacity="0.7" />
      <rect x="8" y="18" width="32" height="52" rx="10" fill={color} />
      <rect x="13" y="34" width="22" height="18" rx="4" fill="#fff" opacity="0.75" />
      <rect x="16" y="39" width="16" height="2.5" rx="1.25" fill={cap} opacity="0.5" />
      <rect x="16" y="44" width="10" height="2.5" rx="1.25" fill={cap} opacity="0.35" />
      <rect x="12" y="22" width="5" height="40" rx="2.5" fill="#fff" opacity="0.35" />
    </svg>
  );
}
