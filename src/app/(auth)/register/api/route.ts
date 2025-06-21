import { addUser } from '@/prisma-db'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, name } = body
  const user = await addUser(email, password, name)
  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' }
  })
}
