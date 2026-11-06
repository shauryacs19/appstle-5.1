import { AmazonFeatures } from "@/components/sections/amazon/AmazonFeatures";
import { AmazonSyncVisual } from "@/components/sections/amazon/AmazonSyncVisual";
import { AmazonWhat } from "@/components/sections/amazon/AmazonWhat";
import { AmazonWhy } from "@/components/sections/amazon/AmazonWhy";
import { CompanyLinks } from "@/components/sections/company/CompanyLinks";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { amazonPage } from "@/data/pages/amazon";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.amazon);

export default function AmazonIntegrationPage() {
  const { hero, what, why, features, closing } = amazonPage;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Amazon Integration", path: routes.amazon },
        ]}
        eyebrow={hero.eyebrow}
        title={<span className="block text-[2.2rem] sm:text-[2.8rem] lg:text-[3.1rem] short:text-[2.5rem]">{hero.title}</span>}
        intro={
          <ul className="grid gap-2 text-base short:gap-1.5 short:text-[0.95rem]">
            {hero.points.map((pt) => (
              <li key={pt} className="flex gap-2.5">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cobalt" />
                {pt}
              </li>
            ))}
          </ul>
        }
        actions={
          <>
            <ButtonLink href={hero.cta.href} size="lg">
              Get <strong>Started</strong>
            </ButtonLink>
            <span className="text-sm font-medium text-ink-muted">{hero.note}</span>
          </>
        }
        aside={<AmazonSyncVisual synced={hero.synced} />}
      />
      <AmazonWhat data={what} />
      <AmazonWhy title={why.title} items={why.items} />
      <AmazonFeatures title={features.title} items={features.items} />
      <CtaBand
        title={closing.title}
        body={
          <>
            {closing.body} <strong className="text-white">{closing.note}</strong>
            <span className="mt-3 block text-base">
              {closing.integrationsTitle}: <a href={`mailto:${closing.email}`} className="font-semibold text-white underline underline-offset-4">{closing.email}</a>
            </span>
          </>
        }
        actions={
          <>
            <ButtonLink href={links.contact} variant="light" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
            <ButtonLink href={`mailto:${closing.email}`} variant="outlineLight" size="lg">
              Email <strong>support</strong>
            </ButtonLink>
          </>
        }
      />
      <CompanyLinks current="contact" exclude={["causes", "careers"]} />
    </>
  );
}
