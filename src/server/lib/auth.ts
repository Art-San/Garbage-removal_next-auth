// import { updateUserRefreshToken } from '@/prisma-db'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'

// const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!)
const secretKey = process.env.SESSION_SECRET || 'fallback-secret-key'
const JWT_SECRET = new TextEncoder().encode(secretKey)

const ACCESS_TOKEN_EXPIRY = '5m'
const REFRESH_TOKEN_EXPIRY = '7d'

// Генерация accessToken (15 мин)
export async function createAccessToken(userId: string, email: string) {
  const accessToken = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET)

  // const cookieStore = await cookies()
  // cookieStore.set('access_token', accessToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 10,
  //   path: '/'
  // })

  return accessToken
}

// Генерация refreshToken (7 дней) + сохранение в куки
export async function createRefreshToken(userId: string, email: string) {
  const refreshToken = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET)

  // Сохраняем refreshToken в БД
  // await updateUserRefreshToken(+userId, refreshToken)
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
export async function verifyToken(token: string = '') {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256']
    })
    return payload as JWTPayload & {
      userId: string
      email: string
      iat: number
      exp: number
    }
  } catch {
    return null
  }
}

export async function deleteAccessToken() {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
}

export async function deleteRefreshAccessToken() {
  const cookieStore = await cookies()
  cookieStore.delete('refresh_token')
  cookieStore.delete('access_token')
}
