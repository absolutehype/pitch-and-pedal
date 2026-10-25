import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">404</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-forest-950">Off the beaten track</h1>
      <p className="mt-3 text-stone">We couldn&apos;t find that page. Let&apos;s get you back on the trail.</p>
      <Link
        href="/locations"
        className="mt-8 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-sand hover:bg-brand-dark"
      >
        Find bikes near you
      </Link>
    </div>
  );
}
