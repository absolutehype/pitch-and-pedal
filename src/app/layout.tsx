import type { Metadata } from "next";
import { Alfa_Slab_One, Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Alfa_Slab_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pitch & Pedal — Bike hire delivered to your campsite",
    template: "%s · Pitch & Pedal",
  },
  description:
    "Pitch & Pedal delivers quality bikes, e-bikes and kids' bikes straight to your pitch at campsites across the UK. Browse bikes near you and book in minutes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
