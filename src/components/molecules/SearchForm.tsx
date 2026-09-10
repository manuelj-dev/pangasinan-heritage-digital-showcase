"use client";

import { useId } from "react";
import Icon from "@/components/atoms/Icon";

type SearchFormProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
};

/**
 * Molecule: SearchForm
 *
 * Usage: sits at the top of the Heritage Grid page/section so visitors
 * can filter sites by name or town without a full page reload. It is a
 * "use client" component (the only interactive piece on an otherwise
 * fully static page) so the rest of the route can stay server-rendered
 * at build time.
 *
 * Responsive logic:
 * - Full-width on mobile so the touch target is easy to hit.
 * - Caps at max-w-md on tablet/desktop so it doesn't stretch awkwardly
 *   across a wide row when placed next to a heading.
 * - The result count is announced via aria-live so screen-reader users
 *   get feedback without needing to re-scan the grid.
 */
export default function SearchForm({ value, onChange, resultCount }: SearchFormProps) {
  const inputId = useId();
  const statusId = useId();

  return (
    <div className="w-full max-w-md">
      <label htmlFor={inputId} className="mb-1 block text-sm font-semibold text-ink-900">
        Search heritage sites
      </label>
      <div className="relative">
        <Icon
          name="search"
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-800/50"
        />
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Try “Hundred Islands” or “Bolinao”"
          aria-describedby={statusId}
          className="min-h-[44px] w-full rounded-full border border-ink-900/15 bg-white py-2.5 pl-10 pr-4 text-base text-ink-900 placeholder:text-ink-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage-700"
        />
      </div>
      <p id={statusId} role="status" aria-live="polite" className="mt-2 text-sm text-ink-800/70">
        {resultCount} {resultCount === 1 ? "site" : "sites"} found
      </p>
    </div>
  );
}
