import type {
  ProgramEntity,
  CategoryEntity,
} from "@/shared/api/generated/graphql";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.new.standart82.ru";
const COMPANY_NAME = "ООО ЦОК СТАНДАРТ ПЛЮС";
export const COMPANY_PHONE = "+7 (978) 742-90-42";
export const COMPANY_EMAIL = "info@standart82.ru";
/** Адрес для отображения на странице контактов (при необходимости уточните полный адрес) */
export const COMPANY_ADDRESS = "Республика Крым";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: COMPANY_NAME,
    alternateName: "СТАНДАРТ ПЛЮС",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-full.svg`,
    description:
      "Центр обучения и консультирования. Профессиональные образовательные программы: повышение квалификации, профессиональная переподготовка, профессиональное обучение. Услуги по охране труда и экологической безопасности.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressRegion: "Республика Крым",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
      contactType: "customer service",
      areaServed: "RU",
      availableLanguage: "Russian",
    },
    sameAs: [
      // Можно добавить ссылки на соцсети, если есть
    ],
    offers: {
      "@type": "Offer",
      description: "Профессиональные образовательные программы",
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateProgramSchema(program: ProgramEntity) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.description || "",
    provider: {
      "@type": "EducationalOrganization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/programs/${program.id}`,
    image: program.image,
    educationalLevel: "Professional",
    ...(program.pricing &&
      program.pricing.length > 0 && {
        offers: program.pricing
          .filter((p) => p.price && p.price > 0)
          .map((p) => ({
            "@type": "Offer",
            price: p.price,
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            ...(p.hours && {
              courseInstance: {
                "@type": "CourseInstance",
                duration: `PT${p.hours}H`,
              },
            }),
          })),
      }),
  };
}

export function generateCategorySchema(category: CategoryEntity) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description: category.description || "",
    url: `${SITE_URL}/categories/${category.id}`,
    image: category.image,
    itemListElement: {
      "@type": "ListItem",
      position: 1,
      name: category.name,
    },
  };
}
