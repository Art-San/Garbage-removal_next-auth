import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from './server/lib/auth'

const protectedRoutes = [
  '/dashboard',
  '/dashboard/cards',
  '/profile',
  '/settings'
]
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const authHeader = req.headers
  console.log(568, authHeader)

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const refresh_token = (await cookies()).get('refresh_token')?.value
  // const access_token = (await cookies()).get('access_token')?.value

  // console.log(56, 'cookie', refresh_token)

  // const session = await verifyToken(access_token)
  const session = await verifyToken(refresh_token)
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
