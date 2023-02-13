import { Badge, Card, Group, Image, List, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useGetBlogsSpecifiedTagSlugQuery,
  useGetBlogTagsForSpecifiedBlogCategorySlugQuery,
} from 'pages/blog/category/[slug].page.generated'
import { UserLayout } from 'pages/layout/Layout'
import { gql } from 'urql'

gql`
  query getBlogsSpecifiedTagSlug($where: blogs_bool_exp!) {
    blogs(where: $where) {
      ...blogsSpecifiedTagSlugFragment
    }
  }

  query getBlogTagsForSpecifiedBlogCategorySlug($where: blog_tags_bool_exp!) {
    blog_tags(where: $where) {
      ...blogTagsFragmentForSpecifiedBlogCategory
    }
  }

  fragment blogsSpecifiedTagSlugFragment on blogs {
    id
    title
    thumbnail
    udpated_at
    blog_blog_tags {
      ...blogBlogTagsFragment
    }
  }

  fragment blogBlogTagsFragment on blog_blog_tags {
    blog_tag {
      id
      name
    }
  }

  fragment blogTagsFragmentForSpecifiedBlogCategory on blog_tags {
    name
  }
`

// --- graphql request ex. ---
//
// query getBlogsSpecifiedTagSlug(
//   $where: blogs_bool_exp = {
//     blog_blog_tags: {
//       blog_tag: {
//         slug: {_eq: "create"}
//       }
//     }
//   }
// ) {
//   blogs(where: $where) {
//     ...blogsFragment1
//   }
// }

// query getBlogTagsForSpecifiedBlogCategorySlug(
//   $where: blog_tags_bool_exp = {
//     slug: { _eq: "create" }
//   }
// ) {
//   blog_tags(where: $where) {
//     ...blogTagsFragmentForSpecifiedBlogCategory
//   }
// }
//
// --- end graphql request ex. ---

const BlogSpecifiedCategoryForUser = () => {
  const router = useRouter()
  const isblogTagSlug = router.query.slug
  const [resultGetBlogsSpecifiedTagSlug] = useGetBlogsSpecifiedTagSlugQuery({
    variables: {
      where: {
        blog_blog_tags: { blog_tag: { slug: { _eq: String(isblogTagSlug) } } },
      },
    },
  })
  const [resultGetBlogTagsForSpecifiedBlogCategory] =
    useGetBlogTagsForSpecifiedBlogCategorySlugQuery({
      variables: {
        where: {
          slug: { _eq: String(isblogTagSlug) },
        },
      },
    })
  const dataGetBlogsSpecifiedTagSlug = resultGetBlogsSpecifiedTagSlug.data
  const dataGetBlogTagsForSpecifiedBlogCategory =
    resultGetBlogTagsForSpecifiedBlogCategory.data

  return (
    <UserLayout>
      <Title order={1}>
        ブログ：
        {dataGetBlogTagsForSpecifiedBlogCategory?.blog_tags.map(
          (category) => category.name
        )}
      </Title>
      <List mt={40} display='flex' className='flex-wrap gap-12'>
        {dataGetBlogsSpecifiedTagSlug
          ? dataGetBlogsSpecifiedTagSlug.blogs.map((blog) => (
              <List.Item key={blog.id}>
                <Link
                  href={`/blog/${blog.id}`}
                  className='transition duration-300 ease-in hover:opacity-80'
                >
                  <Card
                    className='lg:w-[300px]'
                    shadow='sm'
                    p='lg'
                    radius='md'
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
                          src='https://www.freeiconspng.com/uploads/no-image-icon-23.jpg'
                          alt='no image'
                          width={300}
                          height={160}
                        />
                      )}
                    </Card.Section>
                    <Group
                      position='apart'
                      mt='md'
                      mb='xs'
                      className='h-[50px] line-clamp-2'
                    >
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
                  </Card>
                </Link>
              </List.Item>
            ))
          : ''}
      </List>
    </UserLayout>
  )
}

export default BlogSpecifiedCategoryForUser
