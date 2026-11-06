import raw from "@/content/news.json";
import { slugOf } from "./format";
import type { ContentEntry, ContentFile } from "./types";

const file = raw as unknown as ContentFile<ContentEntry>;

export const newsItems: ContentEntry[] = [...file.items].sort((a, b) => b.date.localeCompare(a.date));
export const newsSlug = (n: ContentEntry) => slugOf(n.path);
export const newsBySlug = (slug: string) => newsItems.find((n) => newsSlug(n) === slug);
