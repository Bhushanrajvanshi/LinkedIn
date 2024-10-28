'use client';
import { useState } from 'react';
import { PostDialog } from './PostDialog'
import ProfilePicture from './shared/ProfilePicture'
import { Input } from './ui/input'

const PostInput = ({user}:{user:any}) => {
    const[open, setOpen] = useState<boolean>(false)

    const handleInput = () => {
        setOpen(true);
    }

  return (
    <div className='bg-white p-4 m-2 md:m-0 border rounded-md border-gray-300'>
        <div className='flex items-center gap-3'>
            <ProfilePicture src={user?.imageUrl}/>
            <Input 
            type='text'
            placeholder='Start a post, Try writing with AI'
            className='rounded-full hover:bg-gray-100 h-12 cursor-pointer'
            onClick={handleInput} />  
    
            <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl}/>

        </div>
    </div>
  )
}

export default PostInput