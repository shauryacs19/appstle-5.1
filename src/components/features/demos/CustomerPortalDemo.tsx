"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarClock, Pause, Play, Repeat2, SkipForward } from "lucide-react";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";
import { demoDate } from "./demoDates";

const products = {
  matcha: { name: "Ceremonial Matcha · 100g", price: 28, swatch: "from-mint-200 to-mint-700" },
  hojicha: { name: "Roasted Hojicha · 100g", price: 24, swatch: "from-peach to-coral-700" },
} as const;
type ProductKey = keyof typeof products;
const frequencies = [
  { weeks: 1, label: "Weekly" },
  { weeks: 2, label: "Every 2 weeks" },
  { weeks: 4, label: "Every 4 weeks" },
] as const;

export function CustomerPortalDemo() {
  const [paused, setPaused] = useState(false);
  const [weeks, setWeeks] = useState<1 | 2 | 4>(2);
  const [item, setItem] = useState<ProductKey>("matcha");
  const [skipped, setSkipped] = useState<number[]>([]);
  const [log, setLog] = useState("Subscription active · next order in 7 days");

  const orders = Array.from({ length: 4 }, (_, i) => ({ i, date: demoDate(7 + i * weeks * 7) }));
  const nextActive = orders.find((o) => !skipped.includes(o.i));
  const p = products[item];

  const skip = () => {
    if (!nextActive) return;
    setSkipped((s) => [...s, nextActive.i]);
    setLog(`Order on ${nextActive.date} skipped`);
  };
  const togglePause = () => {
    setPaused((v) => !v);
    setLog(paused ? "Subscription resumed" : "Subscription paused — resume anytime");
  };
  const swap = () => {
    const next: ProductKey = item === "matcha" ? "hojicha" : "matcha";
    setItem(next);
    setLog(`Swapped to ${products[next].name}`);
  };
  const changeFreq = (w: 1 | 2 | 4) => {
    setWeeks(w);
    setSkipped([]);
    setLog(`Delivery frequency changed to ${frequencies.find((f) => f.weeks === w)!.label.toLowerCase()}`);
  };

  return (
    <div className="w-full rounded-3xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-navy">My subscriptions</p>
          <p className="text-xs text-ink-subtle">Customer portal · Magic Link login</p>
        </div>
        <DemoBadge />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl bg-cream-50 p-4 ring-1 ring-navy/6">
          <div className="flex items-center gap-3">
            <motion.span key={item} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={cn("size-12 shrink-0 rounded-xl bg-gradient-to-br", p.swatch)} aria-hidden />
            <div className="min-w-0">
              <p className="truncate text-[0.95rem] font-semibold text-navy">{p.name}</p>
              <p className="text-sm text-ink-muted">${p.price.toFixed(2)} · {frequencies.find((f) => f.weeks === weeks)!.label}</p>
            </div>
            <span className={cn("ml-auto shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-bold", paused ? "bg-coral-100 text-coral-700" : "bg-mint-100 text-mint-700")}>
              {paused ? "Paused" : "Active"}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Action onClick={skip} disabled={paused || !nextActive} icon={SkipForward} label="Skip next order" />
            <Action onClick={togglePause} icon={paused ? Play : Pause} label={paused ? "Resume" : "Pause"} />
            <Action onClick={swap} disabled={paused} icon={Repeat2} label="Swap product" />
            <Action onClick={() => changeFreq(weeks === 4 ? 1 : weeks === 1 ? 2 : 4)} disabled={paused} icon={CalendarClock} label="Change frequency" />
          </div>

          <fieldset className="mt-4" disabled={paused}>
            <legend className="text-xs font-semibold text-navy">Delivery frequency</legend>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {frequencies.map((f) => (
                <button
                  key={f.weeks}
                  type="button"
                  aria-pressed={weeks === f.weeks}
                  onClick={() => changeFreq(f.weeks)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold ring-1 transition disabled:opacity-50",
                    weeks === f.weeks ? "bg-cobalt text-white ring-cobalt" : "bg-white text-navy ring-navy/15 hover:ring-navy/30",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <p className="text-sm font-semibold text-navy">Upcoming orders</p>
          <ol className={cn("mt-2 grid gap-1.5 transition-opacity", paused && "opacity-45")}>
            <AnimatePresence initial={false} mode="popLayout">
              {orders.map((o) => {
                const isSkipped = skipped.includes(o.i);
                return (
                  <motion.li
                    key={`${weeks}-${o.i}`}
                    layout
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn("flex items-center justify-between rounded-xl px-3 py-2 text-sm ring-1", isSkipped ? "bg-cream-100 text-ink-subtle ring-navy/6" : "bg-white text-navy ring-navy/10")}
                  >
                    <span className={cn(isSkipped && "line-through")}>{o.date}</span>
                    {isSkipped ? (
                      <button type="button" onClick={() => setSkipped((s) => s.filter((x) => x !== o.i))} className="text-xs font-semibold text-cobalt-700 hover:underline">
                        Unskip
                      </button>
                    ) : (
                      <span className="text-xs text-ink-subtle">{o.i === nextActive?.i ? "Next order" : `$${p.price.toFixed(2)}`}</span>
                    )}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
          <p aria-live="polite" className="mt-3 rounded-xl bg-cobalt-50 px-3 py-2 text-xs font-medium text-cobalt-700">
            {log}
          </p>
        </div>
      </div>
    </div>
  );
}

function Action({ onClick, icon: Icon, label, disabled }: { onClick: () => void; icon: typeof Pause; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-left text-[0.8rem] font-semibold text-navy ring-1 ring-navy/10 transition hover:ring-cobalt/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
    >
      <Icon aria-hidden className="size-3.5 shrink-0 text-cobalt" />
      {label}
    </button>
  );
}
