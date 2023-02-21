import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetBlogTagsForUserHeaderQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetBlogTagsForUserHeaderQuery = {
  __typename?: 'query_root'
  blog_tags: Array<{
    __typename?: 'blog_tags'
    id: number
    name: string
    slug: string
    blog_blog_tags: Array<{
      __typename?: 'blog_blog_tags'
      blog: { __typename?: 'blogs'; id: number }
    }>
  }>
}

export type BlogTagsForUserHeaderFragmentFragment = {
  __typename?: 'blog_tags'
  id: number
  name: string
  slug: string
  blog_blog_tags: Array<{
    __typename?: 'blog_blog_tags'
    blog: { __typename?: 'blogs'; id: number }
  }>
}

export const BlogTagsForUserHeaderFragmentFragmentDoc = gql`
  fragment blogTagsForUserHeaderFragment on blog_tags {
    id
    name
    slug
    blog_blog_tags {
      blog {
        id
      }
    }
  }
`
export const GetBlogTagsForUserHeaderDocument = gql`
  query getBlogTagsForUserHeader {
    blog_tags {
      ...blogTagsForUserHeaderFragment
    }
  }
  ${BlogTagsForUserHeaderFragmentFragmentDoc}
`

export function useGetBlogTagsForUserHeaderQuery(
  options?: Omit<
    Urql.UseQueryArgs<GetBlogTagsForUserHeaderQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetBlogTagsForUserHeaderQuery,
    GetBlogTagsForUserHeaderQueryVariables
  >({ query: GetBlogTagsForUserHeaderDocument, ...options })
}
