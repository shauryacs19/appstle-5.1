import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/sections/case-studies/CaseStudyPage";
import { excerptOf } from "@/data/articles/excerpt";
import { caseStudies, caseStudyBySlug, caseStudySlug } from "@/data/content/case-studies";
import { entryMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: caseStudySlug(c) }));
}

export async function generateMetadata({ params }: Props) {
  const study = caseStudyBySlug((await params).slug);
  return study ? entryMetadata({ ...study, excerpt: excerptOf(study), article: true }) : {};
}

export default async function CaseStudy({ params }: Props) {
  const study = caseStudyBySlug((await params).slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
