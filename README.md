# Pangasinan Heritage Digital Showcase

**Student Name:** Jayvee Serra Manuel
**Selected Framework:** React / Next.js 14 (App Router) — see `report/Framework-Selection-Report.pdf`

**Live Website:** https://manuelj-dev.github.io/pangasinan-heritage-digital-showcase/

A Static-Site-Generated (SSG) digital showcase for the Pangasinan Provincial Tourism
Office, covering Hundred Islands (Alaminos), Cape Bolinao Lighthouse (Bolinao), and
Balungao Hot Spring — built mobile-first, accessible (WCAG 2.1 AA), and deployable
as a static site to GitHub Pages.

## Requirements checklist

| Requirement | How it's met |
|---|---|
| Lightning Fast | `output: 'export'` static HTML/CSS/JS, no client JS framework runtime beyond React hydration, self-hosted fonts (no external font requests), unoptimized-but-local SVG illustrations (a few KB each) |
| Mobile-First | Tailwind mobile-first breakpoints throughout (`base → sm → lg`), 44px minimum touch targets |
| Maintainable | Atomic Design component library (`atoms/ → molecules/ → organisms/`), single source of truth for content (`src/data/heritage-sites.ts`) and color tokens |
| Accessible | Semantic HTML, skip link, visible focus rings, `aria-live` search status, required `alt` text at the type level, reduced-motion support — see Deliverable 2.3 results below |
| Deployable | `output: 'export'` + GitHub Actions workflow (`.github/workflows/deploy.yml`) publishes `/out` to GitHub Pages on every push to `main` |

## Project structure (Atomic Design)

```
src/
├── app/                    # Next.js App Router routes (SSG pages)
│   ├── page.tsx            #  / — single scrollable homepage: Hero → About → Heritage Sites
│   └── sites/[slug]/       #  /sites/<slug> — one static page per site (generateStaticParams)
├── components/
│   ├── atoms/               Button, Typography, Icon, Image, ColorTokens
│   ├── molecules/            HeritageCard, SearchForm, NavigationItem
│   └── organisms/            HeritageGrid, HeaderNavigation
└── data/
    └── heritage-sites.ts     Content for all 5 heritage sites (build-time data)
```

The homepage is one scrollable page with three sections (`#hero`, `#about`,
`#heritage-sites`); the header nav links smooth-scroll to each. Every site card
still links out to its own static detail page under `/sites/<slug>`.

**Heritage sites included:** Hundred Islands National Park (Alaminos), Cape
Bolinao Lighthouse (Bolinao), Balungao Hot Spring Mountain Resort (Balungao),
Patar White Beach (Bolinao), and Manleluag Spring Protected Landscape
(Mangatarem). Add more by editing `src/data/heritage-sites.ts` — no component
changes needed.

Full usage notes, responsive logic, and code references for every component are in
`documentation/Atomic-Design-System-Manual.pdf`.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Building the static site (SSG)

```bash
npm run build       # writes fully static HTML/CSS/JS to /out
npx serve out        # preview the production build locally
```

## Deploying to GitHub Pages

**Option A — GitHub Actions (recommended, already set up)**

1. Push this repository to GitHub as a **public** repo.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab). The
   included workflow (`.github/workflows/deploy.yml`) builds the project with
   `GITHUB_PAGES_REPO` set automatically to `/<your-repo-name>` and publishes `/out`.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

**Option B — manual build + `gh-pages` branch**

```bash
GITHUB_PAGES_REPO=/<repo-name> npm run build
npx gh-pages -d out
```

Then enable Pages on the `gh-pages` branch under **Settings → Pages**.

## Deliverable 2.3 — Lighthouse audit

Run Lighthouse against your **deployed GitHub Pages URL** (not localhost) in Chrome
DevTools → **Lighthouse** tab → check Performance, Accessibility, Best Practices,
SEO → **Analyze page load**, then save/screenshot the results for submission.

As a build-time sanity check, a local Lighthouse run against the production
export (`npm run build && npx serve out`) scored:

| Category | Local score | Target |
|---|---|---|
| Performance | 87 | ≥ 80 |
| Accessibility | 100 | ≥ 85 |
| Best Practices | 100 | ≥ 85 |
| SEO | 100 | ≥ 90 |

Real-world scores on the live GitHub Pages URL may differ slightly (network
conditions, CDN, throttling) — re-run Lighthouse there before submitting.
