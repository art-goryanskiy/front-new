import { MetadataRoute } from "next";
import { getProgramsServer } from "@/shared/api/server/programs";
import { getCategoriesServer } from "@/shared/api/server/categories";
import { safeAsyncArray } from "@/shared/lib/helpers/error-helpers";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.standart82.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, categories] = await Promise.all([
    safeAsyncArray(getProgramsServer()),
    safeAsyncArray(getCategoriesServer()),
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
  ];

  return [...staticUrls, ...categoryUrls, ...programUrls];
}
