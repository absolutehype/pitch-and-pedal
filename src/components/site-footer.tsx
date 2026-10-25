import Link from "next/link";
import { regions } from "@/lib/data";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-forest-950 text-forest-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-sm text-sm leading-relaxed text-forest-100/75">
            Quality bikes delivered to your pitch, set up and ready to ride. Collected when you&apos;re done. No
            car racks, no faff.
          </p>
          <p className="text-sm text-forest-100/75">
            <a href="mailto:hello@pitchandpedal.co.uk" className="underline-offset-4 hover:underline">
              hello@pitchandpedal.co.uk
            </a>
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-sand">Ride with us</h2>
          <ul className="space-y-2 text-sm text-forest-100/75">
            <li><Link href="/locations" className="hover:text-paper">Find bikes near you</Link></li>
            <li><Link href="/bikes" className="hover:text-paper">Our fleet</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-paper">How it works</Link></li>
            <li><Link href="/#faq" className="hover:text-paper">FAQs</Link></li>
            <li><Link href="/#partners" className="hover:text-paper">Partner with us</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-sand">Where we ride</h2>
          <ul className="space-y-2 text-sm text-forest-100/75">
            {regions.slice(0, 8).map((r) => (
              <li key={r}>
                <Link href={`/locations?q=${encodeURIComponent(r)}`} className="hover:text-paper">
                  {r}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-forest-100/60 sm:px-6">
          © Pitch &amp; Pedal Ltd. Helmets and locks included with every hire.
        </p>
      </div>
    </footer>
  );
}
