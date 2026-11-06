import { CtaBand } from "@/components/sections/shared/CtaBand";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { cleanHtml } from "@/data/comparison-pages/fix-html";
import { comparisonsFor } from "@/data/content/comparisons";
import { summaries, type SummaryProduct } from "@/data/comparison-pages/summaries";
import { productById } from "@/data/products";
import { seo } from "@/data/seo";
import { links } from "@/data/site";
import { articleLd } from "@/lib/jsonld";
import { stripTags } from "@/lib/html";
import { routes } from "@/lib/routes";
import { MatrixScore } from "./MatrixScore";
import { RelatedComparisons } from "./RelatedComparisons";
import { SummaryAbout } from "./SummaryAbout";
import { SummaryCards } from "./SummaryCards";
import { SummaryMatrix } from "./SummaryMatrix";

export function SummaryPage({ product }: { product: SummaryProduct }) {
  const { page, path, seoKey } = summaries[product];
  const app = productById[product];
  const [hero, about, matrixSection] = page.sections;
  const meta = seo[seoKey];

  return (
    <>
      <JsonLd data={articleLd({ headline: hero?.title ?? page.title, description: meta.description, path, datePublished: page.modified.slice(0, 10), section: "Comparisons" })} />
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Comparisons", path: routes.comparisons },
          { name: page.title, path },
        ]}
        eyebrow={app.name}
        dot={app.accent.solid}
        title={hero?.title ?? page.title}
        intro={hero?.html ? <p>{stripTags(hero.html)}</p> : undefined}
        actions={
          <>
            <ButtonLink href={links.contact} size="lg">
              Book a <strong>demo</strong>
            </ButtonLink>
            <ButtonLink href={app.installHref} variant="secondary" size="lg">
              Install the <strong>app</strong>
            </ButtonLink>
          </>
        }
        aside={<MatrixScore matrix={page.matrix} accent={app.accent} title={matrixSection?.title ?? page.title} />}
      />
      {about && <SummaryAbout section={about} app={app} />}
      <SummaryMatrix section={matrixSection} matrix={page.matrix} app={app} />
      <SummaryCards cards={page.cards} app={app} />
      <RelatedComparisons product={product} items={comparisonsFor(product)} skip={path} />
      <CtaBand
        title={page.cta.title}
        body={stripTags(cleanHtml(page.cta.html, product))}
        actions={
          <>
            <ButtonLink href={links.contact} variant="light" size="lg">
              Contact <strong>us</strong>
            </ButtonLink>
            <ButtonLink href={routes.migration[product]} variant="outlineLight" size="lg">
              How migration <strong>works</strong>
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
