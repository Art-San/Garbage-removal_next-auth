import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkUser } from './components/test'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Защищённые маршруты
  const isProtected = ['/dashboard'].includes(path)

  const token = req.cookies.get('token')?.value

  if (token) {
    // const test = checkUser(token)
  }
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

// Игнорируем определённые пути (например, /auth/*)
export const config = {
  matcher: ['/dashboard']
}
