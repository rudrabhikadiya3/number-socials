'use client'

import { Post } from '@/types'
import PostItem from './PostItem'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      {posts.map((post, i) => (
        <PostItem key={i} post={post} level={0} />
      ))}
    </>
  )
}
