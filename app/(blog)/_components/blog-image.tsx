"use client"
import Image from "next/image";

export function BlogImage({ src, alt, className, sizes, fill, priority }: {
  src: string; alt: string; className?: string; sizes?: string; fill?: boolean; priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      fill={fill}
      priority={priority}
      unoptimized={!src.startsWith("http")}
    />
  );
}