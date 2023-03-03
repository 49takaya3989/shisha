import { ReactEventHandler, useState } from 'react'

import Link from 'next/link'

import { useAuth } from '@clerk/nextjs'
import { Box, Button, Group, Modal, Textarea, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { gql } from 'urql'
import { z } from 'zod'

import { ROUTE } from 'helper/constant/route'
import { USER_COMMENT_FORM } from 'helper/constant/text'
import {
  useInsertBlogCommentsOneMutation,
  useInsertUsersOneForUserMutation,
  useUsersQuery,
} from 'pages/components/CommentForm.generated'

gql`
  query users($where: users_bool_exp!) {
    users(where: $where) {
      ...usersFragment
    }
  }

  mutation insertUsersOneForUser($object: users_insert_input!) {
    insert_users_one(
      object: $object
      on_conflict: { constraint: users_uuid_key, update_columns: uuid }
    ) {
      ...usersFragment
    }
  }

  mutation insertBlogCommentsOne($object: blog_comments_insert_input!) {
    insert_blog_comments_one(
      object: $object
      on_conflict: { constraint: blog_comments_pkey, update_columns: id }
    ) {
      id
    }
  }

  fragment usersFragment on users {
    id
    uuid
  }
`

// *** <query example> ***
//
// query users(
//   $where: users_bool_exp = {
//     uuid: {
//       _eq: "test"
//     }
//   }
// ) {
//   users(where: $where) {
//     id
//     uuid
//   }
// }
//
// *** < end query example> ***
//
//
// *** <mutation example> ***
//
// mutation insert_users_one($object: users_insert_input = { uuid: "test" }) {
//   insert_users_one(
//     object: $object
//     on_conflict: { constraint: users_uuid_key, update_columns: uuid }
//   ) {
//     ...usersFragment
//   }
// }
//
// mutation insertBlogCommentsOne(
//   $object: blog_comments_insert_input = {
//     blog_id: 1
//     user_id: 1
//     comment: "test"
//   }
// ) {
//   insert_blog_comments_one(
//     object: $object
//     on_conflict: { constraint: blog_comments_pkey, update_columns: id }
//   ) {
//     id
//   }
// }
//
// *** < end mutation example> ***

type UserCommentFormType = {
  blogId: string
}

export const UserCommentForm = ({ blogId }: UserCommentFormType) => {
  const [opened, setOpened] = useState(false)
  const { userId } = useAuth()
  const [result] = useUsersQuery({
    variables: {
      where: {
        uuid: { _eq: userId },
      },
    },
  })
  const { data } = result
  const [resInsertUsersOne, executeMutationInsertUsersOne] =
    useInsertUsersOneForUserMutation()
  const [resInsertBlogCommentsOne, executeMutationInsertBlogCommentsOne] =
    useInsertBlogCommentsOneMutation()

  // formのvalidation schemaの定義
  const validateSchema = z.object({
    /* fieldの定義方法
    ex.)
    [fieldName]: z <-zodのオブジェクト。ここは固定
      .string() <-型の定義。数字の時は .number() など
      .min([最小文字数 numberで記述], {message: [表示したいエラーメッセージを記述]}) <-最小入力値の記述（or max()で最大値） */

    comment: z
      .string()
      .min(1, { message: USER_COMMENT_FORM.INPUT.ERROR.COMMENT }),
  })

  const form = useForm({
    validate: zodResolver(validateSchema),
    initialValues: {
      comment: '',
    },
  })

  const submit = () => {
    if (data?.users[0] === undefined) insertUser()
    insertBlogCommentsOne()
  }

  const insertUser = () => {
    executeMutationInsertUsersOne({
      object: { uuid: userId },
    }).then((result) => {
      result.error ? console.log(result) : ''
    })
  }

  const insertBlogCommentsOne = () => {
    executeMutationInsertBlogCommentsOne({
      object: {
        blog_id: Number(blogId),
        user_id: data!.users[0].id,
        comment: form.values.comment,
      },
    }).then((result) => {
      result.error ? console.log(result) : form.setValues({ comment: '' })
    })
  }

  return (
    <Box mt={20} w="80%">
      <form onSubmit={form.onSubmit(submit)}>
        <Textarea
          mt={20}
          placeholder={USER_COMMENT_FORM.INPUT.COMMENT_PLACEHOLDER}
          label={USER_COMMENT_FORM.INPUT.COMMENT_LABEL}
          autosize
          minRows={5}
          maxRows={5}
          withAsterisk
          {...form.getInputProps('comment')}
        />

        <Group mt={40}>
          {userId ? (
            <Button
              type="submit"
              className="bg-user-gray font-normal leading-none text-common-black"
            >
              {USER_COMMENT_FORM.INPUT.SUBMIT}
            </Button>
          ) : (
            <Button
              onClick={() => setOpened(true)}
              className="bg-user-gray font-normal leading-none text-common-black"
            >
              {USER_COMMENT_FORM.INPUT.SUBMIT}
            </Button>
          )}
          <Modal opened={opened} onClose={() => setOpened(false)}>
            <Box className="flex items-center justify-center gap-4">
              <Link
                href={ROUTE.SIGN_UP}
                className="flex w-full items-center justify-center rounded border"
              >
                サインイン
              </Link>
              <Link
                href={ROUTE.SIGN_IN}
                className="flex w-full items-center justify-center rounded border"
              >
                ログイン
              </Link>
            </Box>
          </Modal>
        </Group>
      </form>
    </Box>
  )
}
