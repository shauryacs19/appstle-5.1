import { CtaBand } from "@/components/sections/shared/CtaBand";
import { ButtonLink } from "@/components/ui/Button";

export function BecomePartner({ title, body, partnerHref, contactHref }: { title: string; body: string; partnerHref: string; contactHref: string }) {
  return (
    <CtaBand
      id="become-a-partner"
      eyebrow="Partner with Appstle"
      title={title}
      body={body}
      actions={
        <>
          <ButtonLink href={partnerHref} variant="light" size="lg">
            Become a <strong>Partner</strong>
          </ButtonLink>
          <ButtonLink href={contactHref} variant="outlineLight" size="lg">
            Contact <strong>Us</strong>
          </ButtonLink>
        </>
      }
    />
  );
}
