import {
  createAccessToken,
  createRefreshToken,
  verifyToken
} from '@/server/lib/auth'
import { cookies } from 'next/headers'

export async function POST() {
  const refreshToken = (await cookies()).get('refresh_token')?.value

  try {
    if (!refreshToken) {
      return Response.json({ error: 'No refresh token' }, { status: 401 })
    }

    const decoded = await verifyToken(refreshToken)

    if (!decoded || new Date(decoded.exp * 1000) < new Date()) {
      return Response.json({ error: 'Invalid refresh token' }, { status: 403 })
    }

    const accessToken = await createAccessToken(decoded.userId, decoded.email)
    await createRefreshToken(decoded.userId, decoded.email)

    return Response.json({ token: accessToken, username: decoded.email })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 400 }
    )
  }
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
