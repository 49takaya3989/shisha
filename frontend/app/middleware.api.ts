import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'

// Set the paths that don't require the user to be signed in
export const privatePaths = ['/admin*', '/sign-up*']
export const basicPaths = ['/sign-in*']
export const isPrivate = (path: string) => {
  return privatePaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  )
}
export const isBasic = (path: string) => {
  return basicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  )
}

export const config = { matcher: '/((?!.*\\.).*)' }

export default withClerkMiddleware((req: NextRequest) => {
  if (isBasic(req.nextUrl.pathname)) {
    const authorizationHeader = req.headers.get('authorization')

    if (authorizationHeader) {
      const basicAuth = authorizationHeader.split(' ')[1]
      const [user, password] = atob(basicAuth).split(':')

      if (
        user === process.env.NEXT_PUBLIC_BASIC_AUTH_USER &&
        password === process.env.NEXT_PUBLIC_BASIC_AUTH_PWD
      ) {
        return NextResponse.next()
      }
    }

    const url = req.nextUrl
    url.pathname = '/api/basic'

    return NextResponse.rewrite(url)
  }

  if (isPrivate(req.nextUrl.pathname)) {
    // if the user is not signed in redirect them to the sign in page.
    const { userId } = getAuth(req)

    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
})
