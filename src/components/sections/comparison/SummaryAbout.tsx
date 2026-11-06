import { Check } from "lucide-react";
import { VideoFacade } from "@/components/features/comparison/VideoFacade";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { Prose } from "@/components/ui/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cleanHtml, fixPath } from "@/data/comparison-pages/fix-html";
import type { SummarySection } from "@/data/comparison-pages/summaries";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { prepareContent, stripTags } from "@/lib/html";

function splitList(html: string) {
  const at = html.indexOf("<ul>");
  if (at < 0) return { intro: html, label: "", items: [] as string[] };
  const before = html.slice(0, at);
  const label = before.match(/<p>([^<]*:)\s*<\/p>\s*$/);
  const items = [...html.slice(at).matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => stripTags(m[1]));
  return { intro: label ? before.slice(0, label.index) : before, label: label ? stripTags(label[1]) : "", items };
}

export function SummaryAbout({ section, app }: { section: SummarySection; app: Product }) {
  const { intro, label, items } = splitList(cleanHtml(section.html, app.id));
  return (
    <Panel id="about-app" labelledBy="about-app-title" className="bg-white ring-1 ring-navy/6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeading id="about-app-title" eyebrow={app.name} title={section.title} dot={app.accent.solid} titleClassName="lg:text-[2.4rem] short:text-[2rem]" />
          <Reveal delay={0.1}>
            <Prose html={prepareContent(intro, { toc: false }).html} size="compact" className="mt-4 short:mt-3 short:text-[0.92rem] short:[&_p]:mt-2" />
          </Reveal>
          {section.buttons.map((b) => (
            <ButtonLink key={b.href + b.label} href={fixPath(b.href)} variant="secondary" className="mt-5 short:mt-4">
              {b.label}
            </ButtonLink>
          ))}
        </div>
        {section.video && (
          <Reveal delay={0.15} className="lg:col-span-5">
            <VideoFacade src={section.video} title={`${section.title} (video)`} />
          </Reveal>
        )}
      </div>
      {items.length > 0 && (
        <div className="mt-8 border-t border-navy/8 pt-6 short:mt-5 short:pt-4">
          {label && <h3 className="font-sans text-[1rem] font-semibold tracking-normal text-navy">{label}</h3>}
          <Stagger as="ul" className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 short:gap-y-1.5" interval={0.03}>
            {items.map((it) => (
              <StaggerItem as="li" key={it} className="flex gap-2 text-[0.9rem] leading-snug text-ink-muted short:text-[0.85rem]">
                <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", app.accent.text)} />
                {it}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}
    </Panel>
  );
}
