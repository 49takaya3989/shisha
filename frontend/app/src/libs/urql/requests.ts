import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql'

export const GQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!
export const GQL_HASURA_SECRET_KEY = process.env.NEXT_PUBLIC_HASURA_SECRET_KEY!

export const gqlClient = createClient({
  url: GQL_ENDPOINT,
  fetchOptions: {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': GQL_HASURA_SECRET_KEY,
    },
  },
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})
