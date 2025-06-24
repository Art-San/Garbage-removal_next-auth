// app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Проверяем, аутентифицирован ли пользователь (пример)
  const isLoggedIn = checkAuthentication() // Замените на вашу логику аутентификации

  if (!isLoggedIn) {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Если пользователь аутентифицирован, разрешаем доступ к маршруту
  return NextResponse.next()
}

// Функция для проверки аутентификации (пример)
function checkAuthentication(): boolean {
  // Здесь ваша логика аутентификации (например, проверка токена в куках)
  return false // Замените на вашу реальную логику
}

// Указываем, какие маршруты нужно защитить
export const config = {
  matcher: ['/protected/:path*'] // Защищает все маршруты в /protected
}
