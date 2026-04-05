import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/hub')) return NextResponse.next()
  if (request.nextUrl.pathname === '/hub/login') return NextResponse.next()

  const session = request.cookies.get('hub-session')
  if (session?.value === process.env.HUB_PASSWORD) return NextResponse.next()

  return NextResponse.redirect(new URL('/hub/login', request.url))
}

export const config = { matcher: ['/hub/:path*'] }
