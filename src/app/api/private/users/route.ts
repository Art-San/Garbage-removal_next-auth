import { getUsers } from '@/server/prisma/prisma-db'

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id')
  const email = request.headers.get('x-email')

  console.log(567, 'userId GET', userId)
  console.log(567, 'email GET', email)
  try {
    const users = await getUsers()
    if (!users) throw new Error('Не удалось получить список users')

    return Response.json(users)
  } catch {
    return new Response(null, { status: 500 })
  }
}

// // В API-роуте
// export function GET(request: NextRequest) {
//   const userId = request.headers.get('x-user-id')
//   const username = request.headers.get('x-username')
//   // ...
// }
