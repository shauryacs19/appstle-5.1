import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CareerBenefit } from "@/data/pages/careers";
import { cn } from "@/lib/cn";

const tones = ["bg-mint-50 text-mint-700", "bg-coral-50 text-coral-700", "bg-cobalt-50 text-cobalt-700", "bg-lavender-50 text-lavender-700"];

export function CareersBenefits({ title, items }: { title: string; items: CareerBenefit[] }) {
  return (
    <Panel id="benefits" labelledBy="benefits-title" bare>
      <SectionHeading id="benefits-title" eyebrow="Life at Appstle" title={title} titleClassName="lg:text-[2.6rem] short:text-[2.2rem]" />
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 short:mt-5">
        {items.map((b, i) => {
          const Icon = b.icon;
          return (
            <StaggerItem as="li" key={b.title}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className={cn("grid size-11 place-items-center rounded-2xl", tones[i % tones.length])}>
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-4 font-sans text-[1.05rem] font-semibold tracking-normal text-navy">{b.title}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-muted short:text-[0.85rem] short:leading-snug">{b.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
