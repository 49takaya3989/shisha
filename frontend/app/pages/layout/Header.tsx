import { Title } from '@mantine/core'
import Image from 'next/image'

export const UserHeader = () => {
  return (
    <header className='mt-4'>
      <Title order={1} className='grid place-items-center'>
        <Image src='/logo.png' alt='しーしゃめでぃあ' width={160} height={28} />
      </Title>
    </header>
  )
}
