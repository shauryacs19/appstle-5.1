"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { AppstleBotMark } from "@/components/brand/AppstleBotMark";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/cn";

type Msg = { role: "user" | "assistant"; content: string; error?: boolean };

const STORE = "appstle-bot";
const NOT_LIVE =
  "Thanks for your message! Appstle Bot isn’t functional yet. It still needs to be trained on our apps and needs using our RAG data, and it requires an LLM API key before it can answer questions.";

function load(): Msg[] {
  try {
    const raw = sessionStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as Msg[]) : [];
  } catch {
    return [];
  }
}
function save(m: Msg[]) {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(m.slice(-30)));
  } catch {
  }
}

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1])
      out.push(
        <strong key={`${key}-${i++}`} className="font-semibold text-ink">
          {inline(m[1], `${key}-b${i}`)}
        </strong>,
      );
    else
      out.push(
        <SmartLink key={`${key}-${i++}`} href={m[3]} className="font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand">
          {m[2]}
        </SmartLink>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
function Markdown({ text }: { text: string }) {
  const bullet = /^\s*[-•*]\s+/;
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, bi) => {
        const groups: { list: boolean; lines: string[] }[] = [];
        for (const line of block.split("\n")) {
          const list = bullet.test(line);
          const g = groups.at(-1);
          if (g && g.list === list) g.lines.push(line);
          else groups.push({ list, lines: [line] });
        }
        return (
          <Fragment key={bi}>
            {groups.map((g, gi) =>
              g.list ? (
                <ul key={gi} className="my-1.5 grid gap-1 pl-4 [list-style:disc] marker:text-brand">
                  {g.lines.map((l, li) => (
                    <li key={li}>{inline(l.replace(bullet, ""), `${bi}-${gi}-${li}`)}</li>
                  ))}
                </ul>
              ) : (
                <p key={gi} className="my-1.5 first:mt-0 last:mb-0">
                  {g.lines.map((l, li) => (
                    <Fragment key={li}>
                      {li > 0 && <br />}
                      {inline(l, `${bi}-${gi}-${li}`)}
                    </Fragment>
                  ))}
                </p>
              ),
            )}
          </Fragment>
        );
      })}
    </>
  );
}

function Typing() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Appstle Bot is typing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 rounded-full bg-brand/60 motion-safe:animate-[bot-dot_1.1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

export function AppstleBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [nudge, setNudge] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMessages(load());
    let seen = false;
    try {
      seen = sessionStorage.getItem(`${STORE}-nudged`) === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => {
      setNudge(true);
      try {
        sessionStorage.setItem(`${STORE}-nudged`, "1");
      } catch {}
    }, 4000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => save(messages), [messages]);
  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);
  useEffect(() => {
    if (!open) return;
    setNudge(false);
    const t = window.setTimeout(() => field.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcher.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    timer.current = window.setTimeout(() => {
      setMessages([...history, { role: "assistant", content: NOT_LIVE }]);
      setBusy(false);
    }, 700);
  }

  function reset() {
    window.clearTimeout(timer.current);
    setMessages([]);
    setBusy(false);
    field.current?.focus();
  }

  const empty = messages.length === 0;

  return (
    <div className="fixed right-4 bottom-4 z-[90] flex flex-col items-end sm:right-6 sm:bottom-6" data-bot-root="">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="bot-title"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="mb-3 flex h-[min(38rem,calc(100dvh-7rem))] w-[min(24.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-float ring-1 ring-line"
          >
            <header className="relative flex items-center gap-3 overflow-hidden bg-ink-deep px-4 py-3.5 text-white">
              <div aria-hidden className="pointer-events-none absolute -top-10 -right-6 size-32 rounded-full bg-white/15 blur-2xl" />
              <AppstleBotMark blink className="size-10 shrink-0 ring-1 ring-white/30" />
              <div className="min-w-0 flex-1">
                <h2 id="bot-title" className="font-display text-[1.05rem] leading-tight font-bold">
                  Appstle Bot
                </h2>
                <p className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="size-1.5 rounded-full bg-[#4ADE80]" /> AI assistant · preview
                </p>
              </div>
              {!empty && (
                <button type="button" onClick={reset} className="grid size-8 place-items-center rounded-full text-white/85 transition hover:bg-white/15 hover:text-white" aria-label="Start a new chat" title="New chat">
                  <RotateCcw className="size-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcher.current?.focus();
                }}
                className="grid size-8 place-items-center rounded-full text-white/85 transition hover:bg-white/15 hover:text-white"
                aria-label="Close Appstle Bot"
              >
                <X className="size-4.5" />
              </button>
            </header>

            <div ref={list} className="relative flex-1 overflow-y-auto overscroll-contain bg-surface-2 px-4 py-4" aria-live="polite">
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/patterns/commerce.svg')] [background-size:260px_260px] opacity-[0.07]" />
              <div className="relative grid gap-3">
                {empty && (
                  <div className="grid gap-3">
                    <div className="rounded-2xl rounded-tl-md bg-white p-3.5 text-[0.9rem] leading-relaxed text-ink-muted shadow-soft ring-1 ring-line">
                      <p className="font-semibold text-ink">Hi! I’m Appstle Bot 👋</p>
                      <p className="mt-1">Ask me anything about Appstle’s Shopify apps.</p>
                    </div>
                  </div>
                )}

                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div key={i} className="ml-10 justify-self-end rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-white shadow-soft">
                      {m.content}
                    </div>
                  ) : (
                    <div key={i} className="mr-6 flex items-start gap-2">
                      <AppstleBotMark className="mt-0.5 size-7 shrink-0" />
                      <div className="min-w-0">
                        <div
                          className={cn(
                            "rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-ink-muted shadow-soft ring-1",
                            m.error ? "ring-[#F5C2C2]" : "ring-line",
                          )}
                        >
                          {m.content ? <Markdown text={m.content} /> : <Typing />}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="border-t border-[#E7DDCC] bg-white p-3"
            >
              <div className="flex items-end gap-2 rounded-2xl bg-[#F3ECDF] p-1.5 pl-3.5 ring-1 ring-line transition focus-within:bg-white focus-within:ring-brand/50">
                <label htmlFor="bot-input" className="sr-only">
                  Ask Appstle Bot a question
                </label>
                <textarea
                  id="bot-input"
                  ref={field}
                  rows={1}
                  value={input}
                  maxLength={1000}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask(input);
                    }
                  }}
                  placeholder="Ask about Appstle apps…"
                  className="max-h-28 min-h-9 flex-1 resize-none bg-transparent py-2 text-[0.9rem] text-ink outline-none [field-sizing:content] placeholder:text-ink-subtle"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-white transition hover:bg-brand-700 disabled:bg-[#C9D6E6]"
                  aria-label="Send"
                >
                  <ArrowUp className="size-4.5" strokeWidth={2.5} />
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-ink-subtle">
                Preview only — not connected to an AI model yet.
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="relative flex items-center gap-3">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="hidden rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-ink shadow-float ring-1 ring-line sm:block"
            >
              Questions? <span className="text-brand">Ask Appstle Bot</span>
            </motion.button>
          )}
        </AnimatePresence>
        <button
          ref={launcher}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close Appstle Bot" : "Open Appstle Bot — ask a question"}
          className="group relative grid size-14 place-items-center rounded-[1.1rem] transition-transform duration-300 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:scale-105"
        >
          {!open && <span aria-hidden className="absolute inset-0 rounded-[inherit] bg-brand/40 motion-safe:animate-[pulse-ring_2.6s_ease-out_infinite]" />}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="grid size-14 place-items-center rounded-[1.1rem] bg-[linear-gradient(135deg,#219BFB,#0177F2)] text-white">
                <X className="size-6" />
              </motion.span>
            ) : (
              <motion.span key="bot" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
                <AppstleBotMark blink className="size-14 rounded-[1.1rem]" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
