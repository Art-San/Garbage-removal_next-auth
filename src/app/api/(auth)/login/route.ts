import { createRefreshTokenCookie, generateTokens } from '@/lib/session'
import { loginUser } from '@/prisma-db'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const user = await loginUser(email, password)
    if (!user) throw new Error('User not found')

    const { accessToken, refreshToken } = await generateTokens({
      userId: String(user.id),
      email: user.email
    })

    return Response.json(
      { accessToken, user },
      {
        status: 200,
        headers: {
          'Set-Cookie': createRefreshTokenCookie(refreshToken)
        }
      }
    )
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 400 }
    )
  }
}
