'use client'

import { Post } from '@/types'
import PostItem from './PostItem'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className='max-w-xl mx-auto mt-4'>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} level={0} />
      ))}
    </div>
  )
}
