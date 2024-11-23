
"use client"

import axios from 'axios'
import { MessageCircle, Repeat2, Heart, BarChart3, Bookmark, Share } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PostProps {
    avatar: string
    displayName: string
    username: string
    timestamp: string
    content: string
    stats: {
        replies: number
        reposts: number
        likes: number
        views: number
    }
}

interface Post {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
}
export default function PostBox({
    avatar = "/images/avatar.png",
    displayName = "me",
    username = "@meate",
    timestamp = "3h",
    content = " founders is that they are way too good at organisation & time management.",
    stats = {
        replies: 0,
        reposts: 0,
        likes: 3,
        views: 46
    }
}: PostProps) {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    useEffect(() => {
        getPosts()

    }, []);
    async function getPosts() {
        const res = await axios.get("/api/posts/all");
        setAllPosts(res.data.posts);
        console.log("res: ", res)
        console.log("posts:", res.data.posts)
    }

    return (
        <div>
            {allPosts.length > 0 ? allPosts.map((Post) => <article key={Post.id} className="border-b border-gray-700 p-4 hover:bg-gray-900/50 transition-colors">
                <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                            <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-white truncate">{displayName}</span>
                            <span className="text-gray-500 truncate">{username}</span>
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
                            <button className="group flex items-center gap-1 hover:text-pink-500">
                                <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                                    <Heart size={18} />
                                </div>
                                <span className="text-sm">{stats.likes}</span>
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
