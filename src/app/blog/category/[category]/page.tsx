import { notFound } from "next/navigation";
import { BlogArchive } from "@/components/sections/blog/BlogArchive";
import { archiveSeo, blogPageCount } from "@/data/articles/blog";
import { blogCategories, categoryBySlug, postsIn } from "@/data/content/blog";
import { entryRoutes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export const instant = false;

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const c = categoryBySlug((await params).category);
  if (!c) return {};
  return buildMetadata({ path: entryRoutes.blogCategory(c.slug), ...archiveSeo.category(c.name, 1, blogPageCount(postsIn(c.slug))) });
}

export default async function BlogCategoryPage({ params }: Props) {
  const c = categoryBySlug((await params).category);
  if (!c) notFound();
  const list = postsIn(c.slug);
  return <BlogArchive list={list} page={1} category={c} seo={archiveSeo.category(c.name, 1, blogPageCount(list))} />;
}
