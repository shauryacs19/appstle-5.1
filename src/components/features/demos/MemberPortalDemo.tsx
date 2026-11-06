"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpCircle, Crown, Pause, Play, RotateCcw, SkipForward, XCircle } from "lucide-react";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";
import { demoDate } from "./demoDates";

const tiers = ["Bronze", "Silver", "Gold"] as const;
const reasons = [
  { id: "using", label: "I’m not using my perks enough", offer: "Skip your next renewal instead", outcome: "Next renewal skipped" },
  { id: "break", label: "I need a break", offer: "Pause your membership for a month", outcome: "Membership paused" },
  { id: "price", label: "It costs too much", offer: "Switch to the Bronze tier", outcome: "Switched to Bronze" },
] as const;
type View = "details" | "cancel" | "saved" | "cancelled";

export function MemberPortalDemo() {
  const [tier, setTier] = useState<(typeof tiers)[number]>("Silver");
  const [paused, setPaused] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [view, setView] = useState<View>("details");
  const [note, setNote] = useState("Membership active");

  const renewals = [30, 60, 90].map((d, i) => ({ i, date: demoDate(d) }));
  const upgrade = () => {
    const next = tiers[tiers.indexOf(tier) + 1];
    if (!next) return;
    setTier(next);
    setNote(`Upgraded to ${next} — unused time on ${tier} is applied as a discount`);
  };
  const accept = (r: (typeof reasons)[number]) => {
    if (r.id === "using") setSkipped(true);
    if (r.id === "break") setPaused(true);
    if (r.id === "price") setTier("Bronze");
    setNote(r.outcome);
    setView("saved");
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-navy">Membership details</p>
          <p className="text-xs text-ink-subtle">Member portal · magic link from the welcome email</p>
        </div>
        <DemoBadge />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={view} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="mt-5">
          {view === "details" && (
            <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
              <div className="rounded-2xl bg-lavender-50 p-4 ring-1 ring-lavender-200">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-10 place-items-center rounded-xl bg-lavender-700 text-white">
                    <Crown aria-hidden className="size-5" />
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-navy">{tier} Membership</p>
                    <p className="text-xs text-ink-muted">Billed monthly</p>
                  </div>
                  <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[0.7rem] font-bold", paused ? "bg-coral-100 text-coral-700" : "bg-mint-100 text-mint-700")}>
                    {paused ? "Paused" : "Active"}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <PortalButton icon={paused ? Play : Pause} label={paused ? "Resume" : "Pause"} onClick={() => { setPaused(!paused); setNote(paused ? "Membership resumed" : "Membership paused"); }} />
                  <PortalButton icon={SkipForward} label={skipped ? "Unskip renewal" : "Skip renewal"} disabled={paused} onClick={() => { setSkipped(!skipped); setNote(skipped ? "Renewal restored" : `Renewal on ${renewals[0].date} skipped`); }} />
                  <PortalButton icon={ArrowUpCircle} label="Upgrade tier" disabled={tier === "Gold"} onClick={upgrade} />
                  <PortalButton icon={XCircle} label="Cancel" onClick={() => setView("cancel")} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Upcoming member renewals</p>
                <ol className={cn("mt-2 grid gap-1.5", paused && "opacity-45")}>
                  {renewals.map((r) => (
                    <li key={r.i} className={cn("flex justify-between rounded-xl px-3 py-2 text-sm ring-1", r.i === 0 && skipped ? "bg-cream-100 text-ink-subtle ring-navy/6" : "text-navy ring-navy/10")}>
                      <span className={cn(r.i === 0 && skipped && "line-through")}>{r.date}</span>
                      <span className="text-xs text-ink-subtle">{r.i === 0 && skipped ? "Skipped" : tier}</span>
                    </li>
                  ))}
                </ol>
                <p aria-live="polite" className="mt-3 rounded-xl bg-lavender-50 px-3 py-2 text-xs font-medium text-lavender-700">
                  {note}
                </p>
              </div>
            </div>
          )}

          {view === "cancel" && (
            <fieldset>
              <legend className="text-[0.95rem] font-semibold text-navy">Why do you want to cancel?</legend>
              <div className="mt-3 grid gap-2">
                {reasons.map((r) => (
                  <div key={r.id} className="rounded-xl p-3 ring-1 ring-navy/10">
                    <p className="text-sm font-medium text-navy">{r.label}</p>
                    <button type="button" onClick={() => accept(r)} className="mt-2 rounded-lg bg-lavender-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-navy">
                      {r.offer}
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => { setNote("Membership cancelled"); setView("cancelled"); }} className="mt-3 text-sm font-medium text-ink-muted hover:text-navy">
                No thanks, cancel my membership
              </button>
            </fieldset>
          )}

          {(view === "saved" || view === "cancelled") && (
            <div className={cn("rounded-2xl p-5 text-center ring-1", view === "saved" ? "bg-mint-50 ring-mint-200" : "bg-cream-50 ring-navy/8")} aria-live="polite">
              <p className="font-display text-xl font-bold text-navy">{view === "saved" ? "You’re all set" : "Membership cancelled"}</p>
              <p className="mt-1 text-sm text-ink-muted">{note}</p>
              <button
                type="button"
                onClick={() => {
                  setView("details");
                  if (view === "cancelled") setNote("Membership active");
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-lavender-700 hover:underline"
              >
                <RotateCcw aria-hidden className="size-3.5" /> Back to membership details
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PortalButton({ icon: Icon, label, onClick, disabled }: { icon: typeof Pause; label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-left text-[0.8rem] font-semibold text-navy ring-1 ring-navy/10 transition hover:ring-lavender-700/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
    >
      <Icon aria-hidden className="size-3.5 shrink-0 text-lavender-700" />
      {label}
    </button>
  );
}
