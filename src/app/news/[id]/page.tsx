import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { NewsDetailContent } from "@/widgets/news/news-detail-content";

export default function NewsDetailPage() {
  return (
    <PublicPageLayout>
      <div className="flex flex-col gap-6">
        <NewsDetailContent />
      </div>
    </PublicPageLayout>
  );
}
