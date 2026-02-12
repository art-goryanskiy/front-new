"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Tag, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const ALLOWED_IMAGE_HOSTS = [
  "standart-images.storage.yandexcloud.net",
  "images.unsplash.com",
];

function isOptimizableImageSrc(src: string): boolean {
  if (src.startsWith("data:")) return false;
  try {
    const u = new URL(src);
    return u.protocol === "https:" && ALLOWED_IMAGE_HOSTS.some((h) => u.hostname === h);
  } catch {
    return false;
  }
}

// Define the type for a single offer item
export interface Offer {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  brandLogoSrc?: string;
  brandName: string;
  promoCode?: string;
  href: string;
}

// Props for the OfferCard component
interface OfferCardProps {
  offer: Offer;
  index?: number;
}

const CARD_IMAGE_SIZES = "(max-width: 400px) 280px, 300px";

// The individual card component with hover animation (CSS-friendly)
const OfferCard = React.forwardRef<HTMLAnchorElement, OfferCardProps>(({ offer, index = 0 }, ref) => (
  <motion.a
    ref={ref}
    href={offer.href}
    className="relative shrink-0 w-[300px] h-[380px] rounded-2xl overflow-hidden group snap-start"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ perspective: "1000px" }}
  >
    {/* Background Image: next/image for allowed hosts, lazy img for placeholders */}
    <div className="absolute inset-0 w-full h-2/4">
      {isOptimizableImageSrc(offer.imageSrc) ? (
        <Image
          src={offer.imageSrc}
          alt={offer.imageAlt}
          fill
          sizes={CARD_IMAGE_SIZES}
          quality={50}
          className="object-cover object-top saturate-[0.88] transition-[transform,filter] duration-500 group-hover:saturate-100 group-hover:scale-110"
          loading={index < 2 ? "eager" : "lazy"}
        />
      ) : (
        <img
          src={offer.imageSrc}
          alt={offer.imageAlt}
          className="w-full h-full object-cover object-top saturate-[0.88] transition-[transform,filter] duration-500 group-hover:saturate-100 group-hover:scale-110"
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
    {/* Card Content */}
    <div className="absolute bottom-0 left-0 right-0 h-2/4 bg-card p-5 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <Tag className="w-4 h-4 mr-2 text-primary" />
          <span>{offer.tag}</span>
        </div>
        <h3 className="text-xl font-bold text-card-foreground leading-tight">{offer.title}</h3>
        <p className="text-sm text-muted-foreground">{offer.description}</p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          {offer.brandLogoSrc && isOptimizableImageSrc(offer.brandLogoSrc) ? (
            <Image
              src={offer.brandLogoSrc}
              alt=""
              width={32}
              height={32}
              className="rounded-full bg-muted object-cover"
            />
          ) : offer.brandLogoSrc ? (
            <img
              src={offer.brandLogoSrc}
              alt=""
              className="w-8 h-8 rounded-full bg-muted object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Calendar className="h-4 w-4" aria-hidden />
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-card-foreground">{offer.brandName}</p>
            {offer.promoCode && (
              <p className="text-xs text-muted-foreground">{offer.promoCode}</p>
            )}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground transition-transform duration-300 group-hover:-rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </motion.a>
));
OfferCard.displayName = "OfferCard";

// Props for the OfferCarousel component
export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
}

// The main carousel component with scroll functionality
const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ offers, className, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.8; // Scroll by 80% of the container width
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return (
      <div
        ref={ref}
        className={cn("relative w-full group", className)}
        role="region"
        aria-label="Карусель карточек"
        {...props}
      >
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80 disabled:opacity-0"
          aria-label="Прокрутить влево"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>
        
        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80 disabled:opacity-0"
          aria-label="Прокрутить вправо"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  }
);
OfferCarousel.displayName = "OfferCarousel";

export { OfferCarousel, OfferCard };