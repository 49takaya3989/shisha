import { UserFooter } from 'pages/layout/Footer'
import { UserHeader } from 'pages/layout/Header'
import { Props } from 'pages/type'

export const UserLayout = ({ children }: Props) => {
  return (
    <>
      <UserHeader />
      <main>
        <div className="mx-auto mt-20 max-w-[1000px]">{children}</div>
      </main>
      <UserFooter />
    </>
  )
}
