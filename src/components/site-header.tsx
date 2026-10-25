import Link from "next/link";
import { Logo } from "./logo";

const nav = [
  { href: "/locations", label: "Find bikes" },
  { href: "/bikes", label: "Our fleet" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#partners", label: "For campsites" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Pitch & Pedal home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium text-forest-900 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/locations"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-sand shadow-sm transition hover:bg-brand-dark"
        >
          Book a bike
        </Link>
      </div>
      <nav
        aria-label="Main mobile"
        className="flex gap-5 overflow-x-auto border-t border-forest-900/10 px-4 py-2 text-sm font-medium text-forest-900 md:hidden"
      >
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
