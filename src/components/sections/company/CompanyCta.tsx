import { CtaBand } from "@/components/sections/shared/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { companyCta } from "@/data/pages/company";
import { links } from "@/data/site";

export function CompanyCta() {
  return (
    <CtaBand
      title={companyCta.title}
      body={companyCta.body}
      actions={
        <>
          <ButtonLink href={links.contact} variant="light" size="lg">
            Contact <strong>Us</strong>
          </ButtonLink>
          <ButtonLink href={links.helpCenter} variant="outlineLight" size="lg">
            Visit the Help <strong>Center</strong>
          </ButtonLink>
        </>
      }
    />
  );
}
