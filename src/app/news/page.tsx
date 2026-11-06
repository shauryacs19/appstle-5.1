import { NewsArchive } from "@/components/sections/news/NewsArchive";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.news);

export default function NewsPage() {
  return <NewsArchive />;
}
