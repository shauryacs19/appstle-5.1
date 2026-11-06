"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CalendarCheck2, Package, ShoppingBag, Store, Truck } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const methods = {
  pickup: { label: "Pickup", icon: ShoppingBag, verb: "Pickup", slots: ["10:00 AM – 12:00 PM", "12:00 – 2:00 PM", "2:00 – 4:00 PM", "4:00 – 6:00 PM"], full: 1 },
  delivery: { label: "Delivery", icon: Truck, verb: "Local delivery", slots: ["9:00 AM – 12:00 PM", "12:00 – 3:00 PM", "3:00 – 6:00 PM"], full: 2 },
  shipping: { label: "Shipping", icon: Package, verb: "Ships", slots: [] as string[], full: -1 },
} as const;
type Method = keyof typeof methods;
const methodIds = Object.keys(methods) as Method[];

const subscribeNoop = () => () => {};

export function PickupSchedulerDemo() {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [method, setMethod] = useState<Method>("pickup");
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState(0);

  const days = useMemo(() => {
    if (!mounted) return [];
    const out: { date: Date; blackout: boolean }[] = [];
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    for (let i = 1; out.length < 6; i++) {
      const day = new Date(d);
      day.setDate(d.getDate() + i);
      out.push({ date: day, blackout: day.getDay() === 0 });
    }
    return out;
  }, [mounted]);

  const m = methods[method];
  const firstOpen = days.findIndex((x) => !x.blackout);
  const selectedDay = days[dayIndex]?.blackout ? days[firstOpen] : days[dayIndex];
  const fmt = (date: Date, opts: Intl.DateTimeFormatOptions) => date.toLocaleDateString("en-US", opts);

  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-float ring-1 ring-ink/8 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold text-ink">Your order</p>
        <DemoBadge />
      </div>

      <LayoutGroup id="pickup-method">
        <div role="radiogroup" aria-label="Fulfillment method" className="mt-4 grid grid-cols-3 gap-2">
          {methodIds.map((id) => {
            const x = methods[id];
            const on = id === method;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => {
                  setMethod(id);
                  setSlot(0);
                }}
                onKeyDown={(e) => {
                  const i = methodIds.indexOf(method);
                  const next = e.key === "ArrowRight" ? (i + 1) % 3 : e.key === "ArrowLeft" ? (i + 2) % 3 : null;
                  if (next === null) return;
                  e.preventDefault();
                  setMethod(methodIds[next]);
                  setSlot(0);
                  (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
                }}
                className={cn(
                  "relative flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-sm font-semibold transition-colors",
                  on ? "text-brand-700" : "text-ink-muted ring-1 ring-ink/10 hover:text-ink",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="method-bg"
                    className="absolute inset-0 rounded-2xl bg-ice ring-2 ring-brand"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <x.icon aria-hidden className="relative size-5" />
                <span className="relative">{x.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-ice px-4 py-3 text-sm ring-1 ring-powder">
        <Store aria-hidden className="size-5 shrink-0 text-brand-700" />
        <div>
          <p className="font-semibold text-ink">{method === "pickup" ? "Your store location" : method === "delivery" ? "Within your delivery zone" : "Standard shipping"}</p>
          <p className="text-xs text-ink-subtle">Example store — no real address</p>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-ink">{method === "shipping" ? "Ship date" : "Date"}</legend>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {(mounted ? days : Array.from({ length: 6 }, () => null)).map((d, i) => {
            if (!d) return <span key={i} className="h-16 animate-pulse rounded-xl bg-brand-50" />;
            const on = selectedDay?.date.getTime() === d.date.getTime();
            return (
              <button
                key={d.date.toISOString()}
                type="button"
                disabled={d.blackout}
                aria-pressed={on}
                onClick={() => setDayIndex(i)}
                className={cn(
                  "flex h-16 flex-col items-center justify-center rounded-xl text-xs ring-1 transition",
                  d.blackout && "cursor-not-allowed bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgb(32_43_69/0.05)_6px_8px)] text-ink-subtle ring-ink/6",
                  !d.blackout && (on ? "bg-blue-ink text-white ring-blue-ink" : "bg-white text-ink ring-ink/12 hover:ring-ink/30"),
                )}
              >
                <span className="font-medium opacity-80">{fmt(d.date, { weekday: "short" })}</span>
                <span className="font-display text-lg font-bold">{fmt(d.date, { day: "numeric" })}</span>
                {d.blackout && <span className="text-xs font-semibold">Closed</span>}
              </button>
            );
          })}
        </div>
      </fieldset>

      <AnimatePresence mode="wait" initial={false}>
        {m.slots.length > 0 && (
          <motion.fieldset
            key={method}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5"
          >
            <legend className="text-sm font-semibold text-ink">Time slot</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {m.slots.map((s, i) => {
                const full = i === m.full;
                const on = slot === i && !full;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={full}
                    aria-pressed={on}
                    onClick={() => setSlot(i)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold ring-1 transition sm:text-sm",
                      full && "cursor-not-allowed text-ink-subtle ring-ink/6",
                      !full && (on ? "bg-brand text-white ring-brand" : "text-ink ring-ink/12 hover:ring-ink/30"),
                    )}
                  >
                    {s}
                    {full && <span className="rounded-full bg-terracotta-50 px-2 py-0.5 text-xs font-semibold text-terracotta">Full</span>}
                  </button>
                );
              })}
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>

      <div aria-live="polite" className="mt-5 flex items-start gap-3 rounded-2xl bg-blue-ink p-4 text-white">
        <CalendarCheck2 aria-hidden className="mt-0.5 size-5 shrink-0 text-[#E0745A]" />
        <div className="text-sm">
          <p className="font-semibold">
            {selectedDay
              ? `${m.verb} · ${fmt(selectedDay.date, { weekday: "long", month: "short", day: "numeric" })}${
                  m.slots.length ? ` · ${m.slots[slot === m.full ? 0 : slot]}` : ""
                }`
              : "Choose a date"}
          </p>
          <p className="mt-0.5 text-xs text-white/70">Demo only — nothing is booked or ordered.</p>
        </div>
      </div>
    </div>
  );
}
