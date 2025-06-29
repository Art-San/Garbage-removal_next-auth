import { type NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { CONFIG } from './config/config'

const protectedRoutes = ['/dashboard', '/profile', '/settings']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  console.log(45, 'CONFIG', CONFIG.API_BASE_URL)
  console.log(567, 'session', session)
  // if (isProtectedRoute && !session?.userId) {
  //   return NextResponse.redirect(new URL('/login', req.nextUrl))
  // }

  // if (
  //   isPublicRoute &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
