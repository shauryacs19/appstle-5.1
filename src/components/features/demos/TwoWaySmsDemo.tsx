"use client";

import { AnimatePresence, motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";
import { demoDate } from "./demoDates";

type Msg = { id: number; from: "store" | "me"; text: string };

const replies = [
  { key: "SKIP", answer: () => `Done! Your ${demoDate(7)} order is skipped. Your next order ships ${demoDate(21)}.` },
  { key: "1", answer: () => `Done! Your order is delayed 7 days and now ships ${demoDate(14)}.` },
  { key: "2", answer: () => `Done! Your order is delayed 14 days and now ships ${demoDate(21)}.` },
] as const;

const first: Msg = {
  id: 0,
  from: "store",
  text: `Your next Coffee Pods order ships ${demoDate(7)}. Reply SKIP to skip it, 1 to delay 7 days or 2 to delay 14 days.`,
};

export function TwoWaySmsDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([first]);
  const answered = msgs.length > 1;

  const send = (r: (typeof replies)[number]) => {
    setMsgs((m) => [...m, { id: m.length, from: "me", text: r.key }]);
    setTimeout(() => setMsgs((m) => [...m, { id: m.length, from: "store", text: r.answer() }]), 650);
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-center">
      <div className="w-[17.5rem] shrink-0 rounded-[2.4rem] bg-navy p-2 shadow-float">
        <div className="flex h-[25rem] flex-col overflow-hidden rounded-[2rem] bg-cream-50">
          <div className="border-b border-navy/8 bg-white px-4 pt-5 pb-3 text-center">
            <span aria-hidden className="mx-auto block size-8 rounded-full bg-gradient-to-br from-coral to-coral-700" />
            <p className="mt-1 text-xs font-semibold text-navy">Your coffee store</p>
          </div>
          <ol className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-3" aria-live="polite" aria-label="Text messages">
            <AnimatePresence initial={false}>
              {msgs.map((m) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-[0.8rem] leading-snug",
                    m.from === "store" ? "self-start rounded-bl-md bg-white text-navy ring-1 ring-navy/8" : "self-end rounded-br-md bg-cobalt text-white",
                  )}
                >
                  <span className="sr-only">{m.from === "store" ? "Store: " : "You: "}</span>
                  {m.text}
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </div>
      </div>

      <div className="w-full max-w-[14rem]">
        <DemoBadge />
        <p className="mt-3 text-sm font-semibold text-navy">Reply to the text</p>
        <div className="mt-2 grid gap-2">
          {replies.map((r) => (
            <button
              key={r.key}
              type="button"
              disabled={answered}
              onClick={() => send(r)}
              className="rounded-xl bg-white px-3.5 py-2.5 text-left text-sm font-semibold text-navy ring-1 ring-navy/12 transition hover:ring-cobalt/50 disabled:cursor-not-allowed disabled:opacity-45"
            >
              “{r.key}” <span className="font-normal text-ink-muted">{r.key === "SKIP" ? "skip the order" : r.key === "1" ? "delay 7 days" : "delay 14 days"}</span>
            </button>
          ))}
        </div>
        {answered && (
          <button type="button" onClick={() => setMsgs([first])} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-700 hover:underline">
            <RotateCcw aria-hidden className="size-3.5" /> Start over
          </button>
        )}
        <p className="mt-4 text-xs leading-relaxed text-ink-subtle">Two-Way SMS works with Postscript or Klaviyo SMS (beta).</p>
      </div>
    </div>
  );
}
