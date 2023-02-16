import { Props } from 'pages/type'

type AdminTableHeaderType = {
  col1: string
  col2?: string
  col3?: string
  col4?: string
  col5?: string
  col6?: string
  col7?: string
  col8?: string
}

export const AdminTableHeader = ({
  col1,
  col2,
  col3,
  col4,
  col5,
  col6,
  col7,
  col8,
}: AdminTableHeaderType) => {
  return (
    <thead className="bg-admin-base">
      <tr>
        <th></th>
        <th>{col1}</th>
        {col2 ? <th>{col2}</th> : ''}
        {col3 ? <th>{col3}</th> : ''}
        {col4 ? <th>{col4}</th> : ''}
        {col5 ? <th>{col5}</th> : ''}
        {col6 ? <th>{col6}</th> : ''}
        {col7 ? <th>{col7}</th> : ''}
        {col7 ? <th>{col8}</th> : ''}
        <th></th>
      </tr>
    </thead>
  )
}
