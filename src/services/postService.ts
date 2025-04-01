import axios from 'axios'
import Cookies from 'js-cookie'

interface CreatePostData {
  number: number
}

interface PostResponse {
  status: boolean
  data?: {
    id: string
    number: number
    userId: string
    createdAt: number
  }
  msg?: string
}

interface Comment {
  id: string
  number: number
  username: string
  timestamp: string
  postId: string
  parentId: string | null
  comments: Comment[]
}

export interface Post {
  id: string
  number: number
  username: string
  timestamp: string
  comments: Comment[]
}

interface CreateCommentData {
  postId: string
  parentId?: string
  number: number
}

interface CommentResponse {
  status: boolean
  data?: {
    id: string
    postId: string
    parentId: string | null
    number: number
    userId: string
    createdAt: number
  }
  msg?: string
}

const getAuthToken = () => {
  return Cookies.get('user')
}

export const postService = {
  createPost: async (data: CreatePostData): Promise<PostResponse> => {
    const token = getAuthToken()
    const response = await axios.post('/api/post', data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },

  getPost: async (): Promise<PostResponse> => {
    const token = getAuthToken()
    const response = await axios.get('/api/post', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },

  createComment: async (data: CreateCommentData): Promise<CommentResponse> => {
    const token = getAuthToken()
    const response = await axios.post('/api/post/comment', data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },
}
