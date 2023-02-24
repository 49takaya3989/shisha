import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Button,
  Group,
  Image,
  List,
  Modal,
  MultiSelect,
  SimpleGrid,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { RichTextEditor } from '@mantine/tiptap'
import { Link } from '@mantine/tiptap'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import EditorImage from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { gql } from 'urql'

import { ROUTE } from 'helper/constant/route'
import { ADMIN_BLOG_EDIT } from 'helper/constant/text'
import {
  useBlogsByPkForAdminBlogEditQuery,
  useDeleteBlogBlogTagsForAdminBlogEditMutation,
  useGetBlogTagForBlogEditQuery,
  useInsertBlogBlogTagsForAdminBlogEditMutation,
  useUpdateBlogsByPkForAdminBlogEditMutation,
} from 'pages/admin/blog/edit/[id].page.generated'
import { useFormSchema } from 'pages/admin/blog/hooks/useFormSchema'
import { useHandleImageOfAWSs3 } from 'pages/admin/blog/hooks/useHandleImageOfAWSs3'
import { useHandleImageWithModal } from 'pages/admin/blog/hooks/useHandleImageWithModal'
import { tagType } from 'pages/admin/blog/type'
import { AdminContentsHeader } from 'pages/admin/components/ContentsHeader'
import { AdminLayout } from 'pages/admin/layout/Layout'
import {
  Blog_Blog_Tags_Constraint,
  Blog_Blog_Tags_Update_Column,
} from 'src/libs/urql/types'
import { S3_BASE_REQUEST_URL } from 'utils/imageUpload'

gql`
  query getBlogTagForBlogEdit {
    blog_tags {
      ...getBlogTagForBlogEditFragment
    }
  }

  query blogsByPkForAdminBlogEdit($id: Int!) {
    blogs_by_pk(id: $id) {
      ...blogsFragmentForAdminBlogEdit
    }
  }

  mutation updateBlogsByPkForAdminBlogEdit(
    $pk_columns: blogs_pk_columns_input!
    $_set: blogs_set_input!
  ) {
    update_blogs_by_pk(_set: $_set, pk_columns: $pk_columns) {
      ...blogsFragmentForAdminBlogEdit
    }
  }

  mutation insertBlogBlogTagsForAdminBlogEdit(
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

  mutation deleteBlogBlogTagsForAdminBlogEdit(
    $where: blog_blog_tags_bool_exp!
  ) {
    delete_blog_blog_tags(where: $where) {
      returning {
        id
        blog_id
        blog_tag_id
      }
    }
  }

  fragment getBlogTagForBlogEditFragment on blog_tags {
    id
    name
  }

  fragment blogsFragmentForAdminBlogEdit on blogs {
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
        slug
      }
    }
  }
`

// *** <query example> ***
//
// query blogsByPkForAdminBlogEdit($id: Int = 1) {
//   blogs_by_pk(id: $id) {
//     ...blogsFragmentForAdminBlogEdit
//   }
// }
//
// *** < end query example> ***

// *** <mutation example> ***
//
// mutation updateBlogsByPkForAdminBlogEdit(
//   $pk_columns: blogs_pk_columns_input = { slug: "test" }
//   $_set: blogs_set_input = {
//     slug: "test1"
//     title: "test1"
//     thumbnail: "test1"
//     contents: "https://test1"
//   }
// ) {
//   update_blogs_by_pk(_set: $_set, pk_columns: $pk_columns) {
//     ...blogsFragmentForAdminBlogEdit
//   }
// }
//
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
//
// *** < end mutation example> ***

const content = ''

const AdminBlogEdit = () => {
  const { imageS3, previews, setFiles, imageUploadToAWS, imageGet } =
    useHandleImageOfAWSs3()
  const { form } = useFormSchema()
  const {
    opened,
    isThumbnailSelected,
    isRichEditorSelected,
    preSelectedModalImage,
    selectedThum,
    setSelectedThum,
    preSelectImage,
    selectThum,
    setOpened,
    setIsRichEditorSelected,
    insertRichTextImageHandler,
    thumSelectModalHandler,
    modalCloseHandler,
  } = useHandleImageWithModal()
  const router = useRouter()
  const editId = router.query.id
  const [incrementTags, setIncrementTags] = useState<string[]>([''])
  const [decrementTags, setDecrementTags] = useState<string[]>([''])
  const [updateBlogsByPkRes, updateBlogsByPkExecuteMutation] =
    useUpdateBlogsByPkForAdminBlogEditMutation()
  const [insertBlogBlogTagsRes, insertBlogBlogTagsExecuteMutation] =
    useInsertBlogBlogTagsForAdminBlogEditMutation()
  const [deleteBlogBlogTagsRes, deleteBlogBlogTagsExecuteMutation] =
    useDeleteBlogBlogTagsForAdminBlogEditMutation()
  const [resultBlogByPk] = useBlogsByPkForAdminBlogEditQuery({
    variables: { id: Number(editId) },
  })
  const [resultBlogTags] = useGetBlogTagForBlogEditQuery()
  const dataBlogByPk = resultBlogByPk.data
  const dataBlogTags = resultBlogTags.data

  useEffect(() => {
    const decrementFilteringTags = blogHasTagArr.filter(
      (el) => form.values.blogTags.indexOf(el) === -1
    )
    setDecrementTags(() => decrementFilteringTags)

    if (form.values.blogTags) {
      const incrementFilteringTags = form.values.blogTags.filter(
        (el) => blogHasTagArr.indexOf(el) == -1
      )
      setIncrementTags(incrementFilteringTags)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.blogTags])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      CharacterCount,
      EditorImage.configure({ inline: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'コンテンツを入力してください。' }),
    ],
    content,
  })

  useMemo(() => {
    form.setValues({
      blogTitle: dataBlogByPk?.blogs_by_pk?.title,
      blogSlug: dataBlogByPk?.blogs_by_pk?.slug!,
      blogTags: dataBlogByPk?.blogs_by_pk?.blog_blog_tags.map(
        (blog_blog_tag) => {
          return String(blog_blog_tag.blog_tag.id)
        }
      ),
    })
    if (editor) editor.commands.setContent(dataBlogByPk?.blogs_by_pk?.contents!)
    setSelectedThum(dataBlogByPk?.blogs_by_pk?.thumbnail!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBlogByPk])

  // リッチテキストに選択した画像を挿入する
  const insertRichEditorImgHandler = () => {
    setOpened(false)
    setIsRichEditorSelected(false)
    if (preSelectedModalImage) {
      editor!.chain().focus().setImage({ src: preSelectedModalImage }).run()
    }
  }

  // 保存されているタグの配列作成
  const blogHasTagArr: string[] = []
  dataBlogByPk?.blogs_by_pk?.blog_blog_tags.map((blog_blog_tag) => {
    blogHasTagArr.push(String(blog_blog_tag.blog_tag.id))
  })

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

  // 入力データの保存
  const submit = async () => {
    await updateBlogsByPkExecuteMutation({
      pk_columns: { id: Number(editId) },
      _set: {
        title: form.values.blogTitle,
        slug: form.values.blogSlug,
        contents: editor!.view.dom.innerHTML,
        thumbnail: selectedThum,
      },
    }).then((result) => {
      if (result.error) {
        console.log('ブログ項目の更新エラー')
        console.log(result)
      } else if (incrementTags) {
        console.log(incrementTags)
        // 新規紐付けのタグがあるver
        insertBlogBlogTagsExecuteMutation({
          objects: incrementTags.map((tag) => {
            return {
              blog_id: Number(dataBlogByPk!.blogs_by_pk!.id),
              blog_tag_id: Number(tag),
            }
          }),
          on_conflict: {
            constraint:
              // Blog_Blog_Tags_Constraint.BlogBlogTagsBlogIdBlogTagIdKey,
              Blog_Blog_Tags_Constraint.BlogBlogTagsBlogIdBlogTagIdIdKey,
            update_columns: [Blog_Blog_Tags_Update_Column.BlogId],
          },
        }).then((result) => {
          if (result.error) {
            console.log('タグの紐付き作成エラー')
            console.log(result)
          } else if (decrementTags) {
            let booleanArr: string[] = []
            decrementTags.map((deleteTag) => {
              deleteBlogBlogTagsExecuteMutation({
                where: {
                  blog_id: { _eq: Number(dataBlogByPk!.blogs_by_pk!.id) },
                  _and: [
                    {
                      blog_tag_id: { _eq: Number(deleteTag) },
                    },
                  ],
                },
              }).then((result) => {
                if (result.error) {
                  console.log('タグの紐付き削除エラー')
                  console.log(result)
                  booleanArr.push('false')
                } else booleanArr.push('true')
              })
            })
            if (booleanArr.indexOf('false') == -1)
              router.push(ROUTE.ADMIN_BLOG_ARCHIVE)
          } else {
            router.push(ROUTE.ADMIN_BLOG_ARCHIVE)
          }
        })
      } else if (decrementTags) {
        // 新規紐付けのタグがない且つ紐付けのタグ削除があるver
        let booleanArr: string[] = []
        decrementTags.map((deleteTag) => {
          deleteBlogBlogTagsExecuteMutation({
            where: {
              blog_id: { _eq: Number(dataBlogByPk!.blogs_by_pk!.id) },
              _and: [
                {
                  blog_tag_id: { _eq: Number(deleteTag) },
                },
              ],
            },
          }).then((result) => {
            if (result.error) {
              console.log('タグの紐付き削除エラー')
              console.log(result)
              booleanArr.push('false')
            } else booleanArr.push('true')
          })
        })
        if (booleanArr.indexOf('false') == -1)
          router.push(ROUTE.ADMIN_BLOG_ARCHIVE)
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
          mt="xl"
          {...form.getInputProps('blogSlug')}
        />
        <MultiSelect
          data={tagData}
          label={ADMIN_BLOG_EDIT.INPUT.TAG_LABEL}
          placeholder={ADMIN_BLOG_EDIT.INPUT.TAG_PLACEHOLDER}
          searchable
          nothingFound={ADMIN_BLOG_EDIT.INPUT.TAG_SEARCH_NOTHING}
          clearable
          mt="xl"
          {...form.getInputProps('blogTags')}
        />
        <div className="mt-6">
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
                className="bg-common-black bg-opacity-10 text-common-black"
                onClick={insertRichTextImageHandler}
              >
                {ADMIN_BLOG_EDIT.INPUT.EDITOR_IMAGE_BTN}
              </Button>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content className="min-h-[300px]" />
          </RichTextEditor>
        </div>
        <p className="text-right">
          {editor?.storage.characterCount.characters()}{ADMIN_BLOG_EDIT.INPUT.EDITOR_TEXT_AMOUNT}
        </p>

        <Text>{ADMIN_BLOG_EDIT.INPUT.THUMBNAIL_LABEL}</Text>
        <Group display="block">
          <Group>
            {selectedThum ? (
              <Button
                className="bg-admin-cancel font-normal leading-none text-common-black"
                onClick={() => setSelectedThum('')}
              >
                {ADMIN_BLOG_EDIT.INPUT.THUMBNAIL_CLEAR}
              </Button>
            ) : (
              ''
            )}
            <Button
              className="bg-admin-base font-normal leading-none text-common-black"
              onClick={thumSelectModalHandler}
            >
              {ADMIN_BLOG_EDIT.INPUT.THUMBNAIL_SELECT}
            </Button>
          </Group>
          {selectedThum !== null ? (
            <Group mt={16} display="block" w={400}>
              <Image src={selectedThum} alt="サムネイル" />
            </Group>
          ) : (
            ''
          )}
        </Group>
        <Modal
          opened={opened}
          onClose={modalCloseHandler}
          size="70%"
          overflow="inside"
          title="サムネイル"
        >
          <Tabs variant="outline" defaultValue="select">
            <Tabs.List>
              <Tabs.Tab value="select">{ADMIN_BLOG_EDIT.INPUT.MODAL_TAB_IMAGE_SELECT}</Tabs.Tab>
              <Tabs.Tab value="upload">{ADMIN_BLOG_EDIT.INPUT.MODAL_TAB_IMAGE_UPLOAD}</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="select" pt="xs">
              <List display="flex" className="gap-5">
                {imageS3[0] !== ''
                  ? imageS3.map((src, index) => (
                      <List.Item
                        key={index}
                        w={200}
                        h={200}
                        display="flex"
                        className="markRemoveBorder items-center justify-center overflow-hidden"
                      >
                        <Image
                          src={`${S3_BASE_REQUEST_URL}${src}`}
                          alt=""
                          onClick={preSelectImage}
                        />
                      </List.Item>
                    ))
                  : ''}
              </List>
              <Group mt={60}>
                <Button
                  onClick={imageGet}
                  w={150}
                  className="bg-admin-cancel font-normal leading-none text-common-black"
                >
                  {ADMIN_BLOG_EDIT.INPUT.MODAL_IMAGE_GET}
                </Button>
                {isThumbnailSelected ? (
                  <Button
                    onClick={selectThum}
                    w={150}
                    className="bg-admin-base font-normal leading-none text-common-black"
                  >
                    {ADMIN_BLOG_EDIT.INPUT.MODAL_IMAGE_SELECT}
                  </Button>
                ) : (
                  ''
                )}
                {isRichEditorSelected ? (
                  <Button
                    onClick={insertRichEditorImgHandler}
                    w={150}
                    className="bg-admin-base font-normal leading-none text-common-black"
                  >
                    {ADMIN_BLOG_EDIT.INPUT.MODAL_IMAGE_SELECT}
                  </Button>
                ) : (
                  ''
                )}
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="upload" pt="xs">
              <Dropzone
                accept={IMAGE_MIME_TYPE}
                onDrop={setFiles}
                className={`flex items-center justify-center ${
                  previews.length > 0 ? 'h-[200px]' : 'h-[calc(100vh_-_200px)]'
                }`}
              >
                <Text align="center">{ADMIN_BLOG_EDIT.INPUT.MODAL_IMAGE_DROP_OR_CLICK}</Text>
              </Dropzone>

              <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
              >
                {previews}
              </SimpleGrid>
              {previews.length > 0 ? (
                <Button
                  onClick={imageUploadToAWS}
                  mt={60}
                  loaderPosition="right"
                  className="bg-admin-base font-normal leading-none text-common-black"
                >
                  {ADMIN_BLOG_EDIT.INPUT.MODAL_IMAGE_UPLOAD}
                </Button>
              ) : (
                ''
              )}
            </Tabs.Panel>
          </Tabs>
        </Modal>

        <Group mt={60}>
          <Button
            type="submit"
            className="bg-admin-base font-normal leading-none text-common-black"
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
