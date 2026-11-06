"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useHydrated } from "@/hooks/useHydrated";
import { ArrowUpRight, BatteryFull, BookOpen, ChevronLeft, Heart, Send, Signal, Star, Wifi } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import { cn } from "@/lib/cn";

const steps = [
  "Open Appstle Subscriptions and go to the widget settings",
  "Match the fonts, colours and button style to your theme",
  "Preview it on a product page, then save",
];

type Message = { id: string; from: "merchant" | "alex"; body: ReactNode; label?: string; kind?: "doc" };

const script: Message[] = [
  { id: "ask", from: "merchant", body: "Hi! How can I make the subscription widget match my theme?" },
  {
    id: "hello",
    from: "alex",
    label: "Alex · Appstle",
    body: "Hey! This is Alex, MSE at Appstle 👋 I’ll guide you through it. Here are the steps:",
  },
  {
    id: "steps",
    from: "alex",
    body: (
      <ol className="space-y-1.5">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-1.5">
            <span className="mt-px grid size-[0.95rem] shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    ),
  },
  { id: "doc", from: "alex", kind: "doc", body: null },
  {
    id: "thanks",
    from: "merchant",
    body: (
      <>
        That worked perfectly — thank you, really helpful! 5 stars from me
        <span className="mt-1 flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-3 fill-[#FFC857] text-[#FFC857]" />
          ))}
        </span>
      </>
    ),
  },
];

const beats = [
  { shown: 0 },
  { shown: 1, after: 500 },
  { shown: 1, typing: true, after: 600 },
  { shown: 2, after: 1400 },
  { shown: 2, typing: true, after: 450 },
  { shown: 3, after: 1500 },
  { shown: 3, typing: true, after: 450 },
  { shown: 4, after: 1100 },
  { shown: 5, after: 1600 },
  { shown: 5, react: true, after: 700 },
] as const satisfies ReadonlyArray<{ shown: number; typing?: boolean; react?: boolean; after?: number }>;
type Beat = { shown: number; typing?: boolean; react?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

export function SupportChatPhone({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const mounted = useHydrated();
  const reduce = (useReducedMotion() ?? false) && mounted;
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    if (inView) {
      let t = 0;
      timers.push(window.setTimeout(() => setBeat(0), 0));
      beats.forEach((b, i) => {
        if (!("after" in b)) return;
        t += b.after;
        timers.push(window.setTimeout(() => setBeat(i), t));
      });
    } else {
      timers.push(window.setTimeout(() => setBeat(0), 0));
    }
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [inView, reduce]);

  const now: Beat = reduce ? beats[beats.length - 1] : beats[beat];

  return (
    <div ref={ref} className={cn("motion-safe:animate-[float_7s_ease-in-out_infinite]", className)}>
      <p className="sr-only">
        Example support chat: a merchant asks how to make the subscription widget match their theme. Alex, a
        merchant success engineer at Appstle, replies with three steps and a Help Center guide, and the merchant
        thanks them with a five-star rating.
      </p>

      <div
        aria-hidden
        data-support-phone
        className="relative h-full w-full rounded-[2.4rem] bg-[linear-gradient(155deg,#4A5679,#1A2238_38%,#0B1022)] p-[7px] "
      >
        <span className="absolute top-[17%] -left-[3px] h-7 w-[3px] rounded-l-sm bg-[#2D3754]" />
        <span className="absolute top-[26%] -left-[3px] h-11 w-[3px] rounded-l-sm bg-[#2D3754]" />
        <span className="absolute top-[22%] -right-[3px] h-14 w-[3px] rounded-r-sm bg-[#2D3754]" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem] bg-[#fff] font-sans">
          <div className="relative flex h-8 shrink-0 items-center justify-between bg-white px-5 pt-1 text-xs font-semibold text-ink">
            <span>9:41</span>
            <span className="absolute top-[7px] left-1/2 h-[18px] w-[60px] -translate-x-1/2 rounded-full bg-[#05070E]" />
            <span className="flex items-center gap-1">
              <Signal className="size-[0.7rem]" strokeWidth={2.6} />
              <Wifi className="size-[0.7rem]" strokeWidth={2.6} />
              <BatteryFull className="size-[0.85rem]" strokeWidth={2.2} />
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 border-b border-ink/6 bg-white px-2 pt-1 pb-2">
            <ChevronLeft className="size-3.5 shrink-0 text-brand" strokeWidth={2.5} />
            <span className="relative shrink-0">
              <AppstleMark className="size-7 rounded-[0.55rem]" />
              <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-[#2FBF71] ring-2 ring-white" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-xs font-bold text-ink">Appstle Support</span>
              <span className="block truncate text-xs text-ink-subtle">Alex is online</span>
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-2.5 pb-2 text-xs leading-[1.38]">
            <p className="mx-auto mb-1 rounded-full bg-ink/5 px-2 py-0.5 text-xs font-semibold tracking-[0.08em] text-ink-subtle uppercase">
              Example chat · Today
            </p>
            <AnimatePresence initial={false}>
              {script.slice(0, now.shown).map((m, i) => (
                <Row key={m.id} first={i === 0}>
                  {m.kind === "doc" ? (
                    <DocCard />
                  ) : m.from === "merchant" ? (
                    <div className={cn("relative ml-auto max-w-[84%]", m.id === "thanks" && "mb-2")}>
                      <div className="origin-bottom-right rounded-[1rem] rounded-br-[0.35rem] bg-brand px-2.5 py-1.5 text-white ">
                        {m.body}
                      </div>
                      {m.id === "thanks" && (
                        <AnimatePresence>
                          {now.react && (
                            <motion.span
                              key="react"
                              initial={{ scale: 0, rotate: -30 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 520, damping: 18 }}
                              className="absolute -bottom-2 -left-2 grid size-5 place-items-center rounded-full bg-white shadow-soft ring-1 ring-ink/8"
                            >
                              <Heart className="size-3 fill-brand-400 text-brand-400" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ) : (
                    <div className="mr-auto max-w-[88%]">
                      {m.label && <p className="mb-0.5 ml-1 text-xs font-semibold text-ink-subtle">{m.label}</p>}
                      <div className="rounded-[1rem] rounded-bl-[0.35rem] bg-white px-2.5 py-1.5 text-ink ring-1 ring-ink/6">
                        {m.body}
                      </div>
                    </div>
                  )}
                </Row>
              ))}
              {now.typing && (
                <Row key="typing">
                  <div className="mr-auto flex gap-1 rounded-[1rem] rounded-bl-[0.35rem] bg-white px-3 py-2.5 ring-1 ring-ink/6">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="size-1.5 rounded-full bg-ink/35"
                        animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </Row>
              )}
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 border-t border-ink/6 bg-white px-2.5 pt-2 pb-4">
            <span className="flex h-7 min-w-0 flex-1 items-center rounded-full bg-brand-50 px-3 text-xs text-ink-subtle ring-1 ring-ink/8">
              Message Alex…
            </span>
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
              <Send className="size-3.5" />
            </span>
          </div>
          <span className="absolute bottom-1.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-ink/80" />
        </div>
      </div>
    </div>
  );
}

function Row({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <motion.div
      className="shrink-0 overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease }}
    >
      <motion.div
        className={cn("flex pb-1.5", first ? "pt-0.5" : "pt-1")}
        initial={{ scale: 0.86, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function DocCard() {
  return (
    <div className="mr-auto w-[88%] overflow-hidden rounded-[1rem] rounded-bl-[0.35rem] bg-white ring-1 ring-ink/6">
      <div className="flex items-center gap-2 bg-gradient-to-br from-brand-50 to-brand-50 p-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-brand shadow-soft">
          <BookOpen className="size-3.5" />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-xs font-bold tracking-[0.08em] text-brand uppercase">Help Center guide</span>
          <span className="block text-xs font-bold text-ink">Customize your subscription widget</span>
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 text-xs text-ink-subtle">
        <span className="truncate">
          <span className="font-semibold text-brand underline decoration-brand/30 underline-offset-2">help.appstle.com</span> · 4 min read
        </span>
        <ArrowUpRight className="size-3 shrink-0 text-brand" />
      </div>
    </div>
  );
}
