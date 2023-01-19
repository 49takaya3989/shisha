import { Box, NavLink } from '@mantine/core'
import { ROUTE } from 'helper/constant/route'
import { ADMIN_SIDEBAR } from 'helper/constant/text'
import Link from 'next/link'

export const AdminSidebar = () => {
  return (
    <div className='fixed w-1/6'>
      <Box h='100vh' w='100%' className='bg-admin-base'>
        <Link
          href={ROUTE.ADMIN_DASHBOARD}
          className='px-3 py-2 block hover:bg-common-white'
        >
          {ADMIN_SIDEBAR.DASHBOARD}
        </Link>
        <NavLink label={ADMIN_SIDEBAR.BLOG} childrenOffset={0}>
          <NavLinkItem
            href={ROUTE.ADMIN_BLOG_ARCHIVE}
            label={ADMIN_SIDEBAR.BLOG_ARCHIVE}
          />
          <NavLinkItem
            href={ROUTE.ADMIN_BLOG_CREATE}
            label={ADMIN_SIDEBAR.BLOG_CREATE}
          />
          <NavLinkItem
            href={ROUTE.ADMIN_BLOG_TAG_ARCHIVE}
            label={ADMIN_SIDEBAR.BLOG_TAG_ARCHIVE}
          />
        </NavLink>
        <NavLink label={ADMIN_SIDEBAR.RECIPE} childrenOffset={0}>
          <NavLinkItem
            href={ROUTE.ADMIN_RECIPE_ARCHIVE}
            label={ADMIN_SIDEBAR.RECIPE_ARCHIVE}
          />
          <NavLinkItem
            href={ROUTE.ADMIN_RECIPE_CREATE}
            label={ADMIN_SIDEBAR.RECIPE_CREATE}
          />
          <NavLinkItem
            href={ROUTE.ADMIN_RECIPE_TAG_ARCHIVE}
            label={ADMIN_SIDEBAR.RECIPE_TAG_ARCHIVE}
          />
        </NavLink>
        <NavLink label={ADMIN_SIDEBAR.FLAVOR} childrenOffset={0}>
          <NavLinkItem
            href={ROUTE.ADMIN_FLAVOR_ARCHIVE}
            label={ADMIN_SIDEBAR.FLAVOR_ARCHIVE}
          />
          <NavLinkItem
            href={ROUTE.ADMIN_FLAVOR_CREATE}
            label={ADMIN_SIDEBAR.FLAVOR_CREATE}
          />
          <NavLinkItem
            href={ROUTE.ADMIN_FLAVOR_BRAND_ARCHIVE}
            label={ADMIN_SIDEBAR.FLAVOR_BRAND_ARCHIVE}
          />
        </NavLink>
      </Box>
    </div>
  )
}


type LinkItemType = {
  href: string
  label: string
}

const NavLinkItem = ({ href, label }: LinkItemType) => {
  return (
    <Link
      href={href}
      className='[&:first-of-type]:border-t-0 border-t border-solid border-black pr-3 pl-5 py-2 block bg-common-white hover:bg-admin-base'
    >
      {label}
    </Link>
  )
}
