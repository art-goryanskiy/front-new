export function formatProfileValue(
  value: string | null | undefined
): string | null {
  const v = value?.trim();
  return v ? v : null;
}

export function formatProfileDate(value: string | null | undefined) {
  const v = value?.trim();
  if (!v) return null;

  // Common form format: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const [y, m, d] = v.split("-");
    if (y && m && d) return `${d}.${m}.${y}`;
  }

  return v;
}
