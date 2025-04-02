'use server'

import { axiosInstance } from '@/services/axios'
import { Post } from '@/types'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

interface CreatePostData {
  number: number
}

interface PostResponse {
  status: boolean
  data?: Post[]
  msg?: string
}

interface CreateCommentData {
  postId: string
  parentId?: string
  number: number
}

async function createPostAPI(data: CreatePostData): Promise<PostResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get('user')?.value
  const response = await axiosInstance.post('/post', data, {
    headers: { Authorization: `Bearer ${token}` },
  })

  revalidatePath('/')
  return response.data
}

async function createCommentAPI(data: CreateCommentData): Promise<PostResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get('user')?.value
  const response = await axiosInstance.post('/post/comment', data, {
    headers: { Authorization: `Bearer ${token}` },
  })

  revalidatePath('/')
  return response.data
}

export { createPostAPI, createCommentAPI }
