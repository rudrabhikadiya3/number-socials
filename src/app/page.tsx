import Cookies from 'js-cookie'
import CreatePost from '@/components/post/CreatePost'
import PostList from '@/components/post/PostList'
import AppHeader from '@/components/app/AppHeader'
import { axiosInstance } from '@/services/axios'

export const dynamic = 'force-dynamic'

export default async function NumberPostPage() {
  const token = Cookies.get('user')
  const posts = await axiosInstance.get('/api/post', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return (
    <>
      <AppHeader />
      <div className='max-w-2xl mx-auto mt-16'>
        <CreatePost />
        <PostList posts={posts.data.data ?? []} />
      </div>
    </>
  )
}
