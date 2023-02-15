import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql'

export const GQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!

export const gqlClient = createClient({
  url: GQL_ENDPOINT,
  fetchOptions: {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY!
    },
  },
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})
