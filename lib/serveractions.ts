"use server"
import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from 'cloudinary';
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import { Comment } from "@/models/comment.model";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// creating post using server...  
export const createPostAction = async (inputText:string, selectedFile:string) => {
    connectDB();
    const user = await currentUser();
    if( !user )  throw new Error("User not authenticated!");
    if( !inputText )  throw new Error("Input field is required!");

    const image = selectedFile;

    const userDatabase : IUser = {
        firstName: user.firstName || "Bhushan",
        lastName: user.lastName || "Rajvanshi",
        userId: user.id,
        profilePhoto: user.imageUrl,
    };

    let uploadResponse;
    try {
        if(image){
            // create post with image,
            uploadResponse = await cloudinary.uploader.upload(image)
            await Post.create({
                description : inputText,
                user : userDatabase,
                imageUrl: uploadResponse?.secure_url
            })
        } else {
            // create post with only text,
            await Post.create({
                description: inputText,
                user: userDatabase,
            });
        }  
        revalidatePath("/");  
    } catch (error:any) {
        throw new Error(error)
    }
}

// get all post using server 
export const getallPost = async () => {
    try {
        await connectDB();
        const posts = await Post.find().sort({createdAt: -1}).populate({path:'comments', options:{sort:{createdAt:-1}}});
        if(!posts) return [];
        return JSON.parse(JSON.stringify(posts));
        
    } catch (error) {
        console.log("gating allpost error",error);
        
    }
}

// Delete post by id,
export const deletePostAction = async (postId:any) => {
    await connectDB();
    const user = await currentUser();
    if(!user) throw new Error("user doesn't exists");
    const post = await Post.findById(postId);
    if(!post) throw new Error("Post doesn't exists")

    // Only delete self post
    if(post.user.userId != user.id){
        throw new Error("You aren't owner of this post")
    }

    try {
        await Post.deleteOne({_id:postId});
        revalidatePath("/");
    } catch (error:any) {
        throw new Error("An error occured", error);
    }
}

export const createCommentAction = async (postId:string , formData:FormData) => {
    try {
        const user = await currentUser();
        if(!user) throw new Error("User not authenticated");
        const inputText = formData.get('inputText') as string;
        if(!inputText) throw new Error("Input text required!");
        if(!postId) throw new Error("post id required");

        const userDatabase : IUser = {
            firstName: user.firstName || "Bhushan",
            lastName: user.lastName || "Rajvanshi",
            userId: user.id,
            profilePhoto: user.imageUrl,
        };

        const post = await Post.findById({_id:postId});
        if(!post) throw new Error("Post not found!");

        const comment = await Comment.create({
            textMessage : inputText,
            user : userDatabase,
        });

        post.comments?.push(comment._id);
        await post.save();

        revalidatePath("/");

    } catch (error) {
        throw new Error("An error accurred!")
    }
}