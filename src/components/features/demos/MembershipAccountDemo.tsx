"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CalendarClock, CreditCard, Crown, History, Percent, RotateCcw, Sparkles, Truck } from "lucide-react";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";
import { demoDate } from "./demoDates";

type Tab = "perks" | "renewals" | "payment" | "history";
type Status = "Active" | "Paused" | "Cancelled";

const tabs: { id: Tab; label: string }[] = [
  { id: "perks", label: "Perks" },
  { id: "renewals", label: "Renewals" },
  { id: "payment", label: "Payment" },
  { id: "history", label: "History" },
];

const perks = [
  { icon: Percent, title: "10% off", body: "every order" },
  { icon: Truck, title: "Free shipping", body: "on local orders" },
  { icon: Sparkles, title: "Early access", body: "to new launches" },
];

const reasons = [
  { id: "break", label: "I need a break", offer: "Pause for one renewal instead", outcome: "Paused for one renewal" },
  { id: "price", label: "It costs too much", offer: "Take 20% off your next 2 renewals", outcome: "20% off next 2 renewals applied" },
  { id: "other", label: "Something else", offer: null, outcome: null },
] as const;

const cardTone: Record<Status, string> = {
  Active: "bg-powder ring-sky-blue",
  Paused: "bg-[linear-gradient(135deg,#FFF8EC_0%,#FFEFD2_100%)] ring-[#F5DDB0]",
  Cancelled: "bg-[linear-gradient(135deg,#F6F7F9_0%,#E6EAF0_100%)] ring-line",
};

const PERIOD = 14;
const ELAPSED = 8;

export function MembershipAccountDemo() {
  const [tab, setTab] = useState<Tab>("perks");
  const [status, setStatus] = useState<Status>("Active");
  const [skipped, setSkipped] = useState<number[]>([]);
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState<(typeof reasons)[number]["id"] | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const renewals = [0, 14, 28].map((d, i) => ({ i, date: demoDate(d + 6) }));
  const next = renewals.find((r) => !skipped.includes(r.i));
  const log = (e: string) => setHistory((h) => [e, ...h]);
  const r = reasons.find((x) => x.id === reason);

  const reset = () => {
    setTab("perks");
    setStatus("Active");
    setSkipped([]);
    setCancelling(false);
    setReason(null);
    setHistory([]);
  };

  const toggleSkip = (i: number) => {
    const on = skipped.includes(i);
    setSkipped(on ? skipped.filter((x) => x !== i) : [...skipped, i]);
    log(`${on ? "Unskipped" : "Skipped"} renewal on ${renewals[i].date}`);
  };

  const closeCancel = (to: Tab = tab) => {
    setCancelling(false);
    setReason(null);
    setTab(to);
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-float ring-1 ring-ink/8 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold text-ink">My membership</p>
        <DemoBadge />
      </div>

      <motion.div
        layout
        className={cn("relative mt-4 overflow-hidden rounded-2xl p-4 text-ink ring-1 transition-[background] duration-500", cardTone[status])}
      >
        <span aria-hidden className="absolute -top-10 -right-8 size-36 rounded-full bg-sky-blue/70" />
        <span aria-hidden className="absolute -bottom-14 left-1/3 size-32 rounded-full bg-white/35" />
        <div className="relative flex items-start justify-between gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-red text-white ring-0">
            <Crown aria-hidden className="size-5" />
          </span>
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", status === "Active" ? "bg-white text-[var(--color-brand-700)] ring-[#CFE0FB]" : status === "Paused" ? "bg-white text-[#8A5A00] ring-[#F5DDB0]" : "bg-white text-ink-muted ring-line")}>{status}</span>
        </div>
        <p className="relative mt-4 font-display text-xl leading-tight font-bold text-ink">2 Week Membership</p>
        <div className="relative mt-3 flex items-end justify-between gap-3 text-xs">
          <div>
            <p className="text-ink-muted">Member</p>
            <p className="text-sm font-semibold">Alex Morgan</p>
          </div>
          <p className="font-semibold tracking-[0.14em] text-[var(--color-brand-700)] tabular-nums">1889 0824 1066</p>
        </div>
      </motion.div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-medium text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock aria-hidden className="size-3.5" />
            {status === "Cancelled" ? "No more renewals" : `Renews ${next?.date ?? "—"} · every 2 weeks`}
          </span>
          <span>{status === "Cancelled" ? "Ends at period end" : `${PERIOD - ELAPSED} days left`}</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#EAF1FD]">
          <motion.div
            className={cn("h-full rounded-full", status === "Cancelled" ? "bg-ink-subtle" : "bg-[var(--color-brand-700)]")}
            initial={false}
            animate={{ width: `${(ELAPSED / PERIOD) * 100}%` }}
          />
        </div>
      </div>

      {!cancelling ? (
        <>
          <LayoutGroup id="member-tabs">
            <div role="tablist" aria-label="Membership" className="mt-4 grid grid-cols-4 gap-1 rounded-full bg-[#EFE8DB] p-1 ring-1 ring-line">
              {tabs.map((t) => {
                const on = t.id === tab;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(t.id)}
                    className={cn("relative h-8 rounded-full text-xs font-semibold transition-colors", on ? "text-ink" : "text-ink-muted hover:text-ink")}
                  >
                    {on && <motion.span layoutId="member-tab" className="absolute inset-0 rounded-full bg-white shadow-soft" transition={{ duration: 0.25 }} />}
                    <span className="relative">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={tab}
              role="tabpanel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="mt-3 min-h-[8.5rem]"
            >
              {tab === "perks" && (
                <ul className="grid grid-cols-3 gap-2">
                  {perks.map(({ icon: Icon, title, body }) => (
                    <li key={title} className={cn("rounded-xl bg-[#EAF1FD] p-3 ring-1 ring-[#CFE0FB]", status === "Cancelled" && "opacity-60")}>
                      <Icon aria-hidden className="size-4 text-[var(--color-brand-700)]" />
                      <p className="mt-2 text-sm font-semibold text-ink">{title}</p>
                      <p className="text-xs text-ink-muted">{body}</p>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "renewals" &&
                (status === "Cancelled" ? (
                  <p className="text-sm text-ink-muted">No renewals. This membership is cancelled.</p>
                ) : (
                  <ol className="relative grid gap-2 pl-5 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-[#CFE0FB]">
                    {renewals.map(({ i, date }) => {
                      const off = skipped.includes(i);
                      return (
                        <li key={i} className="relative flex items-center justify-between gap-3">
                          <span className={cn("absolute top-1/2 -left-5 size-[11px] -translate-y-1/2 rounded-full ring-2 ring-white", off ? "bg-[#DACDB8]" : "bg-[var(--color-brand-700)]")} />
                          <span className={cn("text-sm text-ink", off && "text-ink-subtle line-through")}>
                            {date} <span className="text-ink-muted">· $24.00</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleSkip(i)}
                            className="hit-area rounded-full px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-700)] ring-1 ring-[var(--color-brand-700)]/25 hover:bg-[#EAF1FD]"
                          >
                            {off ? "Unskip" : "Skip"}
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                ))}

              {tab === "payment" && (
                <div className="flex items-center gap-3 rounded-xl bg-surface-2 p-3 ring-1 ring-navy/6">
                  <span className="grid h-9 w-12 place-items-center rounded-md bg-[linear-gradient(135deg,#1A1F71,#2B3AA8)] text-xs font-bold tracking-wide text-white italic">VISA</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">Visa ending 4242</p>
                    <p className="text-xs text-ink-muted">Expires 08/28 · $24.00 each renewal</p>
                  </div>
                  <CreditCard aria-hidden className="size-4 text-ink-subtle" />
                </div>
              )}

              {tab === "history" && (
                <ul className="grid gap-2 text-sm">
                  {[...history, `Renewed · ${demoDate(-6)}`, `Membership started · ${demoDate(-62)}`].map((h, i) => (
                    <li key={`${h}-${i}`} className="flex items-center gap-2">
                      <History aria-hidden className={cn("size-3.5 shrink-0", i < history.length ? "text-[var(--color-brand-700)]" : "text-ink-subtle")} />
                      <span className={i < history.length ? "font-semibold text-ink" : "text-ink-muted"}>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 min-h-[10.5rem] rounded-2xl bg-[#EAF1FD] p-3.5 ring-1 ring-[#CFE0FB]">
          {!r ? (
            <fieldset>
              <legend className="text-sm font-semibold text-ink">Sorry to see you go. What’s the reason?</legend>
              <div className="mt-2.5 grid gap-1.5">
                {reasons.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setReason(x.id)}
                    className="rounded-xl bg-white px-3 py-2 text-left text-sm text-ink ring-1 ring-navy/10 hover:ring-[var(--color-brand-700)]/40"
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : (
            <div className="grid gap-2">
              {r.offer && (
                <>
                  <p className="text-sm font-semibold text-ink">Before you go, how about this?</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (r.id === "break") {
                        setStatus("Paused");
                        if (next) setSkipped([...skipped, next.i]);
                      }
                      log(r.outcome!);
                      closeCancel("history");
                    }}
                    className="rounded-xl bg-[var(--color-brand-700)] px-3 py-2.5 text-left text-sm font-semibold text-white hover:bg-[var(--color-brand-ink)]"
                  >
                    {r.offer}
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  setStatus("Cancelled");
                  log("Membership cancelled");
                  closeCancel("history");
                }}
                className="rounded-xl bg-white px-3 py-2 text-left text-sm font-semibold text-[#A12B2B] ring-1 ring-[#A12B2B]/25 hover:bg-[#FDECEC]"
              >
                Cancel membership
              </button>
            </div>
          )}
          <button type="button" onClick={() => closeCancel()} className="hit-area mt-2.5 text-xs font-semibold text-ink-muted hover:text-ink">
            Keep my membership
          </button>
        </motion.div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3">
        <button type="button" onClick={reset} className="hit-area inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink">
          <RotateCcw aria-hidden className="size-3.5" /> Reset demo
        </button>
        {!cancelling && status !== "Cancelled" && (
          <button type="button" onClick={() => setCancelling(true)} className="hit-area text-xs font-semibold text-ink-muted underline-offset-2 hover:text-[#A12B2B] hover:underline">
            Cancel membership
          </button>
        )}
      </div>
    </div>
  );
}
