const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));

export const isoDate = (iso: string) => iso.slice(0, 10);

export const readingMinutes = (words: number) => Math.max(1, Math.round(words / 225));

export const slugOf = (path: string) => path.split("/").filter(Boolean).pop() ?? "";
