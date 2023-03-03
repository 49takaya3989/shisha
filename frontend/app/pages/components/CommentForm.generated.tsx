
import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UsersQueryVariables = Types.Exact<{
  where: Types.Users_Bool_Exp
}>

export type UsersQuery = {
  __typename?: 'query_root'
  users: Array<{ __typename?: 'users'; id: number; uuid: string }>
}

export type InsertUsersOneForUserMutationVariables = Types.Exact<{
  object: Types.Users_Insert_Input
}>

export type InsertUsersOneForUserMutation = {
  __typename?: 'mutation_root'
  insert_users_one?: { __typename?: 'users'; id: number; uuid: string } | null
}

export type InsertBlogCommentsOneMutationVariables = Types.Exact<{
  object: Types.Blog_Comments_Insert_Input
}>

export type InsertBlogCommentsOneMutation = {
  __typename?: 'mutation_root'
  insert_blog_comments_one?: { __typename?: 'blog_comments'; id: number } | null
}

export type UsersFragmentFragment = {
  __typename?: 'users'
  id: number
  uuid: string
}

export const UsersFragmentFragmentDoc = gql`
  fragment usersFragment on users {
    id
    uuid
  }
`
export const UsersDocument = gql`
  query users($where: users_bool_exp!) {
    users(where: $where) {
      ...usersFragment
    }
  }
  ${UsersFragmentFragmentDoc}
`

export function useUsersQuery(
  options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>
) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({
    query: UsersDocument,
    ...options,
  })
}
export const InsertUsersOneForUserDocument = gql`
  mutation insertUsersOneForUser($object: users_insert_input!) {
    insert_users_one(
      object: $object
      on_conflict: { constraint: users_uuid_key, update_columns: uuid }
    ) {
      ...usersFragment
    }
  }
  ${UsersFragmentFragmentDoc}
`

export function useInsertUsersOneForUserMutation() {
  return Urql.useMutation<
    InsertUsersOneForUserMutation,
    InsertUsersOneForUserMutationVariables
  >(InsertUsersOneForUserDocument)
}
export const InsertBlogCommentsOneDocument = gql`
  mutation insertBlogCommentsOne($object: blog_comments_insert_input!) {
    insert_blog_comments_one(
      object: $object
      on_conflict: { constraint: blog_comments_pkey, update_columns: id }
    ) {
      id
    }
  }
`

export function useInsertBlogCommentsOneMutation() {
  return Urql.useMutation<
    InsertBlogCommentsOneMutation,
    InsertBlogCommentsOneMutationVariables
  >(InsertBlogCommentsOneDocument)
}
