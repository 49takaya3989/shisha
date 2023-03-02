import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'

// Set the paths that don't require the user to be signed in
export const privatePaths = ['/admin*']
export const isPrivate = (path: string) => {
  return privatePaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  )
}

// ▼▼▼ clerkのリダイレクトと相性が悪いので一旦コメントアウト ▼▼▼
//
// export const basicPaths = ['/sign-in*']
// export const isBasic = (path: string) => {
//   return basicPaths.find((x) =>
//     path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
//   )
// }
//
// ▲▲▲ clerkのリダイレクトと相性が悪いので一旦コメントアウト ▲▲▲

// ▼▼▼ clerkのリダイレクトと相性が悪いので一旦コメントアウト ▼▼▼
//
// if (isBasic(req.nextUrl.pathname)) {
//   const authorizationHeader = req.headers.get('authorization')

//   if (authorizationHeader) {
//     const basicAuth = authorizationHeader.split(' ')[1]
//     const [user, password] = atob(basicAuth).split(':')

//     if (
//       user === process.env.NEXT_PUBLIC_BASIC_AUTH_USER &&
//       password === process.env.NEXT_PUBLIC_BASIC_AUTH_PWD
//     ) {
//       return NextResponse.next()
//     }
//   }

//   const url = req.nextUrl
//   url.pathname = '/api/basic'

//   return NextResponse.rewrite(url)
// }
//
// ▲▲▲ clerkのリダイレクトと相性が悪いので一旦コメントアウト ▲▲▲

export default withClerkMiddleware((req: NextRequest) => {
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

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
}
