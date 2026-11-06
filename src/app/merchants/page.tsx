import { CompanyCta } from "@/components/sections/company/CompanyCta";
import { CompanyLinks } from "@/components/sections/company/CompanyLinks";
import { GrowMoreSection } from "@/components/sections/merchants/GrowMoreSection";
import { MerchantCharts } from "@/components/sections/merchants/MerchantCharts";
import { MerchantProofCard } from "@/components/sections/merchants/MerchantProofCard";
import { SelectMerchants } from "@/components/sections/merchants/SelectMerchants";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { merchantsPage } from "@/data/pages/merchants";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.merchants);

export default function MerchantsPage() {
  const { hero, proof, approach, caseStudyFor, charts, grow, caseStudiesHref } = merchantsPage;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Merchants", path: routes.merchants },
        ]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={<p>{hero.intro}</p>}
        actions={
          <>
            <ButtonLink href={caseStudiesHref} size="lg">
              Read case <strong>studies</strong>
            </ButtonLink>
            <ButtonLink href={links.contact} variant="secondary" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
          </>
        }
        aside={<MerchantProofCard count={proof.count} asOf={proof.asOf} offers={proof.offers} />}
      />
      <SelectMerchants eyebrow={approach.eyebrow} title={approach.title} body={approach.body} caseStudyFor={caseStudyFor} caseStudiesHref={caseStudiesHref} />
      <MerchantCharts charts={charts} />
      <GrowMoreSection title={grow.title} intro={grow.intro} image={grow.image} apps={grow.apps} />
      <CompanyLinks current="merchants" />
      <CompanyCta />
    </>
  );
}
