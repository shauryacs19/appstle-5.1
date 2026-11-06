"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, HeartHandshake, PartyPopper, RotateCcw } from "lucide-react";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";
import { demoDate } from "./demoDates";

const reasons = [
  { id: "too-much", label: "I have too much product", offer: { type: "Update Frequency", title: "Get it less often instead", body: "Switch to a delivery every 4 weeks — no need to cancel.", accept: "Change to every 4 weeks" } },
  { id: "price", label: "It’s too expensive", offer: { type: "Offer Discount", title: "Here’s 15% off your next 3 orders", body: "We’d love to keep you. The discount applies automatically.", accept: "Apply 15% off" } },
  { id: "other-product", label: "I want to try something else", offer: { type: "Swap Products", title: "Swap to another product", body: "Keep your subscription and choose a different product for your next order.", accept: "Swap my product" } },
  { id: "break", label: "I just need a break", offer: { type: "Pause Subscription", title: "Pause for a month", body: `Nothing ships until ${demoDate(35)}. Resume anytime from your portal.`, accept: "Pause for 1 month" } },
] as const;
type Step = { kind: "start" } | { kind: "reasons" } | { kind: "offer"; reason: (typeof reasons)[number] } | { kind: "saved"; reason: (typeof reasons)[number] } | { kind: "cancelled" };

export function RetentionFlowDemo() {
  const [step, setStep] = useState<Step>({ kind: "start" });
  const [tally, setTally] = useState({ saved: 0, lost: 0 });
  const total = tally.saved + tally.lost;

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-navy">Cancel subscription</p>
          <p className="text-xs text-ink-subtle">Customer portal · retention offers</p>
        </div>
        <DemoBadge />
      </div>

      <div className="relative mt-5 min-h-[16.5rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step.kind + ("reason" in step ? step.reason.id : "")} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            {step.kind === "start" && (
              <div className="rounded-2xl bg-cream-50 p-5 text-center ring-1 ring-navy/6">
                <p className="text-[0.95rem] font-semibold text-navy">Weekly Coffee Pods</p>
                <p className="mt-1 text-sm text-ink-muted">Next order {demoDate(7)}</p>
                <button type="button" onClick={() => setStep({ kind: "reasons" })} className="mt-5 rounded-xl px-4 py-2 text-sm font-semibold text-coral-700 ring-1 ring-coral-200 transition hover:bg-coral-50">
                  Cancel subscription
                </button>
              </div>
            )}

            {step.kind === "reasons" && (
              <fieldset>
                <legend className="text-[0.95rem] font-semibold text-navy">Why do you want to cancel?</legend>
                <div className="mt-3 grid gap-2">
                  {reasons.map((r) => (
                    <button key={r.id} type="button" onClick={() => setStep({ kind: "offer", reason: r })} className="rounded-xl bg-white px-4 py-3 text-left text-sm font-medium text-navy ring-1 ring-navy/12 transition hover:bg-cobalt-50 hover:ring-cobalt/40">
                      {r.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step.kind === "offer" && (
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-cobalt-700 uppercase">
                  <HeartHandshake aria-hidden className="size-4" /> Before you go · {step.reason.offer.type}
                </p>
                <p className="mt-3 font-display text-xl font-bold text-navy">{step.reason.offer.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.reason.offer.body}</p>
                <div className="mt-5 grid gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTally((t) => ({ ...t, saved: t.saved + 1 }));
                      setStep({ kind: "saved", reason: step.reason });
                    }}
                    className="rounded-xl bg-cobalt px-4 py-3 text-sm font-semibold text-white transition hover:bg-cobalt-600"
                  >
                    {step.reason.offer.accept}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTally((t) => ({ ...t, lost: t.lost + 1 }));
                      setStep({ kind: "cancelled" });
                    }}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-cream-100 hover:text-navy"
                  >
                    No thanks, continue to cancel
                  </button>
                </div>
                <button type="button" onClick={() => setStep({ kind: "reasons" })} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink-subtle hover:text-navy">
                  <ArrowLeft aria-hidden className="size-3.5" /> Back
                </button>
              </div>
            )}

            {(step.kind === "saved" || step.kind === "cancelled") && (
              <div className={cn("rounded-2xl p-5 text-center ring-1", step.kind === "saved" ? "bg-mint-50 ring-mint-200" : "bg-cream-50 ring-navy/8")}>
                {step.kind === "saved" && <PartyPopper aria-hidden className="mx-auto size-7 text-mint-700" />}
                <p className="mt-2 font-display text-xl font-bold text-navy">{step.kind === "saved" ? "You’re all set" : "Subscription cancelled"}</p>
                <p className="mt-1 text-sm text-ink-muted">{step.kind === "saved" ? `${step.reason.offer.type} applied — the subscription stays active.` : "The merchant sees the reason in their cancellation report."}</p>
                <button type="button" onClick={() => setStep({ kind: "start" })} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-700 hover:underline">
                  <RotateCcw aria-hidden className="size-3.5" /> Try another reason
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-navy/8 pt-3 text-xs text-ink-muted">
        <span>Your save rate in this demo</span>
        <span className="font-semibold text-navy tabular-nums">
          {total ? `${Math.round((tally.saved / total) * 100)}% · ${tally.saved} saved of ${total}` : "—"}
        </span>
      </div>
    </div>
  );
}
