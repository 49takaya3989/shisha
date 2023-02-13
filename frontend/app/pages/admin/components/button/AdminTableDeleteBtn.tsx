import { useState } from 'react'

import { Button, Flex, Modal, Text } from '@mantine/core'

import { ADMIN_TABLE, ADMIN_TABLE_DELETE_MODAL } from 'helper/constant/text'
import { AdminTableDeleteBtnType } from 'pages/admin/components/type'

const btnStyle =
  'rounded-md w-12 h-6 flex justify-center items-center bg-admin-base'
const modalBtnStyle = 'w-[140px] h-[2em]'

export const AdminTableDeleteBtn = ({ id, click }: AdminTableDeleteBtnType) => {
  const [opened, setOpened] = useState(false)

  return (
    <div>
      <Button
        onClick={() => setOpened(true)}
        c="black"
        className={`${btnStyle} bg-admin-cancel text-[14px] font-normal text-common-black`}
      >
        {ADMIN_TABLE.DELETE}
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="lg"
        centered
      >
        <Text mt={60} align="center" size="md">
          {ADMIN_TABLE_DELETE_MODAL.DESC}
        </Text>
        <Flex
          mt={60}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button
            onClick={() => setOpened(false)}
            className={`${btnStyle} ${modalBtnStyle} text-[14px] font-normal text-common-black`}
          >
            {ADMIN_TABLE_DELETE_MODAL.CANCEL}
          </Button>
          <Button
            className={`${btnStyle} ${modalBtnStyle} bg-admin-cancel text-[14px] font-normal text-common-black`}
            onClick={() => click(id)}
          >
            {ADMIN_TABLE_DELETE_MODAL.DELETE}
          </Button>
        </Flex>
      </Modal>
    </div>
  )
}
