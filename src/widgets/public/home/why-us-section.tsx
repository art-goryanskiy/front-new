"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Clock,
  FileCheck,
  Users,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADVANTAGES = [
  {
    icon: FileCheck,
    title: "Документы государственного образца",
    description:
      "Выдаём удостоверения и дипломы установленного образца, которые признаются работодателями по всей России.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    icon: ShieldCheck,
    title: "Лицензированная деятельность",
    description:
      "Работаем на основании образовательной лицензии. Аккредитованы и соответствуем требованиям Минобрнауки РФ.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: MapPin,
    title: "Крым и вся Россия",
    description:
      "Базируемся в Симферополе, но обучаем специалистов из любого региона — дистанционный формат доступен для всех.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Clock,
    title: "Гибкий график",
    description:
      "Обучение проходит в удобное для вас время. Очный, заочный и дистанционный форматы — выбирайте подходящий.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: Users,
    title: "Корпоративное обучение",
    description:
      "Организуем обучение сотрудников «под ключ»: составим план, оформим документы и закроем потребности бухгалтерии.",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    icon: Headphones,
    title: "Поддержка на каждом этапе",
    description:
      "Менеджеры помогут выбрать программу, ответят на вопросы и проконтролируют получение документа после обучения.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
] as const;

export const WhyUsSection = memo(function WhyUsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="why-us-heading"
      className="relative py-14 sm:py-18 lg:py-22"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-1/4 h-[360px] w-[480px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 h-[320px] w-[420px] rounded-full bg-emerald-500/5 blur-3xl" />
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
            Наши преимущества
          </div>
          <h2
            id="why-us-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Почему выбирают нас
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            ЦОК Стандарт Плюс — это надёжный партнёр в профессиональном
            развитии с 2015 года
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.1 + index * 0.07,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-[border,box-shadow] hover:border-border/80 hover:shadow-md"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div
                    className={cn(
                      "absolute -top-10 -right-10 h-24 w-32 rounded-full blur-2xl",
                      item.bgColor
                    )}
                  />
                </div>

                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                      item.bgColor,
                      item.borderColor
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5", item.color)}
                      aria-hidden
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold leading-snug text-foreground sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
