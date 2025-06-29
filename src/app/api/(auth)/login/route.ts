import { createRefreshToken, createSession } from '@/lib/session'
import { loginUser } from '@/prisma-db'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const user = await loginUser(email, password)
    if (!user) throw new Error('User not found')

    const accessToken = await createSession(String(user.id), user.role)
    await createRefreshToken(String(user.id), user.role)

    return Response.json({ accessToken, user })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 400 }
    )
  }
}
