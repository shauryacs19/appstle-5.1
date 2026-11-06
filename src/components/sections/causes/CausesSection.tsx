import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Media } from "@/components/ui/Media";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Cause } from "@/data/pages/causes";
import { cn } from "@/lib/cn";

const accents = ["bg-lavender-50", "bg-mint-50", "bg-cobalt-50"];

export function CausesSection({ causes }: { causes: Cause[] }) {
  return (
    <Panel id="causes" labelledBy="causes-title" className="bg-white ring-1 ring-navy/6">
      <SectionHeading id="causes-title" eyebrow="Our commitments" title="Organizations we support" titleClassName="lg:text-[2.7rem] short:text-[2.2rem]" />
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 short:mt-5">
        {causes.map((c, i) => (
          <StaggerItem as="li" key={c.id}>
            <article id={c.id} aria-labelledby={`${c.id}-title`} className={cn("flex h-full scroll-mt-28 flex-col rounded-4xl p-4 ring-1 ring-navy/6 sm:p-5", accents[i % accents.length])}>
              <Media item={c.media} sizes="(min-width: 768px) 30vw, 100vw" className="max-h-[calc(100svh-30rem)] min-h-28" />
              <h3 id={`${c.id}-title`} className="mt-4 text-[1.4rem] font-bold text-navy short:mt-3 short:text-[1.25rem]">
                {c.name}
              </h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-muted short:text-[0.86rem] short:leading-snug">{c.body}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
