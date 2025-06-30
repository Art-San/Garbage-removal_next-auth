import { createRefreshToken, createSession } from '@/lib/session'
import { registerUser } from '@/prisma-db'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  try {
    const user = await registerUser(email, password)

    const accessToken = await createSession(String(user.id), user.role)
    await createRefreshToken(String(user.id), user.role)

    return Response.json({ accessToken, user })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    )
  }
}
