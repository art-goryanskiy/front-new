import { memo } from "react";
import Image from "next/image";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

interface ProgramDetailImageProps {
  image: string;
  alt: string;
}

export const ProgramDetailImage = memo(function ProgramDetailImage({
  image,
  alt,
}: ProgramDetailImageProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/10 shadow-sm">
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-background/40" />
      <Image
        src={image}
        alt={alt}
        fill
        className={PROGRAM_DETAIL_CLASSES.image}
        sizes="(min-width: 1024px) 1024px, 100vw"
        priority
      />
    </div>
  );
});
