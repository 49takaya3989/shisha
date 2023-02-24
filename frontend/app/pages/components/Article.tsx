import Link from 'next/link'

import { Badge, Card, Group, Image, List, Text } from '@mantine/core'
import { gql } from 'urql'

import { useGetBlogsForUserArchiveQuery } from 'pages/components/Article.generated'

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
    thumbnail
    blog_blog_tags {
      id
      blog_tag {
        id
        name
      }
    }
  }
`

export const BlogArticleForUser = () => {
  const [result] = useGetBlogsForUserArchiveQuery()
  const { data } = result
  return (
    <List display="flex" className="flex-wrap gap-12">
      {data
        ? data.blogs.map((blog) => (
            <List.Item key={blog.slug}>
              <Link
                href={`./blog/${blog.id}`}
                className="transition duration-300 ease-in hover:opacity-80"
              >
                <Card
                  key={blog.id}
                  className="lg:w-[300px]"
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                >
                  <Card.Section>
                    {blog.thumbnail ? (
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={300}
                        height={160}
                      />
                    ) : (
                      <Image
                        src="https://www.freeiconspng.com/uploads/no-image-icon-23.jpg"
                        alt="no image"
                        width={300}
                        height={160}
                      />
                    )}
                  </Card.Section>
                  <Group
                    position="apart"
                    mt="md"
                    mb="xs"
                    className="h-[50px] line-clamp-2"
                  >
                    <Text weight={500} className="w-full break-words">
                      {blog.title}
                    </Text>
                  </Group>
                  <Group display="flex" className="h-5 overflow-hidden">
                    {blog.blog_blog_tags.map((blog_blog_tag) => (
                      <Badge
                        key={blog_blog_tag.id}
                        color="pink"
                        variant="light"
                      >
                        {blog_blog_tag.blog_tag.name}
                      </Badge>
                    ))}
                  </Group>
                </Card>
              </Link>
            </List.Item>
          ))
        : ''}
    </List>
  )
}
