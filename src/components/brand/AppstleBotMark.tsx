import { cn } from "@/lib/cn";

const BOT_BUBBLE = "M74.4 59.6A27.5 27.5 0 1 0 68.1 70.8L78.4 80.4Z";
const BOT_SPARKLE = "M79 13c.9 5.6 2.6 7.3 8 8.2-5.4.9-7.1 2.6-8 8.2-.9-5.6-2.6-7.3-8-8.2 5.4-.9 7.1-2.6 8-8.2Z";
const BOT_SPARKLE_SM = "M88.5 32c.4 2.4 1.1 3.1 3.5 3.5-2.4.4-3.1 1.1-3.5 3.5-.4-2.4-1.1-3.1-3.5-3.5 2.4-.4 3.1-1.1 3.5-3.5Z";

export function AppstleBotMark({ className, title, blink = false, bare = false }: { className?: string; title?: string; blink?: boolean; bare?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(!bare && "rounded-[26%]", className)}
      style={bare ? undefined : { background: "var(--gradient-brand)" }}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {!bare && <path d={BOT_BUBBLE} transform="translate(1.4 2.4)" fill="#08427f" opacity=".22" />}
      <path d={BOT_BUBBLE} fill="#fff" />
      <rect x="27" y="39" width="42" height="25" rx="12.5" fill="#0B2545" />
      <g fill="#6FC0FA" className={blink ? "bot-eyes" : undefined}>
        <rect x="37" y="45.5" width="6" height="12" rx="3" />
        <rect x="53" y="45.5" width="6" height="12" rx="3" />
      </g>
      <path d={BOT_SPARKLE} fill="#fff" className={blink ? "bot-sparkle" : undefined} />
      <path d={BOT_SPARKLE_SM} fill="#fff" opacity=".85" />
    </svg>
  );
}
