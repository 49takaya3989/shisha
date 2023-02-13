import Link from 'next/link'

import { Flex, Title } from '@mantine/core'

import { AdminContentsHeaderType } from 'pages/admin/type'

export const AdminContentsHeader = ({
  heading,
  btnLink,
  btnLabel,
}: AdminContentsHeaderType) => {
  return (
    <Flex gap={20} align="center" mb={40}>
      <Title order={1} size="h2">
        {heading}
      </Title>
      {btnLink && btnLabel ? (
        <Link href={btnLink} className="rounded bg-admin-base px-3 py-1">
          {btnLabel}
        </Link>
      ) : (
        ''
      )}
    </Flex>
  )
}
