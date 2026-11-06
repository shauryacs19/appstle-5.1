import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newsCopy, pressInfo } from "@/data/articles/news";
import { formatDate } from "@/data/content/format";
import type { ContentEntry } from "@/data/content/types";

export function PressList({ items }: { items: ContentEntry[] }) {
  return (
    <Panel id="press" labelledBy="press-title" className="bg-white ring-1 ring-navy/6">
      <SectionHeading id="press-title" eyebrow={newsCopy.pressLabel} title="Appstle in the news" titleClassName="lg:text-[2.4rem] short:text-[2rem]" />
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 short:mt-6">
        {items.map((n) => {
          const p = pressInfo(n);
          if (!p) return null;
          return (
            <StaggerItem as="li" key={n.path}>
              <article className="group relative flex h-full flex-col rounded-3xl bg-cream-50 p-5 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card short:p-4">
                <p className="font-display text-[1.3rem] leading-none font-extrabold tracking-tight text-navy short:text-[1.15rem]">{p.outlet}</p>
                <h3 className="mt-3 flex-1 font-sans text-[0.95rem] leading-snug font-semibold tracking-normal text-navy short:text-[0.88rem]">
                  <Link href={n.path} className="after:absolute after:inset-0 after:rounded-3xl hover:underline">
                    {p.headline}
                  </Link>
                </h3>
                <div className="relative z-10 mt-4 flex items-center justify-between gap-3 text-[0.8rem]">
                  <time dateTime={n.date.slice(0, 10)} className="text-ink-subtle">
                    {formatDate(n.date)}
                  </time>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-cobalt-700 hover:underline">
                    {p.isPdf ? "PDF" : p.outlet}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
