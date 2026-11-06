import { Check, Minus } from "lucide-react";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";

export function Mark({ value, accent, strong }: { value: boolean | string | null; accent: Accent; strong?: boolean }) {
  if (value === true)
    return (
      <>
        <span aria-hidden className={cn("mx-auto grid size-6 place-items-center rounded-full", strong ? "bg-navy text-white" : cn(accent.chip, accent.text))}>
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <span className="sr-only">Yes</span>
      </>
    );
  if (value === false || value === null)
    return (
      <>
        <Minus aria-hidden className="mx-auto size-4 text-navy/25" />
        <span className="sr-only">No</span>
      </>
    );
  return <span className="text-[0.8rem] font-semibold text-navy">{value}</span>;
}
