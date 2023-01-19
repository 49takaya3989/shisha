import {
  useDeleteBlogTagsByPkMutation,
  useGetBlogTagsQuery,
} from 'pages/admin/blog/tag/TableBody.generated'
import { AdminTableDeleteBtn } from 'pages/admin/components/button/AdminTableDeleteBtn'
import { AdminTableEditBtn } from 'pages/admin/components/button/AdminTableEditBtn'

import { gql } from 'urql'

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
            <tr
              key={tag.id}
              className='border-t border-solid border-common-black border-opacity-30'
            >
              <td className='flex justify-center items-center'>
                <AdminTableEditBtn href={`./tag/edit/${tag.id}`} />
              </td>
              <td>{tag.name}</td>
              <td>{tag.slug}</td>
              <td className='flex justify-center items-center'>
                <AdminTableDeleteBtn id={tag.id} click={deleteBlogTagsByPk} />
              </td>
            </tr>
          ))
        : ''}
    </tbody>
  )
}
