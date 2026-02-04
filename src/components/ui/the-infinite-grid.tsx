"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import { HandWrittenTitle } from "./hand-writing-text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5;
  const speedY = 0.5;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative flex min-h-[92vh] w-full flex-col items-center justify-center overflow-hidden bg-background"
      )}
    >
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-[320px] w-[420px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -top-32 -right-28 h-[360px] w-[520px] rounded-full bg-orange-500/15 blur-3xl dark:bg-orange-500/10" />
        <div className="absolute -bottom-32 -left-28 h-[420px] w-[520px] rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background/70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            Современные образовательные программы • онлайн и очно
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-balance text-foreground md:text-6xl">
            <HandWrittenTitle title="Стандарт +" />
          </h1>

          <p className="mt-6 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            Профессиональное обучение для карьерного роста: повышение
            квалификации, переподготовка и обучение по отраслевым
            стандартам.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 px-6 font-semibold"
            >
              <Link href="#programs">
                Смотреть программы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 font-semibold"
            >
              <Link href="/qualification-upgrade">
                Подобрать обучение
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) => {
  return (
    <svg className="h-full w-full text-muted-foreground dark:text-neutral-600">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
