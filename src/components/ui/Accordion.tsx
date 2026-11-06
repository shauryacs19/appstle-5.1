import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AccordionItem = { id: string; title: ReactNode; content: ReactNode };

export function Accordion({
  items,
  name,
  defaultOpen,
  className,
  headingLevel = "h3",
}: {
  items: AccordionItem[];
  name?: string;
  defaultOpen?: string;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const Heading = headingLevel;
  return (
    <div className={cn("divide-y divide-navy/8 rounded-2xl bg-white ring-1 ring-navy/8", className)}>
      {items.map((item) => (
        <details key={item.id} id={item.id} name={name} open={item.id === defaultOpen} className="group/acc">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-colors hover:bg-cream-50 sm:px-6 short:py-3 [&::-webkit-details-marker]:hidden">
            <Heading className="font-sans text-base font-semibold tracking-normal text-navy">{item.title}</Heading>
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-cobalt transition-transform duration-300 group-open/acc:rotate-180"
            />
          </summary>
          <div className="px-5 pb-5 text-[0.98rem] leading-relaxed text-ink-muted sm:px-6">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
