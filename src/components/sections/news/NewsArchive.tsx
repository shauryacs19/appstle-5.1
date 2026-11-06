import { ArticleCta } from "@/components/sections/article/ArticleCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { newsCopy, pressInfo } from "@/data/articles/news";
import { newsItems } from "@/data/content/news";
import { seo } from "@/data/seo";
import { collectionLd } from "@/lib/jsonld";
import { routes } from "@/lib/routes";
import { NewsletterList } from "./NewsletterList";
import { OutletWall } from "./OutletWall";
import { PressList } from "./PressList";

export function NewsArchive() {
  const press = newsItems.filter((n) => pressInfo(n));
  const letters = newsItems.filter((n) => !pressInfo(n));
  const outlets = [...new Set(press.map((n) => pressInfo(n)!.outlet))];
  return (
    <>
      <JsonLd data={collectionLd({ name: seo.news.title, description: seo.news.description, path: seo.news.path, items: newsItems.map((n) => ({ name: n.title, path: n.path })) })} />
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "News", path: routes.news },
        ]}
        eyebrow={newsCopy.eyebrow}
        title={newsCopy.h1}
        intro={newsCopy.about.map((l) => (
          <p key={l} className="mt-2 first:mt-0">
            {l}
          </p>
        ))}
        aside={<OutletWall outlets={outlets} />}
      />
      <PressList items={press} />
      <NewsletterList items={letters} />
      <ArticleCta />
    </>
  );
}
