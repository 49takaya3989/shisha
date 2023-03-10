import { Avatar, Box, Flex, Modal, Text } from '@mantine/core'
import dayjs from 'dayjs'

import { BlogCommentToCommentModalType } from 'pages/components/type'

export const BlogCommentToCommentModal = ({
  children,
  isActive,
  selectedCommentDate,
  selectedCommentUser,
  selectedCommentContents,
  selectedCommentToComments,
  handleCommentModal,
  resetSelectedComment,
}: BlogCommentToCommentModalType) => {
  const closeModal = () => {
    handleCommentModal(false)
    resetSelectedComment({
      selectedCommentId: null,
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
  }

  return (
    <Modal opened={isActive} onClose={closeModal} size="55%">
      <Box>
        <Text className="text-[12px]">{selectedCommentDate}</Text>
        <Flex align="center">
          <Avatar radius="xl" />
          <Text>{selectedCommentUser}</Text>
        </Flex>
        <Text
          dangerouslySetInnerHTML={{
            __html: selectedCommentContents,
          }}
          mt={10}
          className="w-full break-all"
        ></Text>
        <Box pl={20}>
          {selectedCommentToComments?.map((commentToComment) => (
            <Box key={commentToComment.id} mt={20}>
              <Text className="text-[12px]">
                {dayjs(commentToComment.updated_at).format('YYYY/MM/DD HH:mm')}
              </Text>
              <Flex align="center">
                <Avatar radius="xl" />
                <Text>{commentToComment.user.uuid}</Text>
              </Flex>
              <Text
                dangerouslySetInnerHTML={{
                  __html: commentToComment.comment.replace(/\n/g, '<br />'),
                }}
                mt={10}
                className="w-full break-all"
              ></Text>
            </Box>
          ))}
        </Box>
        {children}
      </Box>
    </Modal>
  )
}
