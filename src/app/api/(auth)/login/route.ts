import { loginUser } from '@/prisma-db'
import { generateToken } from '@/utils/jwt.util'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const user = await loginUser(email, password)
    if (!user) throw new Error('User not found')

    const token = generateToken(user.id) // Токен генерируется на сервере!

    return Response.json({ token }) // Отправляем токен клиенту
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 400 }
    )
  }
}

// export async function POST(request: Request) {
//   const body = await request.json()
//   const { email, password } = body

//   try {
//     const user = await loginUser(email, password)

//     return new Response(JSON.stringify(user), {
//       headers: { 'Content-Type': 'application/json' }
//     })
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         error: error instanceof Error ? error.message : 'Unknown error'
//       }),
//       {
//         status: 400, // Bad Request
//         headers: { 'Content-Type': 'application/json' }
//       }
//     )
//   }
// }
