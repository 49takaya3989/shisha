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
import { useForm, zodResolver } from '@mantine/form'
import { RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import EditorImage from '@tiptap/extension-image'
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

import AdminContentsHeader from 'pages/admin/components/ContentsHeader'
import AdminLayout from 'pages/admin/layout/Layout'
import { useEffect, useMemo, useState } from 'react'
import { gql } from 'urql'
import { z } from 'zod'
import { tagType } from 'pages/admin/blog/type'
import {
  Blog_Blog_Tags_Constraint,
  Blog_Blog_Tags_Update_Column,
} from 'src/libs/urql/types'
import {
  useDeleteBlogBlogTagsMutation,
  useGetBlogsByPkQuery,
  useGetBlogTagForBlogEditQuery,
  useInsertBlogBlogTagsMutation,
  useUpdateBlogsByPkMutation,
} from 'pages/admin/blog/edit/[id].page.generated'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import {
  bucketParams,
  BUCKET_NAME,
  s3Client,
  S3_BASE_REQUEST_URL,
} from 'utils/imageUpload'
import { Upload } from '@aws-sdk/lib-storage'
import { ListObjectsCommand } from '@aws-sdk/client-s3'

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
      thumbnail
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

// *** <mutation example> ***
//
// mutation update_blogs_by_pk(
//   $pk_columns: blogs_pk_columns_input = {id: 44},
//   $_set: blogs_set_input = {
//     slug: "udpateしudpateしました",
//     title: "udpateしudpateしました",
//     contents: "udpateしましたudpateしました"
//     thumbnail: "udpateしましたudpateしました"
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
//
// *** < end mutation example> ***

const AdminBlogEdit = () => {
  const router = useRouter()
  const editId = router.query.id
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [opened, setOpened] = useState(false)
  const [imageS3, setImageS3] = useState<string[]>([''])
  const [preSelectedModalImage, setPreSelectedModalImage] = useState('')
  const [selectedThum, setSelectedThum] = useState('')
  const [isThumbnailSelected, setIsThumbnailSelected] = useState(false)
  const [isRichEditorSelected, setIsRichEditorSelected] = useState(false)
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

  useEffect(() => {
    decrementTags = blogHasTagArr.filter(
      (el) => form.values.blogTag.indexOf(el) === -1
    )
    if (form.values.blogTag) {
      incrementTags = form.values.blogTag.filter(
        (el) => blogHasTagArr.indexOf(el) == -1
      )
    }
  }, [form.values.blogTag])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
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
      blogTag: dataBlogByPk?.blogs_by_pk?.blog_blog_tags.map(
        (blog_blog_tag) => {
          return String(blog_blog_tag.blog_tag.id)
        }
      ),
    })
    if (editor) editor.commands.setContent(dataBlogByPk?.blogs_by_pk?.contents!)
    setSelectedThum(dataBlogByPk?.blogs_by_pk?.thumbnail!)
  }, [dataBlogByPk])

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

  // マークダウンで挿入する画像DOMの作成
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    )
  })

  // S3へ画像のアップロード
  const imageUploadToAWS = async () => {
    try {
      const parallelUploads3 = new Upload({
        client: s3Client,
        params: {
          Bucket: BUCKET_NAME,
          Key: files[0].name,
          Body: files[0],
        },
        leavePartsOnError: false,
      })

      parallelUploads3.on('httpUploadProgress', (progress) => {
        console.log(progress)
      })

      await parallelUploads3.done()
      // await setIsLoading(false);
    } catch (e) {
      console.log(e)
    }
  }

  // S3から画像の取得
  const imageGet = () => {
    // Create the parameters for the bucket
    s3Client
      .send(new ListObjectsCommand(bucketParams))
      .then((res) => {
        res.Contents!.map((content) => {
          setImageS3((prevImageNames): string[] => {
            if (prevImageNames[0] === '') return [content.Key!]
            return [...prevImageNames, content.Key!]
          })
        })
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }

  // サムネイルの設定
  const preSelectImage = (e: React.MouseEvent<HTMLElement>) => {
    const $markRemoveBorder = document.querySelector<HTMLElement>(
      '.markRemoveBorder.border'
    )
    $markRemoveBorder?.classList.remove('border')

    // チェックの印をつけるためのコード
    e.currentTarget.parentElement!.parentElement!.parentElement!.classList.add(
      'border'
    )

    // 選択肢ているurlを取得するためのコード
    const preSelectImageSrc =
      e.currentTarget.children[0].children[0].children[0].getAttribute('src')
    setPreSelectedModalImage(() => {
      return preSelectImageSrc!
    })
  }

  // サムネイルの設定
  const selectThum = () => {
    setSelectedThum(() => {
      return preSelectedModalImage
    })
    setOpened(false)
    setIsThumbnailSelected(false)
  }

  // リッチテキストに選択した画像を挿入する
  const insertRichEditorImgHandler = () => {
    setOpened(false)
    setIsRichEditorSelected(false)
    if (preSelectedModalImage) {
      editor!.chain().focus().setImage({ src: preSelectedModalImage }).run()
    }
  }

  // リッチテキストに挿入するための画像を選択するモーダルの表示
  const insertRichTextImageHandler = () => {
    setOpened(true)
    setIsRichEditorSelected(true)
  }

  // サムネイルのための画像を選択するモーダルの表示
  const thumSelectModalHandler = () => {
    setOpened(true)
    setIsThumbnailSelected(true)
  }

  // 画像選択モーダルの非表示
  const modalCloseHandler = () => {
    setOpened(false)
    setIsRichEditorSelected(false)
    setIsThumbnailSelected(false)
  }

  // 入力データの保存
  const submit = async () => {
    await updateBlogsByPkExecuteMutation({
      pk_columns: { id: Number(editId) },
      _set: {
        title: form.values.blogTitle,
        slug: form.values.blogSlug,
        contents: editor!.view.dom.innerHTML,
        thumbnail: selectedThum
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
            decrementTags.map((deleteTag) => {
              deleteBlogBlogTagsExecuteMutation({
                where: {
                  blog_id: { _eq: Number(editId) },
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
              blog_id: { _eq: Number(editId) },
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
                onClick={insertRichTextImageHandler}
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

        <Text>{ADMIN_BLOG_EDIT.INPUT.THUMBNAIL_LABEL}</Text>
        <Group display='block'>
          <Group>
            {selectedThum ? (
              <Button
                className='bg-admin-cancel text-common-black leading-none font-normal'
                onClick={() => setSelectedThum('')}
              >
                クリア
              </Button>
            ) : (
              ''
            )}
            <Button
              className='bg-admin-base text-common-black leading-none font-normal'
              onClick={thumSelectModalHandler}
            >
              ファイルを選択
            </Button>
          </Group>
          {selectedThum !== '' ? (
            <Group mt={16} display='block' w={400}>
              <Image src={selectedThum} />
            </Group>
          ) : (
            ''
          )}
        </Group>
        <Modal
          opened={opened}
          onClose={modalCloseHandler}
          size='70%'
          overflow='inside'
          title='サムネイル'
        >
          <Tabs variant='outline' defaultValue='select'>
            <Tabs.List>
              <Tabs.Tab value='select'>選択</Tabs.Tab>
              <Tabs.Tab value='upload'>アップロード</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='select' pt='xs'>
              <List display='flex' className='gap-5'>
                {imageS3[0] !== ''
                  ? imageS3.map((src, index) => (
                      <List.Item
                        key={index}
                        w={200}
                        h={200}
                        display='flex'
                        className='items-center justify-center overflow-hidden markRemoveBorder'
                      >
                        <Image
                          src={`${S3_BASE_REQUEST_URL}${src}`}
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
                  className='bg-admin-cancel text-common-black leading-none font-normal'
                >
                  取得
                </Button>
                {isThumbnailSelected ? (
                  <Button
                    onClick={selectThum}
                    w={150}
                    className='bg-admin-base text-common-black leading-none font-normal'
                  >
                    選択
                  </Button>
                ) : (
                  ''
                )}
                {isRichEditorSelected ? (
                  <Button
                    onClick={insertRichEditorImgHandler}
                    w={150}
                    className='bg-admin-base text-common-black leading-none font-normal'
                  >
                    選択
                  </Button>
                ) : (
                  ''
                )}
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value='upload' pt='xs'>
              <Dropzone
                accept={IMAGE_MIME_TYPE}
                onDrop={setFiles}
                className={`flex items-center justify-center ${
                  previews.length > 0 ? 'h-[200px]' : 'h-[calc(100vh_-_200px)]'
                }`}
              >
                <Text align='center'>Drop images here</Text>
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
                  loaderPosition='right'
                  className='bg-admin-base text-common-black leading-none font-normal'
                >
                  画像アップロード
                </Button>
              ) : (
                ''
              )}
            </Tabs.Panel>
          </Tabs>
        </Modal>

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
