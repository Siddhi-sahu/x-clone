"use client"

import axios from 'axios';
import { ArrowLeft, Calendar, BadgeCheck } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react';

export default function ProfileSection() {
    const { data: session } = useSession();
    if (!session) {
        <div className="flex h-screen bg-black items-center justify-center">
            <p className="text-white">You are not logged in. Please <a href="/api/auth/signin" className="text-blue-500">log in</a>.</p>
        </div>
    };

    useEffect(() => {
        GetPosts();

    }, []);
    async function GetPosts() {
        try {

            const res = await axios.get("/api/posts");
            console.log(res.data.posts)
        }
        catch (e) {
            console.error(e)
        }

    }

    const name = session?.user.name;
    const image = session?.user.image;
    const email = session?.user.email;
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/60 backdrop-blur-md">
                <div className="flex items-center gap-8 px-4 py-2">
                    <Link
                        href="/home"
                        className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-xl">{name}</h1>
                        <p className="text-gray-500 text-sm">184 posts</p>
                    </div>
                </div>
            </div>

            {/* Profile Header */}
            <div className="relative">
                <div className="h-32 bg-gray-800"></div>
                <div className="absolute -bottom-12 left-4">
                    <div className="w-24 h-24 rounded-full border-4 border-black bg-gray-600 overflow-hidden">
                        <img
                            src={image ?? "/images/avatar.png"}
                            alt="/images/avatar.png"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Profile Actions */}
            <div className="flex justify-end px-4 py-3">
                <button className="px-4 py-1.5 rounded-full border border-gray-600 font-bold hover:bg-gray-900 transition-colors">
                    Edit profile
                </button>
            </div>

            {/* Profile Info */}
            <div className="px-4 mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-xl">{name}</h2>
                    <button className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500 text-sm font-bold hover:bg-blue-600 transition-colors">
                        <BadgeCheck size={16} />
                        Get verified
                    </button>
                </div>
                <p className="text-gray-500">@{email}</p>
                {/* their details */}
                <p className="text-gray-500 mt-1"></p>
                <p className="mt-3"></p>
                {/* their details */}

                <div className="flex items-center gap-2 mt-3 text-gray-500">
                    <Calendar size={16} />
                    <span className="text-sm">Joined April 2024</span>
                </div>

                <div className="flex gap-4 mt-3">
                    <Link href="#following" className="hover:underline">
                        <span className="font-bold text-white">1</span>{" "}
                        <span className="text-gray-500">Following</span>
                    </Link>
                    <Link href="#followers" className="hover:underline">
                        <span className="font-bold text-white">1000</span>{" "}
                        <span className="text-gray-500">Followers</span>
                    </Link>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="border-b border-gray-800">
                <div className="flex">
                    {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-4 hover:bg-gray-800/50 transition-colors relative ${tab === "Posts"
                                ? "font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-blue-500 after:rounded-full"
                                : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </nav>
            {/* //show user posts */}

        </main>
    )
}



