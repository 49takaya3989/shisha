import { Image } from '@mantine/core'
import dayjs from 'dayjs'
import { gql } from 'urql'

import {
  useDeleteBlogsByPkForAdminMutation,
  useGetBlogsForAdminBlogArchiveQuery,
} from 'pages/admin/blog/TableBody.generated'
import { AdminTableDeleteBtn } from 'pages/admin/components/button/AdminTableDeleteBtn'
import { AdminTableEditBtn } from 'pages/admin/components/button/AdminTableEditBtn'
import { AdminTableBodyTr } from 'pages/admin/components/table/AdminTableBodyTr'

gql`
  query getBlogsForAdminBlogArchive {
    blogs {
      ...getBlogsFragmentForAdminBlogArchive
    }
  }

  fragment getBlogsFragmentForAdminBlogArchive on blogs {
    id
    title
    slug
    contents
    thumbnail
    blog_blog_tags {
      id
      blog_tag {
        id
        name
      }
    }
    updated_at
  }

  mutation deleteBlogsByPkForAdmin($id: Int!) {
    delete_blogs_by_pk(id: $id) {
      ...blogsFragmentForAdminBlogArchive
    }
  }

  fragment blogsFragmentForAdminBlogArchive on blogs {
    slug
  }
`

// *** <mutation example> ***
//
// mutation deleteBlogsByPkForAdmin($id: Int = 1) {
//   delete_blogs_by_pk(id: $id) {
//     ...blogsFragmentForAdminBlogArchive
//   }
// }
//
// *** < end mutation example> ***

export const AdminBlogTableBody = () => {
  const [res, executeMutation] = useDeleteBlogsByPkForAdminMutation()
  const [result] = useGetBlogsForAdminBlogArchiveQuery()
  const { data } = result

  const deleteBlogByPk = (id: number) => {
    executeMutation({ id: id }).then((result) => {
      if (result.error) console.log(result)
      return
    })
  }

  return (
    <tbody>
      {data
        ? data.blogs.map((blog) => (
            <AdminTableBodyTr key={blog.id}>
              <td width={100} className="justify-center align-middle">
                <AdminTableEditBtn href={`./edit/${blog.id}`} />
              </td>
              <td width={120}>{dayjs(blog.updated_at).format('YYYY/MM/DD')}</td>
              <td width={300}>{blog.title}</td>
              <td width={150}>
                {blog.blog_blog_tags.map((blog_blog_tag, index) =>
                  index === 0 ? (
                    <span key={blog_blog_tag.id}>
                      {blog_blog_tag.blog_tag.name}
                    </span>
                  ) : (
                    <span key={blog_blog_tag.id}>
                      , {blog_blog_tag.blog_tag.name}
                    </span>
                  )
                )}
              </td>
              <td width={150}>
                <div dangerouslySetInnerHTML={{ __html: blog.contents! }}></div>
              </td>
              <td width={200}>
                {blog.thumbnail ? (
                  <Image src={blog.thumbnail} alt={blog.title} />
                ) : (
                  ''
                )}
              </td>
              <td width={100} className="justify-center align-middle">
                <AdminTableDeleteBtn id={blog.id} click={deleteBlogByPk} />
              </td>
            </AdminTableBodyTr>
          ))
        : ''}
    </tbody>
  )
}
