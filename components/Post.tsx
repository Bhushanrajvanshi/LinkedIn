"use client"
import { useUser } from "@clerk/nextjs"
import ProfilePicture from "./shared/ProfilePicture"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"
import { Badge } from "./ui/badge"
import { IPostDocument } from "@/models/post.model"
import PostContent from "./PostContent"
import PostOption from "./PostOption"
import ReactTimeago from 'react-timeago'
import { deletePostAction } from "@/lib/serveractions"


const Post = ({post}:{post:IPostDocument}) => {
    const { user } = useUser();
    const fullName = post.user?.firstName + "  " + post?.user?.lastName;
    const loggedInUser = user?.id === post?.user?.userId;

  return (
    <div className="bg-white mx-2 my-2 md:mx-0 rounded-lg border border-gray-300">
        <div className="flex gap-2 p-4">

            <ProfilePicture src={post?.user?.profilePhoto!} />

            <div className="flex items-center justify-between w-full">
                <div>
                    <h1 className="text-sm font-bold"> {fullName} <Badge variant={'secondary'} className="mx-2" >you</Badge> </h1>
                    <p className="text-gray-500 text-sm">@{user ? user?.username : "username"}</p>
                    <p className="text-gray-500 text-sm">
                        <ReactTimeago date={new Date(post.createdAt)}/>
                    </p>
                </div>
            </div>

           <div>
            {
                loggedInUser && (
                    <Button onClick={() =>{
                        const res = deletePostAction(post._id)
                    }} size={'icon'} className="rounded-full" variant={'outline'}>
                        <Trash2 />
                    </Button>
                )
            }
           </div>

        </div>

        < PostContent post={post} />
        < PostOption post={post} />
    </div>
  )
}

export default Post