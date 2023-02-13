import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetBlogTagForBlogEditQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetBlogTagForBlogEditQuery = {
  __typename?: 'query_root'
  blog_tags: Array<{ __typename?: 'blog_tags'; id: number; name: string }>
}

export type GetBlogTagForBlogEditFragmentFragment = {
  __typename?: 'blog_tags'
  id: number
  name: string
}

export type GetBlogsByPkQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type GetBlogsByPkQuery = {
  __typename?: 'query_root'
  blogs_by_pk?: {
    __typename?: 'blogs'
    id: number
    title: string
    slug: string
    contents?: string | null
    thumbnail?: string | null
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

export type UpdateBlogsByPkMutationVariables = Types.Exact<{
  pk_columns: Types.Blogs_Pk_Columns_Input
  _set?: Types.InputMaybe<Types.Blogs_Set_Input>
}>

export type UpdateBlogsByPkMutation = {
  __typename?: 'mutation_root'
  update_blogs_by_pk?: {
    __typename?: 'blogs'
    id: number
    slug: string
    title: string
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

export type InsertBlogBlogTagsMutationVariables = Types.Exact<{
  objects:
    | Array<Types.Blog_Blog_Tags_Insert_Input>
    | Types.Blog_Blog_Tags_Insert_Input
  on_conflict?: Types.InputMaybe<Types.Blog_Blog_Tags_On_Conflict>
}>

export type InsertBlogBlogTagsMutation = {
  __typename?: 'mutation_root'
  insert_blog_blog_tags?: {
    __typename?: 'blog_blog_tags_mutation_response'
    returning: Array<{
      __typename?: 'blog_blog_tags'
      id: number
      blog_id: number
      blog_tag_id: number
    }>
  } | null
}

export type DeleteBlogBlogTagsMutationVariables = Types.Exact<{
  where: Types.Blog_Blog_Tags_Bool_Exp
}>

export type DeleteBlogBlogTagsMutation = {
  __typename?: 'mutation_root'
  delete_blog_blog_tags?: {
    __typename?: 'blog_blog_tags_mutation_response'
    returning: Array<{
      __typename?: 'blog_blog_tags'
      id: number
      blog_id: number
      blog_tag_id: number
    }>
  } | null
}

export const GetBlogTagForBlogEditFragmentFragmentDoc = gql`
  fragment getBlogTagForBlogEditFragment on blog_tags {
    id
    name
  }
`
export const GetBlogTagForBlogEditDocument = gql`
  query getBlogTagForBlogEdit {
    blog_tags {
      ...getBlogTagForBlogEditFragment
    }
  }
  ${GetBlogTagForBlogEditFragmentFragmentDoc}
`

export function useGetBlogTagForBlogEditQuery(
  options?: Omit<
    Urql.UseQueryArgs<GetBlogTagForBlogEditQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetBlogTagForBlogEditQuery,
    GetBlogTagForBlogEditQueryVariables
  >({ query: GetBlogTagForBlogEditDocument, ...options })
}
export const GetBlogsByPkDocument = gql`
  query getBlogsByPk($id: Int!) {
    blogs_by_pk(id: $id) {
      id
      title
      slug
      contents
      thumbnail
      blog_blog_tags {
        blog_tag {
          id
          name
          slug
        }
      }
    }
  }
`

export function useGetBlogsByPkQuery(
  options: Omit<Urql.UseQueryArgs<GetBlogsByPkQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetBlogsByPkQuery, GetBlogsByPkQueryVariables>({
    query: GetBlogsByPkDocument,
    ...options,
  })
}
export const UpdateBlogsByPkDocument = gql`
  mutation updateBlogsByPk(
    $pk_columns: blogs_pk_columns_input!
    $_set: blogs_set_input
  ) {
    update_blogs_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
      slug
      title
      contents
      blog_blog_tags {
        blog_tag {
          id
          name
          slug
        }
      }
    }
  }
`

export function useUpdateBlogsByPkMutation() {
  return Urql.useMutation<
    UpdateBlogsByPkMutation,
    UpdateBlogsByPkMutationVariables
  >(UpdateBlogsByPkDocument)
}
export const InsertBlogBlogTagsDocument = gql`
  mutation insertBlogBlogTags(
    $objects: [blog_blog_tags_insert_input!]!
    $on_conflict: blog_blog_tags_on_conflict
  ) {
    insert_blog_blog_tags(objects: $objects, on_conflict: $on_conflict) {
      returning {
        id
        blog_id
        blog_tag_id
      }
    }
  }
`

export function useInsertBlogBlogTagsMutation() {
  return Urql.useMutation<
    InsertBlogBlogTagsMutation,
    InsertBlogBlogTagsMutationVariables
  >(InsertBlogBlogTagsDocument)
}
export const DeleteBlogBlogTagsDocument = gql`
  mutation deleteBlogBlogTags($where: blog_blog_tags_bool_exp!) {
    delete_blog_blog_tags(where: $where) {
      returning {
        id
        blog_id
        blog_tag_id
      }
    }
  }
`

export function useDeleteBlogBlogTagsMutation() {
  return Urql.useMutation<
    DeleteBlogBlogTagsMutation,
    DeleteBlogBlogTagsMutationVariables
  >(DeleteBlogBlogTagsDocument)
}
