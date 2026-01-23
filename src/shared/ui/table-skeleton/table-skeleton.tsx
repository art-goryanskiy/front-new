"use client";

import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Skeleton } from "@/widgets/admin/skeleton/skeleton";
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
    <Card className={`border-none shadow-lg ${className}`}>
      <CardBody className="p-0">
        <Table removeWrapper aria-label="Загрузка">
          <TableHeader>
            {columnIndices.map((index) => (
              <TableColumn key={index}>
                <Skeleton className="h-4 w-20" />
              </TableColumn>
            ))}
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
      </CardBody>
    </Card>
  );
});
