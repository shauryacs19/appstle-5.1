"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useDrawProgress } from "@/hooks/useDrawProgress";

type Stroke = {
  from: [number, number];
  via?: [number, number][];
  to?: [number, number];
  into?: string;
  at?: [number, number];
  enter?: "top" | "left" | "right";
  exit?: "down" | "left" | "right";
};

type Sweep = { demo: string; copy: string };

type Line = { around: string } | Sweep | Stroke;
type LineStop = { section: string; color: string; line?: false | Line };

const ALPHA = 0.4;
const BEND = 0.55;
const GAP = 46;

type Rect = { x: number; y: number; w: number; h: number };
type Geometry = { w: number; h: number; d: string };

const f = (n: number) => n.toFixed(1);

function boxWithin(el: HTMLElement, host: HTMLElement): Rect {
  let x = 0;
  let y = 0;
  for (let n: HTMLElement | null = el; n && n !== host; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function curve(x0: number, y0: number, x1: number, y1: number, enter: Stroke["enter"], exit: Stroke["exit"]) {
  const [ax, ay] = enter === "left" ? [1, 0] : enter === "right" ? [-1, 0] : [0, 1];
  const [bx, by] = exit === "left" ? [-1, 0] : exit === "right" ? [1, 0] : [0, 1];
  const reach = (sideways: number) => BEND * (sideways ? Math.abs(x1 - x0) : Math.abs(y1 - y0));
  const k0 = reach(ax);
  const k1 = reach(bx);
  return `M${f(x0)} ${f(y0)} C${f(x0 + ax * k0)} ${f(y0 + ay * k0)} ${f(x1 - bx * k1)} ${f(y1 - by * k1)} ${f(x1)} ${f(y1)}`;
}

function smooth(pts: Array<[number, number]>) {
  const at = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))];
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

function tuckPath(r: Rect, h: number) {
  const L = r.x - GAP;
  const x0 = r.x + r.w * 0.55;
  const y0 = -0.02 * h;
  const yA = r.y + r.h * 0.3;
  const yB = r.y + r.h * 0.68;
  const xE = r.x + r.w * 0.28;
  const yE = r.y + r.h * 0.86;
  const k = BEND * (yA - y0);
  return [
    `M${f(x0)} ${f(y0)}`,
    `C${f(x0)} ${f(y0 + k)} ${f(L)} ${f(yA - k)} ${f(L)} ${f(yA)}`,
    `L${f(L)} ${f(yB)}`,
    `C${f(L)} ${f(yB + BEND * (yE - yB))} ${f(xE - BEND * (xE - L))} ${f(yE)} ${f(xE)} ${f(yE)}`,
  ].join(" ");
}

function columnOf(a: HTMLElement, b: HTMLElement) {
  let n = a;
  while (n.parentElement && !n.parentElement.contains(b)) n = n.parentElement;
  return n;
}

const CLEAR = 28;

function sweepPath(host: HTMLElement, line: Sweep, w: number, h: number): string | null {
  const demoEl = host.querySelector<HTMLElement>(line.demo);
  const copyEl = host.querySelector<HTMLElement>(line.copy);
  if (!demoEl || !copyEl) return null;
  const demo = boxWithin(columnOf(demoEl, copyEl), host);
  const copy = boxWithin(columnOf(copyEl, demoEl), host);
  if (demo.y >= copy.y + copy.h - 1 || copy.y >= demo.y + demo.h - 1) return null;
  const right = demo.x > copy.x;
  const dir = right ? -1 : 1;
  const x0 = right ? (demo.x + demo.w / 2 + w) / 2 : demo.x / 2 + demo.w / 4;
  const y0 = -0.02 * h;
  const x1 = right ? -0.03 * w : 1.03 * w;
  const c2x = x0 + dir * 0.45 * Math.abs(x1 - x0);
  const at = (t: number) => {
    const u = 1 - t;
    return u * u * u * x0 + 3 * u * u * t * x0 + 3 * u * t * t * c2x + t * t * t * x1;
  };
  const edge = right ? copy.x + copy.w : copy.x;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if ((at(mid) - edge) * dir < 0) lo = mid;
    else hi = mid;
  }
  const rest = (1 - hi) ** 3;
  const need = (copy.y + copy.h + CLEAR - y0 * rest) / (1 - rest);
  const y1 = Math.min(h - 12, Math.max(need, demo.y + demo.h + CLEAR));
  return `M${f(x0)} ${f(y0)} C${f(x0)} ${f(y1)} ${f(c2x)} ${f(y1)} ${f(x1)} ${f(y1)}`;
}

function measure(host: HTMLElement, line: Line): Geometry | null {
  const w = host.clientWidth;
  const h = host.clientHeight;
  const find = (sel: string) => {
    const el = host.querySelector<HTMLElement>(sel);
    return el ? boxWithin(el, host) : null;
  };
  if ("around" in line) {
    const r = find(line.around);
    return r && { w, h, d: tuckPath(r, h) };
  }
  if ("demo" in line) {
    const d = sweepPath(host, line, w, h);
    return d ? { w, h, d } : null;
  }
  const x0 = line.from[0] * w;
  const y0 = line.from[1] * h;
  let x1: number;
  let y1: number;
  if (line.into) {
    const r = find(line.into);
    if (!r) return null;
    const [ax, ay] = line.at ?? [0.5, 0.5];
    x1 = r.x + ax * r.w;
    y1 = r.y + ay * r.h;
  } else {
    const to = line.to ?? [0.5, 1];
    x1 = to[0] * w;
    y1 = to[1] * h;
  }
  if (line.via?.length) {
    const pts: Array<[number, number]> = [[x0, y0], ...line.via.map(([vx, vy]): [number, number] => [vx * w, vy * h]), [x1, y1]];
    return { w, h, d: smooth(pts) };
  }
  return { w, h, d: curve(x0, y0, x1, y1, line.enter, line.exit) };
}

function SectionLine({ host, color, line, autoplay = false, alpha = ALPHA }: { host: HTMLElement; color: string; line: Line; autoplay?: boolean; alpha?: number }) {
  const path = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState(() => measure(host, line));

  useEffect(() => {
    const ro = new ResizeObserver(() => setGeo(measure(host, line)));
    ro.observe(host);
    return () => ro.disconnect();
  }, [host, line]);

  useEffect(() => {
    if (!autoplay) return;
    const p = path.current;
    if (!p) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      p.style.strokeDashoffset = "0";
      p.style.opacity = "1";
      return;
    }
    let raf = 0;
    const t0 = performance.now() + 250;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / 1600));
      const e = 1 - (1 - t) ** 3;
      p.style.strokeDashoffset = String(1 - e);
      p.style.opacity = e > 0.002 ? "1" : "0";
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, geo]);

  useDrawProgress(autoplay ? null : host, (t) => {
    const p = path.current;
    if (!p) return;
    p.style.strokeDashoffset = String(1 - t);
    p.style.opacity = t > 0.002 ? "1" : "0";
  });

  if (!geo || !geo.w || !geo.h) return null;
  return (
    <svg aria-hidden className="pointer-events-none absolute top-0 left-0 -z-10 overflow-visible" width={geo.w} height={geo.h}>
      <path
        ref={path}
        d={geo.d}
        pathLength={1}
        fill="none"
        stroke={color}
        strokeOpacity={alpha}
        strokeWidth={geo.w >= 900 ? 14 : 8}
        strokeLinecap="round"
        strokeDasharray="1 1"
        style={{ strokeDashoffset: 1, opacity: 0 }}
      />
    </svg>
  );
}

export function ScrollLines({ stops }: { stops: LineStop[] }) {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const hosts = useMemo(() => {
    if (!mounted) return [];
    const found: Array<{ host: HTMLElement; color: string; line: Line }> = [];
    for (const s of stops) {
      if (!s.line) continue;
      const host = document.querySelector<HTMLElement>(s.section)?.firstElementChild;
      if (host instanceof HTMLElement) found.push({ host, color: s.color, line: s.line });
    }
    return found;
  }, [mounted, stops]);

  return <>{hosts.map((h, i) => createPortal(<SectionLine host={h.host} color={h.color} line={h.line} />, h.host, `line-${i}`))}</>;
}

const noopSubscribe = () => () => {};
