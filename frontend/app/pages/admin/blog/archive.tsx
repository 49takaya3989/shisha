import { ROUTE } from 'helper/constant/route'
import { ADMIN_BLOG_ARCHIVE } from 'helper/constant/text'
import AdminContentsHeader from 'pages/admin/components/ContentsHeader'
import AdminLayout from 'pages/admin/layout/Layout'

const AdminBlogArchive = () => {
  return (
    <AdminLayout>
      <AdminContentsHeader
        heading={ADMIN_BLOG_ARCHIVE.HEADING}
        btnLink={ROUTE.ADMIN_BLOG_CREATE}
        btnLabel={ADMIN_BLOG_ARCHIVE.CREATE}
      />
      AdminBlogArchive
    </AdminLayout>
  )
}

export default AdminBlogArchive
