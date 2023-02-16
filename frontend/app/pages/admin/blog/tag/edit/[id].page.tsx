import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Button, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { gql } from 'urql'
import { z } from 'zod'

import { ROUTE } from 'helper/constant/route'
import { ADMIN_BLOG_TAG_EDIT } from 'helper/constant/text'
import {
  useGetSpecificBlogTagQuery,
  useUpdateSpecificBlogTagMutation,
} from 'pages/admin/blog/tag/edit/[id].generated'
import { AdminContentsHeader } from 'pages/admin/components/ContentsHeader'
import { AdminLayout } from 'pages/admin/layout/Layout'

gql`
  query getSpecificBlogTag($id: Int!) {
    blog_tags_by_pk(id: $id) {
      id
      name
      slug
    }
  }

  mutation updateSpecificBlogTag($id: Int!, $name: String!, $slug: String!) {
    update_blog_tags_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, slug: $slug }
    ) {
      id
      name
      slug
    }
  }
`

const AdminBlogTagEdit = () => {
  const router = useRouter()
  const editId = router.query.id
  const [result] = useGetSpecificBlogTagQuery({
    variables: { id: Number(editId) },
  })
  const [res, executeMutation] = useUpdateSpecificBlogTagMutation()
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
      id: Number(editId),
      name: form.values.blogTagName,
      slug: form.values.blogTagSlug,
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
