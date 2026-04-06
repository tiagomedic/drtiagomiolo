import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/hub')) return NextResponse.next()
  if (pathname.startsWith('/hub/login')) return NextResponse.next()
  if (pathname.startsWith('/api/hub')) return NextResponse.next()

  const session = request.cookies.get('hub-session')
  if (session?.value === process.env.HUB_PASSWORD) return NextResponse.next()

  const loginUrl = new URL('/hub/login', request.nextUrl.origin)
  return NextResponse.redirect(loginUrl)
}

export const config = { matcher: ['/hub/:path*', '/api/hub/:path*'] }
