import { NextResponse } from 'next/server'
import { verifyToken } from '@/utils/jwt.util'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  // console.log(34, request.headers)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Authorized', user: decoded })
}

// import { NextResponse } from 'next/server'
// import { verifyToken } from '@/utils/jwt.util'
// import { type NextRequest } from 'next/server'

// export async function GET(request: NextRequest) {
//   const token = request.cookies.get('token')?.value

//   if (!token) {
//     return NextResponse.json({ error: 'UnauthorizeTTT' }, { status: 401 })
//   }

//   const decoded = verifyToken(token)

//   if (!decoded) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
//   }

//   return NextResponse.json({ message: 'Authorized', user: decoded })
// }
