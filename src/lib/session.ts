import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET || 'fallback-secret-key'

const JWT_SECRET = new TextEncoder().encode(secretKey)
// const ACCESS_TOKEN_EXPIRY = '5s'
const ACCESS_TOKEN_EXPIRY = '1d'
const REFRESH_TOKEN_EXPIRY = '7d'

export interface SessionPayload {
  userId: string
  role?: string
}

export async function generateTokens(session: any) {
  const accessToken = await new SignJWT(session)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET)

  const refreshToken = await new SignJWT(session)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET)

  return { accessToken, refreshToken }
}

//==============================================================

// export async function encrypt(payload: SessionPayload) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('7d')
//     .sign(JWT_SECRET)
// }

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, JWT_SECRET, {
      algorithms: ['HS256']
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
    return null
  }
}

export async function createSession(userId: string, role?: string) {
  const { accessToken: session } = await generateTokens({ userId, role })

  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  })

  return session
}

export async function createRefreshToken(userId: string, role: string) {
  const { refreshToken } = await generateTokens({ userId, role })

  const cookieStore = await cookies()
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/'
  })

  return refreshToken
}

// export async function createRefreshAccessToken(userId: string, role: string) {

// }

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  return await decrypt(session)
}
