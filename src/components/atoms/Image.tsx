import NextImage, { ImageProps as NextImageProps } from "next/image";
import clsx from "clsx";

type ImageProps = Omit<NextImageProps, "alt"> & {
  alt: string;
  rounded?: boolean;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Image({ alt, rounded = true, className, sizes, src, ...rest }: ImageProps) {
  // Static export + unoptimized images don't get basePath automatically,
  // so prefix local /public paths ourselves.
  const resolvedSrc =
    typeof src === "string" && src.startsWith("/") ? `${basePath}${src}` : src;

  return (
    <NextImage
      alt={alt}
      src={resolvedSrc}
      sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      className={clsx(rounded && "rounded-2xl", "object-cover", className)}
      {...rest}
    />
  );
}