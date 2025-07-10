import { type NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './server/lib/auth'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard', '/dashboard/cards']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  // console.log(345, 'test')

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

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
    return new NextResponse(
      JSON.stringify({ error: 'Проверка токена не удалась' }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = {
  matcher: ['/(api/private|trpc|dashboard|login|register)(.*)']
}
// import { type NextRequest, NextResponse } from 'next/server'
// import { cookies } from 'next/headers'
// import { verifyToken } from './server/lib/auth'

// const protectedRoutes = ['/dashboard', '/profile', '/settings']
// const publicRoutes = ['/login', '/register']

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname

//   // const authHeader = req.headers
//   // console.log(568, authHeader)

//   const isProtectedRoute = protectedRoutes.includes(path)
//   const isPublicRoute = publicRoutes.includes(path)

//   const authorizationHeader = req.headers.get('authorization')?.split(' ')[1]
//   console.log(569, 'Authorization:', authorizationHeader)

//   // const refresh_token = (await cookies()).get('refresh_token')?.value
//   const access_token = (await cookies()).get('access_token')?.value

//   // console.log(56, 'cookie', refresh_token)

//   // const session = await verifyToken(authorizationHeader)
//   // const session = await verifyToken(access_token)
//   // console.log(567, 'session', session)

//   if (authorizationHeader) {
//     // console.log(54, 'authorizationHeader')
//     console.log(55, authorizationHeader === access_token)
//   }

//   // if (isProtectedRoute && !session?.userId) {
//   //   return NextResponse.redirect(new URL('/login', req.nextUrl))
//   // }

//   // if (
//   //   isPublicRoute &&
//   //   session?.userId &&
//   //   !req.nextUrl.pathname.startsWith('/dashboard')
//   // ) {
//   //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
//   // }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/(api|trpc|dashboard)(.*)']
// }
