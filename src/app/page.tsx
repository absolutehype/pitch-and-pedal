import Link from "next/link";
import { BikeCard } from "@/components/bike-card";
import { LogoBadge } from "@/components/logo";
import { LocationSearch } from "@/components/location-search";
import { bikes, campsites, regions } from "@/lib/data";

const steps = [
  {
    title: "Find your campsite",
    body: "Search by postcode or town to see partner campsites near you and the bikes stationed there.",
  },
  {
    title: "Pick bikes & dates",
    body: "Choose hybrids, e-bikes, kids' bikes or cargo bikes for the days you want to ride. Pay per day, no hidden extras.",
  },
  {
    title: "We bring them to your pitch",
    body: "Bikes arrive by 9am on day one, fitted to each rider with helmets, locks and a local route card.",
  },
  {
    title: "Ride, then leave them be",
    body: "When you're done, leave the bikes at your pitch. We collect, clean and service them. That's it.",
  },
];

const faqs = [
  {
    q: "Do I need to be staying at a partner campsite?",
    a: "Yes. We deliver to the pitches of our partner campsites so the bikes are right where you're staying. Search your area to see where we operate.",
  },
  {
    q: "What's included in the price?",
    a: "Delivery to your pitch, a fitting for each rider, helmets, a lock, lights, a puncture kit and a route card for local rides. E-bikes are swapped for a fully charged battery each morning.",
  },
  {
    q: "What if it rains?",
    a: "This is the UK, so we're used to it. You can move your booking to different dates free of charge up to 24 hours before delivery.",
  },
  {
    q: "What happens if I get a puncture or breakdown?",
    a: "Every hire includes roadside support at your campsite. Call the number on your route card and we'll fix or swap the bike, usually within two hours.",
  },
  {
    q: "Are kids' bikes and child seats available?",
    a: "Kids' bikes come in 16\", 20\" and 24\" wheel sizes with helmets. Our Family Cargo e-bike carries two young children, and child seats can be added on request.",
  },
];

export default function Home() {
  const featured = campsites.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-forest-100 px-3 py-1 text-sm font-medium text-forest-800">
              <span className="h-2 w-2 rounded-full bg-forest-600" />
              Now at {campsites.length} campsites across England, Scotland &amp; Wales
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-forest-950 sm:text-5xl md:text-6xl">
              Leave the bike rack at home.{" "}
              <span className="text-forest-600">We&apos;ll bring the bikes to your pitch.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone">
              Pitch &amp; Pedal delivers quality bikes, e-bikes and kids&apos; bikes to campsites around the UK.
              Book online, wake up to bikes outside your tent, and spend your holiday riding instead of loading
              the car.
            </p>
            <div className="mt-8 max-w-xl">
              <LocationSearch />
            </div>
          </div>
          <div className="rounded-[2rem] bg-forest-700 p-8 shadow-xl ring-8 ring-forest-700/15 sm:p-12">
            <LogoBadge className="mx-auto w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section aria-label="Why ride with us" className="border-y border-forest-900/10 bg-paper">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center sm:px-6 md:grid-cols-4">
          {[
            ["Delivered by 9am", "on your first day"],
            ["Helmets & locks", "included with every bike"],
            ["Free date changes", "up to 24 hours before"],
            ["4.9 ★ average", "from 2,300+ campers"],
          ].map(([title, sub]) => (
            <div key={title}>
              <dt className="font-display text-lg font-semibold text-forest-900">{title}</dt>
              <dd className="text-sm text-stone">{sub}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">How it works</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-950 sm:text-4xl">
              From booking to bridleway in four easy steps
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-3xl bg-paper p-6 shadow-sm ring-1 ring-forest-900/5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 font-display text-lg font-semibold text-cream">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-forest-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fleet */}
      <section className="bg-forest-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">The fleet</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-950 sm:text-4xl">
                A bike for every rider in the tent
              </h2>
            </div>
            <Link href="/bikes" className="font-semibold text-forest-700 underline-offset-4 hover:underline">
              See the full fleet →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bikes.map((bike) => (
              <BikeCard key={bike.slug} bike={bike} href={`/bikes#${bike.slug}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Where we ride</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-950 sm:text-4xl">
                Partner campsites in the UK&apos;s best cycling country
              </h2>
            </div>
            <Link href="/locations" className="font-semibold text-forest-700 underline-offset-4 hover:underline">
              All {campsites.length} locations →
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/locations/${c.slug}`}
                  className="block h-full rounded-3xl border border-forest-900/10 bg-paper p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">{c.region}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-forest-950">{c.name}</h3>
                  <p className="text-sm text-stone">Near {c.town}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone">{c.description}</p>
                  <p className="mt-4 text-sm font-semibold text-brand">
                    {Object.values(c.fleet).reduce((a, b) => a + b, 0)} bikes on site →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {regions.map((r) => (
              <Link
                key={r}
                href={`/locations?q=${encodeURIComponent(r)}`}
                className="rounded-full border border-forest-900/15 bg-paper px-4 py-1.5 text-sm text-forest-800 hover:border-forest-600"
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-forest-900 py-20 text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Happy campers, happier legs</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["We fitted a week's kit for four into the car because the bikes didn't need to come. Bikes were waiting outside the tent at 8:30.", "The Okafor family, New Forest"],
              ["The e-bikes made the Dales climbs a joy instead of a sufferfest. Batteries swapped every morning without us lifting a finger.", "Sam & Priya, Yorkshire Dales"],
              ["Our kids still talk about the cargo bike ride to the beach. Brilliant service from start to finish.", "Hannah R., Norfolk Coast"],
            ].map(([quote, who]) => (
              <figure key={who} className="rounded-3xl bg-forest-800/60 p-7 ring-1 ring-white/10">
                <p aria-hidden="true" className="text-wheat">★★★★★</p>
                <blockquote className="mt-3 leading-relaxed text-cream/90">“{quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-wheat">{who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">FAQs</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-950 sm:text-4xl">
              Good questions
            </h2>
            <p className="mt-4 text-stone">
              Anything else? Email{" "}
              <a href="mailto:hello@pitchandpedal.co.uk" className="font-medium text-forest-700 underline">
                hello@pitchandpedal.co.uk
              </a>
              .
            </p>
          </div>
          <div className="divide-y divide-forest-900/10 rounded-3xl bg-paper px-6 shadow-sm ring-1 ring-forest-900/5">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-forest-950">
                  {f.q}
                  <span className="text-xl text-forest-600 transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-stone">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="scroll-mt-20 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-brand px-8 py-12 text-sand md:grid-cols-[1.5fr_1fr] md:px-14">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Run a campsite?</h2>
              <p className="mt-3 max-w-xl text-sand/90">
                Offer your guests bike hire with zero outlay. We supply, deliver, maintain and insure the fleet,
                and you earn commission on every booking.
              </p>
            </div>
            <div className="flex md:justify-end">
              <a
                href="mailto:partners@pitchandpedal.co.uk?subject=Partnering%20with%20Pitch%20%26%20Pedal"
                className="rounded-full bg-sand px-6 py-3 font-semibold text-forest-900 transition hover:bg-paper"
              >
                Become a partner site
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
