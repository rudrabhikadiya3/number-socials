'use client'

import { Post } from '@/types'
import PostItem from './PostItem'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} level={0} />
      ))}
    </>
  )
}
