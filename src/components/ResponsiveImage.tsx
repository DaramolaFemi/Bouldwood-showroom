import React from "react";
type Props = {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
  variants?: { src: string; media?: string }[];
  darkSrc?: string;
};
export default function ResponsiveImage({
  src,
  alt = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: Props) {
  if (/\.(jpg|png|webp|avif)$/.test(src))
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  const set = (ext: string) =>
    [360, 640, 960, 1280, 1600]
      .map((w) => `${src}-${w}.${ext} ${w}w`)
      .join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`${src}-960.jpg`}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
