import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import type { ExploreLink } from "@/data/comparison-pages/explore";
import { cn } from "@/lib/cn";

export function ExploreLinks({ items, className }: { items: ExploreLink[]; className?: string }) {
  return (
    <Stagger as="ul" className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((l) => {
        const Icon = l.icon;
        return (
          <StaggerItem as="li" key={l.href}>
            <div className="group relative flex h-full gap-4 rounded-3xl bg-white p-4 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card short:p-3.5">
              <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-2xl bg-cobalt-50 text-cobalt-700 transition group-hover:scale-105">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <SmartLink href={l.href} className="font-semibold text-navy after:absolute after:inset-0 after:rounded-3xl">
                  {l.title}
                </SmartLink>
                <span className="mt-0.5 block text-[0.86rem] leading-snug text-ink-muted">{l.body}</span>
              </span>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
