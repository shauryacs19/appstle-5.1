import { DownloadsArchive } from "@/components/sections/downloads/DownloadsArchive";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.downloads);

export default function DownloadsPage() {
  return <DownloadsArchive />;
}
