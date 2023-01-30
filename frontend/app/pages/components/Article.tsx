import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import { useGetBlogsForUserArchiveQuery } from 'pages/components/Article.generated'

import { gql } from 'urql'

gql`
  query getBlogsForUserArchive {
    blogs {
      ...getBlogsForUserArchiveFragment
    }
  }

  fragment getBlogsForUserArchiveFragment on blogs {
    id
    title
    slug
    contents
    blog_blog_tags {
      blog_tag {
        id
        name
      }
    }
  }
`

export const Article = () => {
  const [result] = useGetBlogsForUserArchiveQuery()
  const { data } = result
  return (
    <ul className='flex flex-wrap gap-12'>
      {data
        ? data.blogs.map((blog) => (
            <Card
              key={blog.id}
              className='lg:w-[300px]'
              shadow='sm'
              p='lg'
              radius='md'
              withBorder
            >
              <Card.Section>
                <Image
                  src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                  alt='Norway'
                  width={300}
                  height={160}
                />
              </Card.Section>

              <Group position='apart' mt='md' mb='xs'>
                <Text weight={500} className='w-full break-words'>
                  {blog.title}
                </Text>
              </Group>
              <Group display='flex'>
                {blog.blog_blog_tags.map((blog_blog_tag) => (
                  <Badge
                    key={blog_blog_tag.blog_tag.id}
                    color='pink'
                    variant='light'
                  >
                    {blog_blog_tag.blog_tag.name}
                  </Badge>
                ))}
              </Group>

              <Text size='sm' color='dimmed'>{`${blog.contents}`}</Text>
            </Card>
          ))
        : ''}
    </ul>
  )
}
