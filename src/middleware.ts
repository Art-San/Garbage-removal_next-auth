import { type NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/profile', '/settings']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  console.log(16, 'middleware', session)
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname

//   // Защищённые маршруты
//   const isProtected = ['/dashboard'].includes(path)

//   const token = req.cookies.get('token')?.value
//   const session = req.cookies.get('session')?.value
//   console.log(13, 'middleware', token)
//   console.log(16, 'middleware', session)

//   if (token) {
//     // const test = checkUser(token)
//   }
//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   return NextResponse.next()
// }

// // Игнорируем определённые пути (например, /auth/*)
// export const config = {
//   matcher: ['/dashboard']
// }
