const DEMO_START = Date.UTC(2026, 10, 5);
const DAY = 86_400_000;

const fmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });

export const demoDate = (days: number) => fmt.format(new Date(DEMO_START + days * DAY));
