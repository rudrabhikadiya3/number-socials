import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body

    if (!username || !password) return NextResponse.json({ status: false, msg: 'Username and password are required' }, { status: 400 })
    await dbConnect()
    const user = await User.findOne({ username })
    if (!user) return NextResponse.json({ status: false, msg: 'Invalid credentials' }, { status: 401 })

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) return NextResponse.json({ status: false, msg: 'Invalid credentials' }, { status: 401 })

    const token = jwt.sign({ userId: user._id.toString(), username: user.username }, JWT_SECRET, { expiresIn: '7d' })
    return NextResponse.json({ status: true, data: { token: token }, msg: 'Login successful' })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json({ status: false, msg: 'Login failed' }, { status: 500 })
  }
}
