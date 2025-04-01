'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Post } from '@/types'
import ReplyModal from './ReplyModel'
import { MessageCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import LoginAlertModal from '../global/LoginDialogue'

interface PostItemProps {
  post: Post
  level: number
}

export default function PostItem({ post, level }: PostItemProps) {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [showLoginAlert, setShowLoginAlert] = useState(false)

  const { user } = useAuth()
  const isMainPost = level === 0

  const handleOpenReplyModal = () => {
    if (user) {
      setIsReplyModalOpen(true)
    } else {
      setShowLoginAlert(true)
    }
  }
  return (
    <div className={`mb-2.5 ${level > 0 ? 'ml-4 pt-0.5' : ''}`}>
      <div className={`p-2 rounded-md ${isMainPost ? 'bg-white shadow-sm' : 'bg-gray-50 border border-gray-200'}`}>
        <div className='flex items-center'>
          <Avatar className={`${isMainPost ? 'h-6 w-6' : 'h-4 w-4'} mr-1.5`}>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.username}`} />
            <AvatarFallback>{post.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='flex items-baseline'>
            <div className={`${isMainPost ? 'text-sm font-medium' : 'text-xs'}`}>{post.username}</div>
            <div className='text-xs text-gray-500 ml-1.5'>{post.timestamp}</div>
          </div>
        </div>

        <div className={`${isMainPost ? 'text-base font-medium' : 'text-sm'} my-0.5`}>{post.number}</div>

        <div>
          <Button variant='ghost' size='sm' className='text-xs px-1.5 py-0 h-5' onClick={handleOpenReplyModal}>
            <MessageCircle />
          </Button>
        </div>

        <ReplyModal isOpen={isReplyModalOpen} onOpenChange={setIsReplyModalOpen} post={post} />
        <LoginAlertModal
          isOpen={showLoginAlert}
          onOpenChange={setShowLoginAlert}
          description={`You're not logged in! Log in to create and post your comments`}
        />
      </div>

      {post.comments.length > 0 && (
        <div className='mt-0.5'>
          {post.comments.map((comment) => (
            <PostItem key={comment.id} post={comment} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
