import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import { companyBlurb } from "@/data/pages/company";
import { cn } from "@/lib/cn";

const tones = ["bg-cobalt-50", "bg-lavender-50", "bg-coral-50", "bg-mint-50"];

export function AboutFacts({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <div className="relative rounded-4xl bg-white p-5 shadow-float ring-1 ring-navy/8 sm:p-6">
      <Stagger as="dl" className="grid grid-cols-2 gap-3">
        {facts.map((f, i) => (
          <StaggerItem key={f.label} className={cn("flex flex-col-reverse rounded-3xl p-4 ring-1 ring-navy/6 sm:p-5 short:p-4", tones[i % tones.length])}>
            <dt className="mt-1 text-[0.85rem] leading-snug text-ink-muted">{f.label}</dt>
            <dd className="font-display text-[1.7rem] leading-none font-extrabold tracking-tight text-navy sm:text-[2rem] short:text-[1.7rem]">{f.value}</dd>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-4 flex items-start gap-3 rounded-3xl bg-cream-50 p-4 ring-1 ring-navy/6">
        <AppstleMark className="size-9 shrink-0 rounded-xl" />
        <p className="text-[0.86rem] leading-relaxed text-ink-muted">{companyBlurb}</p>
      </div>
    </div>
  );
}
