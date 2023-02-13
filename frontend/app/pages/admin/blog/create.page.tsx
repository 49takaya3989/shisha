import { useState } from 'react'

import { useRouter } from 'next/router'

import { ListObjectsCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
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
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone'
import { useForm, zodResolver } from '@mantine/form'
import { RichTextEditor, Link } from '@mantine/tiptap'
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
import { z } from 'zod'

import { ROUTE } from 'helper/constant/route'
import { ADMIN_BLOG_CREATE } from 'helper/constant/text'
import { useInsertBlogMutation } from 'pages/admin/blog/create.page.generated'
import { useGetBlogTagsQuery } from 'pages/admin/blog/tag/TableBody.generated'
import { tagType } from 'pages/admin/blog/type'
import { AdminContentsHeader } from 'pages/admin/components/ContentsHeader'
import { AdminLayout } from 'pages/admin/layout/Layout'

import {
  Blog_Blog_Tags_Insert_Input,
  Blog_Tags_Constraint,
  Blog_Tags_Update_Column,
} from 'src/libs/urql/types'
import {
  bucketParams,
  BUCKET_NAME,
  s3Client,
  S3_BASE_REQUEST_URL,
} from 'utils/imageUpload'

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
    $thumbnail: String!
  ) {
    insert_blogs_one(
      object: {
        title: $title
        slug: $slug
        blog_blog_tags: $blog_blog_tags
        contents: $contents
        thumbnail: $thumbnail
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
      thumbnail
      created_at
      udpated_at
    }
  }
`

const content = ''

const AdminBlogCreate = () => {
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [imageS3, setImageS3] = useState<string[]>([''])
  const [preSelectedModalImage, setPreSelectedModalImage] = useState('')
  const [selectedThum, setSelectedThum] = useState('')
  const [opened, setOpened] = useState(false)
  const [isThumbnailSelected, setIsThumbnailSelected] = useState(false)
  const [isRichEditorSelected, setIsRichEditorSelected] = useState(false)
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
      EditorImage.configure({ inline: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'コンテンツを入力してください。' }),
    ],
    content,
  })

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

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <Image
        key={index}
        src={imageUrl}
        alt=""
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
      thumbnail: selectedThum,
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
          mt="xl"
          {...form.getInputProps('blogSlug')}
        />
        <MultiSelect
          data={tagData}
          label={ADMIN_BLOG_CREATE.INPUT.TAG_LABEL}
          placeholder={ADMIN_BLOG_CREATE.INPUT.TAG_PLACEHOLDER}
          searchable
          nothingFound={ADMIN_BLOG_CREATE.INPUT.TAG_SEARCH_NOTHING}
          mt="xl"
          {...form.getInputProps('blogTags')}
        />
        <div className="mt-6">
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
                className="bg-common-black bg-opacity-10 text-common-black"
                onClick={insertRichTextImageHandler}
              >
                Image
              </Button>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content className="min-h-[300px]" />
          </RichTextEditor>
        </div>
        <p className="text-right">
          {editor?.storage.characterCount.characters()}文字
        </p>

        <Text>{ADMIN_BLOG_CREATE.INPUT.THUMBNAIL_LABEL}</Text>
        <Group display="block">
          <Button
            className="bg-admin-base font-normal leading-none text-common-black"
            onClick={thumSelectModalHandler}
          >
            ファイルを選択
          </Button>
          {selectedThum !== '' || selectedThum !== null ? (
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
              <Tabs.Tab value="select">選択</Tabs.Tab>
              <Tabs.Tab value="upload">アップロード</Tabs.Tab>
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
                  取得
                </Button>
                {isThumbnailSelected ? (
                  <Button
                    onClick={selectThum}
                    w={150}
                    className="bg-admin-base font-normal leading-none text-common-black"
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
                    className="bg-admin-base font-normal leading-none text-common-black"
                  >
                    選択
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
                <Text align="center">Drop images here</Text>
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
            type="submit"
            className="bg-admin-base font-normal leading-none text-common-black"
          >
            {ADMIN_BLOG_CREATE.SUBMIT}
          </Button>
        </Group>
      </form>
    </AdminLayout>
  )
}

export default AdminBlogCreate
