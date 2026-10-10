import Image from "@/components/atoms/Image";
import { Heading, Text } from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";
import Reveal from "@/components/atoms/Reveal";
import type { HeritageSite } from "@/data/heritage-sites";
import Link from "next/link";

type HeritageCardProps = {
  site: HeritageSite;
  priority?: boolean;
  /** Position in the grid, used to stagger the entrance animation */
  index?: number;
};

export default function HeritageCard({ site, priority = false, index = 0 }: HeritageCardProps) {
  return (
    <Reveal as="li" delay={(index % 3) * 100} className="list-none">
      <Link
        href={`/sites/${site.slug}`}
        className="group block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-heritage-700"
      >
        <article className="h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={site.image}
              alt={site.imageAlt}
              fill
              priority={priority}
              rounded={false}
              className="transition-transform duration-500 ease-out group-hover:scale-105"
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
    </Reveal>
  );
}