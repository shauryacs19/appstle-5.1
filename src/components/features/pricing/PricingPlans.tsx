"use client";

import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { PricingPlan } from "@/data/pricing";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";
import { BillingToggle, type Billing } from "./BillingToggle";
import { PlanCard } from "./PlanCard";

export function PricingPlans({
  plans,
  additions,
  hasToggle,
  showFee,
  accent,
  installHref,
  contactHref,
}: {
  plans: PricingPlan[];
  additions: string[][];
  hasToggle: boolean;
  showFee: boolean;
  accent: Accent;
  installHref: string;
  contactHref: string;
}) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const yearly = hasToggle && billing === "yearly";

  return (
    <div>
      {hasToggle && (
        <div className="mb-6 flex flex-wrap items-center gap-3 short:mb-4">
          <BillingToggle value={billing} onChange={setBilling} />
          <p aria-live="polite" className="text-sm text-ink-muted">
            {yearly ? "Prices per year, billed yearly." : "Prices per month, billed monthly."}
          </p>
        </div>
      )}
      <Stagger
        as="ul"
        className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", plans.length > 4 ? "lg:grid-cols-3 xl:grid-cols-6" : "lg:grid-cols-4")}
      >
        {plans.map((plan, i) => (
          <StaggerItem as="li" key={plan.name}>
            <PlanCard
              plan={plan}
              price={yearly && plan.yearly ? plan.yearly : plan.monthly}
              period={yearly && plan.yearly ? "year" : "month"}
              adds={additions[i] ?? []}
              previous={i > 0 ? plans[i - 1].name : undefined}
              showFee={showFee}
              accent={accent}
              installHref={installHref}
              contactHref={contactHref}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
