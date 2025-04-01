import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Comment, { IComment } from '@/models/Comment'
import { auth, now } from '@/utils/server'

export async function POST(req: NextRequest) {
  try {
    const user = await auth(req)
    if (!user) {
      return NextResponse.json({ status: false, msg: 'Authentication required' }, { status: 401 })
    }

    const body = await req.json()
    const { number } = body

    if (number === undefined || number === null) {
      return NextResponse.json({ status: false, msg: 'Post ID and number are required' }, { status: 400 })
    }

    await dbConnect()

    await Comment.create({
      userId: user.id,
      postId: null,
      parentId: null,
      number: Number(number),
      createdAt: now(),
    })

    return NextResponse.json({ status: true }, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ status: false, msg: (error as Error).message || 'An error occurred while creating the comment' }, { status: 500 })
  }
}

function isPopulatedUser(user: unknown): user is { username: string } {
  return typeof user === 'object' && user !== null && 'username' in user
}

export async function GET() {
  try {
    await dbConnect()
    // get all comments that are top-level posts (parentId is null)
    const posts = await Comment.find({ parentId: null })
      .populate<{ userId: { username: string } }>('userId', 'username')
      .sort({ createdAt: -1 })
      .lean<IComment[]>()

    // get all comments (non-posts)
    const allComments = await Comment.find({ parentId: { $ne: null } })
      .populate<{ userId: { username: string } }>('userId', 'username')
      .sort({ createdAt: -1 })
      .lean<IComment[]>()

    // build the comment tree
    const buildCommentTree = (postId: string): any[] => {
      // find all direct children of this post or comment
      const directChildren = allComments.filter((comment) => comment.parentId && comment.parentId.toString() === postId.toString())
      // for each child, recursively build its own comment tree
      return directChildren.map((comment) => {
        return {
          id: comment._id,
          number: comment.number,
          username: isPopulatedUser(comment.userId) ? comment.userId.username : 'Anonymous',
          timestamp: comment.createdAt,
          comments: buildCommentTree(comment._id as string),
        }
      })
    }

    // format the posts array with their nested comments
    const threadsWithComments = posts.map((post) => {
      return {
        id: post._id,
        number: post.number,
        username: isPopulatedUser(post.userId) ? post.userId?.username : 'Anonymous',
        timestamp: post.createdAt,
        comments: buildCommentTree(post._id as string),
      }
    })

    return NextResponse.json({ data: threadsWithComments }, { status: 200 })
  } catch (error: unknown) {
    console.error('Error fetching threads:', error)
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 })
  }
}
