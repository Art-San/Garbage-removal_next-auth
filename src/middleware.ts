import { type NextRequest, NextResponse } from 'next/server'
// import { cookies } from 'next/headers'
import { verifyToken } from './server/lib/auth'
import { cookies } from 'next/headers'
// import { parseJwtServer } from './server/lib/jwtServer'

const protectedRoutes = ['/dashboard', '/dashboard/cards']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  console.log(244, path)
  console.log(345, 'test')

  const isProtectedRoute = protectedRoutes.includes(path)
  // const isPublicRoute = publicRoutes.includes(path)

  // const authHeader = req.headers.get('authorization')
  // const token = authHeader?.split(' ')[1]

  const refresh_token = (await cookies()).get('refresh_token')?.value
  // console.log(567, authHeader)
  console.log(568, refresh_token)
  if (!refresh_token && isProtectedRoute) {
    console.log(569, !refresh_token && isProtectedRoute)
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // if (!token) {
  //   return new NextResponse(
  //     JSON.stringify({ error: 'Authentication required' }),
  //     { status: 401, headers: { 'content-type': 'application/json' } }
  //   )
  // }
  console.log(346, 'test2')

  // console.log(1717, parseJwtServer(token))
  try {
    const session = await verifyToken(refresh_token)
    console.log(568, session)

    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    const requestHeaders = new Headers(req.headers)

    requestHeaders.set('x-user-id', session.userId)
    requestHeaders.set('x-email', session.email)

    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })

    return response

    // return NextResponse.next()
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Проверка токена не удалась' }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = {
  matcher: ['/(api/private|trpc|dashboard)(.*)']
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
