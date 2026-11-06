import { ArrowUpRight } from "lucide-react";
import { ArticleBody } from "@/components/sections/article/ArticleBody";
import { ArticleHero } from "@/components/sections/article/ArticleHero";
import { Chip } from "@/components/sections/article/Chip";
import { EntryCover } from "@/components/sections/article/EntryCover";
import { HeroCover } from "@/components/sections/article/HeroCover";
import { RelatedEntries } from "@/components/sections/article/RelatedEntries";
import { ShareLinks } from "@/components/features/articles/ShareLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { Prose } from "@/components/ui/Prose";
import { excerptOf } from "@/data/articles/excerpt";
import { fixNewsHtml, newsCopy, pressInfo } from "@/data/articles/news";
import { neutralAccent } from "@/data/content/accents";
import { formatDate } from "@/data/content/format";
import { newsItems } from "@/data/content/news";
import type { ContentEntry } from "@/data/content/types";
import { prepareContent } from "@/lib/html";
import { absoluteUrl, articleLd } from "@/lib/jsonld";
import { routes } from "@/lib/routes";
import { fitDescription } from "@/lib/seo";
import { AboutAppstle } from "./AboutAppstle";
import { newsCard } from "./newsCard";

export function NewsItemPage({ item }: { item: ContentEntry }) {
  const press = pressInfo(item);
  const { html, toc } = prepareContent(fixNewsHtml(press ? press.teaser : item.html));
  const related = newsItems.filter((n) => n !== item).slice(0, 3);
  const kind = press?.outlet ?? newsCopy.newsletterKind;
  return (
    <>
      <JsonLd
        data={articleLd({
          type: "NewsArticle",
          headline: item.title,
          description: fitDescription(item.seo.description, excerptOf(item) || item.title),
          path: item.path,
          datePublished: item.date.slice(0, 10),
          dateModified: item.modified.slice(0, 10),
        })}
      />
      <ArticleHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "News", path: routes.news },
          { name: item.title, path: item.path },
        ]}
        chips={<Chip>{press ? newsCopy.pressLabel : newsCopy.newsletterKind}</Chip>}
        title={item.title}
        meta={
          <p className="text-[0.9rem] text-ink-subtle">
            <time dateTime={item.date.slice(0, 10)}>{formatDate(item.date)}</time>
          </p>
        }
        actions={
          press && (
            <ButtonLink href={press.url} target="_blank" rel="noopener noreferrer" icon="external" size="lg">
              {press.isPdf ? (
                <>
                  Read the article <strong>(PDF)</strong>
                </>
              ) : (
                <>
                  Read on <strong>{press.outlet}</strong>
                </>
              )}
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          )
        }
        aside={
          <HeroCover>
            <EntryCover image={item.image} accent={neutralAccent} label={press ? newsCopy.pressLabel : newsCopy.eyebrow} kicker={kind} size="hero" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </HeroCover>
        }
      />
      {press ? (
        <Panel id="article" labelledBy="summary-title" className="bg-white ring-1 ring-navy/6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <h2 id="summary-title" className="eyebrow text-ink-subtle">
                {`From ${press.outlet}`}
              </h2>
              {html ? <Prose html={html} className="mt-4 max-w-[46rem]" /> : <p className="mt-4 text-lg text-ink-muted">{`${press.outlet}’s coverage of Appstle is available as a PDF.`}</p>}
              <a href={press.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-cobalt-700 hover:underline">
                {newsCopy.readFull}
                <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <div className="grid content-start gap-6 lg:col-span-4">
              <ShareLinks url={absoluteUrl(item.path)} title={item.title} />
              <AboutAppstle />
            </div>
          </div>
        </Panel>
      ) : (
        <ArticleBody html={html} toc={toc} depth={3} label="Newsletter" aside={<ShareLinks url={absoluteUrl(item.path)} title={item.title} />} after={<AboutAppstle />} />
      )}
      <RelatedEntries id="related-news" eyebrow={newsCopy.eyebrow} title={newsCopy.related} cards={related.map(newsCard)} more={{ href: routes.news, label: "All news" }} />
    </>
  );
}
