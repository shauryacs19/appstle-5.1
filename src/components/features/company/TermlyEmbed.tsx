"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function TermlyEmbed({ id, script, hostedUrl }: { id: string; script: string; hostedUrl: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = () => setLoad(true);
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && start(), { rootMargin: "400px 0px" });
    io.observe(el);
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle ? window.requestIdleCallback(start, { timeout: 4000 }) : setTimeout(start, 2500);
    return () => {
      io.disconnect();
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle as ReturnType<typeof setTimeout>);
    };
  }, []);

  useEffect(() => {
    if (!load) return;
    document.getElementById("termly-jssdk")?.remove();
    const js = document.createElement("script");
    js.id = "termly-jssdk";
    js.src = script;
    js.async = true;
    document.body.appendChild(js);
  }, [load, script]);

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-3xl bg-cobalt-50 p-5 ring-1 ring-cobalt-100 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3 text-[0.95rem] text-navy">
          <ShieldCheck aria-hidden className="size-5 shrink-0 text-cobalt" />
          Appstle’s Privacy Policy is maintained with Termly.
        </p>
        <a href={hostedUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-cobalt-700 hover:underline">
          Open the full policy
          <ExternalLink aria-hidden className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
      <div ref={ref} className="mt-6 min-h-[60svh]">
        {load ? (
          <div {...{ name: "termly-embed" }} data-id={id} data-type="iframe" />
        ) : (
          <div className="grid min-h-[60svh] place-items-center rounded-3xl bg-cream-50 text-sm text-ink-subtle ring-1 ring-navy/6">Loading the privacy policy…</div>
        )}
      </div>
    </div>
  );
}
