"use client";

import { motion } from "motion/react";
import { Check, Crown, Lock, Tag } from "lucide-react";
import { useId, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const tiers = [
  { id: "silver", label: "Silver", milestone: 100, swatch: "from-[#9EA6B4] to-[#DCE1EA]", perks: ["1 point for every $1 spent", "Birthday reward"] },
  { id: "gold", label: "Gold", milestone: 300, swatch: "from-[#C9962B] to-[#F3D77A]", perks: ["2 points for every $1 spent", "Free shipping reward"] },
  { id: "platinum", label: "Platinum", milestone: 500, swatch: "from-[#5A6278] to-[#B9C0D0]", perks: ["3 points for every $1 spent", "Early access to sales"] },
] as const;
const MAX = 600;

export function VipTierDemo() {
  const [spent, setSpent] = useState(180);
  const id = useId();
  const current = [...tiers].reverse().find((t) => spent >= t.milestone);
  const next = tiers.find((t) => spent < t.milestone);
  const prevMilestone = current?.milestone ?? 0;
  const progress = next ? (spent - prevMilestone) / (next.milestone - prevMilestone) : 1;

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          <Crown aria-hidden className="size-5 text-coral-700" /> VIP program
        </p>
        <DemoBadge />
      </div>

      <div className="mt-5 rounded-2xl bg-cream-50 p-4 ring-1 ring-navy/6">
        <label htmlFor={`${id}-spend`} className="flex items-baseline justify-between text-sm font-semibold text-navy">
          Amount spent
          <span className="font-display text-2xl tabular-nums">${spent}</span>
        </label>
        <input
          id={`${id}-spend`}
          type="range"
          min={0}
          max={MAX}
          step={10}
          value={spent}
          onChange={(e) => setSpent(Number(e.target.value))}
          className="mt-2 w-full accent-coral-700"
          aria-describedby={`${id}-status`}
        />
        <div aria-hidden className="relative mt-1 h-4 text-[0.65rem] text-ink-subtle">
          {tiers.map((t) => (
            <span key={t.id} className="absolute -translate-x-1/2" style={{ left: `${(t.milestone / MAX) * 100}%` }}>
              ${t.milestone}
            </span>
          ))}
        </div>
        <p id={`${id}-status`} aria-live="polite" className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          {current ? (
            <>
              Current tier <strong className="text-navy">{current.label}</strong>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-navy ring-1 ring-navy/10">
                <Tag aria-hidden className="size-3" /> VIP-{current.label}
              </span>
            </>
          ) : (
            <>Not in a tier yet</>
          )}
          {next && <span>· spend ${next.milestone - spent} more to reach {next.label}</span>}
        </p>
        <div aria-hidden className="mt-2 h-2 overflow-hidden rounded-full bg-cream-200">
          <motion.div className="h-full rounded-full bg-coral-700" animate={{ width: `${Math.min(1, Math.max(0, progress)) * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
        </div>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {tiers.map((t) => {
          const reached = spent >= t.milestone;
          return (
            <li
              key={t.id}
              className={cn(
                "rounded-2xl p-4 ring-1 transition duration-300",
                reached ? "bg-white ring-coral-200 shadow-card" : "bg-cream-50 ring-navy/8",
                current?.id === t.id && "ring-2 ring-coral-700",
              )}
            >
              <div className="flex items-center gap-2.5">
                <span aria-hidden className={cn("grid size-8 place-items-center rounded-full bg-gradient-to-br", t.swatch, !reached && "opacity-40 grayscale")}>
                  {reached ? <Crown className="size-4 text-white" /> : <Lock className="size-3.5 text-white" />}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{t.label}</p>
                  <p className="text-xs text-ink-subtle">Spend ${t.milestone}</p>
                </div>
              </div>
              <ul className="mt-3 grid gap-1.5">
                {t.perks.map((p) => (
                  <li key={p} className={cn("flex items-start gap-1.5 text-xs leading-snug", reached ? "text-navy" : "text-ink-subtle")}>
                    <Check aria-hidden className={cn("mt-px size-3.5 shrink-0", reached ? "text-mint-700" : "text-navy/25")} />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="sr-only">{reached ? "Unlocked" : "Locked"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
