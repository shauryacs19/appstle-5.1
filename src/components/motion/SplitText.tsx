"use client";

import { useInView } from "motion/react";
import { cloneElement, Fragment, isValidElement, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { inViewOnce } from "@/lib/motion";

const INLINE = new Set(["span", "strong", "em", "b", "i", "u", "mark", "a"]);

function words(text: string, key: string) {
  return text.split(/(\s+)/).map((part, i) =>
    !part || /^\s+$/.test(part) ? part : (
      <span key={`${key}-${i}`} className="split-word">
        <span className="split-inner">{part}</span>
      </span>
    ),
  );
}

function split(node: ReactNode, key = "w"): ReactNode {
  if (typeof node === "string" || typeof node === "number") return words(String(node), key);
  if (Array.isArray(node)) return node.map((n, i) => <Fragment key={i}>{split(n, `${key}.${i}`)}</Fragment>);
  if (!isValidElement<{ children?: ReactNode }>(node) || node.type === "br") return node;
  if (node.type === Fragment) return split(node.props.children, key);
  if (typeof node.type === "string" && INLINE.has(node.type)) return cloneElement(node, undefined, split(node.props.children, key));
  return (
    <span className="split-word">
      <span className="split-inner">{node}</span>
    </span>
  );
}

export function SplitText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, inViewOnce);
  const show = inView;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!show || !el) return;
    let line = -1;
    let top = -Infinity;
    let word = 0;
    for (const w of el.querySelectorAll<HTMLElement>(".split-word")) {
      if (w.offsetTop > top + 4) {
        line++;
        top = w.offsetTop;
        word = 0;
      }
      w.style.setProperty("--l", String(line));
      w.style.setProperty("--w", String(word++));
    }
  }, [show]);

  return (
    <span
      ref={ref}
      className="split"
      data-shown={show ? "" : undefined}
      style={delay ? ({ "--d": `${delay}s` } as CSSProperties) : undefined}
    >
      {split(children)}
    </span>
  );
}
