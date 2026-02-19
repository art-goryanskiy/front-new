import type { Metadata } from "next";
import { getNewsServer } from "@/shared/api/server/news";
import { generateMetadata as generateSeoMetadata } from "@/shared/lib/seo/metadata";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const list = await getNewsServer();
  const item = list.find((n) => n.id === id);
  const title = item
    ? item.text?.slice(0, 60).trim() + (item.text && item.text.length > 60 ? "…" : "") || "Новость"
    : "Новость";
  const description = item?.text?.slice(0, 160).trim() + (item?.text && item.text.length > 160 ? "…" : "") || "Новости ООО ЦОК СТАНДАРТ ПЛЮС.";
  return generateSeoMetadata({
    title,
    description,
    url: `/news/${id}`,
    type: "article",
  });
}

export default function NewsDetailLayout({ children }: Props) {
  return <>{children}</>;
}
