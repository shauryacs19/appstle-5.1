import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const fieldClass =
  "mt-1.5 w-full rounded-xl bg-white px-3.5 text-[0.95rem] text-navy ring-1 ring-navy/15 outline-none transition placeholder:text-ink-subtle focus-visible:ring-2 focus-visible:ring-cobalt aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-coral-700";

export function FormField({ id, label, required, error, className, children }: { id: string; label: string; required?: boolean; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.85rem] font-semibold text-navy">
        {label}
        {required ? (
          <span aria-hidden className="text-coral-700">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-subtle"> (optional)</span>
        )}
      </label>
      {children}
      <p id={`${id}-error`} className={cn("mt-1 text-[0.8rem] font-medium text-coral-700", !error && "sr-only")} aria-live="polite">
        {error}
      </p>
    </div>
  );
}
