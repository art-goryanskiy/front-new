import type { ReactNode } from "react";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightMatch(
  text: string,
  query: string
): ReactNode {
  const q = query.trim();
  if (!q) return text;

  const regex = new RegExp(`(${escapeRegex(q)})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === q.toLowerCase();

        return isMatch ? (
          <mark
            key={index}
            className="rounded-md bg-primary/15 px-0.5 text-primary"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </>
  );
}
