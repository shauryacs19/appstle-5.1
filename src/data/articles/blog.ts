import { blogCategories, categoryBySlug, posts } from "@/data/content/blog";
import { categoryProduct } from "@/data/content/accents";
import type { BlogPost } from "@/data/content/types";
import { entryRoutes, routes } from "@/lib/routes";

export const blogCopy = {
  eyebrow: "Appstle Blog",
  h1: "Learn how to grow your ecommerce business",
  intro: "Explore Appstle's blog to learn how to grow your e-commerce business, memberships, loyalty, and customer retention.",
  allLabel: "All",
  latestLabel: "Latest article",
  gridTitle: "All Articles",
  searchLabel: "Search",
  shareLabel: "Spread the Word",
  relatedTitle: "Related posts",
  aboutAuthor: "About the author",
} as const;

const BLOG_GRID_SIZE = 12;

export function archivePage(list: BlogPost[], page: number) {
  const rest = list.slice(1);
  const pages = Math.max(1, Math.ceil(rest.length / BLOG_GRID_SIZE));
  return {
    featured: page === 1 ? list[0] : undefined,
    items: rest.slice((page - 1) * BLOG_GRID_SIZE, page * BLOG_GRID_SIZE),
    page,
    pages,
  };
}

export const blogPageCount = (list: BlogPost[]) => archivePage(list, 1).pages;

export const blogFilters = [
  { slug: "", label: blogCopy.allLabel, href: routes.blog, count: posts.length },
  ...blogCategories.map((c) => ({ slug: c.slug, label: c.name, href: entryRoutes.blogCategory(c.slug), count: c.count })),
];

export const categoryName = (slug: string) => categoryBySlug(slug)?.name ?? slug;
export const primaryCategory = (p: BlogPost) => p.categories[0] ?? "";
export const productOfPost = (p: BlogPost) => p.categories.map((c) => categoryProduct[c]).find(Boolean);

export const blogSearchIndex = posts.map((p) => ({ t: p.title, c: categoryName(primaryCategory(p)), h: p.path }));

export const archiveSeo = {
  page: (page: number, pages: number) => ({
    title: `Appstle Blog – Page ${page} of ${pages}`,
    description: `Page ${page} of ${pages} of the Appstle blog: guides on Shopify subscriptions, memberships, loyalty, bundles and customer retention.`,
  }),
  category: (name: string, page: number, pages: number) => ({
    title: page > 1 ? `${name} Articles – Page ${page} of ${pages} | Appstle` : `${name} Articles | Appstle Blog`,
    description:
      page > 1
        ? `${name} articles from the Appstle blog, page ${page} of ${pages}: guides and strategies for Shopify merchants.`
        : `${name} articles from the Appstle blog: guides, strategies and examples to help Shopify merchants grow.`,
  }),
};
