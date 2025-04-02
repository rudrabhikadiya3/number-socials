'use client'

import { MessageCircle } from 'lucide-react'
import { Post } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getRelativeTime } from '@/utils/client'

interface PostItemProps {
  post: Post
  level: number

  showLoginAlert: boolean
  setShowLoginAlert: React.Dispatch<React.SetStateAction<boolean>>
  openedReply: Post | null
  handleOpenReplyModal: (value: Post | null) => void
}

export default function PostItem({ post, level, showLoginAlert, setShowLoginAlert, openedReply, handleOpenReplyModal }: PostItemProps) {
  const isMainPost = level === 0

  return (
    <div className={`mb-2.5 ${level > 0 ? 'ml-4 pt-0.5' : ''}`}>
      <div className={`p-2 rounded-md ${isMainPost ? 'bg-white shadow-sm' : 'bg-gray-50 border border-gray-200'}`}>
        <div className='flex items-center'>
          <Avatar className={`${isMainPost ? 'h-6 w-6' : 'h-4 w-4'} mr-1.5`}>
            <AvatarImage src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=seed=${post.username}`} />
            <AvatarFallback>{post.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='flex items-baseline'>
            <div className={`${isMainPost ? 'text-sm font-medium' : 'text-xs'}`}>{post.username}</div>
            <div className='text-xs text-gray-500 ml-1.5'>{getRelativeTime(Number(post.timestamp))}</div>
          </div>
        </div>

        <div className={`${isMainPost ? 'text-base font-medium' : 'text-sm'} my-0.5`}>{post.number}</div>

        <div>
          <Button variant='ghost' size='sm' className='text-xs px-1.5 py-0 h-5' onClick={() => handleOpenReplyModal(post)}>
            <MessageCircle />
          </Button>
        </div>
      </div>

      {post.comments.length > 0 && (
        <div className='mt-0.5'>
          {post.comments.map((comment) => (
            <PostItem
              key={comment.id}
              post={comment}
              level={level + 1}
              handleOpenReplyModal={handleOpenReplyModal}
              showLoginAlert={showLoginAlert}
              setShowLoginAlert={setShowLoginAlert}
              openedReply={openedReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}
