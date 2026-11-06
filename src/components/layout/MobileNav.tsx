"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { AppstleLogo } from "@/components/brand/AppstleLogo";
import { ButtonLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { links } from "@/data/links";
import { navGroups } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>("products");
  const titleId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && onClose();
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div data-mobile-nav="" className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" tabIndex={-1} aria-hidden className="absolute inset-0 bg-brand-900/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white "
          >
            <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line px-4">
              <span id={titleId} className="sr-only">
                Site menu
              </span>
              <AppstleLogo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-grid size-10 place-items-center rounded-full bg-surface-2 hover:bg-brand-50 hover:text-brand"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 px-3 pb-6">
              <ul className="divide-y divide-line">
                {navGroups.map((g) => (
                  <li key={g.id}>
                    <button
                      type="button"
                      className={cn("flex w-full items-center justify-between px-2 py-4 text-left text-lg font-semibold", expanded === g.id ? "text-brand" : "text-ink")}
                      aria-expanded={expanded === g.id}
                      aria-controls={`m-${g.id}`}
                      onClick={() => setExpanded((v) => (v === g.id ? null : g.id))}
                    >
                      {g.label}
                      <ChevronDown aria-hidden className={cn("size-5 transition-transform", expanded === g.id && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === g.id && (
                        <motion.div
                          id={`m-${g.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: ease.out }}
                          className="overflow-hidden"
                        >
                          {g.columns.map((col) => (
                            <div key={col.title} className="pb-3">
                              <p className="eyebrow px-2 pb-1 text-ink-subtle">{col.title}</p>
                              <ul>
                                {col.links.map((l) => (
                                  <li key={l.href + l.label}>
                                    <SmartLink
                                      href={l.href}
                                      onClick={onClose}
                                      aria-current={l.href === pathname ? "page" : undefined}
                                      className="flex min-h-11 items-center rounded-lg px-2 text-[0.98rem] text-ink hover:bg-brand-50 hover:text-brand"
                                    >
                                      {l.label}
                                    </SmartLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
                <li>
                  <SmartLink href={links.contact} onClick={onClose} className="flex px-2 py-4 text-lg font-semibold text-ink">
                    Contact
                  </SmartLink>
                </li>
              </ul>
            </nav>
            <div className="sticky bottom-0 grid gap-2 border-t border-line bg-white/95 p-4 backdrop-blur">
              <ButtonLink href={links.contact} onClick={onClose} className="w-full">
                Book a <strong>Demo</strong>
              </ButtonLink>
              <ButtonLink href={links.partnerProgram} variant="secondary" className="w-full">
                Become a <strong>Partner</strong>
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
