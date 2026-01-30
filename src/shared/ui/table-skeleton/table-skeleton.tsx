"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Surface } from "@/shared/ui/surface/surface";
import { memo, useMemo } from "react";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const TableSkeleton = memo(function TableSkeleton({
  rows = 5,
  columns = 4,
  className = "",
}: TableSkeletonProps) {
  const columnIndices = useMemo(
    () => Array.from({ length: columns }, (_, index) => index),
    [columns]
  );

  const rowIndices = useMemo(
    () => Array.from({ length: rows }, (_, index) => index),
    [rows]
  );

  return (
    <Surface
      variant="floating"
      className={cn("overflow-hidden", className)}
    >
      <Table aria-label="Загрузка">
        <TableHeader className="sticky top-0 z-10 bg-background/75 backdrop-blur-xl supports-backdrop-filter:bg-background/55">
          <TableRow>
            {columnIndices.map((index) => (
              <TableHead key={index} className="px-4 py-3">
                <Skeleton className="h-4 w-20 rounded-md" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowIndices.map((rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/20">
              {columnIndices.map((colIndex) => (
                <TableCell key={colIndex} className="px-4 py-3">
                  <Skeleton className="h-4 w-full rounded-md" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Surface>
  );
});
