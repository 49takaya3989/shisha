import * as Types from '../../src/libs/urql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBlogsForUserArchiveQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBlogsForUserArchiveQuery = { __typename?: 'query_root', blogs: Array<{ __typename?: 'blogs', id: number, title: string, slug?: string | null, contents?: string | null, thumbnail?: string | null, blog_blog_tags: Array<{ __typename?: 'blog_blog_tags', blog_tag: { __typename?: 'blog_tags', id: number, name: string } }> }> };

export type GetBlogsForUserArchiveFragmentFragment = { __typename?: 'blogs', id: number, title: string, slug?: string | null, contents?: string | null, thumbnail?: string | null, blog_blog_tags: Array<{ __typename?: 'blog_blog_tags', blog_tag: { __typename?: 'blog_tags', id: number, name: string } }> };

export const GetBlogsForUserArchiveFragmentFragmentDoc = gql`
    fragment getBlogsForUserArchiveFragment on blogs {
  id
  title
  slug
  contents
  thumbnail
  blog_blog_tags {
    blog_tag {
      id
      name
    }
  }
}
    `;
export const GetBlogsForUserArchiveDocument = gql`
    query getBlogsForUserArchive {
  blogs {
    ...getBlogsForUserArchiveFragment
  }
}
    ${GetBlogsForUserArchiveFragmentFragmentDoc}`;

export function useGetBlogsForUserArchiveQuery(options?: Omit<Urql.UseQueryArgs<GetBlogsForUserArchiveQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBlogsForUserArchiveQuery, GetBlogsForUserArchiveQueryVariables>({ query: GetBlogsForUserArchiveDocument, ...options });
};