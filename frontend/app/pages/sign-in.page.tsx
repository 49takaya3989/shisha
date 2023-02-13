import { SignIn } from '@clerk/nextjs'
import { ROUTE } from 'helper/constant/route'

const SignInPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignIn path='/sign-in' redirectUrl={ROUTE.ADMIN_DASHBOARD} />
    </div>
  )
}

export default SignInPage
