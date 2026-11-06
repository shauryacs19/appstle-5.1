import { CausesPledge } from "@/components/sections/causes/CausesPledge";
import { CausesSection } from "@/components/sections/causes/CausesSection";
import { CompanyCta } from "@/components/sections/company/CompanyCta";
import { CompanyLinks } from "@/components/sections/company/CompanyLinks";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { causesPage } from "@/data/pages/causes";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.causes);

export default function CausesPage() {
  const { hero, pledge, causes } = causesPage;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Causes We Support", path: routes.causes },
        ]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        actions={
          <>
            <ButtonLink href="#causes" size="lg">
              See the <strong>causes</strong>
            </ButtonLink>
            <ButtonLink href={links.about} variant="secondary" size="lg">
              About <strong>Appstle</strong>
            </ButtonLink>
          </>
        }
        aside={<CausesPledge value={pledge.value} body={pledge.body} names={causes.map((c) => c.name)} />}
      />
      <CausesSection causes={causes} />
      <CompanyLinks current="causes" />
      <CompanyCta />
    </>
  );
}
