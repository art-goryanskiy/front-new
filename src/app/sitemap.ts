import { MetadataRoute } from "next";
import { getProgramsServer } from "@/shared/api/server/programs";
import { getCategoriesServer } from "@/shared/api/server/categories";
import { getNewsServer } from "@/shared/api/server/news";
import { safeAsyncArray } from "@/shared/lib/helpers/error-helpers";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.new.standart82.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, categories, news] = await Promise.all([
    safeAsyncArray(getProgramsServer()),
    safeAsyncArray(getCategoriesServer()),
    safeAsyncArray(getNewsServer()),
  ]);

  const programUrls: MetadataRoute.Sitemap = programs.map(
    (program) => ({
      url: `${SITE_URL}/programs/${program.id}`,
      lastModified: program.updatedAt
        ? new Date(program.updatedAt)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const categoryUrls: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${SITE_URL}/categories/${category.id}`,
      lastModified: category.updatedAt
        ? new Date(category.updatedAt)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const newsUrls: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${SITE_URL}/news/${item.id}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/qualification-upgrade`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/professional-retraining`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/professional-education`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contacts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [
    ...staticUrls,
    ...categoryUrls,
    ...programUrls,
    ...newsUrls,
  ];
}
