import { ROUTE } from 'helper/constant/route'
import { ADMIN_BLOG_ARCHIVE } from 'helper/constant/text'
import { AdminContentsHeader } from 'pages/admin/components/ContentsHeader'
import { AdminTableHeader } from 'pages/admin/components/table/AdminTableHeader'
import { AdminTableWrap } from 'pages/admin/components/table/AdminTableWrap'
import { AdminBlogTableBody } from 'pages/admin/blog/TableBody'
import { AdminLayout } from 'pages/admin/layout/Layout'

const AdminBlogArchive = () => {
  return (
    <AdminLayout>
      <AdminContentsHeader
        heading={ADMIN_BLOG_ARCHIVE.HEADING}
        btnLink={ROUTE.ADMIN_BLOG_CREATE}
        btnLabel={ADMIN_BLOG_ARCHIVE.CREATE}
      />
      <AdminTableWrap>
        <AdminTableHeader
          col1={ADMIN_BLOG_ARCHIVE.TABLE.UPDATE_DATE}
          col2={ADMIN_BLOG_ARCHIVE.TABLE.TITLE}
          col3={ADMIN_BLOG_ARCHIVE.TABLE.TAG}
          col4={ADMIN_BLOG_ARCHIVE.TABLE.CONTENTS}
          col5={ADMIN_BLOG_ARCHIVE.TABLE.THUMBNAIL}
        />
        <AdminBlogTableBody />
      </AdminTableWrap>
    </AdminLayout>
  )
}

export default AdminBlogArchive
