"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SubnavItem = { id: string; label: string };

export function StickySubnav({
  items,
  label,
  action,
  className,
}: {
  items: SubnavItem[];
  label: string;
  action?: ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return;
    const left = link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className={cn("sticky top-[calc(var(--header-h)+0.5rem)] z-40 px-3 sm:px-5 lg:px-6", className)}
    >
      <div className="mx-auto flex max-w-site items-center gap-3 rounded-2xl bg-white/85 p-1.5 shadow-soft ring-1 ring-navy/8 backdrop-blur-xl">
        <ul ref={listRef} className="scrollbar-none flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                data-id={item.id}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-xl px-3.5 text-[0.88rem] font-medium whitespace-nowrap transition-colors",
                  active === item.id ? "bg-brand text-white" : "text-ink-muted hover:bg-brand-50 hover:text-brand",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {action && <div className="hidden shrink-0 md:block">{action}</div>}
      </div>
    </nav>
  );
}
