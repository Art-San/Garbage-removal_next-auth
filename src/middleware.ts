import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from './server/lib/auth'

const protectedRoutes = ['/dashboard', '/profile', '/settings']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const refresh_token = (await cookies()).get('refresh_token')?.value
  const access_token = (await cookies()).get('access_token')?.value
  // console.log(56, 'cookie', refresh_token)

  const session = await verifyToken(access_token)
  console.log(567, 'session', session)

  if (!session && refresh_token) {
    // console.log(45, `${req.nextUrl.origin}/api/refresh`)
    const res = await fetch(`${req.nextUrl.origin}/api/refresh`, {
      method: 'POST',
      headers: {
        refresh_token: refresh_token
      }
    })

    console.log(13, 'Нет access_token но есть refresh_token')

    const data = await res.json()
    console.log(14, data)
  }
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
