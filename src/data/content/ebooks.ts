import raw from "@/content/ebooks.json";
import { slugOf } from "./format";
import type { ContentEntry, ContentFile } from "./types";

const file = raw as unknown as ContentFile<ContentEntry>;

export const ebooks: ContentEntry[] = [...file.items].sort((a, b) => b.date.localeCompare(a.date));
export const ebookSlug = (e: ContentEntry) => slugOf(e.path);
export const ebookBySlug = (slug: string) => ebooks.find((e) => ebookSlug(e) === slug);
