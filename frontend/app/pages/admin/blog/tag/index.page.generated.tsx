import * as Types from '../../../../src/libs/urql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type InsertBlogTagMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  slug: Types.Scalars['String'];
}>;


export type InsertBlogTagMutation = { __typename?: 'mutation_root', insert_blog_tags_one?: { __typename?: 'blog_tags', id: number, name: string, slug: string } | null };


export const InsertBlogTagDocument = gql`
    mutation insertBlogTag($name: String!, $slug: String!) {
  insert_blog_tags_one(object: {name: $name, slug: $slug}) {
    id
    name
    slug
  }
}
    `;

export function useInsertBlogTagMutation() {
  return Urql.useMutation<InsertBlogTagMutation, InsertBlogTagMutationVariables>(InsertBlogTagDocument);
};