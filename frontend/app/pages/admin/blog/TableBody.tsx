import { Group, Image } from '@mantine/core'
import dayjs from 'dayjs'
import {
  useDeleteBlogsByPkMutation,
  useGetBlogsQuery,
} from 'pages/admin/blog/TableBody.generated'
import { AdminTableDeleteBtn } from 'pages/admin/components/button/AdminTableDeleteBtn'
import { AdminTableEditBtn } from 'pages/admin/components/button/AdminTableEditBtn'
import { AdminTableBodyTr } from 'pages/admin/components/table/AdminTableBodyTr'
import { gql } from 'urql'

gql`
  query getBlogs {
    blogs {
      ...getBlogsFragment
    }
  }

  fragment getBlogsFragment on blogs {
    id
    title
    contents
    thumbnail
    blog_blog_tags {
      blog_tag {
        id
        name
      }
    }
    udpated_at
  }

  mutation deleteBlogsByPk($id: Int!) {
    delete_blogs_by_pk(id: $id) {
      id
      title
      slug
      contents
    }
  }
`

export const AdminBlogTableBody = () => {
  const [res, executeMutation] = useDeleteBlogsByPkMutation()
  const [result] = useGetBlogsQuery()
  const { data } = result

  const deleteBlogByPk = (id: number) => {
    executeMutation({ id: id }).then((result) => {
      if (result.error) console.log(result)
      return
    })
  }

  console.log(data)

  return (
    <tbody>
      {data
        ? data.blogs.map((blog) => (
            <AdminTableBodyTr key={blog.id}>
              <td width={100} className='justify-center align-middle'>
                <AdminTableEditBtn href={`./edit/${blog.id}`} />
              </td>
              <td width={120}>{dayjs(blog.udpated_at).format('YYYY/MM/DD')}</td>
              <td width={300}>{blog.title}</td>
              <td width={150}>
                {blog.blog_blog_tags.map((blog_blog_tag, index) =>
                  index === 0 ? (
                    <span key={blog_blog_tag.blog_tag.id}>
                      {blog_blog_tag.blog_tag.name}
                    </span>
                  ) : (
                    <span key={blog_blog_tag.blog_tag.id}>
                      , {blog_blog_tag.blog_tag.name}
                    </span>
                  )
                )}
              </td>
              <td width={150}>
                <div dangerouslySetInnerHTML={{__html: blog.contents!}}></div>
              </td>
              <td width={200}>
                {blog.thumbnail ? <Image src={blog.thumbnail} /> : ''}
              </td>
              <td width={100} className='justify-center align-middle'>
                <AdminTableDeleteBtn id={blog.id} click={deleteBlogByPk} />
              </td>
            </AdminTableBodyTr>
          ))
        : ''}
    </tbody>
  )
}
