import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { migrationCopy } from "@/data/migrations/copy";
import { migrationPath } from "@/data/migrations";
import type { MigrationPage } from "@/data/migrations/types";
import { productById } from "@/data/products";
import { links } from "@/data/site";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";
import { MigrationFacts } from "./MigrationFacts";

export function MigrationHero({ m }: { m: MigrationPage }) {
  const app = productById[m.product];
  return (
    <PageHero
      crumbs={[
        { name: "Home", path: routes.home },
        { name: "Migrations", path: routes.migrations },
        { name: m.name, path: migrationPath(m) },
      ]}
      eyebrow={migrationCopy.eyebrow}
      dot={app.accent.solid}
      title={<span className="block text-[2.2rem] sm:text-[2.8rem] lg:text-[3.1rem] short:text-[2.6rem]">{m.hero.title}</span>}
      intro={
        <ul className="grid gap-2.5 text-base short:gap-2 short:text-[0.95rem]">
          {m.hero.points.map((p) => (
            <li key={p} className="flex gap-2.5">
              <Check aria-hidden className={cn("mt-1 size-4 shrink-0", app.accent.text)} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      }
      actions={
        <>
          <ButtonLink href={links.contact} size="lg">
            Contact <strong>Us</strong>
          </ButtonLink>
          <ButtonLink href={app.installHref} variant="secondary" size="lg">
            {migrationCopy.install} <strong>app</strong>
          </ButtonLink>
        </>
      }
      aside={<MigrationFacts m={m} />}
    />
  );
}
