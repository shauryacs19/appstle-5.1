import { CtaBand } from "@/components/sections/shared/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { comparisonCopy } from "@/data/comparison-pages/copy";
import { appstleAppOf, comparisonDescription, comparisonTitle, liveDescription, relatedComparisons } from "@/data/comparison-pages/meta";
import { isoDate } from "@/data/content/format";
import type { Comparison } from "@/data/content/types";
import { links } from "@/data/site";
import { articleLd } from "@/lib/jsonld";
import { ComparisonArticle } from "./ComparisonArticle";
import { ComparisonHero } from "./ComparisonHero";
import { ComparisonSnapshot } from "./ComparisonSnapshot";
import { RelatedComparisons } from "./RelatedComparisons";

export function ComparisonPage({ c }: { c: Comparison }) {
  const app = appstleAppOf(c);
  const t = comparisonCopy.single;
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: comparisonTitle(c),
          description: comparisonDescription(c),
          path: c.path,
          datePublished: isoDate(c.date),
          dateModified: isoDate(c.modified),
          section: "Comparisons",
        })}
      />
      <ComparisonHero c={c} lead={liveDescription(c) || undefined} />
      <ComparisonSnapshot c={c} />
      <ComparisonArticle c={c} />
      <RelatedComparisons product={c.product} items={relatedComparisons(c)} skip={c.path} />
      <CtaBand
        title={t.ctaTitle(app)}
        body={t.ctaBody(app, c.product !== "pickup")}
        actions={
          <>
            <ButtonLink href={app.installHref} variant="light" size="lg">
              Install the <strong>app</strong>
            </ButtonLink>
            <ButtonLink href={links.contact} variant="outlineLight" size="lg">
              Contact <strong>Us</strong>
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
