import { Button, Group, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { useClerk } from '@clerk/clerk-react'

export const UserHeader = () => {
  const { signOut } = useClerk()

  return (
    <header className='mt-4'>
      <Title order={1} className='grid place-items-center'>
        <Image src='/logo.png' alt='しーしゃめでぃあ' width={160} height={28} />
      </Title>
      <Group mt={20} className='justify-center'>
        <Link href={`/admin/dashboard`}>管理画面</Link>
        <SignedIn>
          <Button
            onClick={() => signOut()}
            className='text-common-black font-normal bg-common-white'
          >
            ログアウト
          </Button>
        </SignedIn>
        <SignedOut>
          <Link href={`/sign-in`}>サインイン</Link>
        </SignedOut>
      </Group>
    </header>
  )
}
