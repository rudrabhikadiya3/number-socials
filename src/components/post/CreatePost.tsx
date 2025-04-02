'use client'

import { useAuth } from '@/hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { MouseEvent, useState } from 'react'
import LoginAlertModal from '../global/LoginDialogue'
import { useMutation } from '@tanstack/react-query'
import { createPostAPI } from '@/lib/actions'

const CreatePost = () => {
  const [value, setValue] = useState('')
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const { user } = useAuth()

  const createPostMutation = useMutation({
    mutationFn: (number: number) => createPostAPI({ number }),
  })

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault()
    if (!user) {
      setShowLoginAlert(true)
      return
    }
    if (value) {
      createPostMutation.mutate(Number(value))
      setValue('')
    } else {
      console.error('Input cannot be empty')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue)
    }
  }
  return (
    <div className='w-full p-4 border border-b rounded space-y-2 mb-3'>
      <div className='flex items-center'>
        {user && (
          <Avatar className='h-8 w-8 mr-1.5'>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} />
            <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
          </Avatar>
        )}

        <h2 className='text-lg font-semibold'>Create a post</h2>
      </div>
      <form>
        <Input
          placeholder='Which number is in your mind?'
          className='p-0 ps-1 border-0 focus-visible:border-0 focus-visible:ring-0 shadow-none'
          onChange={handleChange}
          value={value}
        />
        <div className='text-start'>
          <Button onClick={handleSubmit} className='text-end' size='sm' disabled={!value} type='submit'>
            Post
          </Button>
        </div>
      </form>
      <LoginAlertModal
        isOpen={showLoginAlert}
        onOpenChange={setShowLoginAlert}
        description={`You're not logged in! Log in to create and share your posts`}
      />
    </div>
  )
}

export default CreatePost
