import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Comment from '@/models/Comment'
import { auth, now } from '@/utils/server'
import mongoose from 'mongoose'

export async function POST(req: NextRequest) {
  try {
    const user = await auth(req)
    if (!user) {
      return NextResponse.json({ status: false, msg: 'Authentication required' }, { status: 401 })
    }

    const body = await req.json()
    const { number, postId, parentId } = body

    await dbConnect()
    await Comment.create({
      userId: user.id,
      postId: new mongoose.Types.ObjectId(postId),
      parentId: parentId,
      number: Number(number),
      createdAt: now(),
    })
    return NextResponse.json({ status: true }, { status: 201 })
  } catch (error: any) {
    console.log('Error creating comment:', error)
    return NextResponse.json({ status: false, msg: error.message || 'An error occurred while creating the comment' }, { status: 500 })
  }
}
