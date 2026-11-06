import { notFound } from "next/navigation";
import { NewsItemPage } from "@/components/sections/news/NewsItemPage";
import { excerptOf } from "@/data/articles/excerpt";
import { newsBySlug, newsItems, newsSlug } from "@/data/content/news";
import { entryMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: newsSlug(n) }));
}

export async function generateMetadata({ params }: Props) {
  const item = newsBySlug((await params).slug);
  if (!item) return {};
  const seo = /^news\s*-\s*appstle$/i.test(item.seo.title.trim()) ? { ...item.seo, title: "" } : item.seo;
  return entryMetadata({ ...item, seo, excerpt: excerptOf(item) || item.title, article: true });
}

export default async function NewsItem({ params }: Props) {
  const item = newsBySlug((await params).slug);
  if (!item) notFound();
  return <NewsItemPage item={item} />;
}
