import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BikeArt } from "@/components/bike-art";
import { DateRangeForm } from "@/components/date-range-form";
import { getBike, getCampsite } from "@/lib/data";
import { formatDate, nightsBetween, resolveRange, toISODate } from "@/lib/dates";
import { availableCount } from "@/lib/reservations";
import { BookingForm } from "./booking-form";

export const metadata: Metadata = {
  title: "Reserve your bikes",
  robots: { index: false },
};

export default function BookPage({ searchParams }: PageProps<"/book">) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-forest-900/5" />}>
        <Booking searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Booking({ searchParams }: Pick<PageProps<"/book">, "searchParams">) {
  const sp = await searchParams;
  const campsite = getCampsite(String(sp.campsite ?? ""));
  const bike = getBike(String(sp.bike ?? ""));

  if (!campsite || !bike || !campsite.fleet[bike.slug]) {
    return (
      <div className="rounded-3xl bg-paper p-10 text-center shadow-sm">
        <h1 className="font-display text-3xl font-semibold text-forest-950">Choose a campsite first</h1>
        <p className="mt-3 text-stone">Find your campsite to see which bikes are available for your dates.</p>
        <Link
          href="/locations"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-sand hover:bg-brand-dark"
        >
          Find bikes near you
        </Link>
      </div>
    );
  }

  const today = toISODate(new Date());
  const { start, end } = resolveRange(today, sp.from as string, sp.to as string);
  const days = nightsBetween(start, end);
  const free = await availableCount(campsite.slug, bike.slug, start, end);

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-stone">
        <Link href="/locations" className="hover:text-forest-700">
          Locations
        </Link>{" "}
        /{" "}
        <Link href={`/locations/${campsite.slug}?from=${start}&to=${end}`} className="hover:text-forest-700">
          {campsite.name}
        </Link>{" "}
        / <span className="text-forest-900">Reserve</span>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-forest-950">Reserve your bikes</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.5fr]">
        <aside className="h-fit space-y-5 rounded-3xl bg-paper p-6 shadow-sm ring-1 ring-forest-900/5 md:sticky md:top-24">
          <div className="rounded-2xl bg-sand/60 p-4">
            <BikeArt bike={bike} className="mx-auto h-32 w-full" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-forest-950">{bike.name}</h2>
            <p className="text-stone">£{bike.pricePerDay} per bike, per day</p>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone">Campsite</dt>
              <dd className="text-right font-medium text-forest-900">
                {campsite.name}, {campsite.town}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone">Delivered</dt>
              <dd className="font-medium text-forest-900">{formatDate(start)}, by 9am</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone">Collected</dt>
              <dd className="font-medium text-forest-900">{formatDate(end)}</dd>
            </div>
          </dl>
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-forest-700">Change dates</summary>
            <div className="mt-3">
              <DateRangeForm
                action="/book"
                start={start}
                end={end}
                min={today}
                hidden={{ campsite: campsite.slug, bike: bike.slug }}
              />
            </div>
          </details>
          <ul className="space-y-1.5 border-t border-forest-900/10 pt-4 text-sm text-stone">
            <li>✓ Helmet, lock &amp; lights included</li>
            <li>✓ Free date changes up to 24h before</li>
            <li>✓ Roadside support at your campsite</li>
          </ul>
        </aside>

        <section className="rounded-3xl bg-paper p-6 shadow-sm ring-1 ring-forest-900/5 md:p-8">
          {free > 0 ? (
            <>
              <p className="mb-6 text-sm font-medium text-forest-700">
                {free} available for these dates
              </p>
              <BookingForm
                campsite={campsite.slug}
                bike={bike.slug}
                from={start}
                to={end}
                days={days}
                pricePerDay={bike.pricePerDay}
                maxQuantity={free}
              />
            </>
          ) : (
            <div className="py-8 text-center">
              <h2 className="font-display text-2xl font-semibold text-forest-950">Fully booked for these dates</h2>
              <p className="mt-2 text-stone">Try different dates, or see what else is available at {campsite.name}.</p>
              <Link
                href={`/locations/${campsite.slug}?from=${start}&to=${end}`}
                className="mt-6 inline-block rounded-full bg-forest-900 px-6 py-3 font-semibold text-sand hover:bg-forest-700"
              >
                See other bikes
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
