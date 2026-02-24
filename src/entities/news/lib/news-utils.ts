const ALLOWED_IMAGE_HOSTS = ["standart-images.storage.yandexcloud.net"];

export function isOptimizableImageSrc(src: string): boolean {
  if (src.startsWith("data:")) return false;
  try {
    const u = new URL(src);
    return (
      u.protocol === "https:" &&
      ALLOWED_IMAGE_HOSTS.some((h) => u.hostname === h)
    );
  } catch {
    return false;
  }
}

export function truncateText(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength).trimEnd() + "…";
}

export function formatNewsDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function formatRelativeTime(iso: string): string | null {
  try {
    const now = Date.now();
    const then = new Date(iso).getTime();
    const diffMs = now - then;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays < 1) {
      if (diffHours >= 1) {
        const label =
          diffHours === 1
            ? "час"
            : diffHours < 5
              ? "часа"
              : "часов";
        return `${diffHours} ${label} назад`;
      }
      if (diffMin >= 1) {
        const label =
          diffMin === 1
            ? "минуту"
            : diffMin < 5
              ? "минуты"
              : "минут";
        return `${diffMin} ${label} назад`;
      }
      return "только что";
    }
    if (diffDays < 7) {
      const label =
        diffDays === 1
          ? "день"
          : diffDays < 5
            ? "дня"
            : "дней";
      return `${diffDays} ${label} назад`;
    }
    return null;
  } catch {
    return null;
  }
}
