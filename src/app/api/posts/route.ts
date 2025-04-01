import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Post from '@/models/Post'
import { auth, now } from '@/utils/server'

export async function POST(req: NextRequest) {
  try {
    const user = await auth(req)
    if (!user) {
      return NextResponse.json({ status: false, msg: 'Authentication required' }, { status: 401 })
    }

    const body = await req.json()
    const { number } = body

    if (!number) {
      return NextResponse.json({ status: false, msg: 'Number is required' }, { status: 400 })
    }

    await dbConnect()
    const post = await Post.create({
      number: Number(number),
      userId: user.id,
      createdAt: now(),
    })

    return NextResponse.json(
      { status: true, data: { id: post._id, number: post.number, userId: post.userId, createdAt: post.createdAt } },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating post:', error)
    return NextResponse.json({ status: false, msg: 'An error occurred while creating the post' }, { status: 500 })
  }
}
