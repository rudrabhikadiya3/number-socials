'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Post } from '@/types'
import { useState } from 'react'
import { Send } from 'lucide-react'

interface ReplyModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  post: Post
}

export default function ReplyModal({ isOpen, onOpenChange, post }: ReplyModalProps) {
  const [operator, setOperator] = useState('+')
  const [number, setNumber] = useState('')

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Reply to post</DialogTitle>
        </DialogHeader>
        <div className='flex items-start space-x-2 mb-4'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.username}`} />
            <AvatarFallback>{post.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className='font-medium'>{post.username}</div>
            <div className='text-sm text-gray-500'>{post.timestamp}</div>
            <div className='text-lg font-medium mt-1'>{post.number}</div>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center'>
            <select className='border h-12 px-2 rounded rounded-e-none' value={operator} onChange={(e) => setOperator(e.target.value)}>
              <option value='+'>+</option>
              <option value='-'>-</option>
              <option value='*'>*</option>
              <option value='/'>/</option>
            </select>

            <input
              type='number'
              className='border h-12 w-full px-2 border-x-0'
              placeholder='Enter your comments here...'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <Button className='h-12 rounded rounded-s-none' disabled={!number}>
              <Send />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
