import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LocationSearch } from "@/components/location-search";
import { bikes, campsites, type Campsite } from "@/lib/data";
import { geocode, sortByDistance } from "@/lib/geo";

export const metadata: Metadata = {
  title: "Find bikes near you",
  description: "Search Pitch & Pedal partner campsites by postcode, town or region and see which bikes are available.",
};

export default function LocationsPage({ searchParams }: PageProps<"/locations">) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Find bikes</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
          Bikes in your area
        </h1>
        <p className="mt-4 text-lg text-stone">
          Enter a postcode, town or region to find partner campsites nearby, or browse every location below.
        </p>
      </header>
      <Suspense fallback={<ResultsSkeleton />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Results({ searchParams }: Pick<PageProps<"/locations">, "searchParams">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const type = typeof params.type === "string" ? params.type : "";
  const lat = Number(params.lat);
  const lng = Number(params.lng);

  let origin: { lat: number; lng: number; label: string } | null = null;
  if (Number.isFinite(lat) && Number.isFinite(lng) && params.lat && params.lng) {
    origin = { lat, lng, label: "your location" };
  } else if (q) {
    origin = await geocode(q);
  }

  const filtered = type ? campsites.filter((c) => (c.fleet[type] ?? 0) > 0) : campsites;
  const results: { campsite: Campsite; miles?: number }[] = origin
    ? sortByDistance(origin, filtered)
    : [...filtered].sort((a, b) => a.name.localeCompare(b.name)).map((campsite) => ({ campsite }));

  const keep = (extra: Record<string, string>) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (params.lat && params.lng && !q) {
      sp.set("lat", String(params.lat));
      sp.set("lng", String(params.lng));
    }
    for (const [k, v] of Object.entries(extra)) if (v) sp.set(k, v);
    const s = sp.toString();
    return s ? `/locations?${s}` : "/locations";
  };

  return (
    <>
      <div className="mt-8 max-w-2xl">
        <LocationSearch defaultValue={q} compact />
      </div>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter by bike">
        <FilterChip href={keep({})} active={!type}>
          All bikes
        </FilterChip>
        {bikes.map((b) => (
          <FilterChip key={b.slug} href={keep({ type: b.slug })} active={type === b.slug}>
            {b.name}
          </FilterChip>
        ))}
      </div>

      <p className="mt-8 text-sm text-stone" aria-live="polite">
        {q && !origin ? (
          <>
            We couldn&apos;t find <strong className="text-forest-900">“{q}”</strong>. Showing all locations instead.
          </>
        ) : origin ? (
          <>
            {results.length} campsites, nearest to <strong className="text-forest-900">{origin.label}</strong> first
          </>
        ) : (
          <>{results.length} partner campsites</>
        )}
      </p>

      <ul className="mt-4 grid gap-5 md:grid-cols-2">
        {results.map(({ campsite: c, miles }, i) => {
          const total = Object.values(c.fleet).reduce((a, b) => a + b, 0);
          const types = bikes.filter((b) => c.fleet[b.slug]);
          return (
            <li key={c.slug}>
              <Link
                href={`/locations/${c.slug}`}
                className="flex h-full flex-col rounded-3xl border border-forest-900/10 bg-paper p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                      {c.region} · {c.country}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-forest-950">{c.name}</h2>
                    <p className="text-sm text-stone">Near {c.town}</p>
                  </div>
                  {miles !== undefined && (
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${
                        i === 0 ? "bg-brand text-sand" : "bg-forest-100 text-forest-800"
                      }`}
                    >
                      {miles < 1 ? "< 1" : Math.round(miles)} mi
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone">{c.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {types.map((b) => (
                    <span key={b.slug} className="rounded-full bg-sand px-2.5 py-1 text-xs font-medium text-forest-900">
                      {b.name}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-5 text-sm font-semibold text-brand">
                  {total} bikes on site · from £{Math.min(...types.map((b) => b.pricePerDay))}/day →
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
      {results.length === 0 && (
        <p className="mt-6 rounded-2xl bg-paper p-6 text-stone">
          No campsites have that bike yet.{" "}
          <Link href={keep({})} className="font-semibold text-forest-700 underline">
            Show all bikes
          </Link>
          .
        </p>
      )}
    </>
  );
}

function FilterChip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active ? "bg-forest-900 text-sand" : "border border-forest-900/15 bg-paper text-forest-800 hover:border-forest-600"
      }`}
    >
      {children}
    </Link>
  );
}

function ResultsSkeleton() {
  return (
    <div className="mt-8 animate-pulse space-y-4" aria-hidden="true">
      <div className="h-12 max-w-2xl rounded-full bg-forest-900/5" />
      <div className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-56 rounded-3xl bg-forest-900/5" />
        ))}
      </div>
    </div>
  );
}
