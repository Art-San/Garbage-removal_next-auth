import { deleteRefreshAccessToken } from '@/server/lib/auth'
import { NextResponse } from 'next/server'

export async function POST() {
  const res = await deleteRefreshAccessToken()
  console.log(456, res)
  return NextResponse.json({ success: true }, { status: 200 })
}
