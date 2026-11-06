import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { comparisonCopy } from "@/data/comparison-pages/copy";
import { appstleAppOf, comparisonHeading, competitorShort } from "@/data/comparison-pages/meta";
import type { Comparison } from "@/data/content/types";
import { links } from "@/data/site";
import { routes } from "@/lib/routes";
import { VsCard } from "./VsCard";

export function ComparisonHero({ c, lead }: { c: Comparison; lead?: string }) {
  const app = appstleAppOf(c);
  const heading = comparisonHeading(c);
  return (
    <PageHero
      crumbs={[
        { name: "Home", path: routes.home },
        { name: "Comparisons", path: routes.comparisons },
        { name: `Appstle vs ${competitorShort(c)}`, path: c.path },
      ]}
      eyebrow={comparisonCopy.single.eyebrow(app)}
      dot={app.accent.solid}
      title={
        <span className={heading.length > 48 ? "block text-[2.15rem] sm:text-[2.7rem] lg:text-[3rem] short:text-[2.5rem]" : "block short:text-[3.2rem]"}>{heading}</span>
      }
      intro={lead ? <p>{lead}</p> : undefined}
      actions={
        <>
          <ButtonLink href={app.installHref} size="lg">
            Install <strong>{app.name.replace("Appstle ", "")}</strong>
          </ButtonLink>
          {app.pricingHref ? (
            <ButtonLink href={app.pricingHref} variant="secondary" size="lg">
              See <strong>pricing</strong>
            </ButtonLink>
          ) : (
            <ButtonLink href={links.contact} variant="secondary" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
          )}
        </>
      }
      aside={<VsCard c={c} />}
    />
  );
}
