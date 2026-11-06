"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";

export function TabList<T extends string>({
  ids,
  value,
  onChange,
  idPrefix,
  label,
  orientation = "horizontal",
  className,
  renderTab,
  panelId,
}: {
  ids: readonly T[];
  value: T;
  onChange: (id: T) => void;
  idPrefix: string;
  label: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  renderTab: (id: T, selected: boolean) => { className: string; children: ReactNode };
  panelId?: (id: T) => string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent) => {
    const i = ids.indexOf(value);
    const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    let next: number | null = null;
    if (e.key === nextKey) next = (i + 1) % ids.length;
    if (e.key === prevKey) next = (i - 1 + ids.length) % ids.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = ids.length - 1;
    if (next === null) return;
    e.preventDefault();
    onChange(ids[next]);
    refs.current[ids[next]]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} aria-orientation={orientation} className={className} onKeyDown={onKeyDown}>
      {ids.map((id) => {
        const selected = id === value;
        const { className: cls, children } = renderTab(id, selected);
        return (
          <button
            key={id}
            ref={(el) => {
              refs.current[id] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${id}`}
            aria-selected={selected}
            aria-controls={panelId ? panelId(id) : `${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            className={cls}
          >
            {children}
          </button>
        );
      })}
    </div>
  );
}
