import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4200/graphql",
  documents: ["src/**/*.{ts,tsx}"],
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
