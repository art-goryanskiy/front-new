export const HERO_BANNER_TEXTS = {
  headline: "Повысьте свои навыки для лучшего будущего",
  description:
    "Профессиональные образовательные программы для развития карьеры. Выберите программу, которая подходит именно вам.",
  ctaPrimary: "Посмотреть программы",
  ctaSecondary: "Узнать больше",
} as const;

export const HERO_BANNER_CLASSES = {
  section:
    "relative overflow-hidden min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]",
  backgroundImage: "absolute inset-0 w-full h-full",
  container:
    "relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 h-full",
  content:
    "flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-16 sm:py-20 lg:py-24 min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]",
  leftSection: "flex-1 flex flex-col justify-center",
  textContent: "space-y-6 text-left",
  headline:
    "text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg",
  description: "text-lg sm:text-xl text-white/95 max-w-2xl drop-shadow-md",
  ctaGroup: "flex flex-col sm:flex-row gap-4",
  rightSection: "flex-1 hidden lg:flex items-center justify-center relative",
  decoration:
    "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] z-0",
} as const;

export const HERO_BANNER_ANIMATIONS = {
  text: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  },
  right: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  },
} as const;
