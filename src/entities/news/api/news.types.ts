/**
 * Типы для модуля новостей (VK).
 * Когда бэк добавит news и NewsFilterInput в схему, codegen сгенерирует их в graphql.ts.
 */

export interface NewsAttachmentEntity {
  __typename?: "NewsAttachmentEntity";
  type: string;
  url?: string | null;
  title?: string | null;
}

export interface NewsEntity {
  __typename?: "NewsEntity";
  id: string;
  text: string;
  date: string;
  vkUrl?: string | null;
  attachments?: NewsAttachmentEntity[] | null;
}

export interface NewsFilterInput {
  limit?: number | null;
  offset?: number | null;
}

export interface GetNewsQueryVariables {
  filter?: NewsFilterInput | null;
}

export interface GetNewsQuery {
  news: NewsEntity[];
}
