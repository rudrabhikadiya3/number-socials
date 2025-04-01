'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true)
    try {
      console.log('Login successful', data)
    } catch (error) {
      console.error('Login failed', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const EyeIcon = showPassword ? EyeOff : Eye
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <Card className='w-96 shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Input placeholder='Username' {...register('username')} />
              {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
            </div>
            <div className='relative'>
              <Input type={showPassword ? 'text' : 'password'} placeholder='Password' {...register('password')} />
              <button type='button' className='absolute inset-y-0 right-2 flex items-center' onClick={togglePasswordVisibility}>
                <EyeIcon className='w-5 h-5 opacity-50' />
              </button>
              {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            </div>
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className='text-center text-sm mt-4'>
            Don't have an account?{' '}
            <Link href='/signup' className='text-blue-500 hover:underline'>
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
