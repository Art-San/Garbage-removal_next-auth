import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Защищённые маршруты
  const isProtected = ['/dashboard'].includes(path)

  if (isProtected) {
    // Отправляем запрос на /api/check-auth
    fetch('/api/check-auth', {
      method: 'GET',
      headers: {
        Cookie: req.headers.get('cookie') || ''
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          return NextResponse.redirect(new URL('/auth/login', req.url))
        }
      })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard']
}
