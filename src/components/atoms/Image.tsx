import NextImage, { ImageProps as NextImageProps } from "next/image";
import clsx from "clsx";

type ImageProps = Omit<NextImageProps, "alt"> & {
  // `alt` is required (not optional) at the type level — decorative
  // images must pass alt="" explicitly, so a missing description can't
  // slip through unnoticed. Satisfies WCAG 1.1.1.
  alt: string;
  rounded?: boolean;
};

/**
 * Atom: Image
 *
 * Usage: every content image in the app (heritage-site photos, hero
 * media). Wraps next/image so `sizes` is always set for responsive
 * loading and `alt` is required, keeping the Lightning Fast and
 * Accessible requirements enforced at the component boundary rather
 * than left to each page.
 */
export default function Image({ alt, rounded = true, className, sizes, ...rest }: ImageProps) {
  return (
    <NextImage
      alt={alt}
      sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      className={clsx(rounded && "rounded-2xl", "object-cover", className)}
      {...rest}
    />
  );
}
