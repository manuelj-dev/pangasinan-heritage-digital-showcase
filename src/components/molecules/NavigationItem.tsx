"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavigationItemProps = {
  href: string;
  label: string;
  /** Called after navigation, used by HeaderNavigation to close the
   *  mobile menu on selection. */
  onNavigate?: () => void;
  /** Explicit active-state override (e.g. from scrollspy). Falls back
   *  to a plain route match against the current pathname when omitted. */
  active?: boolean;
  /** "solid" paints its own pill background when active (used in the
   *  stacked mobile menu). "text" only changes text color, leaving the
   *  background to an external sliding highlight (used in the desktop
   *  row, see HeaderNavigation). */
  variant?: "solid" | "text";
};

/**
 * Molecule: NavigationItem
 *
 * Usage: one entry in the Header Navigation organism (desktop bar or
 * mobile drawer). Not used standalone elsewhere — it depends on route
 * context (usePathname) to show the current-page state, unless an
 * explicit `active` prop is passed in (scrollspy on the homepage).
 *
 * Responsive logic:
 * - Renders identically on all breakpoints; HeaderNavigation is what
 *   changes layout (row vs. stacked drawer). This keeps the item's own
 *   logic (active-state detection) independent of screen size.
 */
export default function NavigationItem({
  href,
  label,
  onNavigate,
  active,
  variant = "solid",
}: NavigationItemProps) {
  const pathname = usePathname();
  const isActive = active ?? pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "relative z-10 block min-h-[44px] rounded-full px-4 py-2 text-base font-semibold font-body",
        "transition-colors duration-300 ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage-700",
        variant === "solid"
          ? isActive
            ? "bg-heritage-500 text-white"
            : "text-ink-900 hover:bg-sand-100"
          : isActive
            ? "text-white"
            : "text-ink-900 hover:bg-sand-100/70"
      )}
    >
      {label}
    </Link>
  );
}
