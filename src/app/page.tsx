'use client'

import { useState } from 'react'
import AppHeader from '@/components/custom/AppHeader'
import { Post } from '@/types'
import CreatePost from '@/components/custom/CreatePost'
import PostList from '@/components/post/PostList'

export default function NumberPostPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      number: 10,
      username: 'alice',
      timestamp: '2h ago',
      comments: [
        {
          id: 2,
          number: 15,
          username: 'bob',
          timestamp: '1h ago',
          comments: [
            {
              id: 4,
              number: 30,
              username: 'dave',
              timestamp: '30m ago',
              comments: [],
            },
          ],
        },
        {
          id: 3,
          number: 5,
          username: 'charlie',
          timestamp: '45m ago',
          comments: [],
        },
      ],
    },
    {
      id: 5,
      number: 42,
      username: 'eve',
      timestamp: '3h ago',
      comments: [],
    },
  ])

  return (
    <>
      <AppHeader />
      <div className='max-w-xl mx-auto mt-4'>
        <CreatePost />
      </div>

      <PostList posts={posts} />
    </>
  )
}
