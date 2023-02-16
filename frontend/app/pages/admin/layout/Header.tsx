import Link from 'next/link'

import { useClerk } from '@clerk/clerk-react'
import { Avatar, Button } from '@mantine/core'

export const AdminHeader = () => {
  const { signOut } = useClerk()

  return (
    <header className="fixed top-0 left-0 z-50 flex h-[58px] w-screen items-center justify-end gap-5 bg-admin-base px-5">
      <Link href={'/'}>ホーム</Link>
      <Button
        onClick={() => signOut()}
        className="bg-admin-base font-normal text-common-black"
      >
        ログアウト
      </Button>
      <Link href={'/'}>
        <Avatar radius="xl" />
      </Link>
    </header>
  )
}
