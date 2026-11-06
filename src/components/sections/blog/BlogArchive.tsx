import { BlogSearch } from "@/components/features/articles/BlogSearch";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArticleCta } from "@/components/sections/article/ArticleCta";
import { CategoryFilter } from "@/components/sections/article/CategoryFilter";
import { EntryCard } from "@/components/sections/article/EntryCard";
import { Pagination } from "@/components/sections/article/Pagination";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Panel } from "@/components/ui/Panel";
import { archivePage, blogCopy, blogFilters, blogSearchIndex } from "@/data/articles/blog";
import { categoryProduct } from "@/data/content/accents";
import type { BlogCategory, BlogPost } from "@/data/content/types";
import { productById } from "@/data/products";
import { collectionLd, type Crumb } from "@/lib/jsonld";
import { entryRoutes, routes } from "@/lib/routes";
import { postCard } from "./postCard";

export function BlogArchive({ list, page, category, seo }: { list: BlogPost[]; page: number; category?: BlogCategory; seo: { title: string; description: string } }) {
  const { featured, items, pages } = archivePage(list, page);
  const pageHref = (n: number) => (category ? entryRoutes.blogCategory(category.slug, n) : entryRoutes.blogPage(n));
  const path = pageHref(page);
  const crumbs: Crumb[] = [
    { name: "Home", path: routes.home },
    { name: "Blog", path: routes.blog },
    ...(category ? [{ name: category.name, path: entryRoutes.blogCategory(category.slug) }] : []),
    ...(page > 1 ? [{ name: `Page ${page}`, path }] : []),
  ];
  const product = category ? categoryProduct[category.slug] : undefined;
  const filters = blogFilters.map((f) => ({ ...f, current: f.slug === (category?.slug ?? "") }));
  const gridTitle = category ? `All ${category.name} articles` : blogCopy.gridTitle;

  return (
    <>
      <JsonLd data={collectionLd({ name: seo.title, description: seo.description, path, items: [...(featured ? [featured] : []), ...items].map((p) => ({ name: p.title, path: p.path })) })} />
      <PageHero
        crumbs={crumbs}
        eyebrow={page > 1 ? `${blogCopy.eyebrow} · Page ${page} of ${pages}` : blogCopy.eyebrow}
        dot={product ? productById[product].accent.solid : undefined}
        title={category ? category.name : blogCopy.h1}
        intro={<p>{category ? `${list.length} ${list.length === 1 ? "article" : "articles"} from the Appstle blog.` : blogCopy.intro}</p>}
        actions={<BlogSearch index={blogSearchIndex} label={blogCopy.searchLabel} />}
        aside={
          featured && (
            <div>
              <p className="eyebrow mb-3 text-ink-subtle">{category ? `Latest in ${category.name}` : blogCopy.latestLabel}</p>
              <EntryCard card={postCard(featured)} featured headingLevel="h2" className="shadow-card" />
            </div>
          )
        }
      />
      <Panel id="articles" labelledBy="articles-title" fit={items.length > 3 ? "flow" : "screen"} className="bg-white ring-1 ring-navy/6">
        <div className="flex flex-col gap-5 short:gap-3">
          <h2 id="articles-title" className="text-[2rem] leading-tight font-extrabold tracking-tight text-navy lg:text-[2.4rem] short:text-[2rem]">
            {gridTitle}
          </h2>
          <CategoryFilter items={filters} label="Blog categories" />
        </div>
        {items.length > 0 ? (
          <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 short:mt-5">
            {items.map((p) => (
              <StaggerItem as="li" key={p.path}>
                <EntryCard card={postCard(p)} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="mt-8 text-ink-muted">The newest article in this category is featured above.</p>
        )}
        <Pagination page={page} pages={pages} hrefs={Array.from({ length: pages }, (_, i) => pageHref(i + 1))} label={`${category ? category.name : "Blog"} pages`} />
      </Panel>
      <ArticleCta product={product ? productById[product] : undefined} />
    </>
  );
}
