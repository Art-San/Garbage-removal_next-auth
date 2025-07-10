import { type NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './server/lib/auth'

const protectedRoutes = ['/dashboard', '/dashboard/cards']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )
  const isPublicRoute = publicRoutes.includes(path)

  // Пропускаем проверку токена для публичных маршрутов
  if (!isProtectedRoute && !isPublicRoute) {
    return NextResponse.next()
  }

  const refresh_token = req.cookies.get('refresh_token')?.value

  // Редирект для незалогиненных пользователей на защищённых маршрутах
  if (!refresh_token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  try {
    const session = refresh_token ? await verifyToken(refresh_token) : null

    // Редирект для залогиненных пользователей на публичных маршрутах
    if (isPublicRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    // Редирект при невалидной сессии на защищённых маршрутах
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Добавляем данные пользователя в заголовки
    const headers = new Headers(req.headers)
    if (session) {
      headers.set('x-user-id', session.userId)
      headers.set('x-email', session.email)
    }

    return NextResponse.next({ request: { headers } })
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

// от Qwen
// import { type NextRequest, NextResponse } from 'next/server'
// import { verifyToken } from './server/lib/auth'
// import { cookies } from 'next/headers'

// const protectedRoutes = ['/dashboard', '/dashboard/cards']
// const publicRoutes = ['/login', '/register']

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname

//   const isProtectedRoute = protectedRoutes.includes(path)
//   const isPublicRoute = publicRoutes.includes(path)

//   const refresh_token = (await cookies()).get('refresh_token')?.value

//   console.log('Refresh token:', refresh_token)

//   if (!refresh_token && isProtectedRoute) {
//     return NextResponse.redirect(new URL('/login', req.nextUrl))
//   }

//   try {
//     const session = await verifyToken(refresh_token)

//     console.log('Session:', session)

//     if (!session && isProtectedRoute) {
//       return NextResponse.redirect(new URL('/login', req.nextUrl))
//     }

//     if (
//       isPublicRoute &&
//       session?.userId &&
//       !req.nextUrl.pathname.startsWith('/dashboard')
//     ) {
//       return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
//     }

//     const requestHeaders = new Headers(req.headers)

//     if (session) {
//       requestHeaders.set('x-user-id', session.userId)
//       requestHeaders.set('x-email', session.email)
//     }

//     const response = NextResponse.next({
//       request: {
//         headers: requestHeaders
//       }
//     })

//     return response
//   } catch (error) {
//     console.error('Token verification failed:', error)
//     return new NextResponse(
//       JSON.stringify({ error: 'Проверка токена не удалась' }),
//       { status: 403, headers: { 'content-type': 'application/json' } }
//     )
//   }
// }

// export const config = {
//   matcher: ['/(api/private|trpc|dashboard|login|register)(.*)']
// }
