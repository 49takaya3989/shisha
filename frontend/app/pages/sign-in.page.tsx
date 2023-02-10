import { SignIn } from '@clerk/nextjs'
import { ROUTE } from 'helper/constant/route'

const SignInPage = () => {
  return <SignIn path='/sign-in' redirectUrl={ROUTE.ADMIN_DASHBOARD} />
}

export default SignInPage
