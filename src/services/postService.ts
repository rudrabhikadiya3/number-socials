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

const getAuthToken = () => {
  return Cookies.get('user')
}

export const postService = {
  createPost: async (data: CreatePostData): Promise<PostResponse> => {
    const token = getAuthToken()
    const response = await axios.post('/api/posts', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  },
}
