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

const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Signup successful', data)
    } catch (error) {
      console.error('Signup failed', error)
    } finally {
      setLoading(false)
    }
  }
  const PasswordEyeIcon = showPassword ? EyeOff : Eye
  const ConfirmPasswordEyeIcon = showConfirmPassword ? EyeOff : Eye

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <Card className='w-96 shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center'>Sign Up</CardTitle>
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
                <PasswordEyeIcon className='w-5 h-5 opacity-50' />
              </button>
              {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            </div>
            <div className='relative'>
              <Input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' {...register('confirmPassword')} />
              <button type='button' className='absolute inset-y-0 right-2 flex items-center' onClick={toggleConfirmPasswordVisibility}>
                <ConfirmPasswordEyeIcon className='w-5 h-5 opacity-50' />
              </button>
              {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
            </div>
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
          <p className='text-center text-sm mt-4'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
