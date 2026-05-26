import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage as SanityImageType } from "@/types/sanity.types";

interface SanityImageProps {
  image: SanityImageType;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
}: SanityImageProps) {
  const imageUrl = urlFor(image).quality(80).format("webp").url();

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes ?? "100vw"}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
