"use client";

import { AnimatePresence, motion } from "motion/react";
import { Gift, Lock, Truck } from "lucide-react";
import { useId, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const UNIT = 30;
const tiers = [
  { qty: 1, label: "1 bottle", off: 0 },
  { qty: 2, label: "2 bottles", off: 10, badge: "Most popular" },
  { qty: 3, label: "3 bottles", off: 15 },
] as const;
const gifts = [
  { at: 2, icon: Truck, label: "Free shipping" },
  { at: 3, icon: Gift, label: "Free travel-size cleanser" },
] as const;
const usd = (n: number) => `$${n.toFixed(2)}`;

export function VolumeTiersDemo() {
  const [qty, setQty] = useState<1 | 2 | 3>(2);
  const [added, setAdded] = useState<number | null>(null);
  const name = useId();
  const tier = tiers.find((t) => t.qty === qty)!;
  const full = UNIT * qty;
  const total = full * (1 - tier.off / 100);
  const unlocked = gifts.filter((g) => qty >= g.at);
  const next = gifts.find((g) => qty < g.at);

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-navy">Hydrating Face Serum</p>
          <p className="text-sm text-ink-muted">Bundle &amp; save — the more you buy, the more you save.</p>
        </div>
        <DemoBadge label="Demo" />
      </div>

      <fieldset className="mt-5">
        <legend className="sr-only">Choose a quantity</legend>
        <div className="grid gap-2">
          {tiers.map((t) => {
            const on = qty === t.qty;
            const price = UNIT * t.qty * (1 - t.off / 100);
            return (
              <label
                key={t.qty}
                className={cn(
                  "relative flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 ring-1 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt",
                  on ? "bg-mint-50 ring-2 ring-mint-700" : "ring-navy/12 hover:ring-navy/25",
                )}
              >
                <input type="radio" name={name} checked={on} onChange={() => setQty(t.qty)} className="sr-only" />
                <span aria-hidden className={cn("grid size-5 shrink-0 place-items-center rounded-full ring-2", on ? "ring-mint-700" : "ring-navy/25")}>
                  <motion.span className="size-2.5 rounded-full bg-mint-700" initial={false} animate={{ scale: on ? 1 : 0 }} />
                </span>
                <span className="flex-1">
                  <span className="block text-[0.95rem] font-semibold text-navy">{t.label}</span>
                  <span className="block text-xs text-ink-muted">{t.off ? `Save ${t.off}%` : "Standard price"}</span>
                </span>
                <span className="text-right leading-tight">
                  <span className="block text-sm font-semibold text-navy">{usd(price)}</span>
                  {t.off > 0 && <span className="block text-xs text-ink-subtle line-through">{usd(UNIT * t.qty)}</span>}
                </span>
                {"badge" in t && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-coral px-2 py-0.5 text-[0.68rem] font-bold text-navy">{t.badge}</span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {gifts.map((g) => {
          const open = qty >= g.at;
          const Icon = open ? g.icon : Lock;
          return (
            <motion.div
              key={g.label}
              layout
              className={cn("flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs ring-1", open ? "bg-mint-100 font-semibold text-mint-700 ring-mint-200" : "bg-cream-50 text-ink-subtle ring-navy/8")}
            >
              <Icon aria-hidden className="size-4 shrink-0" />
              <span>{open ? g.label : `Unlocks at ${g.at} bottles`}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-navy/8 pt-4">
        <div aria-live="polite">
          <p className="text-xs text-ink-subtle">
            {added === qty
              ? `${tier.label} added to the demo cart`
              : next
                ? `Add ${next.at - qty} more to unlock ${next.label.toLowerCase()}`
                : `${unlocked.length} gifts unlocked`}
          </p>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p key={total} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-2xl font-bold text-navy">
              {usd(total)}
            </motion.p>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => setAdded(qty)}
          className="rounded-xl bg-mint-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy active:scale-[0.98]"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
