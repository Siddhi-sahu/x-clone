'use client'


// import { useState } from 'react'
import { Home, Search, Bell, Mail, FileText, Users, Star, User, MoreHorizontal } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import { useState } from 'react';

export default function Header() {
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className="flex h-screen bg-black items-center justify-center">
                <p className="text-white">You are not logged in. Please <a href="/api/auth/signin" className="text-blue-500">log in</a>.</p>
            </div>
        );

    }
    const image = session.user.image;
    const name = session.user.name;
    const email = session.user.email;
    // console.log("image:", image)

    return (
        <div className="flex h-screen bg-black">

            <div className="this-div flex flex-col h-screen w-full max-w-xs bg-black text-white ml-auto">
                <nav className="flex-1  w-10/12 h-screen space-y-4 ml-auto">



                    <a href="#" className="flex p-2 md:pl-8 items-center space-x-4 hover:text-blue-500">
                        <Image src={"/images/logo.png"}
                            alt='X'
                            width={40}
                            height={40} />

                    </a>

                    <a href="#" className="flex  md:pl-8 font-bold items-center space-x-4 hover:text-slate-300">
                        <Home className="w-6 h-6" />
                        <span className="hidden md:block">Home</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-slate-300">
                        <Search className="w-6 h-6" />
                        <span className="hidden md:block">Explore</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-slate-300">
                        <Bell className="w-6 h-6" />
                        <span className="hidden md:block">Notifications</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-slate-300">
                        <Mail className="w-6 h-6" />
                        <span className="hidden md:block">Messages</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-slate-300">
                        <FileText className="w-6 h-6" />
                        <span className="hidden md:block">Grok</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-slate-300">
                        <Users className="w-6 h-6" />
                        <span className="hidden md:block">Communities</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-slate-300">
                        <Star className="w-6 h-6" />
                        <span className="hidden md:block">Premium</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-slate-300">
                        <User className="w-6 h-6" />
                        <span className="hidden md:block">Profile</span>
                    </a>


                    <a href="#" className="flex md:pl-8 font-bold items-center space-x-4 hover::text-slate-300">
                        <MoreHorizontal className="w-6 h-6" />
                        <span className="hidden md:block">More</span>
                    </a>
                    {showProfileMenu && (
                        <div className="absolute mt-2 w-56 bg-black text-white rounded-xl shadow-[0_0_10px_rgba(255,255,255,0.1)] border border-gray-700 hover:bg-gray-800 ">

                            <button onClick={() => signOut()} className="block px-4 py-2 ">
                                Log out {email}
                            </button>
                        </div>
                    )}
                    <button className=" w-5/6 font-bold px-6 py-3 bg-blue-500 rounded-full text-white hover:bg-blue-600">
                        Post
                    </button>
                    <button className="flex space-y-5  items-center space-x-4 mt-4 hover:text-slate-500" onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className='flex pt-5  items-center'>
                            {image ? <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                                <img src={image} alt={""} className="w-full h-full object-cover" />
                            </div> : <Image
                                src="/images/avatar.png?height=40&width=40"
                                alt="/images/avatar.png"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />}

                        </div>
                        <div className="hidden md:block  ">
                            <p className="font-bold ">{name}</p>
                            <p className="text-sm text-gray-400">@{email}</p>

                        </div>
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </nav>


            </div>
        </div>
    );


}


