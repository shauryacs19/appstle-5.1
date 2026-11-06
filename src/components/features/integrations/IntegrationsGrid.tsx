"use client";

import { AnimatePresence, motion } from "motion/react";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { appstleCrossApp, shopifySurfaces, type Integration } from "@/data/integrations";
import { productById } from "@/data/products";
import { IntegrationCard } from "./IntegrationCard";
import { AppFilterPills, CategoryAndSearch, type AppFilter } from "./IntegrationFilters";

export function IntegrationsGrid({
  items,
  byApp = false,
  limit,
  moreHref,
  contactHref,
  className,
}: {
  items: Integration[];
  byApp?: boolean;
  limit?: number;
  moreHref?: string;
  contactHref?: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const [app, setApp] = useState<AppFilter>("all");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const q = useDeferredValue(query.trim().toLowerCase());

  const forApp = useMemo(() => (app === "all" ? items : items.filter((i) => i.listedOn.includes(app))), [items, app]);
  const categories = useMemo(() => ["All", ...Array.from(new Set(forApp.map((i) => i.category)))], [forApp]);
  const cat = categories.includes(category) ? category : "All";
  const shown = forApp.filter(
    (i) => (cat === "All" || i.category === cat) && (!q || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)),
  );
  const visible = limit && !expanded ? shown.slice(0, limit) : shown;

  return (
    <div className={className}>
      {byApp && <AppFilterPills id={id} value={app} onChange={setApp} />}
      <div className={byApp ? "mt-3" : undefined}>
        <CategoryAndSearch id={id} categories={categories} category={cat} onCategory={setCategory} query={query} onQuery={setQuery} />
      </div>

      {byApp && app !== "all" && (
        <motion.dl
          key={app}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 grid gap-x-6 gap-y-1 rounded-2xl bg-white/70 px-4 py-3 text-[0.82rem] ring-1 ring-navy/8 sm:grid-cols-2"
        >
          <div>
            <dt className="inline font-semibold text-navy">Shopify surfaces: </dt>
            <dd className="inline text-ink-muted">{shopifySurfaces[app].join(" · ")}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-navy">Works with Appstle: </dt>
            <dd className="inline text-ink-muted">{appstleCrossApp[app].map((p) => productById[p].shortName).join(" · ")}</dd>
          </div>
        </motion.dl>
      )}

      <p aria-live="polite" className="sr-only">
        {shown.length} integrations shown
      </p>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((i) => (
            <motion.li
              key={i.name}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              <IntegrationCard item={i} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {shown.length === 0 && (
        <p className="mt-4 rounded-2xl border border-dashed border-navy/15 p-4 text-sm text-ink-muted">
          {app !== "all" && !q
            ? `${productById[app].shortName}’s Shopify listing names Shopify surfaces and other Appstle apps (above) rather than third-party tools.`
            : `No listed integration matches “${query}”.`}{" "}
          {contactHref && (
            <SmartLink href={contactHref} className="font-semibold text-cobalt-700 hover:underline">
              Ask Appstle’s team
            </SmartLink>
          )}
        </p>
      )}

      {(visible.length < shown.length || moreHref) && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          {visible.length < shown.length ? (
            <button type="button" onClick={() => setExpanded(true)} className="font-semibold text-navy underline-offset-4 hover:underline">
              Show all {shown.length} integrations
            </button>
          ) : (
            <span />
          )}
          {moreHref && (
            <SmartLink href={moreHref} className="font-semibold text-cobalt-700 hover:underline">
              See all app partners →
            </SmartLink>
          )}
        </div>
      )}
    </div>
  );
}
