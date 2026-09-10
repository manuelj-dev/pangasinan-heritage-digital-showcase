"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavigationItem from "@/components/molecules/NavigationItem";
import Icon from "@/components/atoms/Icon";

const links = [
  { id: "hero", href: "/", label: "Home" },
  { id: "about", href: "/#about", label: "About" },
  { id: "heritage-sites", href: "/#heritage-sites", label: "Heritage Sites" },
];

/**
 * Organism: HeaderNavigation
 *
 * Usage: appears once, at the top of every page (in the root layout).
 * Combines NavigationItem molecules with the Icon atom for the mobile
 * menu toggle. On the homepage, an IntersectionObserver ("scrollspy")
 * tracks which section (#hero / #about / #heritage-sites) is currently
 * in view and highlights the matching nav item automatically as the
 * visitor scrolls — clicking a link still jump-scrolls there too.
 *
 * Responsive logic:
 * - Desktop/tablet (≥768px, md:): all NavigationItems render inline in
 *   a row behind one shared sliding pill (a single absolutely
 *   positioned <span> whose left/width animate to the active item's
 *   position), which is what makes the highlight glide between items
 *   instead of jumping.
 * - Mobile (<768px): links collapse behind a hamburger button
 *   (44x44px touch target) that toggles a full-width dropdown panel;
 *   each item paints its own active pill there (a shared sliding
 *   highlight doesn't make sense in a stacked list). Content adapts by
 *   *disclosure*, not by shrinking text or wrapping links.
 * - The panel uses aria-expanded / aria-controls on the button and is
 *   removed from the DOM (not just hidden) when closed, so it can't be
 *   tabbed into accidentally; it fades/slides in on open (reduced
 *   motion is respected globally via globals.css).
 */
export default function HeaderNavigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const activeIndex = isHome ? links.findIndex((link) => link.id === activeId) : -1;

  // Scrollspy: watch each section and mark the one currently centered
  // in the viewport as active. Only meaningful on the homepage, where
  // the sections actually exist.
  useEffect(() => {
    if (!isHome) return;

    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveId(mostVisible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Measure the active desktop nav item and slide the highlight pill
  // to sit behind it, re-measuring on activeIndex change and resize.
  useEffect(() => {
    function measure() {
      if (activeIndex < 0) {
        setPillStyle(null);
        return;
      }
      const el = itemRefs.current[activeIndex];
      if (el) setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-sand-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="font-display text-lg font-semibold text-heritage-700">
          Pangasinan Heritage
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="relative flex items-center gap-1">
            {pillStyle && (
              <span
                aria-hidden="true"
                className="absolute top-0 h-full rounded-full bg-heritage-500 transition-[left,width] duration-300 ease-out"
                style={{ left: pillStyle.left, width: pillStyle.width }}
              />
            )}
            {links.map((link, index) => (
              <li
                key={link.href}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                <NavigationItem
                  href={link.href}
                  label={link.label}
                  variant="text"
                  active={isHome ? activeId === link.id : undefined}
                />
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 hover:bg-sand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage-700 md:hidden"
        >
          <Icon name={open ? "close" : "menu"} title={open ? "Close menu" : "Open menu"} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav-panel"
          aria-label="Primary"
          className="animate-fade-slide-down border-t border-black/5 md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <li key={link.href}>
                <NavigationItem
                  href={link.href}
                  label={link.label}
                  onNavigate={() => setOpen(false)}
                  active={isHome ? activeId === link.id : undefined}
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
