import { Group, Image, List, Title } from '@mantine/core'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useGetBlogsByPkForUserSingleQuery } from 'pages/blog/[id].page.generated'
import { UserLayout } from 'pages/layout/Layout'
import { useEffect, useState } from 'react'
import { gql } from 'urql'

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
      }
    }
  }
`

const BlogSingle = () => {
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
        <Title order={1}>{data?.blogs_by_pk?.title}</Title>
        <time date-time={dateTime}>{time}</time>
        <List display='flex' className='gap-[10px]'>
          {data?.blogs_by_pk?.blog_blog_tags.map((tag) => (
            <List.Item key={tag.blog_tag.id}>{tag.blog_tag.name}</List.Item>
          ))}
        </List>
        <Group mt={10}>
          <Image src={data?.blogs_by_pk?.thumbnail} alt={data?.blogs_by_pk?.title} />
        </Group>
        <Group mt={60}>
          <div dangerouslySetInnerHTML={{__html: data?.blogs_by_pk?.contents!}} className='blog-content w-full'></div>
        </Group>
      </UserLayout>
    </>
  )
}

export default BlogSingle
