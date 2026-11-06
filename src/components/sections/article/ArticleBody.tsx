import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { TableOfContents } from "@/components/features/content/TableOfContents";
import { Panel, panelInner } from "@/components/ui/Panel";
import { Prose } from "@/components/ui/Prose";
import type { TocItem } from "@/lib/html";
import { cn } from "@/lib/cn";

export function ArticleBody({
  html,
  toc,
  depth = 2,
  aside,
  after,
  label = "Article",
}: {
  html: string;
  toc: TocItem[];
  depth?: 2 | 3;
  aside?: ReactNode;
  after?: ReactNode;
  label?: string;
}) {
  const hasToc = toc.filter((t) => t.level <= depth).length >= 2;
  return (
    <Panel id="article" fit="flow" bare innerClassName="p-0 sm:p-0">
      <div className={cn("rounded-[2rem] bg-white ring-1 ring-navy/6 sm:rounded-[2.5rem]", panelInner)}>
        <h2 className="sr-only">{label}</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto lg:pr-2">
              {hasToc && (
                <>
                  <details className="group rounded-2xl bg-cream-50 ring-1 ring-navy/8 lg:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden">
                      On this page
                      <ChevronDown aria-hidden className="size-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <TableOfContents items={toc} depth={depth} title="Contents" className="px-4 pb-4" />
                  </details>
                  <TableOfContents items={toc} depth={depth} className="hidden lg:block" />
                </>
              )}
              {aside && <div className="mt-8 hidden gap-4 lg:grid">{aside}</div>}
            </div>
          </aside>
          <div className="min-w-0 lg:col-span-8 xl:col-span-9">
            <Prose html={html} className="max-w-[46rem]" />
            {aside && <div className="mt-10 grid gap-4 lg:hidden">{aside}</div>}
            {after && <div className="mt-12 max-w-[46rem]">{after}</div>}
          </div>
        </div>
      </div>
    </Panel>
  );
}
