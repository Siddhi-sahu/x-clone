'use client'


// import { useState } from 'react'
import { Home, Search, Bell, Mail, FileText, Users, Star, User, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
    // const [showProfileMenu, setShowProfileMenu] = useState(false)

    return (
        <div className="flex h-screen bg-black">
            {/* This div sticks to the right */}
            <div className="this-div flex flex-col h-screen w-full max-w-xs bg-black text-white ml-auto">
                <nav className="flex-1  w-10/12 h-screen space-y-4 ml-auto">



                    <a href="#" className="flex p-2 md:pl-8 items-center space-x-4 hover:text-blue-500">
                        <Image src={"/images/logo.png"}
                            alt='X'
                            width={40}
                            height={40} />

                    </a>

                    <a href="#" className="flex  md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <Home className="w-6 h-6" />
                        <span className="hidden md:block">Home</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <Search className="w-6 h-6" />
                        <span className="hidden md:block">Explore</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <Bell className="w-6 h-6" />
                        <span className="hidden md:block">Notifications</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <Mail className="w-6 h-6" />
                        <span className="hidden md:block">Messages</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <FileText className="w-6 h-6" />
                        <span className="hidden md:block">Grok</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <Users className="w-6 h-6" />
                        <span className="hidden md:block">Communities</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <Star className="w-6 h-6" />
                        <span className="hidden md:block">Premium</span>
                    </a>
                    <a href="#" className="flex p-2 md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <User className="w-6 h-6" />
                        <span className="hidden md:block">Profile</span>
                    </a>
                    {/* <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center space-x-4 hover:text-blue-500"
                    >
                        
                    </button> */}
                    {/* {showProfileMenu && (
                        <div className="absolute mt-2 w-48 bg-black text-white rounded-lg shadow-lg">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-800">
                                Add an existing account
                            </a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-800">
                                Log out @HimaniSahu67644
                            </a>
                        </div>
                    )} */}
                    <a href="#" className="flex md:pl-8 font-bold items-center space-x-4 hover:text-blue-500">
                        <MoreHorizontal className="w-6 h-6" />
                        <span className="hidden md:block">More</span>
                    </a>
                    <button className=" w-5/6 font-bold px-6 py-3 bg-blue-500 rounded-full text-white hover:bg-blue-600">
                        Post
                    </button>
                    <div className="flex space-y-5  items-center space-x-2 mt-4">
                        <div className='flex pt-5  items-center'>

                            <Image
                                src="/images/avatar.png?height=40&width=40"
                                alt="/images/avatar.png"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                        <div className="hidden md:block ">
                            <p className="font-bold">Himani Sahu</p>
                            <p className="text-sm text-gray-400">@HimaniSahu67644</p>
                        </div>
                    </div>
                </nav>


            </div>
        </div>
    );


}


