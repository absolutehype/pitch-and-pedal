const DAY = 24 * 60 * 60 * 1000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number) {
  return toISODate(new Date(Date.parse(iso) + days * DAY));
}

export function isISODate(value: unknown): value is string {
  return typeof value === "string" && ISO_DATE.test(value) && !Number.isNaN(Date.parse(value));
}

/** Number of hire days: a bike dropped on the 1st and collected on the 3rd is 2 days. */
export function nightsBetween(start: string, end: string) {
  return Math.max(1, Math.round((Date.parse(end) - Date.parse(start)) / DAY));
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Normalise a from/to pair from the URL into a valid future range,
 * defaulting to tomorrow for two days.
 */
export function resolveRange(today: string, from?: string, to?: string) {
  const start = isISODate(from) && from > today ? from : addDays(today, 1);
  const end = isISODate(to) && to > start ? to : addDays(start, 2);
  return { start, end };
}
