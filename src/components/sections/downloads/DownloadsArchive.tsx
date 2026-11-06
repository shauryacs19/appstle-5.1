import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArticleCta } from "@/components/sections/article/ArticleCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Panel } from "@/components/ui/Panel";
import { downloadsCopy } from "@/data/articles/downloads";
import { ebooks } from "@/data/content/ebooks";
import { seo } from "@/data/seo";
import { collectionLd } from "@/lib/jsonld";
import { routes } from "@/lib/routes";
import { EbookCard } from "./EbookCard";

export function DownloadsArchive() {
  return (
    <>
      <JsonLd data={collectionLd({ name: seo.downloads.title, description: seo.downloads.description, path: seo.downloads.path, items: ebooks.map((e) => ({ name: e.title, path: e.path })) })} />
      <PageHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Downloads", path: routes.downloads },
        ]}
        eyebrow={downloadsCopy.eyebrow}
        title={downloadsCopy.h1}
        intro={<p>{downloadsCopy.intro}</p>}
      />
      <Panel id="ebooks" labelledBy="ebooks-title" fit={ebooks.length > 2 ? "flow" : "screen"} className="bg-cream-100 ring-1 ring-navy/6">
        <h2 id="ebooks-title" className="sr-only">
          eBooks
        </h2>
        <Stagger as="ul" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {ebooks.map((e) => (
            <StaggerItem as="li" key={e.path}>
              <EbookCard ebook={e} />
            </StaggerItem>
          ))}
        </Stagger>
      </Panel>
      <ArticleCta />
    </>
  );
}
