import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

interface UserData {
  userId: string
  username: string
  exp: number
  iat: number
}

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = Cookies.get('user')

        if (!token) {
          setUser(null)
          setLoading(false)
          return
        }

        const decoded = jwtDecode<UserData>(token)

        const currentTime = Math.floor(Date.now() / 1000)
        if (decoded.exp && decoded.exp < currentTime) {
          Cookies.remove('user')
          setUser(null)
        } else {
          setUser(decoded)
        }
      } catch (error) {
        console.log('Auth token error:', error)
        Cookies.remove('user')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    window.addEventListener('storage', checkAuth)

    return () => {
      window.removeEventListener('storage', checkAuth)
    }
  }, [])

  const logout = () => {
    Cookies.remove('user')
    setUser(null)
    router.push('/login')
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
  }
}
