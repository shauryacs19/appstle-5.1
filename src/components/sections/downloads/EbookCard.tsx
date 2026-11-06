import { ButtonLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { downloadsCopy, ebookMeta } from "@/data/articles/downloads";
import { ebookSlug } from "@/data/content/ebooks";
import type { ContentEntry } from "@/data/content/types";
import { stripTags } from "@/lib/html";
import { EbookCover } from "./EbookCover";

export function EbookCard({ ebook }: { ebook: ContentEntry }) {
  const meta = ebookMeta[ebookSlug(ebook)];
  return (
    <article className="grid h-full grid-cols-1 items-center gap-6 rounded-[2rem] bg-white p-6 ring-1 ring-navy/8 transition duration-300 hover:shadow-card sm:grid-cols-[minmax(0,11rem)_1fr] sm:p-7 short:p-5">
      <EbookCover title={ebook.title} image={ebook.image} product={meta?.product} className="mx-auto w-40 sm:w-full" />
      <div>
        {meta && <p className="eyebrow text-ink-subtle">{`${meta.lessons.length} lessons · PDF`}</p>}
        <h3 className="mt-2 font-sans text-[1.35rem] leading-snug font-bold tracking-tight text-navy short:text-[1.2rem]">
          <SmartLink href={ebook.path} className="hover:underline">
            {ebook.title}
          </SmartLink>
        </h3>
        <p className="mt-2 line-clamp-4 text-[0.92rem] leading-relaxed text-ink-muted short:line-clamp-3">{stripTags(ebook.html)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3 short:mt-4">
          {meta && (
            <ButtonLink href={meta.pdf} size="sm" target="_blank" rel="noopener noreferrer">
              Download <strong>Now</strong>
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </ButtonLink>
          )}
          <ButtonLink href={ebook.path} variant="secondary" size="sm">
            {downloadsCopy.details}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
