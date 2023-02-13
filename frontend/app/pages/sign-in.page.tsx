import { SignIn } from '@clerk/nextjs'

import { ROUTE } from 'helper/constant/route'

const SignInPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn path="/sign-in" redirectUrl={ROUTE.ADMIN_DASHBOARD} />
    </div>
  )
}

export default SignInPage
