import * as Types from '../../../../src/libs/urql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBlogTagForBlogEditQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBlogTagForBlogEditQuery = { __typename?: 'query_root', blog_tags: Array<{ __typename?: 'blog_tags', id: number, name: string }> };

export type BlogsByPkForAdminBlogEditQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type BlogsByPkForAdminBlogEditQuery = { __typename?: 'query_root', blogs_by_pk?: { __typename?: 'blogs', id: number, title: string, slug: string, contents?: string | null, thumbnail?: string | null, blog_blog_tags: Array<{ __typename?: 'blog_blog_tags', blog_tag: { __typename?: 'blog_tags', id: number, name: string, slug: string } }> } | null };

export type UpdateBlogsByPkForAdminBlogEditMutationVariables = Types.Exact<{
  pk_columns: Types.Blogs_Pk_Columns_Input;
  _set: Types.Blogs_Set_Input;
}>;


export type UpdateBlogsByPkForAdminBlogEditMutation = { __typename?: 'mutation_root', update_blogs_by_pk?: { __typename?: 'blogs', id: number, title: string, slug: string, contents?: string | null, thumbnail?: string | null, blog_blog_tags: Array<{ __typename?: 'blog_blog_tags', blog_tag: { __typename?: 'blog_tags', id: number, name: string, slug: string } }> } | null };

export type InsertBlogBlogTagsForAdminBlogEditMutationVariables = Types.Exact<{
  objects: Array<Types.Blog_Blog_Tags_Insert_Input> | Types.Blog_Blog_Tags_Insert_Input;
  on_conflict?: Types.InputMaybe<Types.Blog_Blog_Tags_On_Conflict>;
}>;


export type InsertBlogBlogTagsForAdminBlogEditMutation = { __typename?: 'mutation_root', insert_blog_blog_tags?: { __typename?: 'blog_blog_tags_mutation_response', returning: Array<{ __typename?: 'blog_blog_tags', id: number, blog_id: number, blog_tag_id: number }> } | null };

export type DeleteBlogBlogTagsForAdminBlogEditMutationVariables = Types.Exact<{
  where: Types.Blog_Blog_Tags_Bool_Exp;
}>;


export type DeleteBlogBlogTagsForAdminBlogEditMutation = { __typename?: 'mutation_root', delete_blog_blog_tags?: { __typename?: 'blog_blog_tags_mutation_response', returning: Array<{ __typename?: 'blog_blog_tags', id: number, blog_id: number, blog_tag_id: number }> } | null };

export type GetBlogTagForBlogEditFragmentFragment = { __typename?: 'blog_tags', id: number, name: string };

export type BlogsFragmentForAdminBlogEditFragment = { __typename?: 'blogs', id: number, title: string, slug: string, contents?: string | null, thumbnail?: string | null, blog_blog_tags: Array<{ __typename?: 'blog_blog_tags', blog_tag: { __typename?: 'blog_tags', id: number, name: string, slug: string } }> };

export const GetBlogTagForBlogEditFragmentFragmentDoc = gql`
    fragment getBlogTagForBlogEditFragment on blog_tags {
  id
  name
}
    `;
export const BlogsFragmentForAdminBlogEditFragmentDoc = gql`
    fragment blogsFragmentForAdminBlogEdit on blogs {
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
    `;
export const GetBlogTagForBlogEditDocument = gql`
    query getBlogTagForBlogEdit {
  blog_tags {
    ...getBlogTagForBlogEditFragment
  }
}
    ${GetBlogTagForBlogEditFragmentFragmentDoc}`;

export function useGetBlogTagForBlogEditQuery(options?: Omit<Urql.UseQueryArgs<GetBlogTagForBlogEditQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBlogTagForBlogEditQuery, GetBlogTagForBlogEditQueryVariables>({ query: GetBlogTagForBlogEditDocument, ...options });
};
export const BlogsByPkForAdminBlogEditDocument = gql`
    query blogsByPkForAdminBlogEdit($id: Int!) {
  blogs_by_pk(id: $id) {
    ...blogsFragmentForAdminBlogEdit
  }
}
    ${BlogsFragmentForAdminBlogEditFragmentDoc}`;

export function useBlogsByPkForAdminBlogEditQuery(options: Omit<Urql.UseQueryArgs<BlogsByPkForAdminBlogEditQueryVariables>, 'query'>) {
  return Urql.useQuery<BlogsByPkForAdminBlogEditQuery, BlogsByPkForAdminBlogEditQueryVariables>({ query: BlogsByPkForAdminBlogEditDocument, ...options });
};
export const UpdateBlogsByPkForAdminBlogEditDocument = gql`
    mutation updateBlogsByPkForAdminBlogEdit($pk_columns: blogs_pk_columns_input!, $_set: blogs_set_input!) {
  update_blogs_by_pk(_set: $_set, pk_columns: $pk_columns) {
    ...blogsFragmentForAdminBlogEdit
  }
}
    ${BlogsFragmentForAdminBlogEditFragmentDoc}`;

export function useUpdateBlogsByPkForAdminBlogEditMutation() {
  return Urql.useMutation<UpdateBlogsByPkForAdminBlogEditMutation, UpdateBlogsByPkForAdminBlogEditMutationVariables>(UpdateBlogsByPkForAdminBlogEditDocument);
};
export const InsertBlogBlogTagsForAdminBlogEditDocument = gql`
    mutation insertBlogBlogTagsForAdminBlogEdit($objects: [blog_blog_tags_insert_input!]!, $on_conflict: blog_blog_tags_on_conflict) {
  insert_blog_blog_tags(objects: $objects, on_conflict: $on_conflict) {
    returning {
      id
      blog_id
      blog_tag_id
    }
  }
}
    `;

export function useInsertBlogBlogTagsForAdminBlogEditMutation() {
  return Urql.useMutation<InsertBlogBlogTagsForAdminBlogEditMutation, InsertBlogBlogTagsForAdminBlogEditMutationVariables>(InsertBlogBlogTagsForAdminBlogEditDocument);
};
export const DeleteBlogBlogTagsForAdminBlogEditDocument = gql`
    mutation deleteBlogBlogTagsForAdminBlogEdit($where: blog_blog_tags_bool_exp!) {
  delete_blog_blog_tags(where: $where) {
    returning {
      id
      blog_id
      blog_tag_id
    }
  }
}
    `;

export function useDeleteBlogBlogTagsForAdminBlogEditMutation() {
  return Urql.useMutation<DeleteBlogBlogTagsForAdminBlogEditMutation, DeleteBlogBlogTagsForAdminBlogEditMutationVariables>(DeleteBlogBlogTagsForAdminBlogEditDocument);
};