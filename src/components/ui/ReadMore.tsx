import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function ReadMore({ children, label = "Read more", className, tone = "dark" }: { children: ReactNode; label?: string; className?: string; tone?: "dark" | "light" }) {
  return (
    <details className={cn("group/more", className)}>
      <summary
        className={cn(
          "inline-flex cursor-pointer list-none items-center gap-1 text-sm font-semibold [&::-webkit-details-marker]:hidden",
          tone === "dark" ? "text-brand hover:text-brand-700" : "text-white hover:text-white/80",
        )}
      >
        <span className="group-open/more:hidden">{label}</span>
        <span className="hidden group-open/more:inline">Show less</span>
        <ChevronDown aria-hidden className="size-4 transition-transform group-open/more:rotate-180" />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
