"use client";

import { memo } from "react";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

const FAQ_ITEMS = [
  {
    q: "Как проходит обучение?",
    a: "Формат зависит от программы: обычно это лекции, практические задания и материалы для самостоятельного изучения. Точные условия уточняйте у менеджера — мы подберём удобный вариант.",
  },
  {
    q: "Как оплатить обучение?",
    a: "Оплата обычно доступна по договору или счёту. Если вам нужен пакет документов для бухгалтерии — сообщите, подготовим.",
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

export const ProgramDetailFaq = memo(function ProgramDetailFaq() {
  return (
    <section
      id="faq"
      className={`${PROGRAM_DETAIL_CLASSES.section} scroll-mt-28`}
    >
      <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>FAQ</h2>

      <div className="-mx-2 mt-1 divide-y divide-border/60">
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="group px-2 py-3">
            <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
              {item.q}
            </summary>
            <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
});
