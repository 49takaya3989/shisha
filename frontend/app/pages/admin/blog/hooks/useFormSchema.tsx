import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'

import { ADMIN_BLOG_CREATE } from 'helper/constant/text'

export const useFormSchema = () => {
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
    blogSlug: z
      .string()
      .min(1, { message: ADMIN_BLOG_CREATE.INPUT.ERROR.SLUG }),
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

  return { form }
}
