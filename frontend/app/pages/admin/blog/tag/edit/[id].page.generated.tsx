import * as Types from '../../../../../src/libs/urql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type BlogTagsByPkForAdminBlogTagEditQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type BlogTagsByPkForAdminBlogTagEditQuery = { __typename?: 'query_root', blog_tags_by_pk?: { __typename?: 'blog_tags', id: number, name: string, slug: string } | null };

export type BlogTagsFragmentForAdminTagEditFragment = { __typename?: 'blog_tags', id: number, name: string, slug: string };

export type UpdateBlogTagsByPkForAdminMutationVariables = Types.Exact<{
  pk_columns: Types.Blog_Tags_Pk_Columns_Input;
  _set: Types.Blog_Tags_Set_Input;
}>;


export type UpdateBlogTagsByPkForAdminMutation = { __typename?: 'mutation_root', update_blog_tags_by_pk?: { __typename?: 'blog_tags', id: number, name: string } | null };

export type BlogTagsFragmentForAdminBlogTagUpdateFragment = { __typename?: 'blog_tags', id: number, name: string };

export const BlogTagsFragmentForAdminTagEditFragmentDoc = gql`
    fragment blogTagsFragmentForAdminTagEdit on blog_tags {
  id
  name
  slug
}
    `;
export const BlogTagsFragmentForAdminBlogTagUpdateFragmentDoc = gql`
    fragment blogTagsFragmentForAdminBlogTagUpdate on blog_tags {
  id
  name
}
    `;
export const BlogTagsByPkForAdminBlogTagEditDocument = gql`
    query blogTagsByPkForAdminBlogTagEdit($id: Int!) {
  blog_tags_by_pk(id: $id) {
    ...blogTagsFragmentForAdminTagEdit
  }
}
    ${BlogTagsFragmentForAdminTagEditFragmentDoc}`;

export function useBlogTagsByPkForAdminBlogTagEditQuery(options: Omit<Urql.UseQueryArgs<BlogTagsByPkForAdminBlogTagEditQueryVariables>, 'query'>) {
  return Urql.useQuery<BlogTagsByPkForAdminBlogTagEditQuery, BlogTagsByPkForAdminBlogTagEditQueryVariables>({ query: BlogTagsByPkForAdminBlogTagEditDocument, ...options });
};
export const UpdateBlogTagsByPkForAdminDocument = gql`
    mutation updateBlogTagsByPkForAdmin($pk_columns: blog_tags_pk_columns_input!, $_set: blog_tags_set_input!) {
  update_blog_tags_by_pk(pk_columns: $pk_columns, _set: $_set) {
    ...blogTagsFragmentForAdminBlogTagUpdate
  }
}
    ${BlogTagsFragmentForAdminBlogTagUpdateFragmentDoc}`;

export function useUpdateBlogTagsByPkForAdminMutation() {
  return Urql.useMutation<UpdateBlogTagsByPkForAdminMutation, UpdateBlogTagsByPkForAdminMutationVariables>(UpdateBlogTagsByPkForAdminDocument);
};