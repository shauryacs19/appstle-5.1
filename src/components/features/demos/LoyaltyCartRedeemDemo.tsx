"use client";

import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, Coins, Info, X } from "lucide-react";
import { useId, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const ITEMS = [
  { name: "Coffee Pods · 12 pack", price: 36 },
  { name: "Ceramic Mug", price: 24 },
];
const SHIPPING = 6;
const START_POINTS = 1250;
const CREDIT = 5;
const rewards = [
  { id: "five", label: "$5 off your order", cost: 500, code: "LOYAL-5OFF", value: (sub: number) => Math.min(5, sub) },
  { id: "ship", label: "Free shipping", cost: 200, code: "LOYAL-FREESHIP", value: () => SHIPPING },
  { id: "ten", label: "10% off your order", cost: 900, code: "LOYAL-10PCT", value: (sub: number) => Math.round(sub * 0.1 * 100) / 100 },
] as const;
type RewardId = (typeof rewards)[number]["id"];

const money = (n: number) => `$${n.toFixed(2)}`;

export function LoyaltyCartRedeemDemo() {
  const [applied, setApplied] = useState<RewardId | null>(null);
  const [useCredit, setUseCredit] = useState(false);
  const id = useId();

  const subtotal = ITEMS.reduce((s, i) => s + i.price, 0);
  const reward = rewards.find((r) => r.id === applied);
  const discount = reward ? reward.value(subtotal) : 0;
  const points = START_POINTS - (reward?.cost ?? 0);
  const beforeCredit = subtotal + SHIPPING - discount;
  const credit = useCredit ? Math.min(CREDIT, beforeCredit) : 0;
  const total = beforeCredit - credit;

  return (
    <div className="w-full rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg font-bold text-navy">Your cart</p>
        <DemoBadge />
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-[1fr_1.05fr]">
        <ul className="grid content-start gap-2">
          {ITEMS.map((i) => (
            <li key={i.name} className="flex items-center gap-3 rounded-2xl bg-cream-50 p-3 ring-1 ring-navy/6">
              <span aria-hidden className="size-10 shrink-0 rounded-xl bg-gradient-to-br from-peach to-coral-200" />
              <span className="flex-1 text-sm font-medium text-navy">{i.name}</span>
              <span className="text-sm text-ink-muted">{money(i.price)}</span>
            </li>
          ))}
          <li className="mt-1 rounded-2xl bg-coral-50 p-3.5 ring-1 ring-coral-100">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy">
              <Coins aria-hidden className="size-4 text-coral-700" /> Redeem your rewards
            </p>
            <p className="mt-1 text-xs text-ink-muted" aria-live="polite">
              <strong className="text-navy tabular-nums">{points.toLocaleString("en-US")}</strong> points · {money(CREDIT)} store credit
            </p>
            <fieldset className="mt-3">
              <legend className="sr-only">Choose a reward</legend>
              <div className="grid gap-1.5">
                {rewards.map((r) => {
                  const on = applied === r.id;
                  const affordable = START_POINTS >= r.cost;
                  return (
                    <label
                      key={r.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 text-[0.8rem] ring-1 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt",
                        on ? "bg-white font-semibold text-navy ring-coral-700" : "bg-white/70 text-navy ring-navy/10 hover:ring-navy/25",
                        !affordable && "cursor-not-allowed opacity-50",
                      )}
                    >
                      <input type="radio" name={`${id}-reward`} className="sr-only" checked={on} disabled={!affordable} onChange={() => setApplied(r.id)} />
                      <span>{r.label}</span>
                      <span className="text-ink-subtle tabular-nums">{r.cost} pts</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <p className="mt-2 flex items-start gap-1.5 text-[0.7rem] leading-snug text-ink-subtle">
              <Info aria-hidden className="mt-px size-3 shrink-0" /> Shopify allows one discount code per order — choosing another reward replaces it.
            </p>
          </li>
        </ul>

        <div className="rounded-2xl bg-cream-50 p-4 ring-1 ring-navy/6">
          <dl className="grid gap-1.5 text-sm">
            <Row label="Subtotal" value={money(subtotal)} />
            <Row label="Shipping" value={money(SHIPPING)} />
            <AnimatePresence initial={false}>
              {reward && (
                <motion.div key={reward.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="flex items-center justify-between gap-2 py-0.5 text-mint-700">
                    <dt className="flex items-center gap-1.5">
                      <BadgeCheck aria-hidden className="size-3.5" />
                      <span className="rounded bg-mint-100 px-1.5 py-0.5 font-mono text-[0.7rem] font-semibold">{reward.code}</span>
                      <button type="button" onClick={() => setApplied(null)} aria-label="Remove reward" className="grid size-5 place-items-center rounded-full text-ink-subtle hover:bg-white hover:text-navy">
                        <X aria-hidden className="size-3" />
                      </button>
                    </dt>
                    <dd className="font-semibold tabular-nums">−{money(discount)}</dd>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {useCredit && <Row label="Store credit" value={`−${money(credit)}`} className="text-mint-700" />}
          </dl>
          <label className="mt-3 flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 text-sm text-navy ring-1 ring-navy/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt">
            <span>Use {money(CREDIT)} store credit</span>
            <input type="checkbox" className="sr-only" checked={useCredit} onChange={(e) => setUseCredit(e.target.checked)} />
            <span aria-hidden className={cn("relative h-5 w-9 rounded-full transition-colors", useCredit ? "bg-coral-700" : "bg-navy/20")}>
              <motion.span className="absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-soft" animate={{ x: useCredit ? 16 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
            </span>
          </label>
          <div className="mt-4 flex items-end justify-between border-t border-navy/8 pt-3" aria-live="polite">
            <span className="text-sm text-ink-muted">Total</span>
            <motion.span key={total} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-2xl font-bold text-navy tabular-nums">
              {money(total)}
            </motion.span>
          </div>
          <p className="mt-2 text-[0.7rem] leading-snug text-ink-subtle">Store credit is applied at checkout through Shopify customer accounts.</p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-2 text-ink-muted", className)}>
      <dt>{label}</dt>
      <dd className="font-medium text-navy tabular-nums">{value}</dd>
    </div>
  );
}
