import { initials } from "@/data/articles/authors";
import { cn } from "@/lib/cn";

export function AuthorLine({ name, prefix = "Written by", className }: { name: string; prefix?: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="grid size-8 place-items-center rounded-full bg-navy text-[0.7rem] font-bold tracking-wide text-white">
        {initials(name)}
      </span>
      <span className="text-[0.9rem] text-ink-muted">
        {prefix} <span className="font-semibold text-navy">{name}</span>
      </span>
    </span>
  );
}
