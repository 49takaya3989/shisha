import { List } from '@mantine/core'
import { ROUTE } from 'helper/constant/route'
import { NextPage } from 'next'
import Link from 'next/link'

import { AdminLayout } from 'pages/admin/layout/Layout'

const AdminDashboard: NextPage = () => {
  return (
    <div>
      <AdminLayout>
        <List>
          <List.Item>
            <Link href={ROUTE.ADMIN_BLOG_ARCHIVE} className="underline">
              記事一覧
            </Link>
          </List.Item>
          <List.Item>
            <Link href={ROUTE.ADMIN_BLOG_TAG_ARCHIVE} className="underline">
              記事タグ一覧
            </Link>
          </List.Item>
        </List>
      </AdminLayout>
    </div>
  )
}

export default AdminDashboard
