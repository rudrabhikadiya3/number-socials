'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Post } from '@/types'

interface ReplyModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  post: Post
}

export default function ReplyModal({ isOpen, onOpenChange, post }: ReplyModalProps) {
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
          <div className='text-sm font-medium'>Enter your calculation:</div>
          <div className='flex gap-2 items-center'>
            <span className='text-lg'>{post.number}</span>
            <select className='rounded border p-1'>
              <option value='add'>+</option>
              <option value='subtract'>-</option>
              <option value='multiply'>×</option>
              <option value='divide'>÷</option>
            </select>
            <input type='number' className='border rounded p-1 flex-1' placeholder='Enter a number' />
          </div>
          <div className='flex justify-end mt-4'>
            <Button onClick={() => onOpenChange(false)}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
