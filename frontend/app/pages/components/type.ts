import { ReactNode } from 'react'

import { Props } from 'pages/type'

export type UserCommentFormType = {
  blogId: string
  commentId?: number | null
}

type ResComment = {
  id: number | null
  comment: string
  updated_at: string
  parent_comment_id?: number | null
  user: {
    uuid: string
  }
}

export type BlogCommentToCommentType = {
  selectedCommentId?: number | null
  selectedCommentDate: string
  selectedCommentUser: string
  selectedCommentContents: string
  selectedCommentToComments?: ResComment[]
}

export type BlogCommentToCommentModalType = BlogCommentToCommentType &
  Props & {
    isActive: boolean
    handleCommentModal: (boolean: boolean) => void
    resetSelectedComment: ({}: BlogCommentToCommentType) => void
  }

export type BlogCommentType = {
  id: number
  date: string
  user: string
  comment: string
  commentToComments: ResComment[]
  handleResponse: ({}: BlogCommentToCommentType) => void
  handleCommentModal: (boolean: boolean) => void
}
