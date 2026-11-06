import { LibraryPage } from "@/components/sections/comparison/LibraryPage";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.comparisons);

export default function ComparisonsRoute() {
  return <LibraryPage />;
}
