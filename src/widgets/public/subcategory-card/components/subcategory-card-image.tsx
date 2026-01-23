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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            loading="eager"
            priority={priority}
            style={{
              padding: "24px 16px 16px 16px",
              boxSizing: "border-box",
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900">
            <FolderOpen className="h-16 w-16 text-primary-400" />
          </div>
        )}
      </div>
    );
  }
);
