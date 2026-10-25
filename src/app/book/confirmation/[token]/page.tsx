import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBike, getCampsite } from "@/lib/data";
import { formatDate } from "@/lib/dates";
import { getReservationByToken } from "@/lib/reservations";

export const metadata: Metadata = {
  title: "Booking confirmed",
  robots: { index: false },
};

export default function ConfirmationPage({ params }: PageProps<"/book/confirmation/[token]">) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-forest-900/5" />}>
        <Confirmation params={params} />
      </Suspense>
    </div>
  );
}

async function Confirmation({ params }: Pick<PageProps<"/book/confirmation/[token]">, "params">) {
  const reservation = await getReservationByToken((await params).token);
  if (!reservation) notFound();
  const campsite = getCampsite(reservation.campsite)!;
  const bike = getBike(reservation.bike)!;

  return (
    <div className="rounded-3xl bg-paper p-8 text-center shadow-sm ring-1 ring-forest-900/5 sm:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-3xl text-forest-700">
        ✓
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-forest-950">You&apos;re booked in!</h1>
      <p className="mt-3 text-stone">
        Thanks {reservation.name.split(" ")[0]}. We&apos;ll text your mobile ending {reservation.phone.replace(/\D/g, "").slice(-3)} when your bikes are on the
        way. Keep your booking reference handy.
      </p>
      <p className="mt-6 inline-block rounded-full bg-sand px-4 py-1.5 font-mono text-sm font-semibold text-forest-900">
        Booking ref {reservation.ref}
      </p>
      <dl className="mt-8 space-y-3 border-t border-forest-900/10 pt-6 text-left text-sm">
        {[
          ["Bikes", `${reservation.quantity} × ${bike.name}`],
          ["Campsite", `${campsite.name}, ${campsite.town}`],
          ["Pitch", reservation.pitch],
          ["Delivered", `${formatDate(reservation.startDate)}, by 9am`],
          ["Collected", formatDate(reservation.endDate)],
          ["Total (pay on delivery)", `£${reservation.total}`],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-stone">{k}</dt>
            <dd className="text-right font-medium text-forest-900">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={`/locations/${campsite.slug}`}
          className="rounded-full bg-forest-900 px-6 py-3 font-semibold text-sand hover:bg-forest-700"
        >
          Add more bikes
        </Link>
        <Link href="/" className="rounded-full border border-forest-900/15 px-6 py-3 font-semibold text-forest-900 hover:border-forest-600">
          Back home
        </Link>
      </div>
    </div>
  );
}
