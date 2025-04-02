import axios from 'axios'
import { axiosInstance } from './axios'

interface SignupData {
  username: string
  password: string
}

interface AuthResponse {
  status: boolean
  data?: {
    user: {
      id: string
      username: string
      createdAt: string
    }
    token: string
  }
  msg?: string
}

export const authService = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/signup', data)
    return response.data
  },

  login: async (data: SignupData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', data)
    return response.data
  },
}
