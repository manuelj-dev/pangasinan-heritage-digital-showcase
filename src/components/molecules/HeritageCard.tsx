import Image from "@/components/atoms/Image";
import { Heading, Text } from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";
import type { HeritageSite } from "@/data/heritage-sites";
import Link from "next/link";

type HeritageCardProps = {
  site: HeritageSite;
  /** priority hints the browser to fetch this image eagerly — pass true
   *  only for cards visible above the fold (e.g. the first card in the
   *  grid) to protect the Lightning Fast / LCP requirement. */
  priority?: boolean;
};

/**
 * Molecule: HeritageCard
 *
 * Usage: the Heritage Card is used exclusively for displaying tourist
 * site previews in the responsive Heritage Grid (and anywhere else a
 * compact site preview + link to detail page is needed).
 *
 * Responsive logic:
 * - Sizing is entirely controlled by the parent grid (HeritageGrid);
 *   the card itself is fluid (w-full) so it never overflows its column.
 * - The image keeps a fixed 4:3 aspect ratio at every width so the grid
 *   never jumps as images at different natural sizes finish loading.
 * - On narrow (mobile) columns the card stacks image-over-text, which
 *   is also true at tablet/desktop widths — only the *column count* of
 *   the parent grid changes, not the card's internal layout.
 */
export default function HeritageCard({ site, priority = false }: HeritageCardProps) {
  return (
    <li className="list-none">
      <Link
        href={`/sites/${site.slug}`}
        className="group block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-heritage-700"
      >
        <article className="h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-150 group-hover:shadow-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={site.image}
              alt={site.imageAlt}
              fill
              priority={priority}
              rounded={false}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-heritage-700 font-body">
              {site.category}
            </span>
          </div>
          <div className="space-y-2 p-4">
            <div className="flex items-center gap-1 text-xs text-ink-800/70">
              <Icon name="map-pin" size={14} />
              <span>{site.town}, Pangasinan</span>
            </div>
            <Heading level={3} className="!text-lg md:!text-xl">
              {site.name}
            </Heading>
            <Text muted size="sm">
              {site.tagline}
            </Text>
          </div>
        </article>
      </Link>
    </li>
  );
}
