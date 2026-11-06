import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ shadow: ["hairline", "soft", "card", "float", "glow"] }],
      "font-family": [{ font: ["display", "sans"] }],
    },
  },
});

export function cn(...parts: Array<string | false | null | undefined>) {
  return twMerge(parts.filter(Boolean).join(" "));
}

export const formatNumber = (n: number) => new Intl.NumberFormat("en-US").format(n);
