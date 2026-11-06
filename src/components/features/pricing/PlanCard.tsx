import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import type { PricingPlan } from "@/data/pricing";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";

export function PlanCard({
  plan,
  price,
  period,
  adds,
  previous,
  showFee,
  accent,
  installHref,
  contactHref,
}: {
  plan: PricingPlan;
  price: string;
  period: "month" | "year";
  adds: string[];
  previous?: string;
  showFee: boolean;
  accent: Accent;
  installHref: string;
  contactHref: string;
}) {
  const custom = price === "Custom";
  return (
    <div className="group flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card short:p-4">
      <h3 className="font-sans text-[1.02rem] font-semibold tracking-normal text-navy">{plan.name}</h3>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-[2.1rem] leading-none font-extrabold tracking-tight text-navy short:text-[1.85rem]">{price}</span>
        {!custom && <span className="text-sm text-ink-subtle">/ {period}</span>}
      </p>
      {plan.note && <p className="mt-2 text-[0.82rem] leading-snug text-ink-muted">{plan.note}</p>}
      {showFee && (
        <p className={cn("mt-3 inline-flex short:mt-2 self-start rounded-full px-2.5 py-1 text-[0.72rem] font-bold", accent.chip, accent.text)}>0% Transaction Fee</p>
      )}
      {adds.length > 0 && (
        <div className="mt-4 flex-1 border-t border-navy/6 pt-3 short:mt-3 short:pt-2">
          <p className="text-[0.72rem] font-semibold tracking-wide text-ink-subtle uppercase">{previous ? `Everything in ${previous}, plus` : "Includes"}</p>
          <ul className="mt-2 grid gap-1.5">
            {adds.map((a) => (
              <li key={a} className="flex gap-2 text-[0.8rem] leading-snug text-navy">
                <Check aria-hidden className={cn("mt-0.5 size-3.5 shrink-0", accent.text)} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ButtonLink href={plan.cta === "contact" ? contactHref : installHref} variant={plan.cta === "contact" ? "dark" : "secondary"} size="sm" className="mt-5 w-full short:mt-4">
        {plan.cta === "contact" ? (
          <>
            Contact <strong>Us</strong>
          </>
        ) : (
          <>
            Start Free <strong>Trial</strong>
          </>
        )}
      </ButtonLink>
    </div>
  );
}
