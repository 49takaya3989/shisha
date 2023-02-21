import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'

// Set the paths that don't require the user to be signed in
const publicPaths = ['/', '/_next/image*', '/blog*', '/sign-in*', '/sign-up*']
const basicPaths = ['/sign-in*']
const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  )
}
const isBasic = (path: string) => {
  return basicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  )
}

export default withClerkMiddleware((request: NextRequest) => {
  if (isBasic(request.nextUrl.pathname)) {
    const authorizationHeader = request.headers.get('authorization')

    if (authorizationHeader) {
      const basicAuth = authorizationHeader.split(' ')[1]
      console.log(basicAuth)
      const [user, password] = atob(basicAuth).split(':')

      if (
        user === process.env.NEXT_PUBLIC_BASIC_AUTH_USER &&
        password === process.env.NEXT_PUBLIC_BASIC_AUTH_PWD
      ) {
        return NextResponse.next()
      }
    }

    const url = request.nextUrl
    url.pathname = '/api/basic'

    return NextResponse.rewrite(url)
  }

  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next()
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request)

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts

    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('redirect_url', request.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

export const config = { matcher: '/((?!.*\\.).*)' }
