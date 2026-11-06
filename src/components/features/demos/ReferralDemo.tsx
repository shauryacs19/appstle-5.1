"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Gift, RotateCcw, ShoppingBag, UserPlus, Users } from "lucide-react";
import { useId, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const LINK = "yourstore.com/?ref=ALEX250";
const START = 500;
const steps = [
  { id: "visit", label: "Friend opens your link", icon: Users },
  { id: "signup", label: "Friend creates an account", icon: UserPlus },
  { id: "order", label: "Friend places an order", icon: ShoppingBag },
] as const;
type Trigger = "signup" | "order";

export function ReferralDemo() {
  const [trigger, setTrigger] = useState<Trigger>("order");
  const [done, setDone] = useState(0);
  const [copied, setCopied] = useState(false);
  const linkId = useId();
  const triggerIndex = steps.findIndex((s) => s.id === trigger);
  const rewarded = done > triggerIndex;
  const points = START + (rewarded ? 250 : 0);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${LINK}`);
    } catch {
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg font-bold text-navy">Refer a friend</p>
        <DemoBadge />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-coral-50 p-4 ring-1 ring-coral-100">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-white p-3 ring-1 ring-navy/6">
              <p className="text-[0.7rem] font-semibold tracking-wide text-coral-700 uppercase">They get</p>
              <p className="mt-1 font-display text-lg font-bold text-navy">$10 off</p>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-navy/6">
              <p className="text-[0.7rem] font-semibold tracking-wide text-coral-700 uppercase">You get</p>
              <p className="mt-1 font-display text-lg font-bold text-navy">250 points</p>
            </div>
          </div>
          <label className="mt-3 block text-xs font-semibold text-navy" htmlFor={linkId}>
            Your referral link
          </label>
          <div className="mt-1 flex gap-2">
            <input id={linkId} readOnly value={LINK} className="min-w-0 flex-1 rounded-xl bg-white px-3 py-2 text-xs text-navy ring-1 ring-navy/10" />
            <button type="button" onClick={copy} className="inline-flex items-center gap-1 rounded-xl bg-coral-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-coral-700/90">
              {copied ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <fieldset className="mt-4">
            <legend className="text-xs font-semibold text-navy">Reward both sides when the friend…</legend>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {(["signup", "order"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={trigger === t}
                  onClick={() => setTrigger(t)}
                  className={cn("rounded-full px-3 py-1 text-xs font-semibold ring-1 transition", trigger === t ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-navy/15 hover:ring-navy/30")}
                >
                  {t === "signup" ? "creates an account" : "places an order"}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <ol className="grid gap-2">
            {steps.map((s, i) => {
              const isDone = i < done;
              const Icon = s.icon;
              return (
                <li key={s.id} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ring-1 transition", isDone ? "bg-mint-50 text-navy ring-mint-200" : "bg-cream-50 text-ink-muted ring-navy/6")}>
                  <span className={cn("grid size-7 shrink-0 place-items-center rounded-full", isDone ? "bg-mint-700 text-white" : "bg-white text-ink-subtle ring-1 ring-navy/10")}>
                    {isDone ? <Check aria-hidden className="size-3.5" /> : <Icon aria-hidden className="size-3.5" />}
                  </span>
                  {s.label}
                  {i === triggerIndex && (
                    <span className="ml-auto">
                      <Gift aria-hidden className="size-4 text-coral-700" />
                      <span className="sr-only">Rewards are issued at this step</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={done >= steps.length}
              onClick={() => setDone((d) => d + 1)}
              className="flex-1 rounded-xl bg-cobalt px-3 py-2 text-sm font-semibold text-white transition hover:bg-cobalt-600 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {done < steps.length ? `Next: ${steps[done].label.replace("Friend ", "friend ")}` : "Journey complete"}
            </button>
            <button type="button" onClick={() => setDone(0)} aria-label="Start over" className="grid size-10 place-items-center rounded-xl text-ink-subtle ring-1 ring-navy/10 transition hover:text-navy">
              <RotateCcw aria-hidden className="size-4" />
            </button>
          </div>
          <div aria-live="polite" className="mt-3 min-h-[3.25rem]">
            <AnimatePresence mode="wait">
              <motion.p key={rewarded ? "yes" : "no"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl bg-cobalt-50 px-3 py-2 text-xs font-medium text-cobalt-700">
                {rewarded ? `Friend’s $10 off code sent by email · your balance is now ${points} points` : `Your balance: ${points} points · rewards are issued when the friend ${trigger === "signup" ? "creates an account" : "places an order"}`}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
