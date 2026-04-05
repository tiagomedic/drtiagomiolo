import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ error: 'Senha obrigatória' }, { status: 400 })
    }

    const hubPassword = process.env.HUB_PASSWORD

    // If no password is set, allow access in development
    if (!hubPassword) {
      const response = NextResponse.json({ success: true })
      response.cookies.set('hub-session', 'dev', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      return response
    }

    if (password !== hubPassword) {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('hub-session', hubPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
