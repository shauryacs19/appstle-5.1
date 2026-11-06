import type { LucideIcon } from "lucide-react";
import type { ExplorerItem } from "@/components/features/FeatureExplorer";
import type { Toast } from "@/components/features/FloatingToast";
import type { GridFeature } from "@/components/sections/shared/FeatureGrid";
import type { MediaItem } from "@/data/media";
import type { PagedProductId } from "@/lib/routes";

export type TrustBlock = { kind: "security" | "support" | "enterprise"; title: string; body: string; cta?: { href: string; label: string } };

export type StatBar = { label: string; value: number };

export type ProductPageData = {
  id: PagedProductId;
  hero: {
    title: string;
    lead: string;
    points?: string[];
    visual: { desktop: MediaItem; mobile?: MediaItem; toasts?: Toast[]; description: string; stage: string };
  };
  logos?: { title: string; names?: string[] };
  overview: {
    eyebrow: string;
    title: string;
    intro: string;
    labels?: string[];
    cardsTitle?: string;
    cardsIntro?: string;
    cards: { icon: LucideIcon; title: string; body: string; cta?: { label: string; href: string } }[];
  };
  explorer: { eyebrow: string; title: string; description: string; items: ExplorerItem[] };
  demos: { eyebrow: string; title: string; description: string; tryList: string[] };
  capabilities: { eyebrow: string; title: string; description?: string; items: GridFeature[] };
  integrations: { title: string; description: string; note?: string };
  reviews?: { title: string; description?: string };
  migration?: {
    title: string;
    body: string;
    sources?: { title: string; bars: StatBar[] };
    timeline?: { title: string; bars: StatBar[] };
  };
  trust?: TrustBlock[];
  cta: { title: string; body: string };
};
