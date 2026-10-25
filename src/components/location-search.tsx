"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LocationSearch({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  const router = useRouter();
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError("Your browser can't share its location. Try a postcode instead.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        router.push(`/locations?lat=${latitude.toFixed(4)}&lng=${longitude.toFixed(4)}`);
      },
      () => {
        setLocating(false);
        setError("We couldn't get your location. Try a postcode or town instead.");
      },
      { timeout: 10000 },
    );
  }

  return (
    <div className="w-full">
      <form action="/locations" className={`flex w-full flex-col gap-2 sm:flex-row ${compact ? "" : "sm:gap-3"}`}>
        <label htmlFor="location-q" className="sr-only">
          Postcode, town or region
        </label>
        <input
          id="location-q"
          name="q"
          defaultValue={defaultValue}
          placeholder="Postcode, town or region, e.g. Keswick"
          autoComplete="postal-code"
          className="min-w-0 flex-1 rounded-full border border-forest-900/15 bg-paper px-5 py-3 text-base text-ink shadow-sm outline-none placeholder:text-stone/70 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/15"
        />
        <button
          type="submit"
          className="rounded-full bg-brand px-6 py-3 font-semibold text-sand shadow-sm transition hover:bg-brand-dark"
        >
          Find bikes
        </button>
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          className="inline-flex items-center gap-1.5 font-medium text-forest-700 underline-offset-4 hover:underline disabled:opacity-60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <circle cx="12" cy="12" r="7" />
          </svg>
          {locating ? "Finding you…" : "Use my location"}
        </button>
        {error && (
          <p role="alert" className="text-alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
