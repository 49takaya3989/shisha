import { Button, Group, MultiSelect, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ROUTE } from 'helper/constant/route'
import { ADMIN_BLOG_EDIT } from 'helper/constant/text'
import { useRouter } from 'next/router'
import {
  useDeleteBlogBlogTagsMutation,
  useGetBlogsByPkQuery,
  useGetBlogTagForBlogEditQuery,
  useInsertBlogBlogTagsMutation,
  useUpdateBlogsByPkMutation,
} from 'pages/admin/blog/edit/[id].generated'
import AdminContentsHeader from 'pages/admin/components/ContentsHeader'
import AdminLayout from 'pages/admin/layout/Layout'
import { useEffect, useMemo } from 'react'
import { gql } from 'urql'
import { z } from 'zod'
import { tagType } from 'pages/admin/blog/type'
import {
  Blog_Blog_Tags_Constraint,
  Blog_Blog_Tags_Update_Column,
} from 'src/libs/urql/types'

gql`
  query getBlogTagForBlogEdit {
    blog_tags {
      ...getBlogTagForBlogEditFragment
    }
  }

  fragment getBlogTagForBlogEditFragment on blog_tags {
    id
    name
  }

  query getBlogsByPk($id: Int!) {
    blogs_by_pk(id: $id) {
      id
      title
      slug
      contents
      blog_blog_tags {
        blog_tag {
          id
          name
          slug
        }
      }
    }
  }

  mutation updateBlogsByPk(
    $pk_columns: blogs_pk_columns_input!
    $_set: blogs_set_input
  ) {
    update_blogs_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
      slug
      title
      contents
      blog_blog_tags {
        blog_tag {
          id
          name
          slug
        }
      }
    }
  }

  mutation insertBlogBlogTags(
    $objects: [blog_blog_tags_insert_input!]!
    $on_conflict: blog_blog_tags_on_conflict
  ) {
    insert_blog_blog_tags(objects: $objects, on_conflict: $on_conflict) {
      returning {
        id
        blog_id
        blog_tag_id
      }
    }
  }

  mutation deleteBlogBlogTags($where: blog_blog_tags_bool_exp!) {
    delete_blog_blog_tags(where: $where) {
      returning {
        id
        blog_id
        blog_tag_id
      }
    }
  }
`

// mutation update_blogs_by_pk(
//   $pk_columns: blogs_pk_columns_input = {id: 44},
//   $_set: blogs_set_input = {
//     slug: "udpateしudpateしました",
//     title: "udpateしudpateしました",
//     contents: "udpateしましたudpateしました"
//   }
// ) {
//   update_blogs_by_pk(pk_columns: $pk_columns, _set: $_set) {
//     id
//     slug
//     title
//     contents
//     blog_blog_tags {
//       blog_tag {
//         id
//         name
//         slug
//       }
//     }
//   }
// }

// mutation insert_blog_blog_tags(
//   $objects: [blog_blog_tags_insert_input!] = [
//     {blog_id: 44, blog_tag_id: 12}
//   ],
//   $on_conflict: blog_blog_tags_on_conflict = {
//     constraint: blog_blog_tags_blog_id_blog_tag_id_key,
//     update_columns: blog_id
//   }) {
//   insert_blog_blog_tags(objects: $objects, on_conflict: $on_conflict) {
//     returning {
//       id
//       blog_id
//       blog_tag_id
//     }
//   }
// }

// mutation delete_blog_blog_tags(
//   $where: blog_blog_tags_bool_exp = {
//     blog_id: {_eq: 44},
//     _and: {
//       blog_tag_id: {_eq: 12}
//     }
//   }
// ) {
//   delete_blog_blog_tags(where: $where) {
//     returning {
//       id
//       blog_id
//       blog_tag_id
//     }
//   }
// }

const AdminBlogEdit = () => {
  const router = useRouter()
  const editId = router.query.id
  const [updateBlogsByPkRes, updateBlogsByPkExecuteMutation] =
    useUpdateBlogsByPkMutation()
  const [insertBlogBlogTagsRes, insertBlogBlogTagsExecuteMutation] =
    useInsertBlogBlogTagsMutation()
  const [deleteBlogBlogTagsRes, deleteBlogBlogTagsExecuteMutation] =
    useDeleteBlogBlogTagsMutation()
  const [resultBlogByPk] = useGetBlogsByPkQuery({
    variables: { id: Number(editId) },
  })
  const [resultBlogTags] = useGetBlogTagForBlogEditQuery()
  const dataBlogByPk = resultBlogByPk.data
  const dataBlogTags = resultBlogTags.data
  const content = ''
  let incrementTags: string[] = []
  let decrementTags: string[] = []

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      CharacterCount,
      Image.configure({ inline: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'コンテンツを入力してください。' }),
    ],
    content,
  })

  // formのvalidation schemaの定義
  const validateSchema = z.object({
    /* fieldの定義方法
    ex.)
    [fieldName]: z <-zodのオブジェクト。ここは固定
      .string() <-型の定義。数字の時は .number() など
      .min([最小文字数 numberで記述], {message: [表示したいエラーメッセージを記述]}) <-最小入力値の記述（or max()で最大値） */

    blogTitle: z
      .string()
      .min(1, { message: ADMIN_BLOG_EDIT.INPUT.ERROR.TITLE }),
  })

  const form = useForm({
    validate: zodResolver(validateSchema),
    initialValues: {
      blogTitle: '',
      blogSlug: '',
      blogTag: [''],
      blogContents: '',
    },
  })

  const blogHasTagArr: string[] = []
  dataBlogByPk?.blogs_by_pk?.blog_blog_tags.map((blog_blog_tag) => {
    blogHasTagArr.push(String(blog_blog_tag.blog_tag.id))
  })

  useEffect(() => {
    decrementTags = blogHasTagArr.filter(
      (el) => form.values.blogTag.indexOf(el) === -1
    )
    if (form.values.blogTag) {
      incrementTags = form.values.blogTag.filter(
        (el) => blogHasTagArr.indexOf(el) == -1
      )
    }
    console.log(incrementTags)
  }, [form.values.blogTag])

  useMemo(() => {
    form.setValues({
      blogTitle: dataBlogByPk?.blogs_by_pk?.title,
      blogSlug: dataBlogByPk?.blogs_by_pk?.slug!,
      blogTag: dataBlogByPk?.blogs_by_pk?.blog_blog_tags.map(
        (blog_blog_tag) => {
          return String(blog_blog_tag.blog_tag.id)
        }
      ),
    })
    if (editor) editor.commands.setContent(dataBlogByPk?.blogs_by_pk?.contents!)
  }, [dataBlogByPk])

  // リッチテキストに画像を挿入するための関数
  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor!.chain().focus().setImage({ src: url }).run()
    }
  }

  // create tag array
  const tagData: tagType[] = []
  if (dataBlogTags && dataBlogTags.blog_tags) {
    dataBlogTags.blog_tags.map((blogTag) => {
      tagData.push({
        value: String(blogTag.id),
        label: blogTag.name,
      })
    })
  }

  const submit = async () => {
    await updateBlogsByPkExecuteMutation({
      pk_columns: { id: Number(editId) },
      _set: {
        title: form.values.blogTitle,
        slug: form.values.blogSlug,
        contents: editor!.view.dom.innerHTML,
      },
    }).then((result) => {
      if (result.error) {
        console.log('ブログ項目の更新エラー')
        console.log(result)
      } else if (incrementTags) {
        // 新規紐付けのタグがあるver
        insertBlogBlogTagsExecuteMutation({
          objects: incrementTags.map((tag) => {
            return {
              blog_id: Number(editId),
              blog_tag_id: Number(tag),
            }
          }),
          on_conflict: {
            constraint:
              Blog_Blog_Tags_Constraint.BlogBlogTagsBlogIdBlogTagIdKey,
            update_columns: [Blog_Blog_Tags_Update_Column.BlogId],
          },
        }).then((result) => {
          if (result.error) {
            console.log('タグの紐付き作成エラー')
            console.log(result)
          } else if (decrementTags) {
            let booleanArr: string[] = []
            decrementTags.map(deleteTag => {
              deleteBlogBlogTagsExecuteMutation({
                where: {
                  blog_id: { _eq: Number(editId) },
                  _and: [{
                    blog_tag_id: { _eq: Number(deleteTag) },
                  }],
                },
              }).then((result) => {
                if (result.error) {
                  console.log('タグの紐付き削除エラー')
                  console.log(result)
                  booleanArr.push('false')
                } else booleanArr.push('true')
              })
            })
            if(booleanArr.indexOf('false') == -1) router.push(ROUTE.ADMIN_BLOG_ARCHIVE)
          } else {
            router.push(ROUTE.ADMIN_BLOG_ARCHIVE)
          }
        })
      } else if (decrementTags) {
        // 新規紐付けのタグがない且つ紐付けのタグ削除があるver
        let booleanArr: string[] = []
        decrementTags.map(deleteTag => {
          deleteBlogBlogTagsExecuteMutation({
            where: {
              blog_id: { _eq: Number(editId) },
              _and: [{
                blog_tag_id: { _eq: Number(deleteTag) },
              }],
            },
          }).then((result) => {
            if (result.error) {
              console.log('タグの紐付き削除エラー')
              console.log(result)
              booleanArr.push('false')
            } else booleanArr.push('true')
          })
        })
        if(booleanArr.indexOf('false') == -1) router.push(ROUTE.ADMIN_BLOG_ARCHIVE)
      } else {
        router.push(ROUTE.ADMIN_BLOG_ARCHIVE)
      }
    })
  }

  return (
    <AdminLayout>
      <AdminContentsHeader
        heading={ADMIN_BLOG_EDIT.HEADING}
        btnLink={ROUTE.ADMIN_BLOG_ARCHIVE}
        btnLabel={ADMIN_BLOG_EDIT.BACK}
      />
      <form onSubmit={form.onSubmit(submit)}>
        <TextInput
          label={ADMIN_BLOG_EDIT.INPUT.TITLE_LABEL}
          placeholder={ADMIN_BLOG_EDIT.INPUT.TITLE_PLACEHOLDER}
          withAsterisk
          {...form.getInputProps('blogTitle')}
        />
        <TextInput
          label={ADMIN_BLOG_EDIT.INPUT.SLUG_LABEL}
          placeholder={ADMIN_BLOG_EDIT.INPUT.SLUG_PLACEHOLDER}
          mt='xl'
          {...form.getInputProps('blogSlug')}
        />
        <MultiSelect
          data={tagData}
          label={ADMIN_BLOG_EDIT.INPUT.TAG_LABEL}
          placeholder={ADMIN_BLOG_EDIT.INPUT.TAG_PLACEHOLDER}
          searchable
          nothingFound={ADMIN_BLOG_EDIT.INPUT.TAG_SEARCH_NOTHING}
          clearable
          mt='xl'
          {...form.getInputProps('blogTag')}
        />
        <div className='mt-6'>
          <label>{ADMIN_BLOG_EDIT.INPUT.CONTENTS_LABEL}</label>
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
            onClick={submit}
          >
            {ADMIN_BLOG_EDIT.SUBMIT}
          </Button>
        </Group>
      </form>
    </AdminLayout>
  )
}

export default AdminBlogEdit
