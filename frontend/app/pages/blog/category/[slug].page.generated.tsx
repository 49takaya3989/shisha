
import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetBlogsSpecifiedTagSlugQueryVariables = Types.Exact<{
  where: Types.Blogs_Bool_Exp
}>

export type GetBlogsSpecifiedTagSlugQuery = {
  __typename?: 'query_root'
  blogs: Array<{
    __typename?: 'blogs'
    id: number
    title: string
    thumbnail?: string | null
    updated_at: any
    blog_blog_tags: Array<{
      __typename?: 'blog_blog_tags'
      id: number
      blog_tag: { __typename?: 'blog_tags'; id: number; name: string }
    }>
  }>
}

export type GetBlogTagsForSpecifiedBlogCategorySlugQueryVariables =
  Types.Exact<{
    where: Types.Blog_Tags_Bool_Exp
  }>

export type GetBlogTagsForSpecifiedBlogCategorySlugQuery = {
  __typename?: 'query_root'
  blog_tags: Array<{ __typename?: 'blog_tags'; name: string }>
}

export type BlogsSpecifiedTagSlugFragmentFragment = {
  __typename?: 'blogs'
  id: number
  title: string
  thumbnail?: string | null
  updated_at: any
  blog_blog_tags: Array<{
    __typename?: 'blog_blog_tags'
    id: number
    blog_tag: { __typename?: 'blog_tags'; id: number; name: string }
  }>
}

export type BlogBlogTagsFragmentFragment = {
  __typename?: 'blog_blog_tags'
  id: number
  blog_tag: { __typename?: 'blog_tags'; id: number; name: string }
}

export type BlogTagsFragmentForSpecifiedBlogCategoryFragment = {
  __typename?: 'blog_tags'
  name: string
}

export const BlogBlogTagsFragmentFragmentDoc = gql`
  fragment blogBlogTagsFragment on blog_blog_tags {
    id
    blog_tag {
      id
      name
    }
  }
`
export const BlogsSpecifiedTagSlugFragmentFragmentDoc = gql`
  fragment blogsSpecifiedTagSlugFragment on blogs {
    id
    title
    thumbnail
    updated_at
    blog_blog_tags {
      ...blogBlogTagsFragment
    }
  }
  ${BlogBlogTagsFragmentFragmentDoc}
`
export const BlogTagsFragmentForSpecifiedBlogCategoryFragmentDoc = gql`
  fragment blogTagsFragmentForSpecifiedBlogCategory on blog_tags {
    name
  }
`
export const GetBlogsSpecifiedTagSlugDocument = gql`
  query getBlogsSpecifiedTagSlug($where: blogs_bool_exp!) {
    blogs(where: $where) {
      ...blogsSpecifiedTagSlugFragment
    }
  }
  ${BlogsSpecifiedTagSlugFragmentFragmentDoc}
`

export function useGetBlogsSpecifiedTagSlugQuery(
  options: Omit<
    Urql.UseQueryArgs<GetBlogsSpecifiedTagSlugQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetBlogsSpecifiedTagSlugQuery,
    GetBlogsSpecifiedTagSlugQueryVariables
  >({ query: GetBlogsSpecifiedTagSlugDocument, ...options })
}
export const GetBlogTagsForSpecifiedBlogCategorySlugDocument = gql`
  query getBlogTagsForSpecifiedBlogCategorySlug($where: blog_tags_bool_exp!) {
    blog_tags(where: $where) {
      ...blogTagsFragmentForSpecifiedBlogCategory
    }
  }
  ${BlogTagsFragmentForSpecifiedBlogCategoryFragmentDoc}
`

export function useGetBlogTagsForSpecifiedBlogCategorySlugQuery(
  options: Omit<
    Urql.UseQueryArgs<GetBlogTagsForSpecifiedBlogCategorySlugQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetBlogTagsForSpecifiedBlogCategorySlugQuery,
    GetBlogTagsForSpecifiedBlogCategorySlugQueryVariables
  >({ query: GetBlogTagsForSpecifiedBlogCategorySlugDocument, ...options })
}
