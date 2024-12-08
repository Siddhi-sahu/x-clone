"use client"

import axios from 'axios'
import { Heart, Bookmark, } from 'lucide-react'
import { useEffect, useState } from 'react';
import Image from 'next/image';

// interface PostProps {

//     timestamp: string
//     content: string
//     stats: {
//         replies: number
//         reposts: number
//         likes: number
//         views: number
//     }
// }
interface User {
    name: string;
    email: string;
    image: string | null;
}

interface Post {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    user: User;
    likes: number;
}
export default function PostBox(
    // {



    // timestamp = "3h",
    // content = "they are way too good at organisation & time management.",
    //     stats = {
    //         replies: 0,
    //         reposts: 0,
    //         likes: 3,
    //         views: 46
    //     }
    // }: PostProps
) {

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
    // const [likes, setlikes] = useState<number>(0)


    useEffect(() => {

        getPosts();



    }, []);
    async function getPosts() {
        try {
            const res = await axios.get("/api/posts/all");
            const postsWithLikes = [];
            const initialLikes: Record<number, boolean> = {}
            for (const post of res.data.posts) {
                const { likesCount, isLiked } = await getLikesCount(post.id);
                postsWithLikes.push({ ...post, likes: likesCount });
                initialLikes[post.id] = isLiked
            }


            setAllPosts(postsWithLikes);
            //initial state(of likes)
            setLikedPosts(initialLikes);
            //initiallikew={1: true, 2: false}


        } catch (e) {
            console.error(e)
        }

        // console.log("res: ", res)

    };

    const getLikesCount = async (postId: Number) => {
        //hhere
        try {
            const res = await axios.get(`/api/posts/likes?postId=${postId}`)
            return {
                likesCount: res.data.likes,
                isLiked: res.data.isCurrentlyLiked
            };

        } catch (e) {
            console.error(e);
            return {
                likesCount: 0,
                isLiked: false
            };
        }
    }

    const handleLikes = async (postId: number) => {
        try {
            const alreadyLiked = likedPosts[postId];
            if (alreadyLiked) {
                await axios.delete("/api/posts/likes", { data: { postId } })
            }
            else {

                await axios.post("/api/posts/likes", { postId }, { withCredentials: true });
            }


            setLikedPosts((prevLikedState) => ({
                ...prevLikedState,
                [postId]: !prevLikedState[postId]
            }));

            setAllPosts((prevPosts) =>
                prevPosts.map((post) => post.id === postId ? { ...post, likes: alreadyLiked ? post.likes - 1 : post.likes + 1 } : post))

        } catch (e) {
            console.log(e)
        }
    }



    return (
        <div>
            {allPosts.length > 0 ? allPosts.map((Post) => <article key={Post.id} className="border-b border-gray-700 p-4 hover:bg-gray-900/50 transition-colors">

                <div className="flex gap-4">

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        {(Post.user.image) ? <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                            <Image src={Post.user.image} alt={""}
                                className="w-full h-full object-cover"
                                layout="responsive" width={100} height={100} />

                            {/* <img src={Post.user.image} alt={""} className="w-full h-full object-cover" /> */}
                        </div> : <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden"></div>}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-white truncate">{Post.user.name}</span>
                            <span className="text-gray-500 truncate">{"@" + Post.user.email}</span>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500">{new Date(Post.createdAt).toLocaleString()}</span>
                        </div>

                        {/* Post Text */}
                        <p className="text-white mt-1 whitespace-pre-wrap break-words">{Post.content}</p>

                        {/* Interaction Buttons */}
                        <div className="flex justify-between mt-3 max-w-md text-gray-500">
                            {/* <button className="group flex items-center gap-1 hover:text-blue-500">
                                <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                                    <MessageCircle size={18} />
                                </div>
                                <span className="text-sm">{stats.replies}</span>
                            </button>
                            <button className="group flex items-center gap-1 hover:text-green-500">
                                <div className="p-2 rounded-full group-hover:bg-green-500/10">
                                    <Repeat2 size={18} />
                                </div>
                                <span className="text-sm">{stats.reposts}</span>
                            </button> */}
                            <button onClick={() => handleLikes(Post.id)} className="group flex items-center gap-1 hover:text-pink-500">
                                <div className={`p-2 rounded-full ${likedPosts[Post.id] ? "group-hover:bg-pink-500/10 text-pink-500" : "group-hover:bg-pink-500/10"} `}>
                                    <Heart size={18} className={`${likedPosts[Post.id] ? "fill-current text-pink-500" : ""}`} />
                                </div>
                                <span className="text-sm">{Post.likes}</span>
                            </button>
                            {/* <button className="group flex items-center gap-1 hover:text-blue-500">
                                <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                                    <BarChart3 size={18} />
                                </div>
                                <span className="text-sm">{stats.views}</span>
                            </button> */}
                            <div className="flex gap-3">
                                <button className="group hover:text-blue-500">
                                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                                        <Bookmark size={18} />
                                    </div>
                                </button>
                                {/* <button className="group hover:text-blue-500">
                                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                                        <Share size={18} />
                                    </div>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </article >) : <div className="text-gray-500 text-center mt-4">No posts available</div>}


        </div>
    )
}
