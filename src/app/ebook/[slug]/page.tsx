import { notFound } from "next/navigation";
import { EbookPage } from "@/components/sections/downloads/EbookPage";
import { ebookBySlug, ebookSlug, ebooks } from "@/data/content/ebooks";
import { stripTags } from "@/lib/html";
import { entryMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return ebooks.map((e) => ({ slug: ebookSlug(e) }));
}

export async function generateMetadata({ params }: Props) {
  const ebook = ebookBySlug((await params).slug);
  return ebook ? entryMetadata({ ...ebook, excerpt: stripTags(ebook.html) }) : {};
}

export default async function Ebook({ params }: Props) {
  const ebook = ebookBySlug((await params).slug);
  if (!ebook) notFound();
  return <EbookPage ebook={ebook} />;
}
