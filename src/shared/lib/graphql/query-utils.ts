import { print } from "graphql";
import type { DocumentNode } from "@apollo/client";

/**
 * Конвертирует GraphQL DocumentNode в строку для использования в серверных запросах
 */
export function gqlToString(document: DocumentNode): string {
  return print(document);
}
