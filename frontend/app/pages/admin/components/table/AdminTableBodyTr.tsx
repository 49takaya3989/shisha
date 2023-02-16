import { Props } from 'pages/type'

export const AdminTableBodyTr = ({ children }: Props) => {
  return (
    <tr className="border-t border-solid border-common-black border-opacity-30">
      {children}
    </tr>
  )
}
