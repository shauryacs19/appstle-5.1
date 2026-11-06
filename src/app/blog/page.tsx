import { BlogArchive } from "@/components/sections/blog/BlogArchive";
import { posts } from "@/data/content/blog";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.blog);

export default function BlogPage() {
  return <BlogArchive list={posts} page={1} seo={seo.blog} />;
}
