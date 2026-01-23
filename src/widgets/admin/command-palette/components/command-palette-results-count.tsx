"use client";

import { memo, useMemo } from "react";

interface CommandPaletteResultsCountProps {
  total: number;
  categories: number;
  programs: number;
  commands: number;
}

export const CommandPaletteResultsCount = memo(
  function CommandPaletteResultsCount({
    total,
    categories,
    programs,
    commands,
  }: CommandPaletteResultsCountProps) {
    const countText = useMemo(() => {
      if (total === 0) return null;

      const parts: string[] = [];
      if (categories > 0)
        parts.push(
          `${categories} категори${getPlural(categories, "я", "и", "й")}`
        );
      if (programs > 0)
        parts.push(`${programs} программ${getPlural(programs, "а", "ы", "")}`);
      if (commands > 0)
        parts.push(`${commands} команд${getPlural(commands, "а", "ы", "")}`);

      return `Найдено: ${parts.join(", ")} (${total} ${getPlural(total, "результат", "результата", "результатов")})`;
    }, [total, categories, programs, commands]);

    if (!countText) return null;

    return (
      <div className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-800/50">
        {countText}
      </div>
    );
  }
);

function getPlural(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}
