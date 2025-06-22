import { registerUser } from '@/prisma-db'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  try {
    const user = await registerUser(email, password)
    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    // Возвращаем ошибку клиенту с кодом 400 и текстом
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 400, // Bad Request
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
