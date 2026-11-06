import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function EntryMeta({ items, className }: { items: ReactNode[]; className?: string }) {
  const list = items.filter((i) => i !== null && i !== undefined && i !== false && i !== "");
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-ink-subtle", className)}>
      {list.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 && <span aria-hidden className="size-1 rounded-full bg-navy/25" />}
          {item}
        </span>
      ))}
    </p>
  );
}
