import Link from "next/link";
import { bikeTypeLabels, type Bike } from "@/lib/data";
import { BikeArt } from "./bike-art";

export function BikeCard({
  bike,
  href,
  footer,
}: {
  bike: Bike;
  href?: string;
  footer?: React.ReactNode;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-forest-900/10 bg-paper shadow-sm transition hover:shadow-md">
      <div className="relative bg-sand/60 px-6 pt-6">
        <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-forest-800">
          {bikeTypeLabels[bike.type]}
        </span>
        <BikeArt bike={bike} className="mx-auto h-40 w-full transition group-hover:-translate-y-1" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-forest-950">
            {href ? (
              <Link href={href} className="hover:text-brand">
                {bike.name}
              </Link>
            ) : (
              bike.name
            )}
          </h3>
          <p className="shrink-0 text-sm text-stone">
            <span className="text-lg font-semibold text-forest-900">£{bike.pricePerDay}</span>/day
          </p>
        </div>
        <p className="text-sm leading-relaxed text-stone">{bike.tagline}</p>
        {footer && <div className="mt-auto pt-2">{footer}</div>}
      </div>
    </article>
  );
}
