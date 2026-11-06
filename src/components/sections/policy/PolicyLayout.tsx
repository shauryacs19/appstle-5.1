import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Panel } from "@/components/ui/Panel";
import { policies, type PolicyId } from "@/data/pages/policies";
import type { TocItem } from "@/lib/html";
import { routes } from "@/lib/routes";
import { PolicyAside } from "./PolicyAside";

export function PolicyLayout({ id, toc = [], children }: { id: PolicyId; toc?: TocItem[]; children: ReactNode }) {
  const p = policies[id];
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: p.label, path: p.path },
        ]}
        eyebrow="Legal"
        title={p.title}
        intro={<p>{p.intro}</p>}
      />
      <Panel id="policy" labelledBy="page-title" className="bg-white ring-1 ring-navy/6" fit="flow">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 xl:col-span-3">
            <PolicyAside current={id} toc={toc} supportEmail="support@appstle.com" />
          </div>
          <div className="min-w-0 lg:col-span-8 xl:col-span-9">{children}</div>
        </div>
      </Panel>
    </>
  );
}
