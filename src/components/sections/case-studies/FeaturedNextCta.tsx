import { CtaBand } from "@/components/sections/shared/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { caseStudyCopy } from "@/data/articles/case-studies";
import { links } from "@/data/site";

export function FeaturedNextCta() {
  const f = caseStudyCopy.featured;
  return (
    <CtaBand
      id="featured-next"
      eyebrow={f.eyebrow}
      title={f.title}
      body={f.body.map((p) => (
        <p key={p} className="mt-3 first:mt-0">
          {p}
        </p>
      ))}
      actions={
        <ButtonLink href={links.contact} variant="light" size="lg">
          Share your <strong>story</strong>
        </ButtonLink>
      }
    />
  );
}
