"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Shape = "ribbon" | "coin" | "star";

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fall: number;
  sway: number;
  swayPhase: number;
  swaySpeed: number;
  rot: number;
  spin: number;
  flip: number;
  flipSpeed: number;
  size: number;
  color: string;
  shape: Shape;
  age: number;
  life: number;
};

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const SHAPES: Shape[] = ["ribbon", "ribbon", "ribbon", "ribbon", "coin", "coin", "star", "star"];
const DRAG = 5;
const DRIFT_ALPHA = 0.6;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)];

function starPath() {
  const p = new Path2D();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 0.22 : 0.5;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    if (i) p.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    else p.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  p.closePath();
  return p;
}

export function Confetti({ colors, className }: { colors: readonly string[]; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const star = starPath();

    let w = 0;
    let h = 0;
    let dpr = 1;
    let burst: Piece[] = [];
    let drift: Piece[] = [];
    let driftFrom = reduce ? -Infinity : Infinity;
    let live = false;
    let visible = false;
    let raf = 0;
    let last = 0;
    let timer = 0;

    const make = (x: number, y: number, calm: boolean): Piece => {
      const shape = pick(SHAPES);
      const scale = (w < 640 ? 0.8 : 1) * (calm ? 0.8 : 1);
      return {
        x,
        y,
        vx: 0,
        vy: 0,
        fall: calm ? rand(16, 34) : rand(70, 140),
        sway: calm ? rand(10, 26) : rand(6, 16),
        swayPhase: rand(0, TAU),
        swaySpeed: calm ? rand(0.5, 1.2) : rand(1.6, 3.4),
        rot: rand(0, TAU),
        spin: calm ? rand(-1, 1) : rand(-5, 5),
        flip: rand(0, TAU),
        flipSpeed: calm ? rand(1.5, 3.5) : rand(5, 10),
        size: (shape === "coin" ? rand(7, 10) : shape === "star" ? rand(10, 14) : rand(10, 15)) * scale,
        color: pick(colors),
        shape,
        age: 0,
        life: calm ? Infinity : rand(3.6, 5.6),
      };
    };

    const seedDrift = () => {
      const n = Math.round(Math.min(28, Math.max(10, (w * h) / 42000)));
      drift = Array.from({ length: n }, () => make(rand(0, w), rand(0, h), true));
    };

    const fire = () => {
      const y0 = Math.min(h * 0.62, 470);
      const reach = Math.min(y0, w * 0.42);
      const n = Math.round(Math.min(80, Math.max(36, w / 18)));
      for (const [fx, dir] of [[0.08, 1], [0.92, -1]] as const) {
        for (let i = 0; i < n; i++) {
          const p = make(fx * w + rand(-12, 12), y0 + rand(-12, 12), false);
          const a = (-90 + dir * rand(8, 46)) * DEG;
          const v = reach * rand(0.45, 1.05) * DRAG;
          p.vx = Math.cos(a) * v;
          p.vy = Math.sin(a) * v;
          burst.push(p);
        }
      }
      driftFrom = performance.now() + 900;
    };

    const draw = (p: Piece, alpha: number) => {
      if (alpha <= 0.01) return;
      const s = p.size;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x + Math.sin(p.swayPhase) * p.sway, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "star") {
        ctx.scale(s, s * (0.7 + 0.3 * Math.cos(p.flip)));
        ctx.fill(star);
      } else {
        ctx.scale(1, Math.cos(p.flip));
        if (p.shape === "ribbon") {
          ctx.fillRect(-s * 0.28, -s * 0.6, s * 0.56, s * 1.2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.5, 0, TAU);
          ctx.fill();
          ctx.strokeStyle = "rgb(255 255 255 / 0.6)";
          ctx.lineWidth = s * 0.1;
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.3, 0, TAU);
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const paint = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const t = Math.min(1, Math.max(0, (now - driftFrom) / 1600));
      const fade = DRIFT_ALPHA * t * t * (3 - 2 * t);
      for (const p of drift) draw(p, fade);
      for (const p of burst) draw(p, Math.min(1, (p.life - p.age) / 1.1));
    };

    const step = (p: Piece, dt: number) => {
      const k = Math.exp(-DRAG * dt);
      p.vx *= k;
      p.vy *= k;
      p.x += p.vx * dt;
      p.y += (p.vy + p.fall) * dt;
      p.swayPhase += p.swaySpeed * dt;
      p.rot += p.spin * dt;
      p.flip += p.flipSpeed * dt;
      p.age += dt;
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      for (const p of burst) step(p, dt);
      burst = burst.filter((p) => p.age < p.life && p.y < h + 40);
      if (now > driftFrom) {
        for (const p of drift) {
          step(p, dt);
          if (p.y > h + 20) {
            p.y = -20;
            p.x = rand(0, w);
          }
        }
      }
      paint(now);
      if (visible) raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (raf || !live || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const fit = () => {
      const nw = canvas.offsetWidth;
      const nh = canvas.offsetHeight;
      if (!nw || !nh) return;
      for (const p of drift) {
        p.x *= nw / (w || nw);
        p.y *= nh / (h || nh);
      }
      w = nw;
      h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (!drift.length) seedDrift();
      paint(performance.now());
    };

    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    fit();
    if (reduce) return () => ro.disconnect();

    const seen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      play();
    });
    seen.observe(canvas);
    const cue = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        cue.disconnect();
        timer = window.setTimeout(() => {
          fire();
          live = true;
          play();
        }, 200);
      },
      { rootMargin: "0px 0px -62% 0px" },
    );
    cue.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      ro.disconnect();
      seen.disconnect();
      cue.disconnect();
    };
  }, [colors]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 size-full [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_86%,transparent)]",
        className,
      )}
    />
  );
}
