import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetBlogTagsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetBlogTagsQuery = {
  __typename?: 'query_root'
  blog_tags: Array<{
    __typename?: 'blog_tags'
    id: number
    name: string
    slug: string
  }>
}

export type GetBlogTagsFragmentFragment = {
  __typename?: 'blog_tags'
  id: number
  name: string
  slug: string
}

export type DeleteBlogTagsByPkForAdminMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type DeleteBlogTagsByPkForAdminMutation = {
  __typename?: 'mutation_root'
  delete_blog_tags_by_pk?: { __typename?: 'blog_tags'; slug: string } | null
}

export type BlogTagsFragmentForAdminBlogTagDeleteFragment = {
  __typename?: 'blog_tags'
  slug: string
}

export const GetBlogTagsFragmentFragmentDoc = gql`
  fragment getBlogTagsFragment on blog_tags {
    id
    name
    slug
  }
`
export const BlogTagsFragmentForAdminBlogTagDeleteFragmentDoc = gql`
  fragment blogTagsFragmentForAdminBlogTagDelete on blog_tags {
    slug
  }
`
export const GetBlogTagsDocument = gql`
  query getBlogTags {
    blog_tags {
      ...getBlogTagsFragment
    }
  }
  ${GetBlogTagsFragmentFragmentDoc}
`

export function useGetBlogTagsQuery(
  options?: Omit<Urql.UseQueryArgs<GetBlogTagsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetBlogTagsQuery, GetBlogTagsQueryVariables>({
    query: GetBlogTagsDocument,
    ...options,
  })
}
export const DeleteBlogTagsByPkForAdminDocument = gql`
  mutation deleteBlogTagsByPkForAdmin($id: Int!) {
    delete_blog_tags_by_pk(id: $id) {
      ...blogTagsFragmentForAdminBlogTagDelete
    }
  }
  ${BlogTagsFragmentForAdminBlogTagDeleteFragmentDoc}
`

export function useDeleteBlogTagsByPkForAdminMutation() {
  return Urql.useMutation<
    DeleteBlogTagsByPkForAdminMutation,
    DeleteBlogTagsByPkForAdminMutationVariables
  >(DeleteBlogTagsByPkForAdminDocument)
}
