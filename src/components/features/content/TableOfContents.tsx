"use client";

import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/html";
import { cn } from "@/lib/cn";

export function TableOfContents({ items, depth = 2, title = "On this page", className }: { items: TocItem[]; depth?: 2 | 3; title?: string; className?: string }) {
  const list = useMemo(() => items.filter((i) => i.level <= depth), [items, depth]);
  const [active, setActive] = useState<string | undefined>(list[0]?.id);

  useEffect(() => {
    const els = list.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const first = els.find((el) => visible.has(el.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [list]);

  if (list.length < 2) return null;
  return (
    <nav aria-label={title} className={className}>
      <p className="eyebrow text-ink-subtle">{title}</p>
      <ol className="mt-3 grid gap-0.5 border-l border-navy/10">
        {list.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pr-2 text-[0.86rem] leading-snug transition-colors",
                i.level === 3 ? "pl-6 text-[0.82rem]" : "pl-3.5",
                active === i.id ? "border-cobalt font-semibold text-navy" : "border-transparent text-ink-muted hover:border-navy/25 hover:text-navy",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
