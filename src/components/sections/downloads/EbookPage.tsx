import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArticleCta } from "@/components/sections/article/ArticleCta";
import { ArticleHero } from "@/components/sections/article/ArticleHero";
import { Chip } from "@/components/sections/article/Chip";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { downloadsCopy, ebookMeta } from "@/data/articles/downloads";
import { ebookSlug } from "@/data/content/ebooks";
import type { ContentEntry } from "@/data/content/types";
import { productById } from "@/data/products";
import { stripTags } from "@/lib/html";
import { articleLd } from "@/lib/jsonld";
import { routes } from "@/lib/routes";
import { fitDescription } from "@/lib/seo";
import { EbookCover } from "./EbookCover";

export function EbookPage({ ebook }: { ebook: ContentEntry }) {
  const meta = ebookMeta[ebookSlug(ebook)];
  const product = meta ? productById[meta.product] : undefined;
  const intro = stripTags(ebook.html);
  return (
    <>
      <JsonLd data={articleLd({ headline: ebook.title, description: fitDescription(ebook.seo.description, intro), path: ebook.path, datePublished: ebook.date.slice(0, 10), dateModified: ebook.modified.slice(0, 10) })} />
      <ArticleHero
        crumbs={[
          { name: "Home", path: routes.home },
          { name: "Downloads", path: routes.downloads },
          { name: ebook.title, path: ebook.path },
        ]}
        chips={
          <>
            <Chip>{downloadsCopy.eyebrow}</Chip>
            {product && (
              <Chip href={product.href} accent={product.accent}>
                {product.name}
              </Chip>
            )}
          </>
        }
        title={ebook.title}
        lead={<p>{intro}</p>}
        actions={
          meta && (
            <>
              <ButtonLink href={meta.pdf} size="lg" target="_blank" rel="noopener noreferrer">
                Download <strong>now</strong>
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </ButtonLink>
              <ButtonLink href="#inside" variant="secondary" size="lg" icon="none">
                {downloadsCopy.details}
              </ButtonLink>
            </>
          )
        }
        aside={<EbookCover title={ebook.title} image={ebook.image} product={meta?.product} priority className="mx-auto w-[min(20rem,70%)] short:w-[17rem]" />}
        asideClassName="lg:col-span-5"
      />
      {meta && (
        <Panel id="inside" labelledBy="inside-title" className="bg-white ring-1 ring-navy/6">
          <SectionHeading id="inside-title" eyebrow={`${meta.lessons.length} lessons`} title={downloadsCopy.insideTitle} dot={product?.accent.solid} titleClassName="lg:text-[2.4rem] short:text-[2rem]" />
          <Stagger as="ol" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 short:mt-6">
            {meta.lessons.map((l, i) => (
              <StaggerItem as="li" key={l}>
                <div className="flex h-full gap-4 rounded-3xl bg-cream-50 p-5 ring-1 ring-navy/8 short:p-4">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-2xl font-display text-lg font-bold text-navy ${product?.accent.chip ?? "bg-cream-200"}`}>{i + 1}</span>
                  <p className="text-[0.95rem] leading-snug text-navy">
                    <span className="block text-[0.75rem] font-semibold tracking-wide text-ink-subtle uppercase">Lesson {i + 1}</span>
                    {l}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Panel>
      )}
      <ArticleCta product={product} />
    </>
  );
}
