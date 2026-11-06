import type { LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Accent } from "@/data/products";
import { cn } from "@/lib/cn";

export type GridFeature = { icon: LucideIcon; title: string; body: string; href?: string };

export function FeatureGrid({
  id,
  eyebrow,
  title,
  description,
  items,
  accent,
  className,
  compact = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: GridFeature[];
  accent: Accent;
  className?: string;
  compact?: boolean;
}) {
  if (compact)
    return (
      <Panel id={id} labelledBy={`${id}-title`} className={cn("bg-white ring-1 ring-line", className)}>
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} dot="bg-brand" align="center" titleClassName="lg:text-[2.4rem]" />
        <Stagger as="ul" className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5" interval={0.04}>
          {items.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem as="li" key={f.title}>
                <span
                  title={f.body}
                  className="hover-pop inline-flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-2 text-[0.95rem] font-semibold text-ink shadow-soft ring-1 ring-line transition"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-brand-50 text-brand">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  {f.href ? (
                    <SmartLink href={f.href} className="hover:text-brand">
                      {f.title}
                    </SmartLink>
                  ) : (
                    f.title
                  )}
                </span>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Panel>
    );
  return (
    <Panel id={id} labelledBy={`${id}-title`} className={cn("bg-white ring-1 ring-navy/6", className)}>
      <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} description={description} dot={accent.solid} titleClassName="lg:text-[2.6rem]" />
      <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((f) => {
          const Icon = f.icon;
          return (
            <StaggerItem as="li" key={f.title}>
              <div className="group relative h-full rounded-2xl bg-cream-50 p-4 ring-1 ring-navy/6 transition hover:-translate-y-0.5 hover:shadow-card">
                <span className={cn("grid size-9 place-items-center rounded-xl", accent.chip, accent.text)}>
                  <Icon aria-hidden className="size-[1.1rem]" />
                </span>
                <h3 className="mt-3 font-sans text-[0.98rem] font-semibold tracking-normal text-navy">
                  {f.href ? (
                    <SmartLink href={f.href} className="after:absolute after:inset-0 after:rounded-2xl hover:underline">
                      {f.title}
                    </SmartLink>
                  ) : (
                    f.title
                  )}
                </h3>
                <p className="mt-1 text-[0.88rem] leading-snug text-ink-muted">{f.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
