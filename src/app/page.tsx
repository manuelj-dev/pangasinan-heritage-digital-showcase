import { Heading, Text } from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import HeritageGrid from "@/components/organisms/HeritageGrid";
import { heritageSites } from "@/data/heritage-sites";

const stats = [
  { label: "Heritage sites featured", value: `${heritageSites.length}` },
  { label: "Coastal & inland towns", value: "5" },
  { label: "Province", value: "Pangasinan" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section id="hero" className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:px-6 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold text-heritage-600">
            Pangasinan Provincial Tourism Office
          </p>
          <Heading level={1} className="mt-2">
            Pangasinan Heritage Digital Showcase
          </Heading>
          <Text size="lg" muted className="mt-4">
            A guide to the province&apos;s most iconic sites — built to load fast on
            any connection, work well on a phone, and stay easy to update.
          </Text>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="#heritage-sites">Explore heritage sites</Button>
            <Button href="#about" variant="secondary">
              About the province
            </Button>
          </div>
        </div>

        <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl font-semibold text-heritage-700 md:text-3xl">
                {stat.value}
              </dd>
              <dd className="mt-1 text-xs text-ink-800/70 md:text-sm">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.1fr_1fr] md:gap-12 md:px-6 md:py-20">
          <div>
            <p className="font-body text-sm font-semibold text-heritage-600">About</p>
            <Heading level={2} id="about-heading" className="mt-2">
              A province shaped by coastline and hills
            </Heading>
            <Text size="lg" className="mt-4">
              Pangasinan sits along Lingayen Gulf on the western coast of Luzon —
              its name comes from &ldquo;asin,&rdquo; salt, after centuries of
              salt-making along its shores. From limestone islands to a Spanish-era
              lighthouse to inland mineral springs, the province&apos;s heritage
              sites trace both its coastal and highland communities.
            </Text>
            <Text muted className="mt-4">
              This showcase is a starting point, not a complete directory — each
              entry links out to a fuller description, and the list will grow as
              more sites are documented.
            </Text>
          </div>

          <ul className="space-y-4">
            <li className="flex gap-3 rounded-2xl bg-sand-50 p-4">
              <Icon name="map-pin" className="mt-1 shrink-0 text-heritage-600" />
              <div>
                <p className="font-semibold text-ink-900">5 towns represented</p>
                <Text muted size="sm">
                  Alaminos, Bolinao, Balungao, and Mangatarem, spanning coast to
                  foothills.
                </Text>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl bg-sand-50 p-4">
              <Icon name="map-pin" className="mt-1 shrink-0 text-heritage-600" />
              <div>
                <p className="font-semibold text-ink-900">Natural &amp; built heritage</p>
                <Text muted size="sm">
                  National parks, a working lighthouse, beaches, and protected
                  spring landscapes.
                </Text>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Heritage sites */}
      <section className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-6">
            <p className="font-body text-sm font-semibold text-heritage-600">Directory</p>
            <Heading level={2} id="heritage-sites-heading" className="mt-2">
              Featured heritage sites
            </Heading>
          </div>
          <HeritageGrid sites={heritageSites} />
        </div>
      </section>
    </div>
  );
}
