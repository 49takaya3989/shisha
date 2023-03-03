import { Flex, List, Text } from '@mantine/core'
import dayjs from 'dayjs'

type BlogCommentType = {
  date: string
  user: string
  comment: string
}

export const BlogCommentItem = ({ date, user, comment }: BlogCommentType) => {
  const commentFormat = comment.replace(/\n/g, '<br />')
  return (
    <List.Item className="[&:not(:first-of-type)]:mt-6">
      <Flex gap="sm" align="center">
        <Text>{dayjs(date).format('YYYY/MM/DD HH:mm')}</Text>
        <Text>{user}</Text>
      </Flex>
      <Text
        dangerouslySetInnerHTML={{
          __html: commentFormat,
        }}
      ></Text>
    </List.Item>
  )
}
