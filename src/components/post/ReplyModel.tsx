'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Post } from '@/types'
import { MouseEvent, useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { postService } from '@/services/postService'

interface ReplyModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  post: Post
}

export default function ReplyModal({ isOpen, onOpenChange, post }: ReplyModalProps) {
  const [operator, setOperator] = useState('+')
  const [number, setNumber] = useState('')
  const queryClient = useQueryClient()

  const calculateResult = (baseNumber: number, operand: number, operator: string) => {
    switch (operator) {
      case '+':
        return baseNumber + operand
      case '-':
        return baseNumber - operand
      case '*':
        return baseNumber * operand
      case '/':
        if (operand === 0) throw new Error('Cannot divide by zero')
        return baseNumber / operand
      default:
        return baseNumber
    }
  }

  const createCommentMutation = useMutation({
    mutationFn: (data: { postId: string; parentId: string; number: number }) => {
      return postService.createComment(data)
    },
    onSuccess: () => {
      onOpenChange(false)
      setNumber('')
      setOperator('+')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Your comment has been posted.')
    },
    onError: (error) => {
      console.error('Error creating comment:', error)
      toast.error('Failed to post comment. Please try again.')
    },
  })

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault()
    if (!number || isNaN(Number(number))) {
      toast.error('Invalid input')
      return
    }
    const numericOperand = Number(number)

    if (operator === '/' && numericOperand === 0) {
      toast.error('Cannot divide by zero')
      return
    }
    console.log('runinhhhhh')

    try {
      const result = calculateResult(post.number, numericOperand, operator)
      createCommentMutation.mutate({
        postId: String(post.id),
        parentId: String(post.postId || post.id),
        number: result,
      })
    } catch (error: any) {
      console.error(error)
      toast('Calculation error')
    }
  }

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
          <form className='flex items-center'>
            <select
              className='border h-12 px-2 rounded rounded-e-none'
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              disabled={createCommentMutation.isPending}
            >
              <option value='+'>+</option>
              <option value='-'>-</option>
              <option value='*'>*</option>
              <option value='/'>/</option>
            </select>

            <input
              type='number'
              className='border h-12 w-full px-2 border-x-0'
              placeholder='Enter a number...'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              disabled={createCommentMutation.isPending}
              autoFocus
            />

            <Button
              className='h-12 rounded rounded-s-none'
              disabled={!number || createCommentMutation.isPending}
              onClick={handleSubmit}
              type='submit'
            >
              {createCommentMutation.isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : <Send />}
            </Button>
          </form>

          {number && !isNaN(Number(number)) && (
            <div className='text-sm text-gray-500 pt-2'>
              Preview: {post.number} {operator} {number} ={' '}
              {operator === '/' && Number(number) === 0 ? 'Error: Cannot divide by zero' : calculateResult(post.number, Number(number), operator)}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
