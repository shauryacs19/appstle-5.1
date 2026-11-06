import raw from "@/content/case-studies.json";
import { slugOf } from "./format";
import type { ContentEntry, ContentFile } from "./types";

const file = raw as unknown as ContentFile<ContentEntry>;

export const caseStudies: ContentEntry[] = [...file.items].sort((a, b) => b.date.localeCompare(a.date));
export const caseStudySlug = (c: ContentEntry) => slugOf(c.path);
export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => caseStudySlug(c) === slug);
