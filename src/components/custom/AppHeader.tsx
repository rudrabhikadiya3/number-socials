import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const AppHeader = () => {
  return (
    <header className='w-full bg-gray-100 p-2 flex justify-end '>
      <div className='flex items-center gap-2'>
        <Avatar className='border'>
          <AvatarImage src='/path-to-profile.jpg' alt='User Profile' />
          <AvatarFallback>RU</AvatarFallback>
        </Avatar>
        <p className='font-medium text-gray-900'>Username</p>
      </div>
    </header>
  )
}

export default AppHeader
