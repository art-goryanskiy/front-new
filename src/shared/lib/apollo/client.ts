import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    "https://www.new.standart82.ru/graphql",
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
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
