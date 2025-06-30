import { deleteSession } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function POST() {
  const res = await deleteSession()
  console.log(456, res)
  return NextResponse.json({ success: true }, { status: 200 })
}
