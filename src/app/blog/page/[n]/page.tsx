import { notFound } from "next/navigation";
import { BlogArchive } from "@/components/sections/blog/BlogArchive";
import { archiveSeo, blogPageCount } from "@/data/articles/blog";
import { posts } from "@/data/content/blog";
import { entryRoutes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ n: string }> };

export const instant = false;

export function generateStaticParams() {
  return Array.from({ length: blogPageCount(posts) - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: Props) {
  const page = Number((await params).n);
  return buildMetadata({ path: entryRoutes.blogPage(page), ...archiveSeo.page(page, blogPageCount(posts)) });
}

export default async function BlogArchivePage({ params }: Props) {
  const page = Number((await params).n);
  if (!(page >= 2 && page <= blogPageCount(posts))) notFound();
  return <BlogArchive list={posts} page={page} seo={archiveSeo.page(page, blogPageCount(posts))} />;
}
