import Link from 'next/link'

import { Image, List, Text } from '@mantine/core'
import { gql } from 'urql'

import { useBlogsForUserQuery } from 'pages/components/NewBlogLimited3.generated'


gql`
  query blogsForUser {
    blogs(limit: 3) {
      ...blogsFragment
    }
  }

  fragment blogsFragment on blogs {
    id
    title
    thumbnail
  }
`

export const NewBlogLimited3 = () => {
  const [result] = useBlogsForUserQuery()
  const { data } = result

  return (
    <>
      <Text w="100%" className="bg-common-black text-common-white">
        新着記事
      </Text>
      <List className="border p-1">
        {data?.blogs.map((blog) => (
          <List.Item
            key={blog.id}
            mt={16}
            className="[&:not(:first-of-type)]:mt-6"
          >
            <Link href={`/blog/${blog.id}`}>
              {blog.thumbnail ? (
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  width={230}
                  height={135}
                />
              ) : (
                <Image
                  src="https://www.freeiconspng.com/uploads/no-image-icon-23.jpg"
                  alt="no image"
                  width={230}
                  height={135}
                />
              )}
              <Text mt={4} className="break-all leading-5">
                {blog.title}
              </Text>
            </Link>
          </List.Item>
        ))}
      </List>
    </>
  )
}
