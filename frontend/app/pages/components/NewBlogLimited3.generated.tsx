
import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type BlogsForUserQueryVariables = Types.Exact<{ [key: string]: never }>

export type BlogsForUserQuery = {
  __typename?: 'query_root'
  blogs: Array<{
    __typename?: 'blogs'
    id: number
    title: string
    thumbnail?: string | null
  }>
}

export type BlogsFragmentFragment = {
  __typename?: 'blogs'
  id: number
  title: string
  thumbnail?: string | null
}

export const BlogsFragmentFragmentDoc = gql`
  fragment blogsFragment on blogs {
    id
    title
    thumbnail
  }
`
export const BlogsForUserDocument = gql`
  query blogsForUser {
    blogs(limit: 3) {
      ...blogsFragment
    }
  }
  ${BlogsFragmentFragmentDoc}
`

export function useBlogsForUserQuery(
  options?: Omit<Urql.UseQueryArgs<BlogsForUserQueryVariables>, 'query'>
) {
  return Urql.useQuery<BlogsForUserQuery, BlogsForUserQueryVariables>({
    query: BlogsForUserDocument,
    ...options,
  })
}
