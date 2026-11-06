import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { excerptOf } from "@/data/articles/excerpt";
import { fixNewsHtml, newsCopy } from "@/data/articles/news";
import { formatDate } from "@/data/content/format";
import type { ContentEntry } from "@/data/content/types";

export function NewsletterList({ items }: { items: ContentEntry[] }) {
  if (!items.length) return null;
  return (
    <Panel id="newsletters" labelledBy="newsletters-title" bare>
      <SectionHeading id="newsletters-title" eyebrow={newsCopy.newsletterLabel} title="From the Appstle team" titleClassName="lg:text-[2.4rem] short:text-[2rem]" />
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2 short:mt-6">
        {items.map((n) => (
          <StaggerItem as="li" key={n.path}>
            <article className="group relative flex h-full gap-4 rounded-3xl bg-white p-5 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-0.5 hover:shadow-card short:p-4">
              <span aria-hidden className="mt-1 h-auto w-1 shrink-0 rounded-full bg-cobalt-200" />
              <div>
                <h3 className="font-sans text-[1rem] leading-snug font-semibold tracking-normal text-navy">
                  <Link href={n.path} className="after:absolute after:inset-0 after:rounded-3xl hover:underline">
                    {n.title}
                  </Link>
                </h3>
                <p className="mt-1.5 line-clamp-2 text-[0.88rem] leading-snug text-ink-muted short:line-clamp-1">{excerptOf({ excerpt: n.excerpt, html: fixNewsHtml(n.html) }, 160)}</p>
                <time dateTime={n.date.slice(0, 10)} className="mt-2 block text-[0.8rem] text-ink-subtle">
                  {formatDate(n.date)}
                </time>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Panel>
  );
}
