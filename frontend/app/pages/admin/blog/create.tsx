import { Button, Group, MultiSelect, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { ROUTE } from 'helper/constant/route'
import { ADMIN_BLOG_CREATE } from 'helper/constant/text'
import { useGetBlogTagsQuery } from 'pages/admin/blog/tag/TableBody.generated'
import AdminContentsHeader from 'pages/admin/components/ContentsHeader'
import AdminLayout from 'pages/admin/layout/Layout'
import { gql } from 'urql'
import { z } from 'zod'

import { useRouter } from 'next/router'

import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { tagType } from 'pages/admin/blog/type'
import { useInsertBlogMutation } from 'pages/admin/blog/create.generated'
import {
  Blog_Blog_Tags_Insert_Input,
  Blog_Tags_Constraint,
  Blog_Tags_Update_Column,
} from 'src/libs/urql/types'

gql`
  query getBlogTagForBlogCreate {
    blog_tags {
      ...getBlogTagForBlogCreateFragment
    }
  }

  fragment getBlogTagForBlogCreateFragment on blog_tags {
    id
    name
  }

  mutation insertBlog(
    $title: String!
    $slug: String!
    $blog_blog_tags: blog_blog_tags_arr_rel_insert_input
    $contents: String!
  ) {
    insert_blogs_one(
      object: {
        title: $title
        slug: $slug
        blog_blog_tags: $blog_blog_tags
        contents: $contents
      }
    ) {
      id
      title
      slug
      blog_blog_tags {
        blog_tag {
          id
          name
          slug
        }
      }
      contents
      created_at
      udpated_at
    }
  }
`

const content = ''

const AdminBlogCreate = () => {
  const [res, executeMutation] = useInsertBlogMutation()
  const [result] = useGetBlogTagsQuery()
  const { data } = result
  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      CharacterCount,
      Image.configure({ inline: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'コンテンツを入力してください。' }),
    ],
    content,
  })

  // リッチテキストに画像を挿入するための関数
  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor!.chain().focus().setImage({ src: url }).run()
    }
  }

  // create tag array
  const tagData: tagType[] = []
  if (data && data.blog_tags) {
    data.blog_tags.map((blogTag) => {
      tagData.push({
        value: String(blogTag.id),
        label: blogTag.name,
      })
    })
  }

  // formのvalidation schemaの定義
  const validateSchema = z.object({
    /* fieldの定義方法
    ex.)
    [fieldName]: z <-zodのオブジェクト。ここは固定
      .string() <-型の定義。数字の時は .number() など
      .min([最小文字数 numberで記述], {message: [表示したいエラーメッセージを記述]}) <-最小入力値の記述（or max()で最大値） */

    blogTitle: z
      .string()
      .min(1, { message: ADMIN_BLOG_CREATE.INPUT.ERROR.TITLE }),
  })

  const form = useForm({
    validate: zodResolver(validateSchema),
    initialValues: {
      blogTitle: '',
      blogSlug: '',
      blogTags: [''],
      blogContents: '',
    },
  })

  const submit = () => {
    executeMutation({
      title: form.values.blogTitle,
      slug: form.values.blogSlug,
      blog_blog_tags: {
        data: form.values.blogTags.map((blogTag) => {
          return {
            blog_tag: {
              data: { id: Number(blogTag), name: '', slug: '' },
              on_conflict: {
                constraint: Blog_Tags_Constraint.BlogTagPkey,
                update_columns: Blog_Tags_Update_Column.Id,
              },
            } as Blog_Blog_Tags_Insert_Input,
          }
        }) as Blog_Blog_Tags_Insert_Input[],
      },
      contents: editor!.view.dom.innerHTML,
    }).then((result) => {
      result.error ? console.log(result) : router.push(ROUTE.ADMIN_BLOG_ARCHIVE)
    })
  }

  return (
    <AdminLayout>
      <AdminContentsHeader
        heading={ADMIN_BLOG_CREATE.HEADING}
        btnLink={ROUTE.ADMIN_BLOG_ARCHIVE}
        btnLabel={ADMIN_BLOG_CREATE.BACK}
      />
      <form onSubmit={form.onSubmit(submit)}>
        <TextInput
          label={ADMIN_BLOG_CREATE.INPUT.TITLE_LABEL}
          placeholder={ADMIN_BLOG_CREATE.INPUT.TITLE_PLACEHOLDER}
          withAsterisk
          {...form.getInputProps('blogTitle')}
        />
        <TextInput
          label={ADMIN_BLOG_CREATE.INPUT.SLUG_LABEL}
          placeholder={ADMIN_BLOG_CREATE.INPUT.SLUG_PLACEHOLDER}
          mt='xl'
          {...form.getInputProps('blogSlug')}
        />
        <MultiSelect
          data={tagData}
          label={ADMIN_BLOG_CREATE.INPUT.TAG_LABEL}
          placeholder={ADMIN_BLOG_CREATE.INPUT.TAG_PLACEHOLDER}
          searchable
          nothingFound={ADMIN_BLOG_CREATE.INPUT.TAG_SEARCH_NOTHING}
          mt='xl'
          {...form.getInputProps('blogTags')}
        />
        <div className='mt-6'>
          <label>{ADMIN_BLOG_CREATE.INPUT.CONTENTS_LABEL}</label>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
              <Button
                className='bg-common-black bg-opacity-10 text-common-black'
                onClick={addImage}
              >
                Image
              </Button>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content className='min-h-[300px]' />
          </RichTextEditor>
        </div>
        <p className='text-right'>
          {editor?.storage.characterCount.characters()}文字
        </p>

        <Group mt={60}>
          <Button
            type='submit'
            className='bg-admin-base text-common-black leading-none font-normal'
          >
            {ADMIN_BLOG_CREATE.SUBMIT}
          </Button>
        </Group>
      </form>
    </AdminLayout>
  )
}

export default AdminBlogCreate
