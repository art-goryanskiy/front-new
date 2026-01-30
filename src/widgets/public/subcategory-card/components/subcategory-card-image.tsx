"use client";

import { memo } from "react";
import Image from "next/image";
import { FolderOpen } from "lucide-react";
import { SUBCATEGORY_CARD_CLASSES } from "../constants/subcategory-card-constants";

interface SubcategoryCardImageProps {
  image: string | null | undefined;
  name: string;
  priority?: boolean;
}

export const SubcategoryCardImage = memo(
  function SubcategoryCardImage({
    image,
    name,
    priority = false,
  }: SubcategoryCardImageProps) {
    return (
      <div className={SUBCATEGORY_CARD_CLASSES.imageWrapper}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className={SUBCATEGORY_CARD_CLASSES.image}
            sizes="48px"
            priority={priority}
          />
        ) : (
          <div className={SUBCATEGORY_CARD_CLASSES.fallbackGradient}>
            <FolderOpen className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    );
  }
);
