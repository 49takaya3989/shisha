import gql from 'graphql-tag'
import * as Urql from 'urql'

import * as Types from '../../../src/libs/urql/types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetBlogsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetBlogsQuery = {
  __typename?: 'query_root'
  blogs: Array<{
    __typename?: 'blogs'
    id: number
    title: string
    contents?: string | null
    thumbnail?: string | null
    udpated_at: any
    blog_blog_tags: Array<{
      __typename?: 'blog_blog_tags'
      blog_tag: { __typename?: 'blog_tags'; id: number; name: string }
    }>
  }>
}

export type GetBlogsFragmentFragment = {
  __typename?: 'blogs'
  id: number
  title: string
  contents?: string | null
  thumbnail?: string | null
  udpated_at: any
  blog_blog_tags: Array<{
    __typename?: 'blog_blog_tags'
    blog_tag: { __typename?: 'blog_tags'; id: number; name: string }
  }>
}

export type DeleteBlogsByPkMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type DeleteBlogsByPkMutation = {
  __typename?: 'mutation_root'
  delete_blogs_by_pk?: {
    __typename?: 'blogs'
    id: number
    title: string
    slug: string
    contents?: string | null
  } | null
}

export const GetBlogsFragmentFragmentDoc = gql`
  fragment getBlogsFragment on blogs {
    id
    title
    contents
    thumbnail
    blog_blog_tags {
      blog_tag {
        id
        name
      }
    }
    udpated_at
  }
`
export const GetBlogsDocument = gql`
  query getBlogs {
    blogs {
      ...getBlogsFragment
    }
  }
  ${GetBlogsFragmentFragmentDoc}
`

export function useGetBlogsQuery(
  options?: Omit<Urql.UseQueryArgs<GetBlogsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetBlogsQuery, GetBlogsQueryVariables>({
    query: GetBlogsDocument,
    ...options,
  })
}
export const DeleteBlogsByPkDocument = gql`
  mutation deleteBlogsByPk($id: Int!) {
    delete_blogs_by_pk(id: $id) {
      id
      title
      slug
      contents
    }
  }
`

export function useDeleteBlogsByPkMutation() {
  return Urql.useMutation<
    DeleteBlogsByPkMutation,
    DeleteBlogsByPkMutationVariables
  >(DeleteBlogsByPkDocument)
}
