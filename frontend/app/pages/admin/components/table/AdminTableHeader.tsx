import { Props } from 'pages/type'

export const AdminTableHeader = ({ children }: Props) => {
  return (
    <thead className='bg-admin-base'>
      <tr>{children}</tr>
    </thead>
  )
}
