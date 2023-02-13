import { Button, Group, List, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { useClerk } from '@clerk/clerk-react'
import { gql } from 'urql'
import { useGetBlogTagsForUserHeaderQuery } from 'pages/layout/Header.generated'
import { ROUTE } from 'helper/constant/route'

gql`
  query getBlogTagsForUserHeader {
    blog_tags {
      ...blogTagsForUserHeaderFragment
    }
  }

  fragment blogTagsForUserHeaderFragment on blog_tags {
    id
    name
    slug
    blogs {
      blog {
        id
      }
    }
  }
`

export const UserHeader = () => {
  const [result] = useGetBlogTagsForUserHeaderQuery()
  const { data } = result
  const { signOut } = useClerk()

  return (
    <header className='relative mt-4 shadow-md pb-3'>
      <Title order={1} className='grid place-items-center'>
        <Link href={ROUTE.HOME}>
          <Image
            src='/logo.png'
            alt='しーしゃめでぃあ'
            width={160}
            height={28}
          />
        </Link>
      </Title>
      <Group className='absolute top-0 right-1 justify-center'>
        <Link href={`/admin/dashboard`} className='h-max'>
          管理画面
        </Link>
        <SignedIn>
          <Button
            onClick={() => signOut()}
            className='text-common-black font-normal bg-common-white h-max'
          >
            ログアウト
          </Button>
        </SignedIn>
        <SignedOut>
          <Link href={`/sign-in`} className='h-max'>
            サインイン
          </Link>
        </SignedOut>
      </Group>
      <nav className='mt-5'>
        <List display='flex' className='justify-center gap-4'>
          {data?.blog_tags.map((tag) =>
            tag.blogs.length > 0 ? (
              <List.Item key={tag.id}>
                <Link href={`/blog/category/${tag.slug}`}>{tag.name}</Link>
              </List.Item>
            ) : (
              ''
            )
          )}
        </List>
      </nav>
    </header>
  )
}
