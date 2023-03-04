import { Avatar, Button, Flex, List, Text } from '@mantine/core'
import dayjs from 'dayjs'

import { USER_BLOG_SINGLE } from 'helper/constant/text'
import { BlogCommentType } from 'pages/components/type'

export const BlogCommentItem = ({
  id,
  date,
  user,
  comment,
  commentToComments,
  handleResponse,
  handleCommentModal,
}: BlogCommentType) => {
  const formatedComment = comment.replace(/\n/g, '<br />')
  const formatedDate = dayjs(date).format('YYYY/MM/DD HH:mm')

  const handleBtn = () => {
    handleResponse({
      selectedCommentId: id,
      selectedCommentDate: formatedDate,
      selectedCommentUser: user,
      selectedCommentContents: formatedComment,
      selectedCommentToComments: commentToComments.map((el) => ({
        id: el.id,
        comment: el.comment,
        updated_at: el.updated_at,
        parent_comment_id: el.parent_comment_id,
        user: {
          uuid: el.user.uuid,
        },
      })),
    })
    handleCommentModal(true)
  }

  return (
    <List.Item className="[&:not(:first-of-type)]:mt-6">
      <Flex gap="sm" align="center">
        <Text>{formatedDate}</Text>
        <Flex align="center">
          <Avatar radius="xl" />
          <Text>{user}</Text>
        </Flex>
      </Flex>
      <Text
        dangerouslySetInnerHTML={{
          __html: formatedComment,
        }}
        mt={10}
        className="w-full break-all"
      ></Text>
      <Button
        onClick={handleBtn}
        className="h-max w-max p-0 text-[12px] text-user-gray"
      >
        {USER_BLOG_SINGLE.FORM.RESPONSE}
      </Button>
    </List.Item>
  )
}
