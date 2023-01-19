import Link from 'next/link'
import { AdminContentsHeaderType } from 'pages/admin/type'
import { Flex, Title } from '@mantine/core'

const AdminContentsHeader = ({
  heading,
  btnLink,
  btnLabel,
}: AdminContentsHeaderType) => {
  return (
    <Flex gap={20} align='center' mb={40}>
      <Title order={1} size='h2'>
        {heading}
      </Title>
      {btnLink && btnLabel ? (
        <Link href={btnLink} className='rounded px-3 py-1 bg-admin-base'>
          {btnLabel}
        </Link>
      ) : (
        ''
      )}
    </Flex>
  )
}

export default AdminContentsHeader
