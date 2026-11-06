"use client";

import { ExternalLink, Presentation } from "lucide-react";
import { useState } from "react";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import { Button } from "@/components/ui/Button";
import { TabList } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";

export function BrandDeckViewer({ decks }: { decks: string[] }) {
  const ids = decks.map((_, i) => String(i));
  const [active, setActive] = useState(ids[0]);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const src = decks[Number(active)];
  const open = src.replace("/embed?", "/pub?");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {decks.length > 1 ? (
          <TabList
            ids={ids}
            value={active}
            onChange={setActive}
            idPrefix="brand-deck"
            label="Brand decks"
            className="inline-flex gap-1 rounded-full bg-cream-100 p-1"
            renderTab={(id, selected) => ({
              className: cn("rounded-full px-4 py-1.5 text-sm font-semibold transition", selected ? "bg-white text-navy shadow-soft" : "text-ink-muted hover:text-navy"),
              children: `Deck ${Number(id) + 1}`,
            })}
          />
        ) : (
          <span />
        )}
        <a href={open} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-700 hover:underline">
          Open in Google Slides
          <ExternalLink aria-hidden className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
      <div
        id="brand-deck-panel"
        role={decks.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={decks.length > 1 ? `brand-deck-tab-${active}` : undefined}
        className="relative mt-4 aspect-video max-h-[calc(100svh-15rem)] w-full overflow-hidden rounded-3xl bg-navy shadow-card ring-1 ring-navy/10"
      >
        {loaded[active] ? (
          <iframe key={src} src={src} title={`Appstle brand deck ${Number(active) + 1} (Google Slides)`} allowFullScreen loading="lazy" className="absolute inset-0 size-full border-0" />
        ) : (
          <div className="on-dark absolute inset-0 grid place-items-center bg-gradient-to-br from-cobalt-700 via-cobalt-800 to-navy p-6 text-center text-white">
            <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
            <div className="relative flex flex-col items-center">
              <AppstleMark className="size-14 rounded-2xl shadow-glow" />
              <p className="mt-4 font-display text-2xl font-bold">Appstle brand deck {decks.length > 1 ? Number(active) + 1 : ""}</p>
              <p className="mt-1 text-sm text-white/70">Google Slides presentation</p>
              <Button variant="light" className="mt-5" onClick={() => setLoaded((l) => ({ ...l, [active]: true }))}>
                <Presentation aria-hidden className="mr-1 size-4" />
                View <strong>slides</strong>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
