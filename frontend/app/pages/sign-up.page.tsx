import { SignUp } from '@clerk/nextjs'

import { ROUTE } from 'helper/constant/route'

const signUpPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp
        path={ROUTE.SIGN_UP}
        redirectUrl={ROUTE.HOME}
        signInUrl={ROUTE.SIGN_IN}
      />
    </div>
  )
}

export default signUpPage
