import type { ReactNode } from "react";
import { AppWindow } from "lucide-react";
import { cn } from "@/lib/cn";

export function BrowserFrame({
  children,
  label,
  className,
  tone = "light",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
  tone?: "light" | "tinted";
}) {
  const url = label;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-white shadow-float ring-1 ring-navy/8",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b border-navy/6 px-3.5 py-2.5",
          tone === "tinted" ? "bg-cobalt-50/70" : "bg-cream-50",
        )}
      >
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-coral/80" />
          <span className="size-2.5 rounded-full bg-[#F5C451]" />
          <span className="size-2.5 rounded-full bg-mint" />
        </span>
        {url && (
          <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-white px-2.5 py-1 text-[0.7rem] text-ink-subtle ring-1 ring-navy/6">
            <AppWindow aria-hidden className="size-3 shrink-0" />
            <span className="truncate">{url}</span>
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
