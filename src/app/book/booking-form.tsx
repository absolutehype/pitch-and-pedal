"use client";

import { useActionState, useState } from "react";
import { reserve, type BookingState } from "./actions";

type Props = {
  campsite: string;
  bike: string;
  from: string;
  to: string;
  days: number;
  pricePerDay: number;
  maxQuantity: number;
};

export function BookingForm({ campsite, bike, from, to, days, pricePerDay, maxQuantity }: Props) {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(reserve, {});
  const [quantity, setQuantity] = useState(1);
  const errors = state.fieldErrors ?? {};
  const v = state.values;
  const total = quantity * days * pricePerDay;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="campsite" value={campsite} />
      <input type="hidden" name="bike" value={bike} />
      <input type="hidden" name="from" value={from} />
      <input type="hidden" name="to" value={to} />

      {(state.error || errors.dates) && (
        <p role="alert" className="rounded-2xl bg-alert/10 px-4 py-3 text-sm font-medium text-alert">
          {state.error ?? errors.dates}
        </p>
      )}

      <Field label="Number of bikes" error={errors.quantity}>
        <select
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className={inputClass}
        >
          {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input name="name" defaultValue={v?.name} autoComplete="name" required className={inputClass} />
        </Field>
        <Field label="Pitch number" error={errors.pitch} hint="Where should we deliver?">
          <input name="pitch" defaultValue={v?.pitch} placeholder="e.g. 14 or TBC" required className={inputClass} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input name="email" defaultValue={v?.email} type="email" autoComplete="email" required className={inputClass} />
        </Field>
        <Field label="Mobile" error={errors.phone} hint="We'll text when we're on our way.">
          <input name="phone" defaultValue={v?.phone} type="tel" autoComplete="tel" required className={inputClass} />
        </Field>
      </div>

      <Field label="Rider heights & anything else (optional)">
        <textarea
          name="notes"
          defaultValue={v?.notes}
          rows={3}
          maxLength={500}
          placeholder="e.g. Riders 5'4&quot; and 6'1&quot;, child seat please"
          className={inputClass}
        />
      </Field>

      <div className="flex flex-col gap-4 border-t border-forest-900/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-stone">
          Total{" "}
          <span className="font-display text-3xl font-semibold text-forest-950" aria-live="polite">
            £{total}
          </span>
          <span className="block text-sm">
            {quantity} × £{pricePerDay} × {days} day{days === 1 ? "" : "s"} · pay on delivery
          </span>
        </p>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand px-8 py-3.5 font-semibold text-sand shadow-sm transition hover:bg-brand-dark disabled:opacity-60"
        >
          {pending ? "Reserving…" : "Reserve bikes"}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-forest-900/15 bg-cream px-4 py-2.5 text-base text-ink outline-none focus:border-forest-600 focus:ring-4 focus:ring-forest-600/15";

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-forest-900">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-sm text-alert">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-stone">{hint}</span>
      ) : null}
    </label>
  );
}
