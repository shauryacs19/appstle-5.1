export type ContentImage = { src: string; alt: string; width: number | null; height: number | null };
type ContentHeading = { level: number; text: string };
type ContentSeo = { title: string; description: string; robots: string };

export type ContentEntry = {
  id: number;
  slug: string;
  path: string;
  title: string;
  date: string;
  modified: string;
  seo: ContentSeo;
  image: ContentImage | null;
  excerpt: string;
  html: string;
  headings: ContentHeading[];
  images: string[];
  embeds: string[];
  words: number;
};

export type BlogPost = ContentEntry & { categories: string[]; author: string };
export type BlogCategory = { slug: string; name: string; count: number };

export type ContentFile<T> = { source: string; importedAt: string; items: T[] };
export type BlogFile = ContentFile<BlogPost> & { categories: BlogCategory[] };

export type ComparisonProduct = "subscriptions" | "memberships" | "loyalty" | "bundles" | "pickup";
export type SnapshotRow = { label: string; appstle: boolean | string | null; competitor: boolean | string | null };

export type Comparison = Omit<ContentEntry, "image" | "excerpt" | "embeds"> & {
  product: ComparisonProduct;
  heroLabels: string[];
  lead: string;
  h1: string;
  intro: string;
  snapshot: { title: string; intro: string; columns: string[]; rows: SnapshotRow[] } | null;
};
