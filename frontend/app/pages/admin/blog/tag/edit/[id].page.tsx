import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Button, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { gql } from 'urql'
import { z } from 'zod'

import { ROUTE } from 'helper/constant/route'
import { ADMIN_BLOG_TAG_EDIT } from 'helper/constant/text'
import {
  useBlogTagsByPkForAdminBlogTagEditQuery,
  useUpdateBlogTagsByPkForAdminMutation,
} from 'pages/admin/blog/tag/edit/[id].page.generated'
import { AdminContentsHeader } from 'pages/admin/components/ContentsHeader'
import { AdminLayout } from 'pages/admin/layout/Layout'

gql`
  query blogTagsByPkForAdminBlogTagEdit($id: Int!) {
    blog_tags_by_pk(id: $id) {
      ...blogTagsFragmentForAdminTagEdit
    }
  }

  fragment blogTagsFragmentForAdminTagEdit on blog_tags {
    id
    name
    slug
  }

  mutation updateBlogTagsByPkForAdmin(
    $pk_columns: blog_tags_pk_columns_input!
    $_set: blog_tags_set_input!
  ) {
    update_blog_tags_by_pk(pk_columns: $pk_columns, _set: $_set) {
      ...blogTagsFragmentForAdminBlogTagUpdate
    }
  }

  fragment blogTagsFragmentForAdminBlogTagUpdate on blog_tags {
    id
    name
  }
`

// *** <query example> ***
//
// query blogTagsByPkForAdminBlogTagEdit($id: Int = 1) {
//   blog_tags_by_pk(id: $id) {
//     ...blogTagsFragmentForAdminTagEdit
//   }
// }
//
// *** < end query example> ***

// *** <mutation example> ***
//
// mutation updateBlogTagsByPkForAdmin(
//   $pk_columns: blog_tags_pk_columns_input = {id: 10},
//   $_set: blog_tags_set_input = {name: "testupdate", slug: "testupdate"}
// ) {
//   update_blog_tags_by_pk(
//     pk_columns: $pk_columns,
//     _set: $_set
//   ) {
//     ...blog_tagsFragment
//   }
// }
//
// *** < end mutation example> ***

const AdminBlogTagEdit = () => {
  const router = useRouter()
  const editId = router.query.id
  const [result] = useBlogTagsByPkForAdminBlogTagEditQuery({
    variables: { id: Number(editId) },
  })
  const [res, executeMutation] = useUpdateBlogTagsByPkForAdminMutation()
  const { data } = result

  const validateSchema = z.object({
    /* fieldの定義方法
    ex.)
    [fieldName]: z <-zodのオブジェクト。ここは固定
      .string() <-型の定義。数字の時は .number() など
      .min([最小文字数 numberで記述], {message: [表示したいエラーメッセージを記述]}) <-最小入力値の記述（or max()で最大値） */

    blogTagName: z
      .string()
      .min(1, { message: ADMIN_BLOG_TAG_EDIT.INPUT.ERROR.NAME }),
    blogTagSlug: z
      .string()
      .min(1, { message: ADMIN_BLOG_TAG_EDIT.INPUT.ERROR.SLUG }),
  })

  const form = useForm({
    validate: zodResolver(validateSchema),
    initialValues: {
      blogTagName: '',
      blogTagSlug: '',
    },
  })

  useEffect(() => {
    form.setValues({
      blogTagName: data?.blog_tags_by_pk?.name,
      blogTagSlug: data?.blog_tags_by_pk?.slug,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const submit = async () => {
    await executeMutation({
      pk_columns: { id: Number(editId) },
      _set: {
        name: form.values.blogTagName,
        slug: form.values.blogTagSlug,
      },
    }).then((result) => {
      !result.error
        ? router.push(ROUTE.ADMIN_BLOG_TAG_ARCHIVE)
        : console.log(result)
    })
  }
  return (
    <AdminLayout>
      <AdminContentsHeader
        heading={ADMIN_BLOG_TAG_EDIT.HEADING}
        btnLink={ROUTE.ADMIN_BLOG_TAG_ARCHIVE}
        btnLabel={ADMIN_BLOG_TAG_EDIT.BACK}
      />
      <form onSubmit={form.onSubmit(submit)}>
        <TextInput
          label={ADMIN_BLOG_TAG_EDIT.INPUT.NAME}
          placeholder={ADMIN_BLOG_TAG_EDIT.INPUT.NAME_PLACEHOLDER}
          withAsterisk
          {...form.getInputProps('blogTagName')}
        />
        <TextInput
          label={ADMIN_BLOG_TAG_EDIT.INPUT.SLUG}
          placeholder={ADMIN_BLOG_TAG_EDIT.INPUT.SLUG_PLACEHOLDER}
          mt="xl"
          withAsterisk
          {...form.getInputProps('blogTagSlug')}
        />
        <Group mt={60}>
          <Button
            type="submit"
            className="bg-admin-base font-normal leading-none text-common-black"
          >
            {ADMIN_BLOG_TAG_EDIT.INPUT.SUBMIT}
          </Button>
        </Group>
      </form>
    </AdminLayout>
  )
}

export default AdminBlogTagEdit
