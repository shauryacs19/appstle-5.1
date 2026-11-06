import { Gem, LayoutDashboard, Sparkles, type LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: LucideIcon[] = [LayoutDashboard, Sparkles, Gem];

export function AmazonWhy({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <Panel id="why" labelledBy="why-title" bare>
      <SectionHeading id="why-title" eyebrow="Why Appstle" title={title} className="max-w-4xl" titleClassName="lg:text-[2.6rem] short:text-[2.15rem]" />
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 short:mt-5">
        {items.map((it, i) => {
          const Icon = icons[i % icons.length];
          return (
            <StaggerItem as="li" key={it.title}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-navy/8 short:p-5">
                <span className="grid size-11 place-items-center rounded-2xl bg-navy text-white">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy short:mt-4">{it.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-muted short:text-[0.87rem] short:leading-snug">{it.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
