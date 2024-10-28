'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import ProfilePicture from './shared/ProfilePicture';
import { createCommentAction } from '@/lib/serveractions';

const CommentInput = ({postId}:{postId:any}) => {
    const { user } = useUser();

    const commentActionHandler = async (formData:FormData) => {
        try {
            if(!user) throw new Error('User not authenticated');
            await createCommentAction (postId, formData);
        } catch (error) {
            throw new Error('An error occured');
        }
    }

  return (
    <form action={(formData)=> commentActionHandler(formData)}>
            <div className='flex items-center gap-2'>
                <ProfilePicture src={user?.imageUrl!} />
                <Input
                    type="text"
                    name="inputText"
                    placeholder='Add a comment'
                    className='rounded-full'
                />
                <Button type='submit' variant={'outline'} className='rounded-full'>Send</Button>
            </div>
        </form>
  )
}

export default CommentInput