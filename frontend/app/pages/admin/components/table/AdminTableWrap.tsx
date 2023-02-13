import { Table } from '@mantine/core'
import { Props } from 'pages/type'

export const AdminTableWrap = ({ children }: Props) => {
  return (
    <Table verticalSpacing='sm' className='border border-solid border-common-black border-opacity-30'>
      {children}
    </Table>
  )
}