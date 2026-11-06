import { ButtonLink } from "@/components/ui/Button";
import { authorContact, initials, type Author } from "@/data/articles/authors";
import { links } from "@/data/site";

export function AuthorBox({ author, title = "About the author" }: { author: Author; title?: string }) {
  return (
    <section aria-labelledby="author-title" className="rounded-3xl bg-cream-50 p-6 ring-1 ring-navy/8 sm:p-7">
      <h2 id="author-title" className="eyebrow text-ink-subtle">
        {title}
      </h2>
      <div className="mt-4 flex items-start gap-4">
        <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-2xl bg-navy font-display text-lg font-bold text-white">
          {initials(author.name)}
        </span>
        <div>
          <p className="font-display text-xl font-bold text-navy">{author.name}</p>
          {author.role && <p className="text-sm text-ink-subtle">{author.role}</p>}
        </div>
      </div>
      {author.bio && <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted">{author.bio}</p>}
      <p className="mt-4 text-[0.95rem] leading-relaxed text-navy">{authorContact.lines.join(" ")}</p>
      <ButtonLink href={links.contact} variant="dark" size="sm" className="mt-5">
        Get In <strong>Touch</strong>
      </ButtonLink>
    </section>
  );
}
