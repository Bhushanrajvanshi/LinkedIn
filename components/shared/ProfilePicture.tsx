import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'

const ProfilePicture = ({src}:{src:string}) => {

  return (

   <div>
    <Avatar className='cursor-pointer h-12 w-12'>
        <AvatarImage src={src} alt="Profile-Picture" />
    </Avatar>
   </div>

  )
}

export default ProfilePicture 