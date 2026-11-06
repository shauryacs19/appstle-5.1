import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { migrationPages, migrationPath } from "@/data/migrations";
import { migrationCopy } from "@/data/migrations/copy";
import { migrationHub } from "@/data/migrations/hub";
import { fastestShare } from "@/data/migrations/stats";
import { productById } from "@/data/products";
import { cn } from "@/lib/cn";

export function MigrationApps() {
  return (
    <Panel id="our-apps" labelledBy="our-apps-title" className="bg-white ring-1 ring-navy/6">
      <SectionHeading id="our-apps-title" eyebrow={migrationCopy.eyebrow} title={migrationHub.appsTitle} description={migrationHub.appsLead} className="max-w-3xl" titleClassName="lg:text-[2.6rem] short:text-[2.2rem]" />
      <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 short:mt-5">
        {migrationPages.map((m) => {
          const app = productById[m.product];
          const fast = m.stats ? fastestShare(m.product) : undefined;
          const fact = fast && migrationCopy.fastest(fast.value, fast.label);
          return (
            <StaggerItem as="li" key={m.slug}>
              <div className={cn("group relative flex h-full flex-col rounded-3xl p-5 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-1 hover:shadow-card short:p-4", app.accent.soft)}>
                <ProductIcon id={app.id} size="lg" />
                <h3 className="mt-4 text-[1.25rem] font-bold text-navy">
                  <SmartLink href={migrationPath(m)} className="after:absolute after:inset-0 after:rounded-3xl">
                    {app.name}
                  </SmartLink>
                </h3>
                <p className="mt-1.5 flex-1 text-[0.9rem] leading-snug text-ink-muted">{migrationHub.appCardLine}</p>
                {fact && (
                  <p className="mt-4 rounded-2xl bg-white px-3.5 py-2.5 text-[0.85rem] text-ink-muted shadow-hairline">
                    <strong className="font-display text-lg font-extrabold text-navy">{fact.value}</strong> {fact.label}
                  </p>
                )}
                <p aria-hidden className={cn("mt-4 text-sm font-semibold transition group-hover:translate-x-0.5", app.accent.text)}>
                  {migrationCopy.checklist} →
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Panel>
  );
}
