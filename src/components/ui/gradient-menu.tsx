"use client";

import React from "react";
import Link from "next/link";
import { Home, PlayCircle, Image, Share2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GradientMenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  gradientFrom: string;
  gradientTo: string;
}

const defaultMenuItems: GradientMenuItem[] = [
  {
    title: "Главная",
    icon: <Home className="size-6" />,
    href: "/",
    gradientFrom: "#a955ff",
    gradientTo: "#ea51ff",
  },
  {
    title: "Видео",
    icon: <PlayCircle className="size-6" />,
    gradientFrom: "#56CCF2",
    gradientTo: "#2F80ED",
  },
  {
    title: "Фото",
    icon: <Image className="size-6" />,
    gradientFrom: "#FF9966",
    gradientTo: "#FF5E62",
  },
  {
    title: "Поделиться",
    icon: <Share2 className="size-6" />,
    gradientFrom: "#80FF72",
    gradientTo: "#7EE8FA",
  },
  {
    title: "Избранное",
    icon: <Heart className="size-6" />,
    gradientFrom: "#ffa9c6",
    gradientTo: "#f434e2",
  },
];

export interface GradientMenuProps {
  items?: GradientMenuItem[];
  className?: string;
  itemClassName?: string;
  /** Compact nav (e.g. in header): smaller pills, no full-screen centering */
  compact?: boolean;
}

export function GradientMenu({
  items = defaultMenuItems,
  className,
  itemClassName,
  compact = false,
}: GradientMenuProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center gap-4",
        compact ? "py-0" : "min-h-screen bg-background",
        className
      )}
    >
      <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {items.map(({ title, icon, href, gradientFrom, gradientTo }, idx) => {
          const style = {
            "--gradient-from": gradientFrom,
            "--gradient-to": gradientTo,
          } as React.CSSProperties;

          const content = (
            <>
              {/* Gradient background on hover */}
              <span
                className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"
                aria-hidden
              />
              {/* Blur glow */}
              <span
                className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"
                aria-hidden
              />
              {/* Icon */}
              <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0 text-muted-foreground group-hover:text-transparent">
                {icon}
              </span>
              {/* Title — тень для контраста на градиенте */}
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center text-white font-semibold uppercase tracking-wide transition-all duration-500 scale-0 group-hover:scale-100 delay-150 whitespace-nowrap pointer-events-none px-3",
                  "drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_0_12px_rgba(0,0,0,0.4)]",
                  compact ? "text-xs" : "text-sm"
                )}
              >
                {title}
              </span>
            </>
          );

          const wrapperClass = cn(
            "relative rounded-full flex items-center justify-center transition-all duration-500 group cursor-pointer overflow-visible",
            compact
              ? "w-10 h-10 sm:w-12 sm:h-12 hover:w-[200px] sm:hover:w-[240px] min-w-0 shadow-md hover:shadow-none [&_svg]:size-5 sm:[&_svg]:size-6"
              : "w-14 h-14 sm:w-[60px] sm:h-[60px] hover:w-[200px] sm:hover:w-[220px] shadow-lg hover:shadow-none",
            "bg-background border border-border hover:border-transparent",
            itemClassName
          );

          if (href) {
            return (
              <li key={idx}>
                <Link
                  href={href}
                  style={style}
                  className={wrapperClass}
                  aria-label={title}
                >
                  {content}
                </Link>
              </li>
            );
          }

          return (
            <li key={idx}>
              <button
                type="button"
                style={style}
                className={wrapperClass}
                aria-label={title}
              >
                {content}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
