"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

const FAQ_ITEMS = [
  {
    q: "Как проходит обучение?",
    a: "Формат зависит от программы: обычно это лекции, практические задания и материалы для самостоятельного изучения. Точные условия уточняйте у менеджера — мы подберём удобный вариант.",
  },
  {
    q: "Как оплатить обучение?",
    a: "Оплата доступна по договору или счёту. Если нужен пакет документов для бухгалтерии — сообщите, подготовим.",
  },
  {
    q: "Какой документ я получу?",
    a: "По итогам вы получаете документ установленного образца (в зависимости от программы). Детали зависят от направления и длительности обучения.",
  },
  {
    q: "Можно ли начать обучение в ближайшее время?",
    a: "Да — многие программы стартуют регулярно. Оставьте заявку, и мы подскажем ближайшие даты и сформируем группу.",
  },
] as const;

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FaqItem = memo(function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: FaqItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className={cn(
        "overflow-hidden rounded-xl border transition-colors duration-200",
        isOpen
          ? "border-border/80 bg-muted/10"
          : "border-border/50 bg-card/40 hover:border-border/70"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
      >
        <span className="text-sm font-semibold text-foreground sm:text-base">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="px-5 pt-0 pb-5">
              <div className="mb-4 h-px w-full bg-border/40" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export const ProgramDetailFaq = memo(function ProgramDetailFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className={`${PROGRAM_DETAIL_CLASSES.section} scroll-mt-28`}
    >
      <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
        Частые вопросы
      </h2>

      <div className="mt-4 space-y-2">
        {FAQ_ITEMS.map((item, index) => (
          <FaqItem
            key={item.q}
            question={item.q}
            answer={item.a}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
});
