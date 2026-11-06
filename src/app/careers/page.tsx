import Image from "next/image";
import { CareersBenefits } from "@/components/sections/careers/CareersBenefits";
import { CareersOpenings } from "@/components/sections/careers/CareersOpenings";
import { CareersValues } from "@/components/sections/careers/CareersValues";
import { CompanyCta } from "@/components/sections/company/CompanyCta";
import { CompanyLinks } from "@/components/sections/company/CompanyLinks";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { careersPage } from "@/data/pages/careers";
import { seo } from "@/data/seo";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.careers);

export default function CareersPage() {
  const { hero, values, focus, benefits, openings, apply } = careersPage;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Careers", path: routes.careers },
        ]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro.map((p, i) => (
          <p key={i} className={i ? "mt-3" : undefined}>
            {p}
          </p>
        ))}
        actions={
          <>
            <ButtonLink href="#positions" size="lg">
              View open <strong>positions</strong>
            </ButtonLink>
            <ButtonLink href={apply.href} variant="secondary" size="lg">
              Apply <strong>now</strong>
            </ButtonLink>
          </>
        }
        aside={<Image src={hero.image.src} alt={hero.image.alt} preload sizes="(min-width: 1024px) 40vw, 90vw" className="mx-auto h-auto max-h-[calc(100svh-12rem)] w-auto" />}
      />
      <CareersValues values={values} focus={focus} />
      <CareersBenefits title={benefits.title} items={benefits.items} />
      <CareersOpenings title={openings.title} items={openings.items} apply={apply} />
      <CompanyLinks current="careers" />
      <CompanyCta />
    </>
  );
}
