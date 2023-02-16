import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Group, Image, List, Title } from '@mantine/core'
import dayjs from 'dayjs'
import { gql } from 'urql'

import { useGetBlogsByPkForUserSingleQuery } from 'pages/blog/[id].page.generated'
import { UserLayout } from 'pages/layout/Layout'

gql`
  query getBlogsByPkForUserSingle($id: Int!) {
    blogs_by_pk(id: $id) {
      ...blogsFragment
    }
  }

  fragment blogsFragment on blogs {
    title
    thumbnail
    udpated_at
    contents
    blog_blog_tags {
      blog_tag {
        id
        name
        slug
      }
    }
  }
`

const BlogSingleForUser = () => {
  const router = useRouter()
  const editId = router.query.id
  const [dateTime, setDateTime] = useState('')
  const [time, setTime] = useState('')
  const [result] = useGetBlogsByPkForUserSingleQuery({
    variables: { id: Number(editId) },
  })
  const { data } = result

  useEffect(() => {
    setDateTime(() => {
      return dayjs(data?.blogs_by_pk?.udpated_at).format('YYYY-MM-DD')
    })
    setTime(() => {
      return dayjs(data?.blogs_by_pk?.udpated_at).format('YYYY.MM.DD')
    })
  }, [data?.blogs_by_pk?.udpated_at])

  return (
    <>
      <UserLayout>
        <Title order={1} className="border-b">
          {data?.blogs_by_pk?.title}
        </Title>
        <time date-time={dateTime}>{time}</time>
        <List mt={10} display="flex" className="gap-[10px]">
          {data?.blogs_by_pk?.blog_blog_tags.map((tag) => (
            <List.Item key={tag.blog_tag.id}>
              <Link
                href={`/blog/category/${tag.blog_tag.slug}`}
                className="rounded border p-1 hover:bg-common-black hover:text-common-white"
              >
                {tag.blog_tag.name}
              </Link>
            </List.Item>
          ))}
        </List>
        {data?.blogs_by_pk?.thumbnail ? (
          <Group mt={10}>
            <Image
              src={data?.blogs_by_pk?.thumbnail}
              alt={data?.blogs_by_pk?.title}
            />
          </Group>
        ) : (
          ''
        )}
        <Group mt={60}>
          <div
            dangerouslySetInnerHTML={{ __html: data?.blogs_by_pk?.contents! }}
            className="blog-content w-full"
          ></div>
        </Group>
      </UserLayout>
    </>
  )
}

export default BlogSingleForUser
