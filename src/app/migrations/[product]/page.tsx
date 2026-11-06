import { notFound } from "next/navigation";
import { MigrationGuide } from "@/components/sections/migrations/MigrationGuide";
import { migrationBySlug, migrationPages } from "@/data/migrations";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ product: string }> };

export const instant = false;

export function generateStaticParams() {
  return migrationPages.map((m) => ({ product: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  const m = migrationBySlug((await params).product);
  return m ? buildMetadata(seo[m.seoKey]) : {};
}

export default async function MigrationRoute({ params }: Props) {
  const m = migrationBySlug((await params).product);
  if (!m) notFound();
  return <MigrationGuide m={m} />;
}
