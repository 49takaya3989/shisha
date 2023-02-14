import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql'

export const GQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!

export const gqlClient = createClient({
  url: GQL_ENDPOINT,
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})
