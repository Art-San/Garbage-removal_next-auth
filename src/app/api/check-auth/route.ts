import { NextResponse } from 'next/server'
import { verifyToken } from '@/utils/jwt.util'

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Authorized', user: decoded })
}
