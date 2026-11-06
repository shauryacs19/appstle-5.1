import Link from "next/link";
import { cn } from "@/lib/cn";

type FilterLink = { label: string; href: string; count?: number; current?: boolean };

export function CategoryFilter({ items, label, className }: { items: FilterLink[]; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible">
        {items.map((f) => (
          <li key={f.href} className="shrink-0">
            <Link
              href={f.href}
              aria-current={f.current ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[0.9rem] font-semibold transition",
                f.current ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/25",
              )}
            >
              {f.label}
              {f.count !== undefined && <span className={cn("text-[0.75rem] font-medium tabular-nums", f.current ? "text-white/70" : "text-ink-subtle")}>{f.count}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
