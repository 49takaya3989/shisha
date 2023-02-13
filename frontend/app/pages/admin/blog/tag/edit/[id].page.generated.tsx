
import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../../../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetSpecificBlogTagQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type GetSpecificBlogTagQuery = {
  __typename?: 'query_root'
  blog_tags_by_pk?: {
    __typename?: 'blog_tags'
    id: number
    name: string
    slug: string
  } | null
}

export type UpdateSpecificBlogTagMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  name: Types.Scalars['String']
  slug: Types.Scalars['String']
}>

export type UpdateSpecificBlogTagMutation = {
  __typename?: 'mutation_root'
  update_blog_tags_by_pk?: {
    __typename?: 'blog_tags'
    id: number
    name: string
    slug: string
  } | null
}

export const GetSpecificBlogTagDocument = gql`
  query getSpecificBlogTag($id: Int!) {
    blog_tags_by_pk(id: $id) {
      id
      name
      slug
    }
  }
`

export function useGetSpecificBlogTagQuery(
  options: Omit<Urql.UseQueryArgs<GetSpecificBlogTagQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    GetSpecificBlogTagQuery,
    GetSpecificBlogTagQueryVariables
  >({ query: GetSpecificBlogTagDocument, ...options })
}
export const UpdateSpecificBlogTagDocument = gql`
  mutation updateSpecificBlogTag($id: Int!, $name: String!, $slug: String!) {
    update_blog_tags_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, slug: $slug }
    ) {
      id
      name
      slug
    }
  }
`

export function useUpdateSpecificBlogTagMutation() {
  return Urql.useMutation<
    UpdateSpecificBlogTagMutation,
    UpdateSpecificBlogTagMutationVariables
  >(UpdateSpecificBlogTagDocument)
}
