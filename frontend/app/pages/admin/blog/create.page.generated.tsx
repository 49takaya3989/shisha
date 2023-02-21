
import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetBlogTagsForBlogCreateQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetBlogTagsForBlogCreateQuery = {
  __typename?: 'query_root'
  blog_tags: Array<{ __typename?: 'blog_tags'; id: number; name: string }>
}

export type GetBlogTagForBlogCreateFragmentFragment = {
  __typename?: 'blog_tags'
  id: number
  name: string
}

export type InsertBlogsOneForAdminMutationVariables = Types.Exact<{
  object: Types.Blogs_Insert_Input
}>

export type InsertBlogsOneForAdminMutation = {
  __typename?: 'mutation_root'
  insert_blogs_one?: {
    __typename?: 'blogs'
    slug: string
    title: string
    thumbnail?: string | null
    contents?: string | null
    blog_blog_tags: Array<{
      __typename?: 'blog_blog_tags'
      blog_tag: { __typename?: 'blog_tags'; name: string; slug: string }
    }>
  } | null
}

export type BlogsFragmentForAdminBlogInsertFragment = {
  __typename?: 'blogs'
  slug: string
  title: string
  thumbnail?: string | null
  contents?: string | null
  blog_blog_tags: Array<{
    __typename?: 'blog_blog_tags'
    blog_tag: { __typename?: 'blog_tags'; name: string; slug: string }
  }>
}

export const GetBlogTagForBlogCreateFragmentFragmentDoc = gql`
  fragment getBlogTagForBlogCreateFragment on blog_tags {
    id
    name
  }
`
export const BlogsFragmentForAdminBlogInsertFragmentDoc = gql`
  fragment blogsFragmentForAdminBlogInsert on blogs {
    slug
    title
    thumbnail
    contents
    blog_blog_tags {
      blog_tag {
        name
        slug
      }
    }
  }
`
export const GetBlogTagsForBlogCreateDocument = gql`
  query getBlogTagsForBlogCreate {
    blog_tags {
      ...getBlogTagForBlogCreateFragment
    }
  }
  ${GetBlogTagForBlogCreateFragmentFragmentDoc}
`

export function useGetBlogTagsForBlogCreateQuery(
  options?: Omit<
    Urql.UseQueryArgs<GetBlogTagsForBlogCreateQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetBlogTagsForBlogCreateQuery,
    GetBlogTagsForBlogCreateQueryVariables
  >({ query: GetBlogTagsForBlogCreateDocument, ...options })
}
export const InsertBlogsOneForAdminDocument = gql`
  mutation insertBlogsOneForAdmin($object: blogs_insert_input!) {
    insert_blogs_one(object: $object) {
      ...blogsFragmentForAdminBlogInsert
    }
  }
  ${BlogsFragmentForAdminBlogInsertFragmentDoc}
`

export function useInsertBlogsOneForAdminMutation() {
  return Urql.useMutation<
    InsertBlogsOneForAdminMutation,
    InsertBlogsOneForAdminMutationVariables
  >(InsertBlogsOneForAdminDocument)
}
