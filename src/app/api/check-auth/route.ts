import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  if (!session) {
    return NextResponse.json({ error: 'Unauthorize' }, { status: 401 })
  }

  const decoded = await decrypt(session)
  console.log(567, 'check-auth', decoded)

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Authorized', user: decoded })
}
