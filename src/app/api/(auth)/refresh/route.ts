import { decrypt, generateTokens } from '@/lib/session'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookie = (await cookies()).get('refresh_token')?.value
  console.log(789, 'api/refresh', cookie)
  const refreshToken = request.headers
    .get('Cookie')
    ?.split('; ')
    .find((c) => c.startsWith('refresh_token='))
    ?.split('=')[1]

  if (!refreshToken) {
    return Response.json({ error: 'No refresh token' }, { status: 401 })
  }

  const decoded = await decrypt(refreshToken)

  if (!decoded || !decoded.userId) {
    return Response.json({ error: 'Invalid refresh token' }, { status: 401 })
  }

  // Генерируем новый access token
  const newAccessToken = await generateTokens({
    userId: decoded.userId,
    role: decoded.role
    // expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })

  return Response.json({ accessToken: newAccessToken })
}
