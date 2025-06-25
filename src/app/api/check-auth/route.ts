// import { NextResponse } from 'next/server'
// import { verifyToken } from '@/utils/jwt.util'
// import { type NextRequest } from 'next/server'

// export async function GET(request: NextRequest) {
//   const token = request.headers.get('Authorization')?.replace('Bearer ', '')
//   // console.log(34, request.headers)
//   if (!token) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const decoded = verifyToken(token)

//   if (!decoded) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
//   }

//   return NextResponse.json({ message: 'Authorized', user: decoded })
// }

import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  console.log(467, session)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorize' }, { status: 401 })
  }

  // const decoded = verifyToken(token)
  const decoded = await decrypt(session)
  console.log(567, decoded)

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Authorized', user: decoded })
}
