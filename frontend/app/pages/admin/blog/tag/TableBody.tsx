import { gql } from 'urql'

import {
  useDeleteBlogTagsByPkMutation,
  useGetBlogTagsQuery,
} from 'pages/admin/blog/tag/TableBody.generated'
import { AdminTableDeleteBtn } from 'pages/admin/components/button/AdminTableDeleteBtn'
import { AdminTableEditBtn } from 'pages/admin/components/button/AdminTableEditBtn'
import { AdminTableBodyTr } from 'pages/admin/components/table/AdminTableBodyTr'


gql`
  query getBlogTags {
    blog_tags {
      ...getBlogTagsFragment
    }
  }

  fragment getBlogTagsFragment on blog_tags {
    id
    name
    slug
  }

  mutation deleteBlogTagsByPk($id: Int!) {
    delete_blog_tags_by_pk(id: $id) {
      id
      name
      slug
    }
  }
`

export const AdminTableBody = () => {
  const [res, executeMutation] = useDeleteBlogTagsByPkMutation()
  const [result] = useGetBlogTagsQuery()
  const { data } = result

  const deleteBlogTagsByPk = (id: number) => {
    executeMutation({ id: id }).then((result) => {
      if (result.error) console.log(result)
      return
    })
  }
  return (
    <tbody>
      {data
        ? data.blog_tags.map((tag) => (
            <AdminTableBodyTr key={tag.id}>
              <td className="flex items-center justify-center">
                <AdminTableEditBtn href={`./tag/edit/${tag.id}`} />
              </td>
              <td>{tag.name}</td>
              <td>{tag.slug}</td>
              <td className="flex items-center justify-center">
                <AdminTableDeleteBtn id={tag.id} click={deleteBlogTagsByPk} />
              </td>
            </AdminTableBodyTr>
          ))
        : ''}
    </tbody>
  )
}
