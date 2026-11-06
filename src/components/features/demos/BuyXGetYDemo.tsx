"use client";

import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Tag } from "lucide-react";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const PRICE = 12;
const BUY = 2;
const usd = (n: number) => `$${n.toFixed(2)}`;

export function BuyXGetYDemo() {
  const [qty, setQty] = useState(2);
  const free = Math.floor(qty / (BUY + 1));
  const paid = qty - free;
  const toNext = BUY + 1 - (qty % (BUY + 1));
  const message =
    toNext === 1 ? "Add 1 more — it’s free!" : free > 0 ? `${free} free ${free === 1 ? "pair" : "pairs"} unlocked` : `Add ${toNext - 1} more, then the next pair is free`;

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-navy">Merino Wool Socks</p>
          <p className="text-sm text-ink-muted">{usd(PRICE)} a pair</p>
        </div>
        <DemoBadge label="Demo" />
      </div>

      <p className="mt-4 flex items-center gap-2 rounded-xl bg-mint-100 px-3 py-2 text-sm font-semibold text-mint-700">
        <Tag aria-hidden className="size-4" /> Buy 2, get 1 free
      </p>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-cream-50 px-4 py-3 ring-1 ring-navy/6">
        <span className="text-sm font-semibold text-navy">Quantity</span>
        <div className="flex items-center gap-2">
          <Stepper label="Remove one pair" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} icon={Minus} />
          <span className="w-7 text-center font-display text-lg font-bold text-navy tabular-nums" aria-live="polite" aria-label={`${qty} pairs`}>
            {qty}
          </span>
          <Stepper label="Add one pair" onClick={() => setQty((q) => Math.min(9, q + 1))} disabled={qty >= 9} icon={Plus} />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-navy">Cart</p>
        <ul className="mt-2 grid gap-1.5 text-sm">
          <li className="flex justify-between rounded-xl px-3 py-2 ring-1 ring-navy/8">
            <span className="text-navy">Merino Wool Socks × {paid}</span>
            <span className="font-semibold text-navy">{usd(paid * PRICE)}</span>
          </li>
          <AnimatePresence initial={false}>
            {free > 0 && (
              <motion.li
                key="free"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-between overflow-hidden rounded-xl bg-mint-50 px-3 py-2 ring-1 ring-mint-200"
              >
                <span className="text-navy">Merino Wool Socks × {free} · free</span>
                <span className="text-right">
                  <span className="mr-2 text-xs text-ink-subtle line-through">{usd(free * PRICE)}</span>
                  <span className="font-semibold text-mint-700">$0.00</span>
                </span>
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-navy/8 pt-4">
        <p aria-live="polite" className={cn("text-xs font-medium", toNext === 1 ? "text-mint-700" : "text-ink-subtle")}>
          {message}
        </p>
        <p className="font-display text-2xl font-bold text-navy">{usd(paid * PRICE)}</p>
      </div>
    </div>
  );
}

function Stepper({ label, onClick, disabled, icon: Icon }: { label: string; onClick: () => void; disabled: boolean; icon: typeof Plus }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-8 place-items-center rounded-full bg-white text-navy ring-1 ring-navy/15 transition hover:ring-mint-700 disabled:opacity-40"
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}
