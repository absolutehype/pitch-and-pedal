# Pitch & Pedal

Marketing site and booking flow for Pitch & Pedal, a bike hire company that delivers bikes to campsites around the UK.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's here

- `/` home page: hero, how it works, fleet, locations, FAQs and a campsite partner call to action
- `/locations` finds partner campsites near a postcode, town or region (via [postcodes.io](https://postcodes.io)) or the visitor's location, with a filter by bike
- `/locations/[slug]` shows a campsite's trails and live bike availability for chosen dates
- `/book` takes a reservation; `/book/confirmation/[ref]` confirms it
- `/bikes` lists the fleet

Campsites, bikes and fleet sizes live in `src/lib/data.ts`.

## Reservations

Bookings are stored in `.data/reservations.json` by `src/lib/reservations.ts`. That is fine for local demos only: swap the module for a real database before taking live bookings, since Vercel's filesystem is ephemeral. There is no payment or email sending yet; the confirmation page says payment is taken on delivery.

## Brand

Logo files are in `public/brand/`:

- `logo.svg`: full badge, cream on green
- `logo-badge.svg`: transparent badge, green artwork
- `icon.svg`: badge without lettering (also used as the favicon)

All lettering is converted to outlines (from Alfa Slab One), so the files don't depend on any installed font. In the site the badge is rendered by `src/components/logo.tsx`. Brand colours are forest green `#2d5b3d` and cream `#f0e7cc`, defined in `src/app/globals.css`.
