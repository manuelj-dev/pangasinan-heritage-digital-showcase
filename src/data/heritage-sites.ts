export type HeritageSite = {
  slug: string;
  name: string;
  town: string;
  category: "Natural Wonder" | "Landmark" | "Hot Spring" | "Beach";
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
};

// In a real deployment this could come from a headless CMS or local
// markdown/JSON content files — SSG only needs it available at build time.
export const heritageSites: HeritageSite[] = [
  {
    slug: "hundred-islands",
    name: "Hundred Islands National Park",
    town: "Alaminos",
    category: "Natural Wonder",
    tagline: "124 limestone islands scattered across Lingayen Gulf.",
    description:
      "A national park of small limestone islands, many accessible by island-hopping boat tours. Governor Island and Quezon Island have swimming coves, view decks, and zip lines, while smaller islets are protected marine sanctuaries.",
    image: "/images/hundred-islands.jpg",
    imageAlt:
      "Aerial view of small limestone islands surrounded by turquoise water at Hundred Islands National Park",
  },
  {
    slug: "bolinao-lighthouse",
    name: "Cape Bolinao Lighthouse",
    town: "Bolinao",
    category: "Landmark",
    tagline: "A 19th-century Spanish-era lighthouse above the coast.",
    description:
      "One of the tallest lighthouses in the Philippines, built in 1905 on Punta Piedra Point. The hilltop site offers panoramic views of the South China Sea and is a short trip from Patar White Beach.",
    image: "/images/bolinao-lighthouse.jpg",
    imageAlt: "Cape Bolinao Lighthouse standing on a coastal hill overlooking the sea",
  },
  {
    slug: "balungao-hot-spring",
    name: "Balungao Hot Spring Mountain Resort",
    town: "Balungao",
    category: "Hot Spring",
    tagline: "Mineral hot spring pools at the base of Mt. Balungao.",
    description:
      "A family resort built around natural hot spring water channeled into a series of pools, set against the forested slopes of Mt. Balungao. A popular day-trip destination for swimming and picnics.",
    image: "/images/balungao-hot-spring.webp",
    imageAlt: "Terraced hot spring pools surrounded by trees at the base of Mt. Balungao",
  },
  {
    slug: "patar-white-beach",
    name: "Patar White Beach",
    town: "Bolinao",
    category: "Beach",
    tagline: "A long stretch of pale sand facing the West Philippine Sea.",
    description:
      "A wide, gently sloping beach just a few minutes from Cape Bolinao Lighthouse, known for calm shallow waters, fine sand, and some of the best sunset views in the province. Popular for swimming, beach camping, and watching the sun set directly into the sea.",
    image: "/images/patar-white-beach.jpg",
    imageAlt: "Wide white sand beach with gentle waves at sunset in Patar, Bolinao",
  },
  {
    slug: "manleluag-spring",
    name: "Manleluag Spring Protected Landscape",
    town: "Mangatarem",
    category: "Hot Spring",
    tagline: "A protected forest reserve with a cold mineral spring and river pools.",
    description:
      "A DENR-protected landscape at the foot of the Cordillera foothills, centered on a cold mineral spring that feeds a series of natural swimming pools. The surrounding forest reserve is also home to a small deer-breeding area, making it a quieter, nature-focused alternative to the province's beach destinations.",
    image: "/images/manleluag-spring.jpg",
    imageAlt: "Natural river pools surrounded by forest at Manleluag Spring Protected Landscape",
  },
];

export function getSiteBySlug(slug: string) {
  return heritageSites.find((site) => site.slug === slug);
}
