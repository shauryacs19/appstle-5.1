import { PanelTabs } from "@/components/features/comparison/PanelTabs";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { Prose } from "@/components/ui/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonCopy } from "@/data/comparison-pages/copy";
import { cleanHtml, fixPath } from "@/data/comparison-pages/fix-html";
import type { SummaryCard } from "@/data/comparison-pages/summaries";
import { comparisonBySlug } from "@/data/content/comparisons";
import type { Product } from "@/data/products";
import { prepareContent } from "@/lib/html";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function SummaryCards({ cards, app }: { cards: SummaryCard[]; app: Product }) {
  const t = comparisonCopy.summary;
  const tabs = cards.map((c) => ({ id: slugify(c.competitor), label: c.competitor }));
  return (
    <Panel id="app-by-app" labelledBy="app-by-app-title" className="bg-white ring-1 ring-navy/6">
      <SectionHeading id="app-by-app-title" eyebrow={t.cardsEyebrow} title={t.cardsTitle(app.name)} dot={app.accent.solid} className="max-w-3xl" titleClassName="lg:text-[2.4rem] short:text-[2rem]" />
      <Reveal delay={0.1} className="mt-6 short:mt-4">
        <PanelTabs tabs={tabs} idPrefix="app-by-app" label={`${app.name} compared with`} accent={app.accent}>
          {cards.map((c) => {
            const href = c.link ? fixPath(c.link.href, app.id) : "";
            const exists = !!href && !!comparisonBySlug(href.replace(/\//g, ""));
            return (
              <article key={c.competitor} className={`rounded-3xl p-5 ring-1 ring-navy/8 sm:p-7 short:p-5 ${app.accent.soft}`}>
                <h3 className="text-[1.45rem] font-bold text-navy short:text-[1.3rem]">
                  {c.appstle} <span className="text-ink-subtle">vs</span> {c.competitor}
                </h3>
                <Prose html={prepareContent(cleanHtml(c.html, app.id), { toc: false }).html} size="compact" className="mt-3 short:text-[0.9rem] [&_p]:mt-2.5" />
                {exists && (
                  <ButtonLink href={href} variant="dark" size="sm" className="mt-5 short:mt-4">
                    {t.readFull}
                  </ButtonLink>
                )}
              </article>
            );
          })}
        </PanelTabs>
      </Reveal>
    </Panel>
  );
}
