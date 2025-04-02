'use client'

import { Post } from '@/types'
import PostItem from './PostItem'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import ReplyModal from './ReplyModel'
import LoginAlertModal from '../global/LoginDialogue'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  const [openedReply, setOpendedPost] = useState<Post | null>(null)
  const [showLoginAlert, setShowLoginAlert] = useState(false)

  const { user } = useAuth()

  function handleOpenReplyModal(reply: Post | null) {
    if (user) setOpendedPost(reply)
    else setShowLoginAlert(true)
  }

  return (
    <>
      {posts.map((post, i) => (
        <PostItem
          key={i}
          post={post}
          level={0}
          showLoginAlert={showLoginAlert}
          setShowLoginAlert={setShowLoginAlert}
          openedReply={openedReply}
          handleOpenReplyModal={handleOpenReplyModal}
        />
      ))}

      {openedReply && <ReplyModal isOpen={!!openedReply} onOpenChange={() => handleOpenReplyModal(null)} post={openedReply} />}
      <LoginAlertModal
        isOpen={showLoginAlert}
        onOpenChange={setShowLoginAlert}
        description={`You're not logged in! Log in to create and post your comments`}
      />
    </>
  )
}
