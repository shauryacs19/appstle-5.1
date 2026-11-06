import type { StaticImageData } from "next/image";

export type MediaItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  kind: "image" | "video";
  poster?: string;
  status: "placeholder" | "final";
  label: string;
  standIn?: StaticImageData;
  standInFit?: "contain" | "cover";
};

const SIZE = {
  desktop: { width: 2880, height: 1800 },
  mobile: { width: 780, height: 1688 },
  tablet: { width: 2048, height: 1536 },
} as const;

type Frame = keyof typeof SIZE;

export function shot(
  id: string,
  src: string,
  label: string,
  alt: string,
  {
    frame = "desktop",
    kind = "image",
    standIn,
    standInFit,
  }: { frame?: Frame; kind?: MediaItem["kind"]; standIn?: StaticImageData; standInFit?: MediaItem["standInFit"] } = {},
): MediaItem {
  return { id, src, label, alt, kind, status: "placeholder", standIn, standInFit, ...SIZE[frame] };
}
