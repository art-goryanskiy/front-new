import type { Metadata } from "next";
import type {
  ProgramEntity,
  CategoryEntity,
} from "@/shared/api/generated/graphql";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.new.standart82.ru";
const SITE_NAME = "ООО ЦОК СТАНДАРТ ПЛЮС - Профессиональное обучение";
const COMPANY_NAME = "ООО ЦОК СТАНДАРТ ПЛЮС";
const DEFAULT_DESCRIPTION =
  "Профессиональные образовательные программы: повышение квалификации, профессиональная переподготовка, профессиональное обучение. Охрана труда, экологическая безопасность и другие направления.";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noindex?: boolean;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  url,
  type = "website",
  noindex = false,
  keywords,
}: GenerateMetadataOptions): Metadata {
  // Короткий title для страницы — суффикс « | ООО ЦОК СТАНДАРТ ПЛЮС» добавляет layout template
  const pageTitle = title ?? SITE_NAME;
  const fullTitleForOg = title ? `${title} | ${COMPANY_NAME}` : SITE_NAME;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const ogImage = image || `${SITE_URL}/og-image.jpg`;

  const defaultKeywords = [
    "профессиональное обучение",
    "повышение квалификации",
    "профессиональная переподготовка",
    "охрана труда",
    "экологическая безопасность",
    "обучение в Крыму",
    COMPANY_NAME,
  ];

  return {
    title: pageTitle,
    description,
    keywords: keywords
      ? [...defaultKeywords, ...keywords].join(", ")
      : defaultKeywords.join(", "),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type,
      url: fullUrl,
      title: fullTitleForOg,
      description,
      siteName: COMPANY_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || COMPANY_NAME,
        },
      ],
      locale: "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitleForOg,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
  };
}

export function generateProgramMetadata(
  program: ProgramEntity
): Metadata {
  const description =
    program.description ||
    `Программа обучения: ${program.title}. ${COMPANY_NAME} - профессиональное образование, повышение квалификации, переподготовка.`;
  const image = program.image || `${SITE_URL}/og-image.jpg`;

  // Извлекаем ключевые слова из названия и описания программы
  const programKeywords = [
    program.title.toLowerCase(),
    ...(program.description
      ? program.description
          .toLowerCase()
          .split(/[,\s]+/)
          .filter((word) => word.length > 4)
          .slice(0, 5)
      : []),
  ];

  return generateMetadata({
    title: program.title,
    description,
    image,
    url: `/programs/${program.id}`,
    type: "article",
    keywords: programKeywords,
  });
}

export function generateCategoryMetadata(
  category: CategoryEntity
): Metadata {
  const description =
    category.description ||
    `Категория: ${category.name}. Образовательные программы от ${COMPANY_NAME}. Профессиональное обучение, повышение квалификации, переподготовка.`;

  const categoryKeywords = [
    category.name.toLowerCase(),
    "обучение",
    "курсы",
    COMPANY_NAME,
  ];

  return generateMetadata({
    title: category.name,
    description,
    image: category.image ?? undefined,
    url: `/categories/${category.id}`,
    keywords: categoryKeywords,
  });
}
