import { AboutFacts } from "@/components/sections/about/AboutFacts";
import { BrandDeckSection } from "@/components/sections/about/BrandDeckSection";
import { FoundersSection } from "@/components/sections/about/FoundersSection";
import { GrowthSection } from "@/components/sections/about/GrowthSection";
import { MissionSection } from "@/components/sections/about/MissionSection";
import { CompanyCta } from "@/components/sections/company/CompanyCta";
import { CompanyLinks } from "@/components/sections/company/CompanyLinks";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { aboutPage } from "@/data/pages/about";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.about);

export default function AboutPage() {
  const { hero, facts, founders, mission, growth, brandDeck } = aboutPage;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "About", path: routes.about },
        ]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={<p>{hero.intro}</p>}
        actions={
          <>
            <ButtonLink href="#founders" size="lg">
              Meet the <strong>founders</strong>
            </ButtonLink>
            <ButtonLink href={links.contact} variant="secondary" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
          </>
        }
        aside={<AboutFacts facts={facts} />}
      />
      <FoundersSection title={founders.title} people={founders.people} />
      <MissionSection data={mission} />
      <GrowthSection data={growth} />
      <BrandDeckSection title={brandDeck.title} decks={brandDeck.decks} />
      <CompanyLinks current="about" />
      <CompanyCta />
    </>
  );
}
