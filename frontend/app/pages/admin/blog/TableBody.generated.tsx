
import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetBlogsForAdminBlogArchiveQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetBlogsForAdminBlogArchiveQuery = {
  __typename?: 'query_root'
  blogs: Array<{
    __typename?: 'blogs'
    id: number
    title: string
    slug: string
    contents?: string | null
    thumbnail?: string | null
    updated_at: any
    blog_blog_tags: Array<{
      __typename?: 'blog_blog_tags'
      id: number
      blog_tag: { __typename?: 'blog_tags'; id: number; name: string }
    }>
  }>
}

export type GetBlogsFragmentForAdminBlogArchiveFragment = {
  __typename?: 'blogs'
  id: number
  title: string
  slug: string
  contents?: string | null
  thumbnail?: string | null
  updated_at: any
  blog_blog_tags: Array<{
    __typename?: 'blog_blog_tags'
    id: number
    blog_tag: { __typename?: 'blog_tags'; id: number; name: string }
  }>
}

export type DeleteBlogsByPkForAdminMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type DeleteBlogsByPkForAdminMutation = {
  __typename?: 'mutation_root'
  delete_blogs_by_pk?: { __typename?: 'blogs'; slug: string } | null
}

export type BlogsFragmentForAdminBlogArchiveFragment = {
  __typename?: 'blogs'
  slug: string
}

export const GetBlogsFragmentForAdminBlogArchiveFragmentDoc = gql`
  fragment getBlogsFragmentForAdminBlogArchive on blogs {
    id
    title
    slug
    contents
    thumbnail
    blog_blog_tags {
      id
      blog_tag {
        id
        name
      }
    }
    updated_at
  }
`
export const BlogsFragmentForAdminBlogArchiveFragmentDoc = gql`
  fragment blogsFragmentForAdminBlogArchive on blogs {
    slug
  }
`
export const GetBlogsForAdminBlogArchiveDocument = gql`
  query getBlogsForAdminBlogArchive {
    blogs {
      ...getBlogsFragmentForAdminBlogArchive
    }
  }
  ${GetBlogsFragmentForAdminBlogArchiveFragmentDoc}
`

export function useGetBlogsForAdminBlogArchiveQuery(
  options?: Omit<
    Urql.UseQueryArgs<GetBlogsForAdminBlogArchiveQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetBlogsForAdminBlogArchiveQuery,
    GetBlogsForAdminBlogArchiveQueryVariables
  >({ query: GetBlogsForAdminBlogArchiveDocument, ...options })
}
export const DeleteBlogsByPkForAdminDocument = gql`
  mutation deleteBlogsByPkForAdmin($id: Int!) {
    delete_blogs_by_pk(id: $id) {
      ...blogsFragmentForAdminBlogArchive
    }
  }
  ${BlogsFragmentForAdminBlogArchiveFragmentDoc}
`

export function useDeleteBlogsByPkForAdminMutation() {
  return Urql.useMutation<
    DeleteBlogsByPkForAdminMutation,
    DeleteBlogsByPkForAdminMutationVariables
  >(DeleteBlogsByPkForAdminDocument)
}
