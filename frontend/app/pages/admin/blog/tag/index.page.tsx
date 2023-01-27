import { Button, Grid, Group, TextInput } from '@mantine/core'
import { ADMIN_BLOG_TAG_INDEX } from 'helper/constant/text'
import { AdminTableWrap } from 'pages/admin/components/table/AdminTableWrap'
import AdminContentsHeader from 'pages/admin/components/ContentsHeader'
import AdminLayout from 'pages/admin/layout/Layout'
import { AdminTableHeader } from 'pages/admin/components/table/AdminTableHeader'
import { gql } from 'urql'
import { useInsertBlogTagMutation } from 'pages/admin/blog/tag/index.generated'
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { AdminTableBody } from 'pages/admin/blog/tag/TableBody'
import { SubmitBtn } from 'pages/admin/components/button/SubmitBtn'

gql`
  mutation insertBlogTag($name: String!, $slug: String!) {
    insert_blog_tags_one(object: { name: $name, slug: $slug }) {
      id
      name
      slug
    }
  }
`

function AdminBlogTagIndex() {
  const [res, executeMutation] = useInsertBlogTagMutation()
  const validateSchema = z.object({
    /* fieldの定義方法
    ex.)
    [fieldName]: z <-zodのオブジェクト。ここは固定
      .string() <-型の定義。数字の時は .number() など
      .min([最小文字数 numberで記述], {message: [表示したいエラーメッセージを記述]}) <-最小入力値の記述（or max()で最大値） */

    blogTagName: z
      .string()
      .min(1, { message: ADMIN_BLOG_TAG_INDEX.INPUT.ERROR.NAME }),
    blogTagSlug: z
      .string()
      .min(1, { message: ADMIN_BLOG_TAG_INDEX.INPUT.ERROR.SLUG }),
  })

  const form = useForm({
    validate: zodResolver(validateSchema),
    initialValues: {
      blogTagName: '',
      blogTagSlug: '',
    },
  })

  const submit = async () => {
    await executeMutation({
      name: form.values.blogTagName,
      slug: form.values.blogTagSlug,
    }).then((result) => {
      if (result.error) console.log(result)
      form.values.blogTagName = ''
      form.values.blogTagSlug = ''
    })
  }

  return (
    <AdminLayout>
      <AdminContentsHeader heading={ADMIN_BLOG_TAG_INDEX.HEADING} />
      <Grid>
        <Grid.Col span={4}>
          <form onSubmit={form.onSubmit(submit)}>
            <TextInput
              label={ADMIN_BLOG_TAG_INDEX.INPUT.NAME}
              placeholder={ADMIN_BLOG_TAG_INDEX.INPUT.NAME_PLACEHOLDER}
              withAsterisk
              {...form.getInputProps('blogTagName')}
            />
            <TextInput
              label={ADMIN_BLOG_TAG_INDEX.INPUT.SLUG}
              placeholder={ADMIN_BLOG_TAG_INDEX.INPUT.SLUG_PLACEHOLDER}
              mt='xl'
              withAsterisk
              {...form.getInputProps('blogTagSlug')}
            />
            <SubmitBtn label={ADMIN_BLOG_TAG_INDEX.INPUT.SUBMIT} />
          </form>
        </Grid.Col>
        <Grid.Col span={7} ml='auto'>
          <AdminTableWrap>
            <AdminTableHeader
              col1={ADMIN_BLOG_TAG_INDEX.TABLE.NAME}
              col2={ADMIN_BLOG_TAG_INDEX.TABLE.SLUG}
            />
            <AdminTableBody />
          </AdminTableWrap>
        </Grid.Col>
      </Grid>
    </AdminLayout>
  )
}

export default AdminBlogTagIndex
