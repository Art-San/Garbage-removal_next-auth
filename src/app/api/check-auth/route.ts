// import { NextResponse } from 'next/server'
// import { verifyToken } from '@/utils/jwt.util'
// import { type NextRequest } from 'next/server'

// export async function GET(request: NextRequest) {
//   console.log(777, request.headers)
//   const token = request.headers.get('Authorization')?.replace('Bearer ', '')

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
import { verifyToken } from '@/utils/jwt.util'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = verifyToken(token)
  console.log(13, decoded)

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Authorized', user: decoded })
}
