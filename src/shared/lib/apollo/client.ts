import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloLink } from "@apollo/client/link";
import { createAuthErrorLink } from "./auth-error-link";

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    "https://www.standart82.ru/graphql",
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

const link = ApolloLink.from([createAuthErrorLink(), httpLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          programs: {
            merge(_existing, incoming = []) {
              return incoming;
            },
          },
          topPrograms: {
            merge(_existing, incoming = []) {
              return incoming;
            },
          },
          categories: {
            merge(_existing, incoming = []) {
              return incoming;
            },
          },
        },
      },
      ProgramEntity: {
        keyFields: ["id"],
      },
      CategoryEntity: {
        keyFields: ["id"],
      },
      UserEntity: {
        keyFields: ["id"],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  },
});
