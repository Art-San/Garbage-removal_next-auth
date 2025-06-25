import { registerUser } from '@/prisma-db'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  try {
    const user = await registerUser(email, password)
    return Response.json({ user })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    )
  }
}
