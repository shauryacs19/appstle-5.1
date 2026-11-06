"use client";

import { AnimatePresence, motion } from "motion/react";
import { Gift, RefreshCw } from "lucide-react";
import { useId, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const ONE_TIME = 70;
const SUBSCRIBE = 63;
const frequencies = [
  { id: "1w", label: "Weekly", every: "every week" },
  { id: "2w", label: "Every 2 weeks", every: "every 2 weeks" },
  { id: "1m", label: "Monthly", every: "every month" },
] as const;

export function SubscriptionWidgetDemo({ onOpenPortal }: { onOpenPortal?: () => void }) {
  const [mode, setMode] = useState<"once" | "subscribe">("subscribe");
  const [freq, setFreq] = useState<(typeof frequencies)[number]["id"]>("1m");
  const id = useId();
  const f = frequencies.find((x) => x.id === freq)!;
  const price = mode === "subscribe" ? SUBSCRIBE : ONE_TIME;

  return (
    <div className="w-full rounded-3xl bg-white p-5 shadow-float ring-1 ring-ink/8 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-lg font-bold text-ink">Purchase options</p>
        <DemoBadge />
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">Choose how to buy</legend>
        <div className="grid gap-2">
          <Option
            name={`${id}-mode`}
            checked={mode === "once"}
            onChange={() => setMode("once")}
            label="One-time purchase"
            price={`$${ONE_TIME.toFixed(2)}`}
          />
          <Option
            name={`${id}-mode`}
            checked={mode === "subscribe"}
            onChange={() => setMode("subscribe")}
            label="Subscribe & save"
            tag="−10%"
            price={`$${SUBSCRIBE.toFixed(2)}`}
            strike={`$${ONE_TIME.toFixed(2)}`}
          />
        </div>
      </fieldset>

      <AnimatePresence initial={false}>
        {mode === "subscribe" && (
          <motion.div
            key="freq"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <fieldset className="pt-4">
              <legend className="text-sm font-semibold text-ink">Delivery frequency</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {frequencies.map((x) => (
                  <label
                    key={x.id}
                    className={cn(
                      "cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                      freq === x.id ? "bg-blue-ink text-white ring-blue-ink" : "bg-white text-ink ring-ink/15 hover:ring-ink/30",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${id}-freq`}
                      value={x.id}
                      checked={freq === x.id}
                      onChange={() => setFreq(x.id)}
                      className="sr-only"
                    />
                    {x.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mt-4 rounded-2xl bg-ice p-3.5 text-sm text-ink ring-1 ring-powder">
              <p className="flex items-center gap-2 font-semibold">
                <Gift aria-hidden className="size-4 text-terracotta" /> Subscriber rewards
              </p>
              <p className="mt-1 text-ink-muted">After the 3rd order, get a free product.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-ink/8 pt-4">
        <div aria-live="polite">
          <p className="text-xs text-ink-subtle">{mode === "subscribe" ? `Billed ${f.every}` : "Single order"}</p>
          <motion.p
            key={price}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-2xl font-bold text-ink"
          >
            ${price.toFixed(2)}
          </motion.p>
        </div>
        {onOpenPortal && (
          <button
            type="button"
            onClick={onOpenPortal}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-ink-700 active:scale-95"
          >
            <RefreshCw aria-hidden className="size-3.5" />
            See the customer portal
          </button>
        )}
      </div>
    </div>
  );
}

function Option({
  name,
  checked,
  onChange,
  label,
  price,
  strike,
  tag,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  price: string;
  strike?: string;
  tag?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 ring-1 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
        checked ? "bg-ice ring-brand" : "ring-ink/12 hover:ring-ink/25",
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full ring-2 transition",
          checked ? "ring-brand" : "ring-ink/25",
        )}
      >
        <motion.span
          className="size-2.5 rounded-full bg-brand"
          initial={false}
          animate={{ scale: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 26 }}
        />
      </span>
      <span className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem] font-semibold text-ink">
        {label}
        {tag && <span className="rounded-full bg-red px-1.5 py-0.5 text-xs font-bold text-white">{tag}</span>}
      </span>
      <span className="flex flex-col items-end text-sm leading-tight">
        <span className="font-semibold text-ink">{price}</span>
        {strike && checked && <span className="text-xs text-ink-subtle line-through">{strike}</span>}
      </span>
    </label>
  );
}
