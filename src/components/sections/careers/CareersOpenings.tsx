import { BriefcaseBusiness, MapPin, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { applyHref, type Opening } from "@/data/pages/careers";

export function CareersOpenings({ title, items, apply }: { title: string; items: Opening[]; apply: { title: string; label: string; email: string; href: string } }) {
  return (
    <Panel id="positions" labelledBy="positions-title" className="bg-navy text-white on-dark">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="positions-title" eyebrow="Join us" title={title} tone="light" dot="bg-mint" titleClassName="lg:text-[2.7rem] short:text-[2.2rem]" />
          <Reveal delay={0.15} className="mt-8 rounded-3xl bg-white/8 p-5 ring-1 ring-white/15 short:mt-5">
            <h3 className="font-sans text-lg font-semibold tracking-normal">{apply.title}</h3>
            <p className="mt-1 text-sm text-white/70">
              Email <a href={apply.href} className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white">{apply.email}</a>
            </p>
            <ButtonLink href={apply.href} variant="light" className="mt-4">
              Apply <strong>now</strong>
            </ButtonLink>
          </Reveal>
        </div>
        <Stagger as="ul" className="grid content-start gap-3 lg:col-span-8">
          {items.map((o) => (
            <StaggerItem as="li" key={o.title}>
              <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 text-navy sm:flex-row sm:items-center sm:justify-between short:p-4">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cobalt-50 text-cobalt-700">
                    <BriefcaseBusiness aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-sans text-[1.08rem] font-semibold tracking-normal">{o.title}</h3>
                    <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin aria-hidden className="size-3.5" />
                        {o.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users aria-hidden className="size-3.5" />
                        {o.count}
                      </span>
                    </p>
                  </div>
                </div>
                <ButtonLink href={applyHref(o.title)} variant="secondary" size="sm" className="self-start sm:self-auto" aria-label={`Apply for ${o.title}`}>
                  Apply
                </ButtonLink>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Panel>
  );
}
