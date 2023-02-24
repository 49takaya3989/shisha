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
import { ADMIN_BLOG_CREATE } from 'helper/constant/text'
import { useInsertBlogsOneForAdminMutation } from 'pages/admin/blog/create.page.generated'
import { useGetBlogTagsForBlogCreateQuery } from 'pages/admin/blog/create.page.generated'
import { useFormSchema } from 'pages/admin/blog/hooks/useFormSchema'
import { useHandleImageOfAWSs3 } from 'pages/admin/blog/hooks/useHandleImageOfAWSs3'
import { useHandleImageWithModal } from 'pages/admin/blog/hooks/useHandleImageWithModal'
import { tagType } from 'pages/admin/blog/type'
import { AdminContentsHeader } from 'pages/admin/components/ContentsHeader'
import { AdminLayout } from 'pages/admin/layout/Layout'
import { S3_BASE_REQUEST_URL } from 'utils/imageUpload'

gql`
  query getBlogTagsForBlogCreate {
    blog_tags {
      ...getBlogTagForBlogCreateFragment
    }
  }

  fragment getBlogTagForBlogCreateFragment on blog_tags {
    id
    name
  }

  mutation insertBlogsOneForAdmin($object: blogs_insert_input!) {
    insert_blogs_one(object: $object) {
      ...blogsFragmentForAdminBlogInsert
    }
  }

  fragment blogsFragmentForAdminBlogInsert on blogs {
    slug
    title
    thumbnail
    contents
    blog_blog_tags {
      blog_tag {
        name
        slug
      }
    }
  }
`

// *** <mutation example> ***
//
// mutation insertBlogsOneForAdmin(
//   $object: blogs_insert_input = {
//     title: "test",
//     slug: "test",
//     thumbnail: "https://test",
//     contents: 'test',
//     blog_blog_tags: {
//       data: [
//         {blog_tag_id: 1},
//         {blog_tag_id: 2}
//       ]
//     }
//   }
// ) {
//  insert_blogs_one(object: $object) {
//    ...blogsFragmentForAdminBlogInsert
//  }
// }
//
// *** < end mutation example> ***

const content = ''

const AdminBlogCreate = () => {
  const { imageS3, previews, setFiles, imageUploadToAWS, imageGet } =
    useHandleImageOfAWSs3()
  const { form } = useFormSchema()
  const {
    opened,
    isThumbnailSelected,
    isRichEditorSelected,
    preSelectedModalImage,
    selectedThum,
    preSelectImage,
    selectThum,
    setOpened,
    setIsRichEditorSelected,
    insertRichTextImageHandler,
    thumSelectModalHandler,
    modalCloseHandler,
  } = useHandleImageWithModal()
  const [res, executeMutation] = useInsertBlogsOneForAdminMutation()
  const [result] = useGetBlogTagsForBlogCreateQuery()
  const { data } = result
  const router = useRouter()

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

  // リッチテキストに選択した画像を挿入する
  const insertRichEditorImgHandler = () => {
    setOpened(false)
    setIsRichEditorSelected(false)
    if (preSelectedModalImage) {
      editor!.chain().focus().setImage({ src: preSelectedModalImage }).run()
    }
  }

  // 入力データの保存
  const submit = () => {
    executeMutation({
      object: {
        title: form.values.blogTitle,
        slug: form.values.blogSlug,
        thumbnail: selectedThum,
        contents: editor!.view.dom.innerHTML,
        blog_blog_tags: {
          data: form.values.blogTags.map((blogTag) => {
            return {
              blog_tag_id: Number(blogTag),
            }
          }),
        },
      },
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
          {selectedThum !== '' ? (
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
