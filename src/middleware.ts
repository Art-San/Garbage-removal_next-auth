import { type NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './server/lib/auth'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard', '/dashboard/cards', '/api/private']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  console.log(345, 'test', path)

  const isPublicRoute = publicRoutes.includes(path)
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )

  console.log(999, isProtectedRoute)

  if (!isProtectedRoute && !isPublicRoute) {
    return NextResponse.next()
  }

  const refresh_token = (await cookies()).get('refresh_token')?.value

  console.log(567, refresh_token)
  if (!refresh_token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  try {
    const session = await verifyToken(refresh_token)
    console.log(568, session?.userId)

    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (
      isPublicRoute &&
      session?.userId &&
      !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    const requestHeaders = new Headers(req.headers)

    if (session) {
      requestHeaders.set('x-user-id', session.userId)
      requestHeaders.set('x-email', session.email)
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })

    return response

    // return NextResponse.next()
  } catch (error) {
    console.error('Authentication error:', error)
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/(api/private|trpc)(.*)'
  ]
}
