import { Avatar } from '@mantine/core'
import Link from 'next/link'

const AdminHeader = () => {
  return (
    <header className='fixed top-0 left-0 w-screen h-[58px] px-5 flex items-center justify-end gap-5 bg-admin-base z-50'>
      <Link href={'/'}>ホーム</Link>
      <Link href={'/'}>ログイン</Link>
      <Link href={'/'}>
        <Avatar radius='xl' />
      </Link>
    </header>
  )
}

export default AdminHeader
