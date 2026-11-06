import { newsCopy } from "@/data/articles/news";

export function AboutAppstle() {
  return (
    <aside aria-label="About Appstle" className="rounded-3xl bg-cream-50 p-5 ring-1 ring-navy/8">
      <p className="eyebrow text-ink-subtle">About Appstle</p>
      {newsCopy.about.map((l) => (
        <p key={l} className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">
          {l}
        </p>
      ))}
    </aside>
  );
}
