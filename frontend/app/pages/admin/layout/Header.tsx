import { Avatar, Button } from '@mantine/core'
import Link from 'next/link'
import { useClerk } from '@clerk/clerk-react'

const AdminHeader = () => {
  const { signOut } = useClerk()

  return (
    <header className='fixed top-0 left-0 w-screen h-[58px] px-5 flex items-center justify-end gap-5 bg-admin-base z-50'>
      <Link href={'/'}>ホーム</Link>
      <Button
        onClick={() => signOut()}
        className='text-common-black font-normal bg-admin-base'
      >
        ログアウト
      </Button>
      <Link href={'/'}>
        <Avatar radius='xl' />
      </Link>
    </header>
  )
}

export default AdminHeader
