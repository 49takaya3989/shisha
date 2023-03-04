import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Grid, Group, Image, List, Title } from '@mantine/core'
import dayjs from 'dayjs'
import { gql } from 'urql'

import { useBlogsByPkForUserBlogSingleQuery } from 'pages/blog/[id].page.generated'
import { BlogCommentItem } from 'pages/components/BlogCommentItem'
import { BlogCommentToCommentModal } from 'pages/components/BlogCommentToCommentModal'
import { UserCommentForm } from 'pages/components/CommentForm'
import { NewBlogLimited3 } from 'pages/components/NewBlogLimited3'
import { BlogCommentToCommentType } from 'pages/components/type'
import { UserLayout } from 'pages/layout/Layout'

gql`
  query blogsByPkForUserBlogSingle($id: Int!) {
    blogs_by_pk(id: $id) {
      ...blogsFragmentForUserBlogSingle
    }
  }

  fragment blogsFragmentForUserBlogSingle on blogs {
    id
    title
    thumbnail
    updated_at
    contents
    blog_blog_tags {
      blog_tag {
        id
        name
        slug
      }
    }
    blog_comments {
      id
      comment
      parent_comment_id
      updated_at
      user {
        uuid
      }
      blog_comments {
        id
        comment
        updated_at
        user {
          uuid
        }
      }
    }
  }
`

// *** <query example> ***
//
// query blogsByPkForUserBlogSingle($id: Int = 1) {
//   blogs_by_pk(id: $id) {
//     ...blogsFragmentForUserBlogSingle
//   }
// }
//
// *** < end query example> ***

const BlogSingleForUser = () => {
  const router = useRouter()
  const editId = router.query.id
  const [dateTime, setDateTime] = useState('')
  const [time, setTime] = useState('')
  const [result] = useBlogsByPkForUserBlogSingleQuery({
    variables: { id: Number(editId) },
  })
  const { data } = result
  const [opened, setOpened] = useState(false)
  const [selectedComment, setSelectedComment] =
    useState<BlogCommentToCommentType>({
      selectedCommentId: 0,
      selectedCommentDate: '',
      selectedCommentUser: '',
      selectedCommentContents: '',
      selectedCommentToComments: [
        {
          id: null,
          comment: '',
          updated_at: '',
          parent_comment_id: null,
          user: {
            uuid: '',
          },
        },
      ],
    })

  useEffect(() => {
    // date-time用の日時作成
    setDateTime(() => {
      return dayjs(data?.blogs_by_pk?.updated_at).format('YYYY-MM-DD')
    })

    // 表示日時作成
    setTime(() => {
      return dayjs(data?.blogs_by_pk?.updated_at).format('YYYY.MM.DD')
    })
  }, [data?.blogs_by_pk?.updated_at])

  console.log(data?.blogs_by_pk?.blog_comments)

  return (
    <>
      <UserLayout>
        <Grid>
          <Grid.Col span={9}>
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
                dangerouslySetInnerHTML={{
                  __html: data?.blogs_by_pk?.contents!,
                }}
                className="blog-content w-full"
              ></div>
            </Group>
            <List mt={60}>
              {data?.blogs_by_pk?.blog_comments.map((comment) => {
                if (!comment.parent_comment_id) {
                  return (
                    <BlogCommentItem
                      key={comment.id}
                      id={comment.id}
                      date={comment.updated_at}
                      user={comment.user.uuid}
                      comment={comment.comment}
                      commentToComments={comment.blog_comments}
                      handleResponse={setSelectedComment}
                      handleCommentModal={setOpened}
                    />
                  )
                }
              })}
            </List>
            <BlogCommentToCommentModal
              isActive={opened}
              selectedCommentDate={selectedComment.selectedCommentDate}
              selectedCommentUser={selectedComment.selectedCommentUser}
              selectedCommentContents={selectedComment.selectedCommentContents}
              selectedCommentToComments={
                selectedComment.selectedCommentToComments
              }
              handleCommentModal={setOpened}
              resetSelectedComment={setSelectedComment}
            >
              <UserCommentForm
                blogId={String(editId)}
                commentId={selectedComment.selectedCommentId}
              />
            </BlogCommentToCommentModal>
            <UserCommentForm blogId={String(editId)} />
          </Grid.Col>
          <Grid.Col span={3}>
            <NewBlogLimited3 />
          </Grid.Col>
        </Grid>
      </UserLayout>
    </>
  )
}

export default BlogSingleForUser
