"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Crown, Lock, RotateCcw } from "lucide-react";
import { useId, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const plans = [
  { id: "silver", label: "Silver", monthly: 9, discount: 10, perks: 2 },
  { id: "gold", label: "Gold", monthly: 19, discount: 20, perks: 4 },
] as const;

const perkList = ["Member-only prices", "Free shipping", "Early access to drops", "Members-only products"];

const CART = 80;

export function MembershipJoinDemo() {
  const [planId, setPlanId] = useState<(typeof plans)[number]["id"]>("gold");
  const [yearly, setYearly] = useState(false);
  const [joined, setJoined] = useState(false);
  const id = useId();
  const plan = plans.find((p) => p.id === planId)!;
  const price = yearly ? Math.round(plan.monthly * 12 * 0.8) : plan.monthly;
  const memberCart = CART * (1 - plan.discount / 100);

  return (
    <div className="w-full rounded-3xl bg-white p-5 ring-1 ring-ink/8 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-lg font-bold text-ink">Join the club</p>
        <DemoBadge />
      </div>

      <div role="group" aria-label="Billing" className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-stage p-1 ring-1 ring-stage-line">
        {[false, true].map((y) => (
          <button
            key={String(y)}
            type="button"
            aria-pressed={yearly === y}
            disabled={joined}
            onClick={() => setYearly(y)}
            className={cn(
              "h-8 rounded-full text-xs font-semibold transition-colors disabled:cursor-default",
              yearly === y ? "bg-blue-ink text-white" : "text-ink-muted hover:text-ink",
            )}
          >
            {y ? "Yearly · save 20%" : "Monthly"}
          </button>
        ))}
      </div>

      <fieldset className="mt-3" disabled={joined}>
        <legend className="sr-only">Choose a plan</legend>
        <div className="grid grid-cols-2 gap-2">
          {plans.map((p) => {
            const on = p.id === planId;
            const amount = yearly ? Math.round(p.monthly * 12 * 0.8) : p.monthly;
            return (
              <label
                key={p.id}
                className={cn(
                  "cursor-pointer rounded-2xl px-3.5 py-3 ring-1 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                  on ? "bg-ice ring-brand" : "ring-ink/12 hover:ring-ink/25",
                  joined && !on && "opacity-50",
                )}
              >
                <input type="radio" name={`${id}-plan`} checked={on} onChange={() => setPlanId(p.id)} className="sr-only" />
                <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Crown aria-hidden className={cn("size-4", on ? "text-orange" : "text-ink-subtle")} />
                  {p.label}
                </span>
                <span className="mt-1 block font-display text-xl font-bold text-ink">
                  ${amount}
                  <span className="text-xs font-medium text-ink-muted">/{yearly ? "yr" : "mo"}</span>
                </span>
                <span className="text-xs text-ink-muted">{p.discount}% off every order</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <ul className="mt-4 grid gap-1.5" aria-label={`${plan.label} perks`}>
        {perkList.map((perk, i) => {
          const has = i < plan.perks;
          return (
            <li key={perk} className={cn("flex items-center gap-2 text-sm transition-colors", has ? "text-ink" : "text-ink-subtle")}>
              <span className={cn("grid size-5 place-items-center rounded-full transition-colors", has ? "bg-red text-white" : "bg-stage text-ink-subtle")}>
                {has ? <Check aria-hidden className="size-3" strokeWidth={3} /> : <Lock aria-hidden className="size-2.5" />}
              </span>
              {perk}
              {!has && <span className="sr-only"> (Gold only)</span>}
            </li>
          );
        })}
      </ul>

      <div className="mt-5 border-t border-ink/8 pt-4" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {!joined ? (
            <motion.div key="join" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-ink-subtle">{yearly ? "Billed once a year" : "Billed monthly"}</p>
                <p className="font-display text-2xl font-bold text-ink">${price}.00</p>
              </div>
              <button
                type="button"
                onClick={() => setJoined(true)}
                className="inline-flex h-10 items-center rounded-full bg-blue-ink px-4 text-sm font-semibold text-white transition hover:bg-brand active:scale-95"
              >
                Join {plan.label}
              </button>
            </motion.div>
          ) : (
            <motion.div key="joined" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="grid size-5 place-items-center rounded-full bg-forest text-white">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                You’re a {plan.label} member
              </p>
              <div className="mt-2.5 flex items-center justify-between gap-3 rounded-2xl bg-orange-50 px-3.5 py-3 text-sm ring-1 ring-orange/40">
                <span className="text-ink-muted">Your cart</span>
                <span className="flex items-baseline gap-2">
                  <span className="text-ink-subtle line-through">${CART.toFixed(2)}</span>
                  <span className="font-display text-lg font-bold text-ink">${memberCart.toFixed(2)}</span>
                </span>
              </div>
              <button type="button" onClick={() => setJoined(false)} className="hit-area mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink">
                <RotateCcw aria-hidden className="size-3.5" /> Reset demo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
