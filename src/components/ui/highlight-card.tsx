"use client";

import { type FC, type ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface HighlightCardProps {
  title: string;
  description: string[];
  icon?: ReactNode;
  className?: string;
  /** When set, the whole card is wrapped in an anchor (use for program cards) */
  href?: string;
}

export const HighlightCard: FC<HighlightCardProps> = ({
  title,
  description,
  icon,
  className,
  href,
}) => {
  const cardContent = (
    <Card
      className={cn(
        "rounded-2xl border border-white/10 text-white",
        "bg-linear-to-br from-[#010101] via-[#090909] to-[#010101]",
        "relative overflow-hidden shadow-2xl backdrop-blur-xl",
        "hover:border-white/25 hover:shadow-2xl hover:shadow-white/5",
        "flex h-full w-full max-w-[350px] min-w-0 flex-col",
        "dark:border-white/10 dark:from-background dark:via-background dark:to-background",
        className
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-white/10 opacity-40 transition-opacity duration-500 group-hover:opacity-60" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 transform animate-bounce rounded-full bg-linear-to-tr from-white/10 to-transparent opacity-30 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-50" />
        <div className="absolute top-10 left-10 h-16 w-16 animate-ping rounded-full bg-white/5 blur-xl" />
        <div className="absolute right-16 bottom-16 h-12 w-12 animate-ping rounded-full bg-white/5 blur-lg" />
        <div className="absolute inset-0 translate-x-full -skew-x-12 transform bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[-200%]" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center p-8 text-center">
        <div className="relative mb-6 shrink-0">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-white/20" />
          <div className="absolute inset-0 animate-pulse rounded-full border border-white/10" />
          <div className="transform rounded-full border border-white/20 bg-linear-to-br from-black/80 to-black/60 p-6 shadow-2xl backdrop-blur-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 hover:shadow-white/20 dark:from-foreground/10 dark:to-foreground/5">
            <div className="transform transition-transform duration-700 group-hover:rotate-180">
              {icon}
            </div>
          </div>
        </div>

        <h3 className="mb-4 line-clamp-3 min-h-18 shrink-0 transform animate-pulse bg-linear-to-r from-white via-gray-100 to-white bg-clip-text text-xl leading-tight font-bold text-transparent transition-transform duration-300 group-hover:scale-105">
          {title}
        </h3>

        <div className="min-h-0 max-w-sm flex-1 space-y-1">
          {description.map((line, idx) => (
            <p
              key={idx}
              className="transform text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200 dark:text-gray-400 dark:group-hover:text-gray-300"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-6 h-0.5 w-1/3 shrink-0 transform animate-pulse rounded-full bg-linear-to-r from-transparent via-white to-transparent transition-all duration-500 group-hover:h-1 group-hover:w-1/2" />

        <div className="mt-4 flex shrink-0 space-x-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-2 w-2 animate-bounce rounded-full bg-white" />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-white"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-white"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 h-20 w-20 rounded-br-3xl bg-linear-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute right-0 bottom-0 h-20 w-20 rounded-tl-3xl bg-linear-to-tl from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Card>
  );

  const wrapperClass =
    "group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1 block h-full";

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {cardContent}
      </Link>
    );
  }

  return <div className={wrapperClass}>{cardContent}</div>;
};
