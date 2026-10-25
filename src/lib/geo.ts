import { campsites, type Campsite } from "./data";

export type Point = { lat: number; lng: number };

export function distanceMiles(a: Point, b: Point) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function sortByDistance(origin: Point, list: Campsite[] = campsites) {
  return list
    .map((campsite) => ({ campsite, miles: distanceMiles(origin, campsite) }))
    .sort((a, b) => a.miles - b.miles);
}

const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const OUTCODE = /^[A-Z]{1,2}\d[A-Z\d]?$/i;

/**
 * Resolve a UK postcode, outcode or place name to coordinates using the
 * free postcodes.io API. Returns null when nothing matches.
 */
export async function geocode(query: string): Promise<(Point & { label: string }) | null> {
  const q = query.trim();
  if (!q) return null;

  // Match our own towns and regions first, so "Cornwall" or "Keswick" work offline.
  const local = campsites.find(
    (c) =>
      c.town.toLowerCase() === q.toLowerCase() ||
      c.region.toLowerCase().includes(q.toLowerCase()),
  );
  if (local) return { lat: local.lat, lng: local.lng, label: `${local.town}, ${local.region}` };

  const base = "https://api.postcodes.io";
  try {
    if (POSTCODE.test(q)) {
      const res = await fetch(`${base}/postcodes/${encodeURIComponent(q)}`);
      if (res.ok) {
        const { result } = await res.json();
        return { lat: result.latitude, lng: result.longitude, label: result.postcode };
      }
    }
    if (OUTCODE.test(q)) {
      const res = await fetch(`${base}/outcodes/${encodeURIComponent(q)}`);
      if (res.ok) {
        const { result } = await res.json();
        return { lat: result.latitude, lng: result.longitude, label: result.outcode };
      }
    }
    const res = await fetch(`${base}/places?q=${encodeURIComponent(q)}&limit=1`);
    if (res.ok) {
      const { result } = await res.json();
      const place = result?.[0];
      if (place) {
        return {
          lat: place.latitude,
          lng: place.longitude,
          label: [place.name_1, place.county_unitary ?? place.region].filter(Boolean).join(", "),
        };
      }
    }
  } catch {
    // Network failure: fall through and let the caller show all locations.
  }
  return null;
}
