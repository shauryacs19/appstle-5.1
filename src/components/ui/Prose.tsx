import { cn } from "@/lib/cn";

export function Prose({ html, size = "article", className }: { html: string; size?: "article" | "compact"; className?: string }) {
  return (
    <div
      className={cn(
        "text-navy [&_a]:font-medium [&_a]:text-cobalt-700 [&_a]:underline [&_a]:decoration-cobalt-200 [&_a]:underline-offset-[3px] hover:[&_a]:decoration-cobalt",
        "[&_strong]:font-semibold [&_strong]:text-navy [&_em]:italic",
        "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mt-1.5 [&_li]:pl-1 [&_li::marker]:text-cobalt-400",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-cobalt-200 [&_blockquote]:pl-5 [&_blockquote]:text-ink-muted",
        "[&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_th]:bg-cream-100 [&_th]:font-semibold [&_th]:border [&_td]:border [&_th]:border-navy/10 [&_td]:border-navy/10 [&_th]:px-3 [&_td]:px-3 [&_th]:py-2 [&_td]:py-2 [&_th]:align-top [&_td]:align-top",
        "[&_hr]:my-8 [&_hr]:border-navy/10 [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-ink-subtle",
        "[&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-navy [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-cream [&_code]:font-mono [&_code]:text-[0.9em]",
        "max-lg:[&_table]:block max-lg:[&_table]:overflow-x-auto",
        "[&>*:first-child]:mt-0 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28 [&_figure>img]:rounded-2xl [&_img]:h-auto [&_img]:max-w-full",
        size === "article"
          ? "text-[1.06rem] leading-[1.75] [&_p]:mt-5 [&_ul]:mt-5 [&_ol]:mt-5 [&_blockquote]:my-7 [&_figure]:my-8 [&_h2]:mt-12 [&_h2]:text-[1.85rem] [&_h2]:leading-tight [&_h2]:font-bold [&_h3]:mt-9 [&_h3]:text-[1.4rem] [&_h3]:leading-snug [&_h3]:font-bold [&_h4]:mt-7 [&_h4]:text-lg [&_h4]:font-semibold [&_table]:my-7 [&_table]:text-[0.95rem]"
          : "text-[0.97rem] leading-relaxed text-ink-muted [&_p]:mt-3 [&_ul]:mt-2 [&_ol]:mt-2 [&_h3]:mt-4 [&_h4]:mt-4 [&_h3]:font-semibold [&_h4]:font-semibold [&_h3]:text-navy [&_h4]:text-navy [&_table]:my-4 [&_table]:text-sm",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
