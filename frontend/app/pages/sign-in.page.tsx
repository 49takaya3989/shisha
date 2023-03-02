import { SignIn } from '@clerk/nextjs'

import { ROUTE } from 'helper/constant/route'

const SignInPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        path={ROUTE.SIGN_IN}
        redirectUrl={ROUTE.HOME}
        signUpUrl={ROUTE.SIGN_UP}
      />
    </div>
  )
}

export default SignInPage
