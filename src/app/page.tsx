'use client'

import CreatePost from '@/components/post/CreatePost'
import PostList from '@/components/post/PostList'
import AppHeader from '@/components/app/AppHeader'
import { useQuery } from '@tanstack/react-query'
import { postService } from '@/services/postService'

export default function NumberPostPage() {
  const { data: postsData } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await postService.getPost()
      return response.data || []
    },
    refetchInterval: 30000,
  })

  const posts = postsData || []

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
