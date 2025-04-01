'use client'

import { useState } from 'react'
import { Post } from '@/types'
import CreatePost from '@/components/post/CreatePost'
import PostList from '@/components/post/PostList'
import AppHeader from '@/components/app/AppHeader'

export default function NumberPostPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      number: 10,
      username: 'alice',
      timestamp: '2h',
      comments: [
        {
          id: 2,
          number: 15,
          username: 'bob',
          timestamp: '1h',
          comments: [
            {
              id: 4,
              number: 30,
              username: 'dave',
              timestamp: '30m',
              comments: [],
            },
          ],
        },
        {
          id: 3,
          number: 5,
          username: 'charlie',
          timestamp: '45m',
          comments: [],
        },
      ],
    },
    {
      id: 5,
      number: 42,
      username: 'eve',
      timestamp: '3h',
      comments: [],
    },
  ])

  return (
    <>
      <AppHeader />
      <div className='max-w-2xl mx-auto mt-16'>
        <CreatePost />
        <PostList posts={posts} />
      </div>
    </>
  )
}
