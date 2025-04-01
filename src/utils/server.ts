import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/User'
import dbConnect from '@/lib/mongoose'

export function now(): number {
  return Math.floor(Date.now() / 1000)
}

export async function auth(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return null

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
    await dbConnect()
    const user = await User.findById(decoded.userId).select('_id username')
    if (!user) return null

    return { id: user._id, username: user.username }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}
