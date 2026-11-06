import { TermlyEmbed } from "@/components/features/company/TermlyEmbed";
import { PolicyLayout } from "@/components/sections/policy/PolicyLayout";
import { termly } from "@/data/pages/policies";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.privacy);

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout id="privacy">
      <TermlyEmbed id={termly.id} script={termly.script} hostedUrl={termly.hostedUrl} />
    </PolicyLayout>
  );
}
