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
    throw error
  }
}
// export async function POST(request: Request) {
//   const body = await request.json()
//   const { email, password } = body
//   const user = await registerUser(email, password)
//   return new Response(JSON.stringify(user), {
//     headers: { 'Content-Type': 'application/json' }
//   })
// }
