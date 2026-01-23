import { type ReactNode } from "react";

/**
 * Подсвечивает совпадения в тексте
 */
export function highlightMatch(text: string, query: string): ReactNode {
  if (!query || query.length === 0) {
    return text;
  }

  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  const parts: string[] = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.toLowerCase() === query.toLowerCase()) {
          return (
            <mark
              key={index}
              className="bg-primary-200 dark:bg-primary-800 text-primary-900 dark:text-primary-100 rounded px-0.5"
            >
              {part}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

/**
 * Экранирует специальные символы для regex
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
