import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'

const CreatePost = () => {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (value) {
      console.log('Post created with value:', value)
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
    <div className='w-full max-w-xl p-4 border border-b-0'>
      <h2 className='text-lg font-semibold mb-2'>Create a New Post</h2>
      <Input
        placeholder='Write your number here...'
        className='p-0 border-0 focus-visible:border-0 focus-visible:ring-0 shadow-none'
        onChange={handleChange}
        value={value}
      />
      <div className='text-end'>
        <Button onClick={handleSubmit} className='text-end' size={'sm'} disabled={!value}>
          Post
        </Button>
      </div>
    </div>
  )
}

export default CreatePost
