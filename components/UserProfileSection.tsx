"use client"

import axios from 'axios';
import { ArrowLeft, Calendar, BadgeCheck, Bookmark, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
interface User {
    name: string;
    email: string;
    image: string | null;
    createdAt: string;

}

interface Post {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    user: User;
    _count: {
        likes: number
    }
}

export default function UsersProfileSection() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();
    // const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);


    if (!session) {
        <div className="flex h-screen bg-black items-center justify-center">
            <p className="text-white">You are not logged in. Please <Link href="/api/auth/signin" className="text-blue-500">log in</Link>.</p>
        </div>
    };

    const userId = params?.userid;
    const sessionId = session?.user.id;

    useEffect(() => {
        if (status == "unauthenticated") {
            router.push("/api/auth/signin")
        }
    }, [status, router]);

    useEffect(() => {
        if (userId) {

            GetPosts(userId as string);
            getUserDetails(userId as string);
        }
    }, [userId]);

    useEffect(() => {
        async function fetchFollowData() {
            try {

                const res = await axios.get(`/api/follows?followerId=${sessionId}&followingId=${userId}&userId=${userId}`);
                setIsFollowing(res.data.isFollowing);
                setFollowerCount(res.data.followerCount);
                setFollowingCount(res.data.followingCount);
            } catch (e) {
                console.log("error in follow request in useEffect", e)

            }
        }

        fetchFollowData();

    }, [sessionId, userId])

    async function getUserDetails(providerId: string) {
        try {
            const res = await axios.get(`/api/user?providerId=${providerId}`);
            setUser(res.data.user);


        } catch (e) {
            console.error(e);

        }

    }

    async function GetPosts(providerId: string) {
        try {
            const res = await axios.get(`/api/posts?providerId=${providerId}`);
            setPosts(res.data.posts)
        }
        catch (e) {
            console.error(e);

        }


    }

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                const res = await axios.delete(`/api/follows?followerId=${sessionId}&followingId=${userId}`);
                setFollowerCount(res.data.followerCount);
            }
            else {

                const res = await axios.post(`/api/follows?followerId=${sessionId}&followingId=${userId}`);
                setFollowerCount(res.data.followerCount);
            }
            setIsFollowing(!isFollowing);

        } catch (e) {
            console.log("error here in follow:", e)
        }


    }



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
                        <h1 className="font-bold text-xl">{user?.name}</h1>
                        <p className="text-gray-500 text-sm">{posts.length} posts</p>
                    </div>
                </div>
            </div>

            {/* Profile Header */}
            <div className="relative">
                <div className="h-32 bg-gray-800"></div>
                <div className="absolute -bottom-12 left-4">
                    <div className="w-24 h-24 rounded-full border-4 border-black bg-gray-600 overflow-hidden">
                        <Image
                            src={user?.image ?? "/images/avatar.png"}
                            alt="/images/avatar.png"
                            className="w-full h-full object-cover"
                            layout="responsive"
                            width={100}
                            height={100}
                        />
                        {/* <img
                            src={image ?? "/images/avatar.png"}
                            alt="/images/avatar.png"
                            className="w-full h-full object-cover"
                        /> */}
                    </div>
                </div>
            </div>

            {/* Profile Actions */}
            <div className="flex justify-end px-4 py-3">
                {sessionId === userId ? <button className="px-4 py-1.5 rounded-full border border-gray-600 font-bold hover:bg-gray-900 transition-colors">
                    Edit profile
                </button> : <button onClick={handleFollowToggle} className={`px-4 py-1.5 rounded-full border ${isFollowing ? "bg-gray-700 text-gray-200 border-gray-400" : "bg-blue-500 text-white border-gray-400 hover:bg-gray-900"} font-bold transition-colors`}>
                    {isFollowing ? "Following" : "Follow"}
                </button>}

            </div>

            {/* Profile Info */}
            <div className="px-4 mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-xl">{user?.name}</h2>
                    <button className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500 text-sm font-bold hover:bg-blue-600 transition-colors">
                        <BadgeCheck size={16} />
                        Get verified
                    </button>
                </div>
                <p className="text-gray-500">@{user?.email}</p>
                {/* their details */}
                <p className="text-gray-500 mt-1"></p>
                <p className="mt-3"></p>
                {/* their details */}

                <div className="flex items-center gap-2 mt-3 text-gray-500">
                    <Calendar size={16} />
                    {/* add exact joining time */}
                    <span className="text-sm">Joined {user?.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : "2024"}</span>
                </div>

                <div className="flex gap-4 mt-3">
                    <Link href="#following" className="hover:underline">
                        <span className="font-bold text-white">{followingCount}</span>{" "}
                        <span className="text-gray-500">Following</span>
                    </Link>
                    <Link href="#followers" className="hover:underline">
                        <span className="font-bold text-white">{followerCount}</span>{" "}
                        <span className="text-gray-500">Followers</span>
                    </Link>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="border-b border-gray-800">
                <div className="flex">
                    {["Posts", "Likes"].map((tab) => (
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
            <div>
                {posts.length > 0 ? posts.map((post) => <article key={post.id} className="border-b border-gray-700 p-4 hover:bg-gray-900/50 transition-colors">  <div className="flex gap-4">

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        {(post.user.image) ? <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                            <Image
                                src={post.user.image}
                                alt=""
                                className="w-full h-full object-cover"
                                layout="responsive"
                                width={100}
                                height={100}
                            />

                            {/* <img src={post.user.image} alt={""} className="w-full h-full object-cover" /> */}
                        </div> : <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden"></div>}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-white truncate">{post.user.name}</span>
                            <span className="text-gray-500 truncate">{"@" + post.user.email}</span>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
                        </div>

                        {/* Post Text */}
                        <p className="text-white mt-1 whitespace-pre-wrap break-words">{post.content}</p>

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
                            <div className="group flex items-center gap-1 ">
                                <div className="p-2 rounded-full ">
                                    <Heart size={18} />
                                </div>
                                <span className="text-sm">{post._count.likes}</span>
                            </div>
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
                </div> </article>) : <div className="text-gray-500 text-center mt-4">No posts available</div>}


            </div>

        </main>
    )
}



