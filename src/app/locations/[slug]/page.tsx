import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BikeCard } from "@/components/bike-card";
import { DateRangeForm } from "@/components/date-range-form";
import { bikesAtCampsite, campsites, getCampsite, type Campsite } from "@/lib/data";
import { formatDate, nightsBetween, resolveRange, toISODate } from "@/lib/dates";
import { availableCount } from "@/lib/reservations";

export function generateStaticParams() {
  return campsites.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const campsite = getCampsite((await params).slug);
  if (!campsite) return {};
  return {
    title: `Bike hire at ${campsite.name}, ${campsite.town}`,
    description: `E-bikes, hybrids and kids' bikes delivered to your pitch at ${campsite.name} in the ${campsite.region}.`,
  };
}

const difficultyStyle = {
  Easy: "ring-1 ring-sand/50 text-sand",
  Moderate: "bg-sand/25 text-sand",
  Challenging: "bg-sand text-forest-950",
};

export default async function CampsitePage({ params, searchParams }: PageProps<"/locations/[slug]">) {
  const campsite = getCampsite((await params).slug);
  if (!campsite) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-stone">
        <Link href="/locations" className="hover:text-forest-700">
          Locations
        </Link>{" "}
        / <span className="text-forest-900">{campsite.name}</span>
      </nav>

      <header className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            {campsite.region} · {campsite.country}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
            {campsite.name}
          </h1>
          <p className="mt-1 text-lg text-stone">Near {campsite.town}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone">{campsite.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {campsite.highlights.map((h) => (
              <li key={h} className="rounded-full bg-paper px-3 py-1 text-sm text-forest-900 ring-1 ring-forest-900/10">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-3xl bg-forest-900 p-6 text-cream">
          <h2 className="font-display text-xl font-semibold">Rides from your pitch</h2>
          <ul className="mt-4 space-y-3">
            {campsite.trails.map((t) => (
              <li key={t.name} className="flex items-start justify-between gap-3 border-b border-white/10 pb-3 last:border-0">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-cream/70">{t.distanceKm} km</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${difficultyStyle[t.difficulty]}`}>
                  {t.difficulty}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </header>

      <section aria-labelledby="availability" className="mt-14">
        <h2 id="availability" className="font-display text-3xl font-semibold tracking-tight text-forest-950">
          Check availability
        </h2>
        <Suspense fallback={<div className="mt-6 h-64 animate-pulse rounded-3xl bg-forest-900/5" />}>
          <Availability campsite={campsite} searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}

async function Availability({
  campsite,
  searchParams,
}: {
  campsite: Campsite;
  searchParams: PageProps<"/locations/[slug]">["searchParams"];
}) {
  const sp = await searchParams;
  const today = toISODate(new Date());
  const { start, end } = resolveRange(today, sp.from as string, sp.to as string);
  const days = nightsBetween(start, end);
  const fleet = await Promise.all(
    bikesAtCampsite(campsite).map(async ({ bike, total }) => ({
      bike,
      total,
      free: await availableCount(campsite.slug, bike.slug, start, end),
    })),
  );

  return (
    <>
      <div className="mt-6 rounded-3xl bg-paper p-5 shadow-sm ring-1 ring-forest-900/5">
        <DateRangeForm action={`/locations/${campsite.slug}`} start={start} end={end} min={today} />
        <p className="mt-3 text-sm text-stone">
          Delivered {formatDate(start)} by 9am · collected {formatDate(end)} · {days} day{days === 1 ? "" : "s"} of riding
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fleet.map(({ bike, total, free }) => (
          <BikeCard
            key={bike.slug}
            bike={bike}
            footer={
              <div className="flex items-center justify-between gap-3">
                <p className={`text-sm font-medium ${free === 0 ? "text-alert" : "text-forest-700"}`}>
                  {free === 0 ? "Fully booked" : `${free} of ${total} available`}
                </p>
                {free > 0 ? (
                  <Link
                    href={`/book?campsite=${campsite.slug}&bike=${bike.slug}&from=${start}&to=${end}`}
                    className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-sand transition hover:bg-brand-dark"
                  >
                    Book · £{bike.pricePerDay * days}
                  </Link>
                ) : (
                  <span className="rounded-full bg-forest-900/5 px-4 py-2 text-sm text-stone">Try other dates</span>
                )}
              </div>
            }
          />
        ))}
      </div>
    </>
  );
}
