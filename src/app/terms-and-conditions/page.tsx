import { PolicyLayout } from "@/components/sections/policy/PolicyLayout";
import { Prose } from "@/components/ui/Prose";
import { termsHtml } from "@/data/pages/policies";
import { seo } from "@/data/seo";
import { prepareContent } from "@/lib/html";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(seo.terms);

export default function TermsPage() {
  const { html, toc } = prepareContent(termsHtml);
  return (
    <PolicyLayout id="terms" toc={toc}>
      <Prose html={html} className="max-w-3xl [&_h2]:text-[1.5rem] [&_h2]:mt-10" />
    </PolicyLayout>
  );
}
