"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { links } from "@/data/links";
import { navGroups, type NavGroup } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function MegaMenu({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pathname = usePathname();

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  }, []);
  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerRefs.current[open]?.focus();
        setOpen(null);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <nav ref={navRef} aria-label="Primary" className="relative hidden h-full lg:block" onPointerLeave={scheduleClose} onPointerEnter={cancelClose}>
      <ul className="flex h-full items-center gap-0.5">
        {navGroups.map((group) => {
          const active = open === group.id;
          return (
            <li key={group.id} className="relative flex h-full items-center">
              <button
                ref={(el) => {
                  triggerRefs.current[group.id] = el;
                }}
                type="button"
                aria-expanded={active}
                aria-controls={`nav-panel-${group.id}`}
                onClick={() => setOpen((v) => (v === group.id ? null : group.id))}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") {
                    cancelClose();
                    setOpen(group.id);
                  }
                }}
                className={cn(
                  "inline-flex h-10 items-center gap-1 rounded-lg px-1.5 text-[0.95rem] font-semibold transition-colors xl:px-3.5 xl:text-[1.02rem]",
                  tone === "light"
                    ? active ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/12 hover:text-white"
                    : active ? "bg-surface text-ink" : "text-ink-700 hover:bg-surface hover:text-ink",
                )}
              >
                {group.label}
                <ChevronDown aria-hidden className={cn("size-4 opacity-60 transition-transform duration-300", active && "rotate-180")} />
              </button>
              <span aria-hidden className={cn("absolute inset-x-2 bottom-0 h-[3px] rounded-t-full transition-opacity", tone === "light" ? "bg-white" : "bg-orange", active ? "opacity-100" : "opacity-0")} />
              <AnimatePresence>
                {active && <MegaMenuPanel group={group} pathname={pathname} onNavigate={() => setOpen(null)} onBlurOut={() => setOpen(null)} />}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MegaMenuPanel({ group, pathname, onNavigate, onBlurOut }: { group: NavGroup; pathname: string; onNavigate: () => void; onBlurOut: () => void }) {
  const withIcons = group.columns[0].links.some((l) => l.icon);
  return (
    <motion.div
      id={`nav-panel-${group.id}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null;
        const li = e.currentTarget.parentElement;
        if (!next || !li?.contains(next)) onBlurOut();
      }}
      className={cn(
        "absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2",
        group.columns[0].links.filter((l) => l.icon).length > 4
          ? "w-[min(50rem,calc(100vw-3rem))]"
          : withIcons
            ? "w-[min(44rem,calc(100vw-3rem))]"
            : "w-[min(34rem,calc(100vw-3rem))]",
      )}
    >
      <div className="overflow-hidden rounded-xl bg-white ">
        <div className={cn("grid gap-2 p-2", withIcons ? "grid-cols-[1.6fr_1fr]" : "grid-cols-2")}>
          {group.columns.map((col, ci) => (
            <div key={col.title} className={cn("rounded-lg p-3", ci === 1 && "bg-surface-2")}>
              <p className="eyebrow px-2 pb-2 text-ink-subtle">{col.title}</p>
              <ul className="grid gap-0.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <SmartLink
                      href={l.href}
                      onClick={onNavigate}
                      aria-current={l.href === pathname ? "page" : undefined}
                      className="group/item flex items-start gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-surface focus-visible:bg-surface"
                    >
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 text-[0.92rem] font-semibold text-ink group-hover/item:text-brand">
                          {l.label}
                          <ArrowUpRight
                            aria-hidden
                            className="size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-70"
                          />
                        </span>
                        {l.description && <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-muted">{l.description}</span>}
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {group.id === "products" && (
          <div className="flex items-center justify-between gap-4 border-t border-line bg-surface-2 px-5 py-3 text-[0.82rem] text-ink-muted">
            <span>All apps install from the Shopify App Store and are billed through Shopify.</span>
            <SmartLink href={links.shopifyPartner} onClick={onNavigate} className="font-semibold text-brand hover:underline">
              View on Shopify
            </SmartLink>
          </div>
        )}
      </div>
    </motion.div>
  );
}
