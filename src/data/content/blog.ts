import raw from "@/content/blog/posts.json";
import { slugOf } from "./format";
import type { BlogCategory, BlogFile, BlogPost } from "./types";

const file = raw as unknown as BlogFile;

export const posts: BlogPost[] = [...file.items].sort((a, b) => b.date.localeCompare(a.date));

const ORDER = ["subscriptions", "memberships", "loyalty-and-rewards", "growth", "guest-posts", "product-bundles", "appstles-journey"];
export const blogCategories: BlogCategory[] = ORDER.map((slug) => file.categories.find((c) => c.slug === slug))
  .filter((c): c is BlogCategory => !!c)
  .map((c) => ({ ...c, count: posts.filter((p) => p.categories.includes(c.slug)).length }))
  .filter((c) => c.count > 0);

export const categoryBySlug = (slug: string) => blogCategories.find((c) => c.slug === slug);
export const postsIn = (category: string) => posts.filter((p) => p.categories.includes(category));
export const postSlug = (p: BlogPost) => slugOf(p.path);
export const postBySlug = (slug: string) => posts.find((p) => postSlug(p) === slug);

export function relatedPosts(post: BlogPost, count = 3) {
  const same = posts.filter((p) => p !== post && p.categories[0] === post.categories[0]);
  const pool = same.length >= count ? same : [...same, ...posts.filter((p) => p !== post && !same.includes(p))];
  return pool.slice(0, count);
}
