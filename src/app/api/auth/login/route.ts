import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ status: false, msg: 'Username and password are required' }, { status: 400 })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ status: false, msg: 'Username already exists' }, { status: 409 })
    }

    const user = new User({
      username,
      password,
    })
    await user.save()

    const token = jwt.sign({ userId: user._id.toString(), username: user.username }, JWT_SECRET, { expiresIn: '7d' })

    const response = NextResponse.json(
      {
        status: true,
        data: {
          user: {
            id: user._id,
            username: user.username,
            createdAt: user.createdAt,
          },
          token: token,
        },
        msg: 'Account created successfully',
      },
      { status: 201 }
    )

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      {
        status: false,
        msg: 'Failed to create account',
      },
      { status: 500 }
    )
  }
}
