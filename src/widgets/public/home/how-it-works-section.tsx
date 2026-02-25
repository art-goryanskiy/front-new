"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, FileText, GraduationCap, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Выберите программу",
    description:
      "Найдите подходящую программу по направлению или воспользуйтесь поиском. Если не знаете с чего начать — напишите нам в чат.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    number: "02",
    icon: FileText,
    title: "Оформите заявку",
    description:
      "Добавьте программу в корзину и оформите заявку онлайн. Менеджер свяжется с вами для уточнения деталей и выставит счёт.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Пройдите обучение",
    description:
      "Обучение проходит в удобном формате: очно, дистанционно или заочно. Доступ к материалам — через систему дистанционного обучения.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    number: "04",
    icon: Award,
    title: "Получите документ",
    description:
      "По итогам обучения вы получите документ установленного образца: удостоверение, диплом или свидетельство — в зависимости от программы.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
] as const;

export const HowItWorksSection = memo(function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="how-it-works-heading"
      className="relative py-14 sm:py-18 lg:py-22"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 h-[400px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-[360px] w-[420px] -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 space-y-3 text-center"
        >
          <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-foreground/90 backdrop-blur">
            Просто и понятно
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Как проходит обучение
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Четыре шага от выбора программы до получения документа
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line (desktop only) */}
          <div
            className="pointer-events-none absolute top-10 right-[12.5%] left-[12.5%] hidden h-px lg:block"
            aria-hidden
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut",
              }}
              style={{ originX: 0 }}
              className="h-full bg-linear-to-r from-primary/30 via-blue-500/30 to-amber-500/30"
            />
          </div>

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 text-center backdrop-blur transition-[border,box-shadow] hover:border-border/80 hover:shadow-md"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div
                    className={cn(
                      "absolute -top-10 -right-10 h-28 w-32 rounded-full blur-2xl",
                      step.bgColor
                    )}
                  />
                </div>

                {/* Step number badge */}
                <div className="relative z-10 flex items-center justify-center">
                  <div
                    className={cn(
                      "relative flex h-20 w-20 items-center justify-center rounded-2xl border",
                      step.bgColor,
                      step.borderColor
                    )}
                  >
                    <Icon
                      className={cn("h-8 w-8", step.color)}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-[10px] font-black",
                        step.borderColor,
                        step.color
                      )}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 space-y-2">
                  <h3 className="text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.65 }}
          className="mt-10 flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="rounded-xl font-semibold"
          >
            <Link href="/qualification-upgrade">Начать обучение</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});
