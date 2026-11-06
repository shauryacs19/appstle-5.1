"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { SocialIcon } from "@/components/brand/SocialIcons";
import { cn } from "@/lib/cn";

export function ShareLinks({ url, title, label = "Spread the Word", className }: { url: string; title: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const targets = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "X (Twitter)", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };
  const btn = "grid size-10 place-items-center rounded-full bg-white text-navy ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:ring-navy/25";
  return (
    <div className={className}>
      <p className="eyebrow text-ink-subtle">{label}</p>
      <ul className="mt-3 flex flex-wrap items-center gap-2">
        {targets.map((s) => (
          <li key={s.name}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`Share on ${s.name} (opens in a new tab)`}>
              <SocialIcon name={s.name} className="size-4" />
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} className={cn(btn, copied && "bg-mint-100 ring-mint-200")} aria-label="Copy link to this page">
            {copied ? <Check aria-hidden className="size-4 text-mint-700" /> : <Link2 aria-hidden className="size-4" />}
          </button>
        </li>
      </ul>
      <p aria-live="polite" className="mt-2 min-h-5 text-[0.8rem] text-mint-700">
        {copied ? "Link copied" : ""}
      </p>
    </div>
  );
}
