"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type SearchEntry = { t: string; c: string; h: string };

const MAX = 8;

export function BlogSearch({ index, label = "Search", className }: { index: SearchEntry[]; label?: string; className?: string }) {
  const id = useId();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [pos, setPos] = useState<CSSProperties>();

  const matches = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length || q.trim().length < 2) return [];
    return index.filter((e) => {
      const hay = `${e.t} ${e.c}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [q, index]);

  useEffect(() => {
    if (!open) return;
    let raf = 0;
    const place = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = field.current?.getBoundingClientRect();
        if (r) setPos({ top: r.bottom + 8, left: r.left, width: r.width });
      });
    };
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!box.current?.contains(t) && !panel.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const links = () => Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("[data-result]") ?? []);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      input.current?.focus();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const list = links();
    if (!list.length) return;
    e.preventDefault();
    const i = list.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === "ArrowDown" ? (i + 1) % list.length : i <= 0 ? list.length - 1 : i - 1;
    list[next].focus();
  };

  const showing = open && !!pos && q.trim().length >= 2;
  return (
    <div ref={box} onKeyDown={onKey} className={cn("relative w-full max-w-xl", className)}>
      <label htmlFor={`${id}-q`} className="sr-only">
        {label}
      </label>
      <div ref={field} className="flex h-13 items-center gap-3 rounded-2xl bg-white px-4 shadow-soft ring-1 ring-navy/10 focus-within:ring-2 focus-within:ring-cobalt">
        <Search aria-hidden className="size-5 shrink-0 text-ink-subtle" />
        <input
          ref={input}
          id={`${id}-q`}
          type="search"
          autoComplete="off"
          value={q}
          placeholder={`${label} ${index.length} articles`}
          aria-controls={`${id}-results`}
          aria-describedby={`${id}-hint`}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-navy outline-none placeholder:text-ink-subtle [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button type="button" onClick={() => {
              setQ("");
              input.current?.focus();
            }} aria-label="Clear search" className="grid size-8 place-items-center rounded-full text-ink-subtle hover:bg-navy/5 hover:text-navy">
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>
      <p id={`${id}-hint`} className="sr-only">
        Results appear below as you type. Use the arrow keys to move through them.
      </p>
      <p aria-live="polite" className="sr-only">
        {showing ? `${matches.length} ${matches.length === 1 ? "result" : "results"}` : ""}
      </p>
      {showing &&
        createPortal(
          <div ref={panel} id={`${id}-results`} style={pos} className="fixed z-40 overflow-hidden rounded-2xl bg-white shadow-float ring-1 ring-navy/10">
            {matches.length ? (
              <ul className="max-h-[22rem] overflow-y-auto py-2">
                {matches.slice(0, MAX).map((m) => (
                  <li key={m.h}>
                    <Link data-result href={m.h} className="block px-4 py-2.5 outline-none hover:bg-cream-50 focus-visible:bg-cobalt-50">
                      <span className="block text-[0.95rem] leading-snug font-semibold text-navy">{m.t}</span>
                      <span className="text-[0.78rem] text-ink-subtle">{m.c}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-4 text-sm text-ink-muted">No articles match “{q.trim()}”. Try another word or browse a category.</p>
            )}
            {matches.length > MAX && <p className="border-t border-navy/6 px-4 py-2.5 text-[0.8rem] text-ink-subtle">Showing {MAX} of {matches.length}. Keep typing to narrow it down.</p>}
          </div>,
          document.body,
        )}
    </div>
  );
}
