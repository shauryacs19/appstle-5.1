import { MigrationHub } from "@/components/sections/migrations/MigrationHub";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.migrations);

export default function MigrationsRoute() {
  return <MigrationHub />;
}
