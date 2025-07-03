import { getUser } from '@/prisma-db'
import { createAccessToken, verifyToken } from '@/server/lib/auth'

export async function POST(request: Request) {
  const refreshToken = request.headers.get('refresh_token')
  // const refreshToken = request.headers
  //   .get('Cookie')
  //   ?.split('; ')
  //   .find((c) => c.startsWith('refresh_token='))
  //   ?.split('=')[1]

  console.log(789, 'api/refresh', request.headers.get('refresh_token'))
  if (!refreshToken) {
    return Response.json({ error: 'No refresh token' }, { status: 401 })
  }

  const decoded = await verifyToken(refreshToken)

  if (!decoded || !decoded.userId) {
    return Response.json({ error: 'Invalid refresh token' }, { status: 401 })
  }

  const user = await getUser(+decoded.userId)

  // Генерируем новый access token
  const newAccessToken = await createAccessToken(String(user.id), user.email)

  return Response.json({ accessToken: newAccessToken, user })
}
// import { decrypt, generateTokens } from '@/lib/session'
// import { getUser } from '@/prisma-db'
// import { cookies } from 'next/headers'

// export async function POST(request: Request) {
//   const cookie = (await cookies()).get('refresh_token')?.value
//   console.log(789, 'api/refresh', cookie)
//   const refreshToken = request.headers
//     .get('Cookie')
//     ?.split('; ')
//     .find((c) => c.startsWith('refresh_token='))
//     ?.split('=')[1]

//   if (!refreshToken) {
//     return Response.json({ error: 'No refresh token' }, { status: 401 })
//   }

//   const decoded = await decrypt(refreshToken)

//   if (!decoded || !decoded.userId) {
//     return Response.json({ error: 'Invalid refresh token' }, { status: 401 })
//   }

//   const user = await getUser(+decoded.userId)

//   // Генерируем новый access token
//   const newAccessToken = await generateTokens({
//     userId: String(user.id),
//     email: user.email
//   })

//   return Response.json({ accessToken: newAccessToken, user })
// }
