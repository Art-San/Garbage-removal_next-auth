import { getUserById } from '@/prisma-db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserById(+params.id)
    if (!user) throw new Error('User not found')
    return Response.json(user)
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Get User failed' },
      { status: 404 }
    )
  }
}
