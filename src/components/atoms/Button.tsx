import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-heritage-500 text-white hover:bg-heritage-700 focus-visible:outline-heritage-700",
  secondary:
    "bg-transparent text-heritage-700 border border-heritage-500 hover:bg-heritage-50 focus-visible:outline-heritage-700",
  ghost:
    "bg-transparent text-ink-900 hover:bg-sand-100 focus-visible:outline-ink-900",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 " +
  "text-sm font-semibold font-body transition-colors duration-150 " +
  "min-h-[44px] min-w-[44px] " + // WCAG 2.5.5 touch target size
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

/**
 * Atom: Button
 *
 * Usage: the single interactive call-to-action element across the site
 * (primary actions, links styled as buttons, form submits). Renders a
 * <Link> when given an `href`, otherwise a native <button>, so keyboard
 * and screen-reader semantics stay correct in both cases.
 */
export default function Button(props: ButtonProps) {
  const { children, variant = "primary", className } = props;
  const classes = clsx(baseStyles, variantStyles[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
