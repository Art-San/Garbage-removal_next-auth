import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'your-jwt-library' // Замените на вашу JWT библиотеку

export async function middleware(request: NextRequest) {
  // Пропускаем статические файлы и некоторые маршруты
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register'
  ) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }

  try {
    if (!jwt.verifyToken(token)) {
      return new NextResponse(JSON.stringify({ error: 'Invalid token' }), {
        status: 403,
        headers: { 'content-type': 'application/json' }
      })
    }

    const payload = jwt.getPayload(token) as {
      userId: string
      username: string
    }

    // Создаем новый заголовок с информацией о пользователе
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId)
    requestHeaders.set('x-username', payload.username)

    // Продолжаем выполнение с новыми заголовками
    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })

    return response
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Token verification failed' }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    )
  }
}

// export const config = {
//   matcher: [
//     /*
//      * Исключаем:
//      * - api (если нужно)
//      * - статические файлы
//      * - файлы изображений
//      * - favicon.ico
//      * - manifest файлы
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json$)).*)',
//   ],
// }
