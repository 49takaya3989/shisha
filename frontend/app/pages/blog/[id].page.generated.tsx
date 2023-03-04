
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
    id: number
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
    blog_comments: Array<{
      __typename?: 'blog_comments'
      id: number
      comment: string
      parent_comment_id?: number | null
      updated_at: any
      user: { __typename?: 'users'; uuid: string }
      blog_comments: Array<{
        __typename?: 'blog_comments'
        id: number
        comment: string
        updated_at: any
        user: { __typename?: 'users'; uuid: string }
      }>
    }>
  } | null
}

export type BlogsFragmentForUserBlogSingleFragment = {
  __typename?: 'blogs'
  id: number
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
  blog_comments: Array<{
    __typename?: 'blog_comments'
    id: number
    comment: string
    parent_comment_id?: number | null
    updated_at: any
    user: { __typename?: 'users'; uuid: string }
    blog_comments: Array<{
      __typename?: 'blog_comments'
      id: number
      comment: string
      updated_at: any
      user: { __typename?: 'users'; uuid: string }
    }>
  }>
}

export const BlogsFragmentForUserBlogSingleFragmentDoc = gql`
  fragment blogsFragmentForUserBlogSingle on blogs {
    id
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
    blog_comments {
      id
      comment
      parent_comment_id
      updated_at
      user {
        uuid
      }
      blog_comments {
        id
        comment
        updated_at
        user {
          uuid
        }
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
