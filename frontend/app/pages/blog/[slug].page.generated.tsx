
import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type BlogsByPkForUserBlogSingleQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type BlogsByPkForUserBlogSingleQuery = {
  __typename?: 'query_root'
  blogs_by_pk?: {
    __typename?: 'blogs'
    title: string
    thumbnail?: string | null
    updated_at: any
    contents?: string | null
    blog_blog_tags: Array<{
      __typename?: 'blog_blog_tags'
      blog_tag: {
        __typename?: 'blog_tags'
        id: number
        name: string
        slug: string
      }
    }>
  } | null
}

export type BlogsFragmentForUserBlogSingleFragment = {
  __typename?: 'blogs'
  title: string
  thumbnail?: string | null
  updated_at: any
  contents?: string | null
  blog_blog_tags: Array<{
    __typename?: 'blog_blog_tags'
    blog_tag: {
      __typename?: 'blog_tags'
      id: number
      name: string
      slug: string
    }
  }>
}

export const BlogsFragmentForUserBlogSingleFragmentDoc = gql`
  fragment blogsFragmentForUserBlogSingle on blogs {
    title
    thumbnail
    updated_at
    contents
    blog_blog_tags {
      blog_tag {
        id
        name
        slug
      }
    }
  }
`
export const BlogsByPkForUserBlogSingleDocument = gql`
  query blogsByPkForUserBlogSingle($id: Int!) {
    blogs_by_pk(id: $id) {
      ...blogsFragmentForUserBlogSingle
    }
  }
  ${BlogsFragmentForUserBlogSingleFragmentDoc}
`

export function useBlogsByPkForUserBlogSingleQuery(
  options: Omit<
    Urql.UseQueryArgs<BlogsByPkForUserBlogSingleQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    BlogsByPkForUserBlogSingleQuery,
    BlogsByPkForUserBlogSingleQueryVariables
  >({ query: BlogsByPkForUserBlogSingleDocument, ...options })
}
