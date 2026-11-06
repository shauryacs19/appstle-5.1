"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/cn";

export type Billing = "monthly" | "yearly";

export function BillingToggle({ value, onChange, className }: { value: Billing; onChange: (v: Billing) => void; className?: string }) {
  const name = useId();
  const options: { id: Billing; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];
  return (
    <fieldset className={cn("inline-flex rounded-full bg-white p-1 shadow-soft ring-1 ring-navy/8", className)}>
      <legend className="sr-only">Billing period</legend>
      {options.map((o) => {
        const checked = value === o.id;
        return (
          <label
            key={o.id}
            className="relative cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt"
          >
            <input type="radio" name={name} value={o.id} checked={checked} onChange={() => onChange(o.id)} className="sr-only" />
            {checked && (
              <motion.span layoutId={`${name}-pill`} className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 420, damping: 32 }} />
            )}
            <span className={cn("relative transition-colors", checked ? "text-white" : "text-ink-muted")}>{o.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
