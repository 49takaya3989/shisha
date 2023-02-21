import Image from 'next/image'
import Link from 'next/link'

import { useClerk } from '@clerk/clerk-react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Button, Group, List, Title } from '@mantine/core'
import { gql } from 'urql'

import { ROUTE } from 'helper/constant/route'
import { useGetBlogTagsForUserHeaderQuery } from 'pages/layout/Header.generated'

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
    blog_blog_tags {
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
    <header className="relative mt-4 pb-3 shadow-md">
      <Title order={1} className="grid place-items-center">
        <Link href={ROUTE.HOME}>
          <Image
            src="/logo.png"
            alt="しーしゃめでぃあ"
            width={160}
            height={28}
          />
        </Link>
      </Title>
      <Group className="absolute top-0 right-1 justify-center">
        <Link href={`/admin/dashboard`} className="h-max">
          管理画面
        </Link>
        <SignedIn>
          <Button
            onClick={() => signOut()}
            className="h-max bg-common-white font-normal text-common-black"
          >
            ログアウト
          </Button>
        </SignedIn>
        <SignedOut>
          <Link href={`/sign-in`} className="h-max">
            サインイン
          </Link>
        </SignedOut>
      </Group>
      <nav className="mt-5">
        <List display="flex" className="justify-center gap-4">
          {data?.blog_tags.map((tag) =>
            tag.blog_blog_tags.length > 0 ? (
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
