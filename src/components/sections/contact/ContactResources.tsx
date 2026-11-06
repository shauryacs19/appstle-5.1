import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";

export function ContactResources({ items }: { items: { label: string; href: string; icon: LucideIcon; body: string }[] }) {
  return (
    <Panel id="self-serve" labelledBy="self-serve-title" bare>
      <SectionHeading id="self-serve-title" eyebrow="Self-serve" title="Prefer to look it up?" titleClassName="lg:text-[2.4rem] short:text-[2.1rem]" />
      <Stagger as="ul" className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2 short:mt-5">
        {items.map((r) => {
          const Icon = r.icon;
          return (
            <StaggerItem as="li" key={r.label}>
              <div className="group relative flex h-full items-start gap-4 rounded-3xl bg-white p-5 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream-100 text-navy">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div className="flex-1">
                  <h3 className="font-sans text-[1.05rem] font-semibold tracking-normal text-navy">
                    <SmartLink href={r.href} className="after:absolute after:inset-0 after:rounded-3xl">
                      {r.label}
                    </SmartLink>
                  </h3>
                  <p className="mt-1 text-[0.9rem] text-ink-muted">{r.body}</p>
                </div>
                <ArrowUpRight aria-hidden className="size-4 text-navy/30 transition group-hover:text-cobalt" />
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
