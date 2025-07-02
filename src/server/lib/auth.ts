import { updateUserRefreshToken } from '@/prisma-db'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'

// const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!)
const secretKey = process.env.SESSION_SECRET || 'fallback-secret-key'

const JWT_SECRET = new TextEncoder().encode(secretKey)

// Генерация accessToken (15 мин)
export async function createAccessToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(JWT_SECRET)
}

// Генерация refreshToken (7 дней) + сохранение в куки
export async function createRefreshToken(userId: string) {
  const refreshToken = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  // Сохраняем refreshToken в БД
  await updateUserRefreshToken(+userId, refreshToken)
  // await prisma.user.update({
  //   where: { id: userId },
  //   data: { refreshToken }
  // })

  // Устанавливаем HttpOnly куку
  const cookieStore = await cookies()
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: '/'
  })

  return refreshToken
}

// Валидация токена
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload & { userId: string }
  } catch {
    return null
  }
}
