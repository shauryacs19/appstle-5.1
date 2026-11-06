import { PartnerWall } from "@/components/features/PartnerWall";
import { CompanyLinks } from "@/components/sections/company/CompanyLinks";
import { BecomePartner } from "@/components/sections/partners/BecomePartner";
import { IntegrationsByApp } from "@/components/sections/partners/IntegrationsByApp";
import { PartnerDirectorySection } from "@/components/sections/partners/PartnerDirectorySection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { appPartnersPage } from "@/data/pages/app-partners";
import { partnerRows } from "@/data/partners";
import { seo } from "@/data/seo";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.appPartners);

export default function AppPartnersPage() {
  const { hero, directory, byApp, become } = appPartnersPage;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "App Partners", path: routes.appPartners },
        ]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={<p>{hero.intro}</p>}
        actions={
          <>
            <ButtonLink href="#partners" size="lg">
              Browse <strong>partners</strong>
            </ButtonLink>
            <ButtonLink href={become.partnerHref} variant="secondary" size="lg">
              Become a <strong>Partner</strong>
            </ButtonLink>
          </>
        }
        aside={<PartnerWall rows={partnerRows} className="py-8" />}
      />
      <PartnerDirectorySection eyebrow={directory.eyebrow} title={directory.title} description={directory.description} />
      <IntegrationsByApp eyebrow={byApp.eyebrow} title={byApp.title} description={byApp.description} />
      <BecomePartner title={become.title} body={become.body} partnerHref={become.partnerHref} contactHref={become.contactHref} />
      <CompanyLinks current="appPartners" />
    </>
  );
}
