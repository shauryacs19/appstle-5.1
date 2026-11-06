import { FileText, LifeBuoy } from "lucide-react";
import { TableOfContents } from "@/components/features/content/TableOfContents";
import { SmartLink } from "@/components/ui/SmartLink";
import { policies, type PolicyId } from "@/data/pages/policies";
import type { TocItem } from "@/lib/html";
import { cn } from "@/lib/cn";

export function PolicyAside({ current, toc, supportEmail }: { current: PolicyId; toc: TocItem[]; supportEmail: string }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      {toc.length > 1 && (
        <details open className="group rounded-3xl bg-white p-5 ring-1 ring-navy/8 lg:p-0 lg:ring-0 [&>summary::-webkit-details-marker]:hidden">
          <summary className="cursor-pointer list-none font-semibold text-navy lg:hidden">Contents</summary>
          <TableOfContents items={toc} title="On this page" className="mt-3 max-h-[calc(100svh-24rem)] overflow-y-auto lg:mt-0" />
        </details>
      )}
      <nav aria-label="Legal pages" className={cn("rounded-3xl bg-cream-50 p-5 ring-1 ring-navy/6", toc.length > 1 && "mt-6")}>
        <p className="eyebrow text-ink-subtle">Legal</p>
        <ul className="mt-3 grid gap-1">
          {(Object.keys(policies) as PolicyId[]).map((id) => (
            <li key={id}>
              <SmartLink
                href={policies[id].path}
                aria-current={id === current ? "page" : undefined}
                className={cn("flex items-center gap-2 rounded-xl px-2.5 py-2 text-[0.9rem] font-medium", id === current ? "bg-white text-navy shadow-hairline" : "text-ink-muted hover:text-navy")}
              >
                <FileText aria-hidden className="size-4 text-cobalt" />
                {policies[id].label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-start gap-2 border-t border-navy/8 pt-4 text-[0.85rem] leading-snug text-ink-muted">
          <LifeBuoy aria-hidden className="mt-0.5 size-4 shrink-0 text-cobalt" />
          <span>
            Questions? Email{" "}
            <a href={`mailto:${supportEmail}`} className="font-semibold text-cobalt-700 hover:underline">
              {supportEmail}
            </a>
          </span>
        </p>
      </nav>
    </aside>
  );
}
