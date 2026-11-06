import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/cn";
export { Stars } from "./Stars";

export function DemoBadge({ className, label = "Interactive demo · illustrative data" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold tracking-wide text-ink-muted ring-1 ring-brand/10 backdrop-blur",
        className,
      )}
    >
      <FlaskConical aria-hidden className="size-3.5" />
      {label}
    </span>
  );
}

export function BuiltForShopify({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-[#E8F5E9] px-2 py-0.5 text-[0.68rem] font-semibold text-[#1F5C2E]",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-3">
        <path fill="currentColor" d="M8 1.5 9.6 3l2.2-.2.5 2.1 1.9 1.1-.8 2 .8 2-1.9 1.1-.5 2.1-2.2-.2L8 14.5 6.4 13l-2.2.2-.5-2.1-1.9-1.1.8-2-.8-2 1.9-1.1.5-2.1L6.4 3 8 1.5Z" />
        <path fill="#fff" d="m7.2 10.2-2-2 .9-.9 1.1 1.1 2.7-2.7.9.9-3.6 3.6Z" />
      </svg>
      Built for Shopify
    </span>
  );
}
