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
        "relative flex h-full w-full max-w-[350px] min-w-0 flex-col overflow-hidden rounded-2xl shadow-xl backdrop-blur-xl",
        "border border-border bg-linear-to-br from-white via-neutral-50/80 to-white",
        "hover:border-neutral-300 hover:shadow-2xl hover:shadow-neutral-200/50",
        "dark:border-white/10 dark:bg-linear-to-br dark:from-[#010101] dark:via-[#090909] dark:to-[#010101] dark:text-white",
        "dark:hover:border-white/25 dark:hover:shadow-2xl dark:hover:shadow-white/5",
        className
      )}
    >
      {/* Light: баннерный декор — радиальное свечение как в hero */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)] dark:hidden" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-neutral-200/50 opacity-70 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-90 dark:hidden" />
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-neutral-100/80 blur-2xl dark:hidden" />
        {/* Dark: прежние декорации */}
        <div className="absolute inset-0 hidden bg-linear-to-tr from-white/5 to-white/10 opacity-40 transition-opacity duration-500 group-hover:opacity-60 dark:block" />
        <div className="absolute -bottom-20 -left-20 hidden h-48 w-48 transform animate-bounce rounded-full bg-linear-to-tr from-white/10 to-transparent opacity-30 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-50 dark:block" />
        <div className="absolute top-10 left-10 hidden h-16 w-16 animate-ping rounded-full bg-white/5 blur-xl dark:block" />
        <div className="absolute right-16 bottom-16 hidden h-12 w-12 animate-ping rounded-full bg-white/5 blur-lg dark:block" />
        <div className="absolute inset-0 hidden translate-x-full -skew-x-12 transform bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[-200%] dark:block" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center p-8 text-center">
        <div className="relative mb-6 shrink-0">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-neutral-300 dark:border-white/20" />
          <div className="absolute inset-0 animate-pulse rounded-full border border-neutral-200 dark:border-white/10" />
          <div
            className={cn(
              "transform rounded-full border border-neutral-200 bg-neutral-100/80 p-6 shadow-xl backdrop-blur-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
              "[&_svg]:text-primary",
              "dark:border-white/20 dark:bg-neutral-900 dark:hover:shadow-white/20 dark:[&_svg]:text-white"
            )}
          >
            <div className="transform transition-transform duration-700 group-hover:rotate-180">
              {icon}
            </div>
          </div>
        </div>

        <h3
          className={cn(
            "mb-4 line-clamp-3 min-h-18 shrink-0 text-xl leading-tight font-bold transition-transform duration-300 group-hover:scale-105",
            "text-foreground",
            "dark:animate-pulse dark:bg-linear-to-r dark:from-white dark:via-gray-100 dark:to-white dark:bg-clip-text dark:text-transparent"
          )}
        >
          {title}
        </h3>

        <div className="min-h-0 max-w-sm flex-1 space-y-1">
          {description.map((line, idx) => (
            <p
              key={idx}
              className={cn(
                "transform text-sm leading-relaxed transition-colors duration-300",
                "text-muted-foreground group-hover:text-foreground/90",
                "dark:text-gray-400 dark:group-hover:text-gray-300"
              )}
            >
              {line}
            </p>
          ))}
        </div>

        <div
          className={cn(
            "mt-6 h-0.5 w-1/3 shrink-0 transform animate-pulse rounded-full bg-linear-to-r from-transparent to-transparent transition-all duration-500 group-hover:h-1 group-hover:w-1/2",
            "via-neutral-300",
            "dark:via-white"
          )}
        />

        <div className="mt-4 flex shrink-0 space-x-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 dark:bg-white" />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 dark:bg-white"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 dark:bg-white"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 h-20 w-20 rounded-br-3xl bg-linear-to-br from-neutral-200/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/10" />
      <div className="absolute right-0 bottom-0 h-20 w-20 rounded-tl-3xl bg-linear-to-tl from-neutral-200/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/10" />
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
