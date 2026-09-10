import { SVGAttributes } from "react";

const paths = {
  "map-pin":
    "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  search: "M15.5 15.5 21 21M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGAttributes<SVGSVGElement> & {
  name: IconName;
  size?: number;
  /** Visible label for icon-only buttons/links. Omit when the icon is
   *  purely decorative next to visible text (it is then hidden from AT). */
  title?: string;
};

/**
 * Atom: Icon
 *
 * Usage: small inline glyphs inside buttons, form fields, and nav items
 * (search, map pin, menu/close). Decorative by default (aria-hidden);
 * pass `title` when the icon is the only content conveying meaning, e.g.
 * an icon-only close button, so screen readers announce it.
 */
export default function Icon({ name, size = 20, title, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title && <title>{title}</title>}
      <path d={paths[name]} />
    </svg>
  );
}
