import { cn } from "@/lib/cn";

const ARROW = (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

export function BtnArrow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("btn-arrow ml-2 size-[11px] shrink-0", className)}>
      {ARROW}
      {ARROW}
    </span>
  );
}
