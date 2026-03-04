import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    "https://www.standart82.ru/graphql",
  documents: ["src/**/*.{ts,tsx}", "!src/shared/api/queries/news.ts"],
  generates: {
    "./src/shared/api/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
