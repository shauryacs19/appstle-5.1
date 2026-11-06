import { CaseStudiesArchive } from "@/components/sections/case-studies/CaseStudiesArchive";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.caseStudies);

export default function CaseStudiesPage() {
  return <CaseStudiesArchive />;
}
