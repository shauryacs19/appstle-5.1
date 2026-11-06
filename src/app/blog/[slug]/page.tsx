import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/sections/blog/BlogPostPage";
import { postBySlug, postSlug, posts } from "@/data/content/blog";
import { entryMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: postSlug(p) }));
}

export async function generateMetadata({ params }: Props) {
  const post = postBySlug((await params).slug);
  return post ? entryMetadata({ ...post, article: true }) : {};
}

export default async function BlogPost({ params }: Props) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
