import { RelatedComparisons } from "@/components/sections/comparison/RelatedComparisons";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { comparisonsFor } from "@/data/content/comparisons";
import { migrationPath } from "@/data/migrations";
import type { MigrationPage } from "@/data/migrations/types";
import { productById } from "@/data/products";
import { links } from "@/data/site";
import { MigrateAnywhere } from "./MigrateAnywhere";
import { MigrationBlocks } from "./MigrationBlocks";
import { MigrationHero } from "./MigrationHero";
import { MigrationPathSection } from "./MigrationPathSection";
import { MigrationStats } from "./MigrationStats";

export function MigrationGuide({ m }: { m: MigrationPage }) {
  const app = productById[m.product];
  const items = [...comparisonsFor(m.product)].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <MigrationHero m={m} />
      <MigrateAnywhere m={m} />
      <MigrationStats m={m} />
      <MigrationBlocks m={m} />
      <MigrationPathSection m={m} />
      <RelatedComparisons product={m.product} items={items} skip={migrationPath(m)} />
      <CtaBand
        title={m.cta.title}
        body={m.cta.body}
        actions={
          <>
            <ButtonLink href={links.contact} variant="light" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
            <ButtonLink href={app.installHref} variant="outlineLight" size="lg">
              Install the <strong>app</strong>
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
