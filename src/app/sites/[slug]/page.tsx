import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "@/components/atoms/Image";
import { Heading, Text } from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { heritageSites, getSiteBySlug } from "@/data/heritage-sites";

type PageProps = {
  params: { slug: string };
};

// Static Site Generation: every site detail page is pre-rendered at
// build time from this list — no server or database lookup at request time.
export function generateStaticParams() {
  return heritageSites.map((site) => ({ slug: site.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const site = getSiteBySlug(params.slug);
  if (!site) return {};
  return {
    title: site.name,
    description: site.tagline,
  };
}

export default function SiteDetailPage({ params }: PageProps) {
  const site = getSiteBySlug(params.slug);
  if (!site) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <Button href="/" variant="ghost" className="!px-3">
        &larr; Back to all sites
      </Button>

      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image src={site.image} alt={site.imageAlt} fill priority rounded={false} />
      </div>

      <div className="mt-6 flex items-center gap-1 text-sm text-ink-800/70">
        <Icon name="map-pin" size={16} />
        <span>
          {site.town}, Pangasinan &middot; {site.category}
        </span>
      </div>

      <Heading level={1} className="mt-2">
        {site.name}
      </Heading>

      <Text size="lg" className="mt-4">
        {site.description}
      </Text>
    </div>
  );
}
