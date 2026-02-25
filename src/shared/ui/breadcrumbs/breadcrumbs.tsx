import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Хлебные крошки"
      className={cn(
        "flex flex-wrap items-center gap-1 text-xs font-medium",
        className
      )}
    >
      <ol className="flex flex-wrap items-center gap-1">
        <li className="flex items-center gap-1">
          <Link
            href="/"
            aria-label="Главная"
            className="flex items-center gap-1 rounded px-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Home className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="sr-only">Главная</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight
                className="h-3 w-3 shrink-0 text-border"
                aria-hidden
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="max-w-[180px] truncate rounded px-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:max-w-[260px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="max-w-[180px] truncate px-1 py-0.5 text-foreground/80 sm:max-w-[260px]"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
