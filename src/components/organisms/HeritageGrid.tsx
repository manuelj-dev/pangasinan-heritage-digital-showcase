"use client";

import { useMemo, useState } from "react";
import SearchForm from "@/components/molecules/SearchForm";
import HeritageCard from "@/components/molecules/HeritageCard";
import { Text } from "@/components/atoms/Typography";
import type { HeritageSite } from "@/data/heritage-sites";

type HeritageGridProps = {
  sites: HeritageSite[];
};

/**
 * Organism: HeritageGrid
 *
 * Usage: the main content of the homepage — combines the SearchForm
 * molecule with a grid of HeritageCard molecules. This is the one place
 * in the app that owns filter state; it's a client component so the
 * search can be instant, but the underlying `sites` prop is generated
 * at build time (SSG), so no data fetching happens in the browser.
 *
 * Responsive logic:
 * - 1 column under 640px (mobile), 2 columns from 640px (tablet),
 *   3 columns from 1024px (desktop) — grid-cols-1 sm:grid-cols-2
 *   lg:grid-cols-3.
 * - Card internals don't change per breakpoint (see HeritageCard); only
 *   the column count here does, keeping the responsive logic in one
 *   place instead of duplicated per card.
 */
export default function HeritageGrid({ sites }: HeritageGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sites;
    return sites.filter(
      (site) =>
        site.name.toLowerCase().includes(q) ||
        site.town.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q)
    );
  }, [sites, query]);

  return (
    <section
      id="heritage-sites"
      aria-labelledby="heritage-sites-heading"
      className="scroll-mt-20 space-y-6"
    >
      <SearchForm value={query} onChange={setQuery} resultCount={filtered.length} />

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((site, index) => (
            <HeritageCard key={site.slug} site={site} priority={index === 0} index={index} />
          ))}
        </ul>
      ) : (
        <Text muted>No sites match “{query}”. Try a different town or name.</Text>
      )}
    </section>
  );
}
