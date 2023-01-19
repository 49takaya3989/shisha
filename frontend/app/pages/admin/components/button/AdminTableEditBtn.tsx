import Link from 'next/link'
import { AdminTableEditBtnType } from 'pages/admin/components/type'

const btnStyle =
  'rounded-md w-12 h-6 flex justify-center items-center bg-admin-base'

export const AdminTableEditBtn = ({href}: AdminTableEditBtnType) => {
  return (
    <Link href={href} className={btnStyle}>
      編集
    </Link>
  )
}