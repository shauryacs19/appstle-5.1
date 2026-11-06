import { notFound } from "next/navigation";
import { BlogArchive } from "@/components/sections/blog/BlogArchive";
import { archiveSeo, blogPageCount } from "@/data/articles/blog";
import { blogCategories, categoryBySlug, postsIn } from "@/data/content/blog";
import { entryRoutes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string; n: string }> };

export const instant = false;

export function generateStaticParams() {
  return blogCategories.flatMap((c) =>
    Array.from({ length: blogPageCount(postsIn(c.slug)) - 1 }, (_, i) => ({ category: c.slug, n: String(i + 2) })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { category, n } = await params;
  const c = categoryBySlug(category);
  if (!c) return {};
  const page = Number(n);
  return buildMetadata({ path: entryRoutes.blogCategory(c.slug, page), ...archiveSeo.category(c.name, page, blogPageCount(postsIn(c.slug))) });
}

export default async function BlogCategoryArchivePage({ params }: Props) {
  const { category, n } = await params;
  const c = categoryBySlug(category);
  const page = Number(n);
  if (!c) notFound();
  const list = postsIn(c.slug);
  const pages = blogPageCount(list);
  if (!(page >= 2 && page <= pages)) notFound();
  return <BlogArchive list={list} page={page} category={c} seo={archiveSeo.category(c.name, page, pages)} />;
}
