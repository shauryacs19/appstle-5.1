import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SmartLink } from "@/components/ui/SmartLink";
import type { AppPartner } from "@/data/pages/app-partners";
import { cn } from "@/lib/cn";

const lettermark = (name: string) =>
  name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export function PartnerCard({ partner }: { partner: AppPartner }) {
  const { name, logo, description, categories, href, native } = partner;
  return (
    <article className="group relative flex h-full flex-col rounded-3xl bg-white p-4 ring-1 ring-navy/8 transition duration-300 hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex h-9 items-center justify-between gap-2">
        {logo ? (
          <Image src={logo} alt="" sizes="144px" className="h-7 w-auto max-w-[9rem] object-contain object-left" />
        ) : (
          <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-cream-100 font-display text-[0.9rem] font-extrabold text-navy/70 ring-1 ring-navy/6">
            {lettermark(name)}
          </span>
        )}
        {native ? (
          <span className="rounded-full bg-cobalt px-2 py-0.5 text-[0.68rem] font-bold text-white">Native</span>
        ) : (
          categories[0] && <span className="truncate rounded-full bg-cream-100 px-2 py-0.5 text-[0.68rem] font-semibold text-ink-muted">{categories[0]}</span>
        )}
      </div>
      <h3 className="mt-3 font-sans text-[0.98rem] leading-snug font-semibold tracking-normal text-navy">
        {href ? (
          <SmartLink
            href={href}
            {...(href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="inline-flex items-center gap-1 after:absolute after:inset-0 after:rounded-3xl hover:underline"
          >
            {name}
            <ArrowUpRight aria-hidden className="size-3.5 text-cobalt" />
            {!href.startsWith("/") && <span className="sr-only">(opens in a new tab)</span>}
          </SmartLink>
        ) : (
          name
        )}
      </h3>
      <p className={cn("mt-1 line-clamp-3 text-[0.84rem] leading-snug text-ink-muted")} title={description}>
        {description}
      </p>
    </article>
  );
}
