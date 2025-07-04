import { createAccessToken, createRefreshToken } from '@/server/lib/auth'
import { registerUser } from '@/prisma-db'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  try {
    const user = await registerUser(email, password)

    const accessToken = await createAccessToken(String(user.id), user.email)
    await createRefreshToken(String(user.id), user.email)

    return Response.json({ token: accessToken, username: user.email })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    )
  }
}
// import { createRefreshTokenCookie, generateTokens } from '@/lib/session'
// import { registerUser } from '@/prisma-db'

// export async function POST(request: Request) {
//   const body = await request.json()
//   const { email, password } = body

//   try {
//     const user = await registerUser(email, password)

//     const { accessToken, refreshToken } = await generateTokens({
//       userId: String(user.id),
//       email: user.email
//     })

//     return Response.json(
//       { accessToken, user },
//       {
//         status: 201,
//         headers: {
//           'Set-Cookie': createRefreshTokenCookie(refreshToken)
//         }
//       }
//     )
//   } catch (error) {
//     return Response.json(
//       { error: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 400 }
//     )
//   }
// }
