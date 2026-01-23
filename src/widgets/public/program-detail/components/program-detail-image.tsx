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
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt={alt}
        fill
        className={PROGRAM_DETAIL_CLASSES.image}
        sizes="100vw"
        priority
      />
    </div>
  );
});
