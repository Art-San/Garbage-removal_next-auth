import { decrypt, encrypt } from '@/lib/session'

export async function POST(request: Request) {
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
  const newAccessToken = await encrypt({
    userId: decoded.userId,
    role: 'user',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })

  return Response.json({ accessToken: newAccessToken })
}
