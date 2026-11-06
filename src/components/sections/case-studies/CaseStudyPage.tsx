import { ShareLinks } from "@/components/features/articles/ShareLinks";
import { ArticleBody } from "@/components/sections/article/ArticleBody";
import { ArticleHero } from "@/components/sections/article/ArticleHero";
import { AuthorBox } from "@/components/sections/article/AuthorBox";
import { Chip } from "@/components/sections/article/Chip";
import { EntryCover } from "@/components/sections/article/EntryCover";
import { HeroCover } from "@/components/sections/article/HeroCover";
import { EntryMeta } from "@/components/sections/article/EntryMeta";
import { ProductAsideCard } from "@/components/sections/article/ProductAsideCard";
import { RelatedEntries } from "@/components/sections/article/RelatedEntries";
import { JsonLd } from "@/components/seo/JsonLd";
import { authorFor } from "@/data/articles/authors";
import { caseStudyCopy, caseStudyMeta } from "@/data/articles/case-studies";
import { excerptOf } from "@/data/articles/excerpt";
import { accentFor } from "@/data/content/accents";
import { caseStudies, caseStudySlug } from "@/data/content/case-studies";
import { readingMinutes } from "@/data/content/format";
import type { ContentEntry } from "@/data/content/types";
import { productById } from "@/data/products";
import { prepareContent } from "@/lib/html";
import { absoluteUrl, articleLd } from "@/lib/jsonld";
import { routes } from "@/lib/routes";
import { fitDescription } from "@/lib/seo";
import { caseStudyCard } from "./caseStudyCard";
import { FeaturedNextCta } from "./FeaturedNextCta";

export function CaseStudyPage({ study }: { study: ContentEntry }) {
  const meta = caseStudyMeta[caseStudySlug(study)];
  const apps = (meta?.products ?? []).map((id) => productById[id]);
  const { html, toc } = prepareContent(study.html);
  const sameApp = (c: ContentEntry) => (caseStudyMeta[caseStudySlug(c)]?.products ?? []).some((p) => meta?.products.includes(p));
  const others = caseStudies.filter((c) => c !== study);
  const related = [...others.filter(sameApp), ...others.filter((c) => !sameApp(c))].slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleLd({
          headline: study.title,
          description: fitDescription(study.seo.description, excerptOf(study)),
          path: study.path,
          datePublished: study.date.slice(0, 10),
          dateModified: study.modified.slice(0, 10),
          author: caseStudyCopy.author,
          section: "Case studies",
        })}
      />
      <ArticleHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Case studies", path: routes.caseStudies },
          { name: meta?.customer ?? study.title, path: study.path },
        ]}
        chips={
          <>
            <Chip>{caseStudyCopy.eyebrow}</Chip>
            {apps.map((p) => (
              <Chip key={p.id} href={p.href} accent={p.accent}>
                {p.name}
              </Chip>
            ))}
          </>
        }
        title={study.title}
        meta={
          <EntryMeta
            className="text-[0.9rem]"
            items={[
              meta && (
                <span key="c">
                  Customer: <strong className="font-semibold text-navy">{meta.customer}</strong>
                </span>
              ),
              meta && `Industry: ${meta.industry}`,
              meta && `Platform: ${meta.platform}`,
              `Est. reading time: ${readingMinutes(study.words)} minutes`,
            ]}
          />
        }
        aside={
          <HeroCover>
            <EntryCover image={study.image} accent={accentFor(apps[0]?.id)} product={apps[0]?.id} label="Case study" kicker={meta?.customer} size="hero" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </HeroCover>
        }
      />
      <ArticleBody
        html={html}
        toc={toc}
        label="The story"
        aside={
          <>
            <ShareLinks url={absoluteUrl(study.path)} title={study.title} />
            {apps.map((p) => (
              <ProductAsideCard key={p.id} product={p} eyebrow="Built with" />
            ))}
          </>
        }
        after={<AuthorBox author={authorFor(caseStudyCopy.author)} />}
      />
      <FeaturedNextCta />
      <RelatedEntries id="related-stories" eyebrow={caseStudyCopy.eyebrow} title={caseStudyCopy.related} cards={related.map(caseStudyCard)} more={{ href: routes.caseStudies, label: "All case studies" }} />
    </>
  );
}
