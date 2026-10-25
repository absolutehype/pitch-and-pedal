/** GET form that reloads the current page with new from/to dates. */
export function DateRangeForm({
  action,
  start,
  end,
  min,
  hidden = {},
}: {
  action: string;
  start: string;
  end: string;
  min: string;
  hidden?: Record<string, string>;
}) {
  return (
    <form action={action} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-forest-900">
        Delivery date
        <input
          type="date"
          name="from"
          defaultValue={start}
          min={min}
          required
          className="rounded-xl border border-forest-900/15 bg-cream px-4 py-2.5 text-base text-ink outline-none focus:border-forest-600 focus:ring-4 focus:ring-forest-600/15"
        />
      </label>
      <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-forest-900">
        Collection date
        <input
          type="date"
          name="to"
          defaultValue={end}
          min={min}
          required
          className="rounded-xl border border-forest-900/15 bg-cream px-4 py-2.5 text-base text-ink outline-none focus:border-forest-600 focus:ring-4 focus:ring-forest-600/15"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-forest-900 px-6 py-3 font-semibold text-sand transition hover:bg-forest-700"
      >
        Update dates
      </button>
    </form>
  );
}
