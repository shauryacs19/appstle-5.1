import { ArrowUpRight, FileText } from "lucide-react";

export function PdfAttachment({ url }: { url: string }) {
  const name = decodeURIComponent(url.split("/").pop() ?? "Document.pdf");
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl bg-cream-50 p-4 ring-1 ring-navy/8 transition hover:bg-white hover:shadow-card">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-cobalt-700 ring-1 ring-navy/8">
        <FileText aria-hidden className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.95rem] font-semibold text-navy">{name}</span>
        <span className="text-[0.8rem] text-ink-subtle">PDF from the original post · opens in a new tab</span>
      </span>
      <ArrowUpRight aria-hidden className="size-4 text-cobalt-700 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
