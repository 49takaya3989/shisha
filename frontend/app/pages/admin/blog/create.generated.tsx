import * as Types from '../../../src/libs/urql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBlogTagForBlogCreateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBlogTagForBlogCreateQuery = { __typename?: 'query_root', blog_tags: Array<{ __typename?: 'blog_tags', id: number, name: string }> };

export type GetBlogTagForBlogCreateFragmentFragment = { __typename?: 'blog_tags', id: number, name: string };

export type InsertBlogMutationVariables = Types.Exact<{
  title: Types.Scalars['String'];
  slug: Types.Scalars['String'];
  blog_blog_tags?: Types.InputMaybe<Types.Blog_Blog_Tags_Arr_Rel_Insert_Input>;
  contents: Types.Scalars['String'];
}>;


export type InsertBlogMutation = { __typename?: 'mutation_root', insert_blogs_one?: { __typename?: 'blogs', id: number, title: string, slug?: string | null, contents?: string | null, created_at: any, udpated_at: any, blog_blog_tags: Array<{ __typename?: 'blog_blog_tags', blog_tag: { __typename?: 'blog_tags', id: number, name: string, slug: string } }> } | null };

export const GetBlogTagForBlogCreateFragmentFragmentDoc = gql`
    fragment getBlogTagForBlogCreateFragment on blog_tags {
  id
  name
}
    `;
export const GetBlogTagForBlogCreateDocument = gql`
    query getBlogTagForBlogCreate {
  blog_tags {
    ...getBlogTagForBlogCreateFragment
  }
}
    ${GetBlogTagForBlogCreateFragmentFragmentDoc}`;

export function useGetBlogTagForBlogCreateQuery(options?: Omit<Urql.UseQueryArgs<GetBlogTagForBlogCreateQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBlogTagForBlogCreateQuery, GetBlogTagForBlogCreateQueryVariables>({ query: GetBlogTagForBlogCreateDocument, ...options });
};
export const InsertBlogDocument = gql`
    mutation insertBlog($title: String!, $slug: String!, $blog_blog_tags: blog_blog_tags_arr_rel_insert_input, $contents: String!) {
  insert_blogs_one(
    object: {title: $title, slug: $slug, blog_blog_tags: $blog_blog_tags, contents: $contents}
  ) {
    id
    title
    slug
    blog_blog_tags {
      blog_tag {
        id
        name
        slug
      }
    }
    contents
    created_at
    udpated_at
  }
}
    `;

export function useInsertBlogMutation() {
  return Urql.useMutation<InsertBlogMutation, InsertBlogMutationVariables>(InsertBlogDocument);
};