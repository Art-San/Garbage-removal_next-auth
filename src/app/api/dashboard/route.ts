import { getUsers } from '@/prisma-db'

export async function GET() {
  try {
    const users = await getUsers()
    if (!users) throw new Error('Не удалось получить users')

    return Response.json(users)
  } catch {
    return new Response(null, { status: 500 })
  }
}
