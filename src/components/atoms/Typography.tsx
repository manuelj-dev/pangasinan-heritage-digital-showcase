import { ElementType, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
};

const headingSizes: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-5xl leading-tight",
  2: "text-3xl md:text-4xl leading-tight",
  3: "text-2xl md:text-3xl leading-snug",
  4: "text-xl md:text-2xl leading-snug",
};

/**
 * Atom: Heading
 *
 * Usage: any page or section title. Pass `level` for the *semantic*
 * heading rank (1 document title, one 2 per major section, etc.) — this
 * is kept independent of visual size so hierarchy stays correct for
 * screen readers even when the design calls for a smaller-looking h2.
 */
export function Heading({ level, children, className, ...rest }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      className={clsx(
        "font-display font-semibold text-ink-900",
        headingSizes[level],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  muted?: boolean;
  size?: "sm" | "base" | "lg";
  className?: string;
};

const textSizes = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

/**
 * Atom: Text
 *
 * Usage: body copy, captions, and descriptions. `muted` lowers contrast
 * for secondary text (still tuned to stay above the 4.5:1 WCAG AA
 * minimum against the sand background).
 */
export function Text({ children, muted, size = "base", className, ...rest }: TextProps) {
  return (
    <p
      className={clsx(
        "font-body",
        textSizes[size],
        muted ? "text-ink-800/70" : "text-ink-800",
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
