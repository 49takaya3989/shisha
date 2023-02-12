import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // This logic is only applied to /about
    console.log('middleware')
  }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   // This logic is only applied to /dashboard
  // }
}