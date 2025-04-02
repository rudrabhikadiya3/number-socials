'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

export default function AppHeader() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className='w-full bg-gray-100 p-2 flex justify-between items-center'>
      <div className='font-bold text-xl'>Number Social</div>

      <div className='flex items-center gap-3'>
        {isAuthenticated && user ? (
          <>
            <div className='flex items-center gap-2'>
              <Avatar className='border'>
                <AvatarImage src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=seed=${user.username}`} alt='User Profile' />
                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className='font-medium text-gray-900'>{user.username}</p>
            </div>
            <Button variant='outline' size='sm' onClick={logout} className='ml-2'>
              Logout
            </Button>
          </>
        ) : (
          <Button asChild size='sm'>
            <a href='/login'>Login</a>
          </Button>
        )}
      </div>
    </header>
  )
}
