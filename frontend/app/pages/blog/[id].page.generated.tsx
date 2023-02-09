import * as Types from '../../src/libs/urql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBlogsByPkForUserSingleQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetBlogsByPkForUserSingleQuery = { __typename?: 'query_root', blogs_by_pk?: { __typename?: 'blogs', title: string, thumbnail?: string | null, udpated_at: any, contents?: string | null, blog_blog_tags: Array<{ __typename?: 'blog_blog_tags', blog_tag: { __typename?: 'blog_tags', id: number, name: string } }> } | null };

export type BlogsFragmentFragment = { __typename?: 'blogs', title: string, thumbnail?: string | null, udpated_at: any, contents?: string | null, blog_blog_tags: Array<{ __typename?: 'blog_blog_tags', blog_tag: { __typename?: 'blog_tags', id: number, name: string } }> };

export const BlogsFragmentFragmentDoc = gql`
    fragment blogsFragment on blogs {
  title
  thumbnail
  udpated_at
  contents
  blog_blog_tags {
    blog_tag {
      id
      name
    }
  }
}
    `;
export const GetBlogsByPkForUserSingleDocument = gql`
    query getBlogsByPkForUserSingle($id: Int!) {
  blogs_by_pk(id: $id) {
    ...blogsFragment
  }
}
    ${BlogsFragmentFragmentDoc}`;

export function useGetBlogsByPkForUserSingleQuery(options: Omit<Urql.UseQueryArgs<GetBlogsByPkForUserSingleQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBlogsByPkForUserSingleQuery, GetBlogsByPkForUserSingleQueryVariables>({ query: GetBlogsByPkForUserSingleDocument, ...options });
};