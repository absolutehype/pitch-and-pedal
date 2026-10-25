import type { Metadata } from "next";
import Link from "next/link";
import { BikeArt } from "@/components/bike-art";
import { bikes, bikeTypeLabels, campsitesWithBike } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our fleet",
  description: "Hybrids, e-bikes, mountain bikes, kids' bikes, tandems and cargo bikes delivered to your campsite.",
};

export default function BikesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Our fleet</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
          Serviced, fitted and ready to ride
        </h1>
        <p className="mt-4 text-lg text-stone">
          Every bike is checked between hires and comes with a helmet, lock, lights and puncture kit. Prices are
          per bike, per day, including delivery and collection.
        </p>
      </header>

      <div className="mt-12 space-y-8">
        {bikes.map((bike) => {
          const sites = campsitesWithBike(bike.slug);
          return (
            <section
              key={bike.slug}
              id={bike.slug}
              className="grid scroll-mt-24 gap-8 rounded-3xl border border-forest-900/10 bg-paper p-6 md:grid-cols-[1fr_1.4fr] md:p-10"
            >
              <div className="flex items-center justify-center rounded-2xl bg-sand/60 p-6">
                <BikeArt bike={bike} className="h-48 w-full" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                  {bikeTypeLabels[bike.type]}
                </p>
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-3xl font-semibold text-forest-950">{bike.name}</h2>
                  <p className="text-stone">
                    <span className="font-display text-2xl font-semibold text-forest-900">£{bike.pricePerDay}</span> per
                    day
                  </p>
                </div>
                <p className="mt-3 leading-relaxed text-stone">{bike.description}</p>
                <ul className="mt-5 grid gap-2 text-sm text-forest-900 sm:grid-cols-2">
                  {bike.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-forest-600" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-stone">
                  <span className="font-semibold text-forest-900">Sizes:</span> {bike.sizes.join(" · ")}
                </p>
                <p className="mt-2 text-sm text-stone">
                  <span className="font-semibold text-forest-900">Available at {sites.length} campsites</span>{" "}
                  including {sites.slice(0, 3).map((s) => s.town).join(", ")}.
                </p>
                <Link
                  href="/locations"
                  className="mt-6 inline-block rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-sand transition hover:bg-forest-700"
                >
                  Find one near you
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
