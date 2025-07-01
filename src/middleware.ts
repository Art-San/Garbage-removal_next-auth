// import { type NextRequest, NextResponse } from 'next/server'

// import { cookies } from 'next/headers'
// import { jwtDecode } from 'jwt-decode'
// import { appFetch } from './utils/api'

// const protectedRoutes = ['/dashboard', '/profile', '/settings']
// const publicRoutes = ['/login', '/register']

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname

//   const isProtectedRoute = protectedRoutes.includes(path)
//   const isPublicRoute = publicRoutes.includes(path)

//   const cookie = (await cookies()).get('session')?.value
//   console.log(56, 'middleware cookie', cookie)

//   if (cookie) {
//     const session3 = jwtDecode(cookie)
//     console.log(58, 'middleware session', session3)
//     if (session3.exp < Date.now() / 1000) {
//       console.log(3, 'session.exp меньше Date.now()')
//      appFetch()
//     } else {
//       console.log(4, 'session.exp НЕ меньше Date.now()')
//     }
//   }

//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL('/login', req.nextUrl))
//   }

//   if (
//     isPublicRoute &&
//     session?.userId &&
//     !req.nextUrl.pathname.startsWith('/dashboard')
//   ) {
//     return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
// }

import { type NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard', '/profile', '/settings']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get('session')?.value
  // console.log(56, 'cookie', cookie)

  const session = await decrypt(cookie)
  // console.log(567, 'session', session)
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
