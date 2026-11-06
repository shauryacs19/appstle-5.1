import { Check } from "lucide-react";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { migrationCopy } from "@/data/migrations/copy";
import { migrationHub } from "@/data/migrations/hub";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";
import { MigrationApps } from "./MigrationApps";
import { TopMigrated } from "./TopMigrated";

export function MigrationHub() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Migrations", path: routes.migrations },
        ]}
        eyebrow={migrationCopy.eyebrow}
        title={<span className="block text-[2.3rem] sm:text-[3rem] lg:text-[3.4rem] short:text-[2.9rem]">{migrationHub.title}</span>}
        intro={
          <>
            <p className="font-semibold text-navy">{migrationHub.subtitle}</p>
            <ul className="mt-4 grid gap-2.5 text-base">
              {migrationHub.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-cobalt-700" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </>
        }
        actions={
          <>
            <ButtonLink href="#our-apps" size="lg" icon="none">
              View migration <strong>checklists</strong>
            </ButtonLink>
            <ButtonLink href={links.contact} variant="secondary" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
          </>
        }
      />
      <MigrationApps />
      <TopMigrated />
      <CtaBand
        title={migrationCopy.hubCtaTitle}
        body={migrationCopy.hubCtaBody}
        actions={
          <ButtonLink href={links.contact} variant="light" size="lg">
            Contact <strong>Us</strong>
          </ButtonLink>
        }
      />
    </>
  );
}
