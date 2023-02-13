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

export type DeleteBlogTagsByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type DeleteBlogTagsByPkMutation = {
  __typename?: 'mutation_root'
  delete_blog_tags_by_pk?: {
    __typename?: 'blog_tags'
    id: number
    name: string
    slug: string
  } | null
}

export const GetBlogTagsFragmentFragmentDoc = gql`
  fragment getBlogTagsFragment on blog_tags {
    id
    name
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
export const DeleteBlogTagsByPkDocument = gql`
  mutation deleteBlogTagsByPk($id: Int!) {
    delete_blog_tags_by_pk(id: $id) {
      id
      name
      slug
    }
  }
`

export function useDeleteBlogTagsByPkMutation() {
  return Urql.useMutation<
    DeleteBlogTagsByPkMutation,
    DeleteBlogTagsByPkMutationVariables
  >(DeleteBlogTagsByPkDocument)
}
