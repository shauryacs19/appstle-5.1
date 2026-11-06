import { FilterableGrid } from "@/components/features/articles/FilterableGrid";
import { EntryCard } from "@/components/sections/article/EntryCard";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Panel } from "@/components/ui/Panel";
import { caseStudyCopy, caseStudyMeta } from "@/data/articles/case-studies";
import { caseStudies, caseStudySlug } from "@/data/content/case-studies";
import { products } from "@/data/products";
import { seo } from "@/data/seo";
import { collectionLd } from "@/lib/jsonld";
import { routes } from "@/lib/routes";
import { caseStudyCard } from "./caseStudyCard";
import { FeaturedNextCta } from "./FeaturedNextCta";

export function CaseStudiesArchive() {
  const latest = caseStudies[0];
  const tags = (slug: string) => caseStudyMeta[slug]?.products ?? [];
  const used = products.filter((p) => caseStudies.some((c) => tags(caseStudySlug(c)).includes(p.id)));
  return (
    <>
      <JsonLd data={collectionLd({ name: seo.caseStudies.title, description: seo.caseStudies.description, path: seo.caseStudies.path, items: caseStudies.map((c) => ({ name: c.title, path: c.path })) })} />
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Case studies", path: routes.caseStudies },
        ]}
        eyebrow={caseStudyCopy.eyebrow}
        title={caseStudyCopy.h1}
        intro={<p>{caseStudyCopy.intro}</p>}
        aside={
          latest && (
            <div>
              <p className="eyebrow mb-3 text-ink-subtle">{caseStudyCopy.latest}</p>
              <EntryCard card={caseStudyCard(latest)} featured headingLevel="h2" className="shadow-card" />
            </div>
          )
        }
      />
      <Panel id="stories" labelledBy="stories-title" fit={caseStudies.length > 3 ? "flow" : "screen"} className="bg-white ring-1 ring-navy/6">
        <h2 id="stories-title" className="mb-5 text-[2rem] leading-tight font-extrabold tracking-tight text-navy lg:text-[2.4rem]">
          {caseStudyCopy.gridTitle}
        </h2>
        <FilterableGrid
          label="Filter stories by app"
          allLabel={caseStudyCopy.allLabel}
          options={used.map((p) => ({ id: p.id, label: p.shortName }))}
          items={caseStudies.map((c) => ({ key: c.path, tags: tags(caseStudySlug(c)), node: <EntryCard card={caseStudyCard(c)} /> }))}
        />
      </Panel>
      <FeaturedNextCta />
    </>
  );
}
