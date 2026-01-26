"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
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
    <Card className={`shadow-lg ${className}`}>
      <CardContent className="p-0">
        <Table aria-label="Загрузка">
          <TableHeader>
            <TableRow>
              {columnIndices.map((index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowIndices.map((rowIndex) => (
              <TableRow key={rowIndex}>
                {columnIndices.map((colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});
